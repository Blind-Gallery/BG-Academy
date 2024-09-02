const { BadRequest, Conflict, InternalServerError } = require('http-errors')
const { logger } = require('../service')

const {
  GET_COURSE_BY_ID,
  CREATE_PAYMENT_INTENT,
  GET_PAYMENT_INTENT_INFO,
  CREATE_TEZOS_PAYMENT_INTENT,
  CREATE_STRIPE_PAYMENT_INTENT,
  ADD_USER_TO_COURSE,
  GET_USER_COURSE,
  GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT,
  GET_USER_FROM_ID
} = require('../graphQL')

class Payments {
  constructor ({ gql, email, opts, jwt, stripe, tezos, academySC, coinGecko }) {
    this.gql = gql
    this.email = email
    this.opts = opts
    this.jwt = jwt
    this.stripe = stripe
    this.tezos = tezos
    this.academySC = academySC
    this.coinGecko = coinGecko
  }

  async getOrCreatePaymentIntent ({ courseId, userId }) {
    // TODO: Check if payment intent already exists
    const { payments_by_pk: payment } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO,
      { courseId, userId }
    )

    if (payment) {
      logger.info(`Payment intent already exists for course ${courseId} and user ${userId}`)
      return {
        transactionId: payment?.transaction_info?.id,
        stripeTransactionId: payment?.transaction_info?.stripe_transaction_id,
        tezosTransactionId: payment?.transaction_info?.tezos_transaction_id
      }
    }

    logger.info(`Creating payment intent for course ${courseId} and user ${userId}`)
    const { insert_payments_one: newPayment } = await this.gql.request(
      CREATE_PAYMENT_INTENT,
      { courseId, userId }
    )
    logger.info(`Payment intent: ${JSON.stringify(newPayment)}`)

