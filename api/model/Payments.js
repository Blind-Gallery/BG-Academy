const { Unauthorized, BadRequest } = require('http-errors')
const { request, gql } = require('graphql-request')

class Payments {
  constructor ({ gql, email, opts, jwt, stripe, tezos }) {
    this.gql = gql
    this.email = email
    this.opts = opts
    this.jwt = jwt
    this.stripe = stripe
    this.tezos = tezos
  }

  async getCoursePrice (courseId) {

  }

  async getTezosPrice () {

  }

  async createStripePaymentIntent ({ amount, currency, paymentMethodTypes, receiptEmail }) {
    let paymentIntent = null
    try {
      paymentIntent = await this.stripe.paymentIntent(amount, currency, paymentMethodTypes, receiptEmail)
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

  async createTezosPaymentIntent () {

  }

  async verifyTezosPayment () {

  }
}

module.exports = Payments
