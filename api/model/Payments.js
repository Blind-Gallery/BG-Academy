const { BadRequest, Conflict, InternalServerError } = require('http-errors')
const { GET_COURSE_BY_ID, CREATE_PAYMENT_INTENT, GET_PAYMENT_INTENT_INFO, CREATE_TEZOS_PAYMENT_INTENT, CREATE_STRIPE_PAYMENT_INTENT } = require('../graphQL/payments')

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
    const { insert_payments_one: payment } = await this.gql.request(
      CREATE_PAYMENT_INTENT,
      { courseId, userId }
    )

    return {
      transactionId: payment?.transaction_info?.id,
      stripeTransactionId: payment?.transaction_info?.stripe_transaction_id,
      tezosTransactionId: payment?.transaction_info?.tezos_transaction_id
    }
  }

  async getCoursePrice (courseId) {
    const { courses_by_pk: course } = await this.gql.request(
      GET_COURSE_BY_ID,
      { id: courseId }
    )

    return course.price
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
    const { payments } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO,
      { userId, courseId }
    )
    const stripePayment = payments[0]?.transaction_info?.transactions_stripe_transaction_info
    return stripePayment
  }

  async getTezosPayment (userId, courseId) {
    const { payments } = await this.gql.request(
      GET_PAYMENT_INTENT_INFO,
      { userId, courseId }
    )
    const stripePayment = payments[0]?.transaction_info?.transactions_tezos_transaction_info
    return stripePayment
  }

  async storeStripePayment ({
    paymentIntent, courseId,
    userId, paymentIntentClientSecret, amount
  }) {
    const { transactionId } = await this.getOrCreatePaymentIntent({ courseId, userId })
    const { insert_payments_one: payment } = await this.gql.request(
      CREATE_STRIPE_PAYMENT_INTENT,
      {
        paymentIntent,
        courseId,
        userId,
        paymentIntentClientSecret,
        amount,
        transactionId
      }
    )
    return payment
  }

  async storeTezosPaymentIntent ({ courseId, userId, wallet, amount }) {
    const { transactionId } = await this.getOrCreatePaymentIntent({ courseId, userId })
    const { insert_payments_one: payment } = await this.gql.request(
      CREATE_TEZOS_PAYMENT_INTENT,
      {
        courseId,
        userId,
        amount,
        wallet,
        transactionId
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
      console.error(err)
    }
    return paymentIntent
  }

  async verifyStripeWebhook (signature, body) {
    let event = null
    try {
      event = await this.stripe.verify(signature, body)
    } catch (err) {
      console.error(err)
      throw new BadRequest(`Webhook Error: ${err.message}`)
    }
    return event
  }

  async createTezosPaymentIntent ({ courseId, userId, wallet }) {
    const coursePrice = await this.getCoursePrice(courseId)
    const tezosPrice = await this.getTezosPrice(coursePrice)
    console.info(coursePrice, tezosPrice)
    const oldPayment = await this.getTezosPayment(userId, courseId)
    if (oldPayment) {
      return { tezos: tezosPrice }
    }

    try {
      await this.storeTezosPaymentIntent({
        courseId,
        userId,
        amount: tezosPrice,
        wallet
      })
      await this.academySC.addCourseToUser({
        courseId,
        user: wallet
      })
    } catch (err) {
      console.error(err.message)
      if (err.message.includes('BLIND_GALLERY_COURSE_ALREADY_ACTIVE')) {
        return { tezos: tezosPrice }
      } else if (err.message.includes('BLIND_GALLERY_COURSE_NOT_FOUND')) {
        throw new Conflict('Tezos payment not implemented for this course yet')
      } else {
        throw new InternalServerError(err.message)
      }
    }
    return { tezos: tezosPrice }
  }

  async verifyStripePayment ({ paymentIntent, paymentIntentClientSecret, userId }) {
    console.log('paymentIntent', paymentIntent, paymentIntentClientSecret, userId)
  }

  async verifyTezosPayment ({ courseId, userId, opHash }) {
    const payment = await this.getTezosPayment(userId, courseId)
    console.log('payment', payment)
  }
}

module.exports = Payments