    return {
      transactionId: newPayment?.transaction_info?.id,
      stripeTransactionId: newPayment?.transaction_info?.stripe_transaction_id,
      tezosTransactionId: newPayment?.transaction_info?.tezos_transaction_id
    }
  }

  async getCoursePrice (courseId) {
    const { courses_by_pk: course } = await this.gql.request(
      GET_COURSE_BY_ID,
      { id: courseId }
    )

    logger.debug(`Course data: ${JSON.stringify(course)}`)
    logger.info(`Course ${courseId} has a price: ${course.price}`)
    let price = course.price

    if (course.discount_price) {
      logger.info(`Course ${courseId} has a discount price: ${course.discount_price}`)
      price = course.discount_price
    }

    return { price, onchainId: course.onchain_id }
  }

  async getTezosPrice (usdAmount) {
    const { tezos } = await this.coinGecko.getCoinPrice({
      ids: ['tezos'],
      currency: 'usd'
    })
    const conversion = usdAmount / tezos.usd
    return conversion
  }

  async getStripePayment (userId, courseId) {
    const { payments_by_pk: payment } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO,
      { userId, courseId }
    )
    const stripePayment = payment?.transaction_info?.transactions_stripe_transaction_info
    return stripePayment
  }

  async getTezosPayment ({ userId, onchainId, courseId }) {
    const { payments_by_pk: payment } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO,
      { userId, courseId }
    )
    const tezosPayment = payment?.transaction_info?.transactions_tezos_transaction_info
    return tezosPayment
  }

  async storeStripePayment ({
    paymentIntent, courseId,
    userId, paymentIntentClientSecret, amount
  }) {
    logger.debug(`Storing stripe payment intent for ${courseId} and ${userId}`)
    if (!paymentIntent || !courseId || !userId || !paymentIntentClientSecret || !amount) {
      throw new BadRequest('Missing required fields')
    }
    logger.debug(`Storing stripe payment intent for ${courseId} and ${userId}`)
    const { stripeTransactionId } = await this.getOrCreatePaymentIntent({ courseId, userId })
    logger.debug(`Transaction id: ${stripeTransactionId}`)
    const { update_stripe_transaction_info_by_pk: payment } = await this.gql.request(
      CREATE_STRIPE_PAYMENT_INTENT,
      {
        paymentIntent,
        paymentIntentClientSecret,
        amount,
        stripeTransactionId
      }
    )
    return payment
  }

  async storeTezosPaymentIntent ({ courseId, userId, wallet, amount }) {
    logger.debug(`Storing tezos payment intent for ${courseId} and ${userId}`)
    const { tezosTransactionId } = await this.getOrCreatePaymentIntent({ courseId, userId })
    const { insert_payments_one: payment } = await this.gql.request(
      CREATE_TEZOS_PAYMENT_INTENT,
      {
        amount,
        wallet,
        tezosTransactionId
      }
    )
    return payment
  }

  async createStripePaymentIntent ({ amount, currency, paymentMethodTypes, receiptEmail, userId, courseId }) {
    let paymentIntent = null
    const oldPayment = await this.getStripePayment(userId, courseId)
    if (oldPayment?.payment_intent) {
      paymentIntent = {
        id: oldPayment?.payment_intent,
        client_secret: oldPayment?.payment_intent_client_secret
      }
      return paymentIntent
    }
    try {
      paymentIntent = await this.stripe.paymentIntent(amount, currency, paymentMethodTypes, receiptEmail)
      await this.storeStripePayment({
        paymentIntent: paymentIntent.id,
        courseId,
        userId,
        paymentIntentClientSecret: paymentIntent.client_secret,
        amount
      })
    } catch (err) {
      logger.error(err)
    }
    return paymentIntent
  }

  async verifyStripeWebhook (signature, body) {
    let event = null
    try {
      event = await this.stripe.verify(signature, body)
    } catch (err) {
      logger.error(err)
      throw new BadRequest(`Webhook Error: ${err.message}`)
    }
    return event
  }

  async createTezosPaymentIntent ({ courseId, userId, wallet }) {
    const { price, onchainId } = await this.getCoursePrice(courseId)
    const tezosPrice = await this.getTezosPrice(price)
    logger.info(`Creating tezos payment intent for ${tezosPrice} tez - ${price} USD`)
    const oldPayment = await this.getTezosPayment({ userId, onchainId, courseId })
    logger.info(`Old payment: ${JSON.stringify(oldPayment)}`)
    if (oldPayment) {
      return { tezos: tezosPrice, onchainId }
    }

    try {
      logger.info(`Creating tezos payment intent for ${tezosPrice} tez - ${price} USD`)
      await this.storeTezosPaymentIntent({
        courseId,
        userId,
        amount: tezosPrice,
        wallet
      })
      // creates payment intent on the academy smart contract
      await this.academySC.addCourseToUser({
        courseId: onchainId,
        user: wallet
      })
    } catch (err) {
      logger.error(err.message)
      if (err.message.includes('BLIND_GALLERY_COURSE_ALREADY_ACTIVE')) {
        return { tezos: tezosPrice }
      } else if (err.message.includes('BLIND_GALLERY_COURSE_NOT_FOUND')) {
        throw new Conflict('Tezos payment not implemented for this course yet')
      } else {
        throw new InternalServerError(err.message)
      }
    }
    logger.info(onchainId)
    return { tezos: tezosPrice, onchainId }
  }

  async addCourseToUser ({ courseId, userId }) {
    logger.debug(`Adding course ${courseId} to user ${userId}`)

    const { user_course_by_pk: existing } = await this.gql.request(
      GET_USER_COURSE, { courseId, userId })

    if (existing) {
      logger.info(`User already has course ${courseId}`)
      return existing
    }
    const { insert_user_course_one: userCourse } = await this.gql.request(
      ADD_USER_TO_COURSE, { courseId, userId })

    await this.sendWelcomeToCourseEmail({ courseId, userId })
    logger.info(`User course: ${JSON.stringify(userCourse)} - email sent`)
    return userCourse
  }

  async sendWelcomeToCourseEmail ({ courseId, userId }) {
    const { courses_by_pk: course } = await this.gql.request(
      GET_COURSE_BY_ID, { id: courseId }
    )

    const { users_by_pk: { email_info: emailInfo } } = await this.gql.request(
      GET_USER_FROM_ID, { userId }
    )

    if (!emailInfo?.email) {
      logger.error('No email found for user')
      return
    }

    logger.info(`Sending welcome email to ${userId} for course ${courseId}`)

    await this.email.sendThanksForPurchaseEmail({
      to: emailInfo.email,
      title: course.title,
      image: course.thumbnail,
      link: `https://academy.blindgallery.xyz/courseNavigator/chapter/${course.modules[0].chapters[0].id}`
    })
  }

  async giftCourse ({ courseId, userId }) {
    logger.info(`Gifting course ${courseId} to user ${userId}`)
    await this.addCourseToUser({ courseId, userId })

    return { success: true }
  }

  async verifyStripePayment ({ paymentIntent, paymentIntentClientSecret }) {
    logger.info(`Verifying stripe payment intent ${paymentIntent}`)
    const { stripe_transaction_info: stripePayment } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT,
      { paymentIntent }
    )

    if (!stripePayment) {
      throw new BadRequest('Payment not found')
    }

    const courseId = stripePayment[0]?.transaction_info?.payment_info?.course_id
    await this.addCourseToUser({
      courseId,
      userId: stripePayment[0]?.transaction_info?.payment_info?.user_id
    })
    return { success: true, courseId }
  }

  async verifyTezosPayment ({ onchainId, courseId, userId, opHash }) {
    logger.info('Verifying tezos payment intent')
    await this.getTezosPayment({ userId, onchainId, courseId })
    await this.addCourseToUser({ courseId, userId })
    return { success: true, courseId }
  }
}

module.exports = Payments
