const { BadRequest, Conflict, InternalServerError } = require('http-errors')
const { logger } = require('../service')
const { TRANSACTION_TYPES } = require('../constants/payments')
const {
  GET_COURSE_BY_ID,
  CREATE_PAYMENT_INTENT,
  GET_PAYMENT_INTENT_INFO,
  CREATE_TEZOS_PAYMENT_INTENT,
  CREATE_STRIPE_PAYMENT_INTENT,
  ADD_USER_TO_COURSE,
  GET_USER_COURSE,
  GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT,
  GET_USER_FROM_ID,
  UPDATE_PAYMENT_INFO
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
    logger.debug(`Payment intent: ${JSON.stringify(newPayment)}`)

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

  getStripeTaxCalculationData ({ country, userCountry, customerId }) {
    if (!customerId) {
      return [false, country]
    }

    return country !== userCountry ? [false, country] : [customerId]
  }

  async createStripeTaxCalculation ({
    customerId,
    country,
    cost,
    sku,
    userCountry
  }) {
    const taxCalculation = this.getStripeTaxCalculationData({ country, userCountry, customerId })

    try {
      const { id: taxId, amount, taxAmountExclusive } = await this.stripe.calculateTax(
        cost,
        'usd',
        `course-${sku}`,
        ...taxCalculation
      )
      return { taxId, amount, taxAmountExclusive }
    } catch (err) {
      logger.error(`Failed to calculate tax: ${err.message}`)
      logger.warn('Using cost without tax')
      return { taxId: null, amount: cost, taxAmountExclusive: 0 }
    }
  }

  async createStripePaymentIntent ({
    amount,
    currency,
    paymentMethodTypes,
    receiptEmail,
    userId,
    courseId,
    taxId
  }) {
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
      paymentIntent = await this.stripe.paymentIntent(
        amount, currency, paymentMethodTypes, receiptEmail, taxId)
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

  async addCourseToUser ({ courseId, userId, transactionType = TRANSACTION_TYPES.GIFT }) {
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

    await this.getOrCreatePaymentIntent({ courseId, userId })
    await this.gql.request(
      UPDATE_PAYMENT_INFO,
      { courseId, userId, transactionType })
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
    const title = `'${course.name}' by ${course.teacher.name}`
    await this.email.sendThanksForPurchaseEmail({
      to: emailInfo.email,
      title,
      image: course.thumbnail,
      link: `https://academy.blindgallery.xyz/courseNavigator/chapter/${course.modules[0].chapters[0].id}`
    })
  }

  async giftCourse ({ courseId, userId }) {
    logger.info(`Gifting course ${courseId} to user ${userId}`)
    await this.addCourseToUser({ courseId, userId, transactionType: TRANSACTION_TYPES.GIFT })

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
      userId: stripePayment[0]?.transaction_info?.payment_info?.user_id,
      transactionType: TRANSACTION_TYPES.STRIPE
    })
    return { success: true, courseId }
  }

  async verifyTezosPayment ({ onchainId, courseId, userId, opHash }) {
    logger.info('Verifying tezos payment intent')
    await this.getTezosPayment({ userId, onchainId, courseId })
    await this.addCourseToUser({
      courseId,
      userId,
      transactionType: TRANSACTION_TYPES.TEZOS
    })
    return { success: true, courseId }
  }
}

module.exports = Payments
