const { BadRequest } = require('http-errors')

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class Payment {
  /**
   *
   * @param {*} amount
   * @param {*} currency
   * @param {*} paymentMethodTypes
   * @param {*} receiptEmail
   * @returns paymentIntent
   *
   * @example
   * const pay = new Payment()
   * const paymentIntent = await pay.createInvoke(5000, 'usd', ['card'], 'email.example.com')
   */
  async createInvoke (amount, currency, paymentMethodTypes, receiptEmail) {
    let paymentIntent = null
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: paymentMethodTypes,
        receipt_email: receiptEmail
      })
    } catch (err) {
      console.error(err)
    }
    console.info(paymentIntent)
    return paymentIntent
  }

  async verify (signature, body) {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      console.error(err)
      throw new BadRequest(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        console.info(paymentIntentSucceeded)
        // Then define and call a function to handle the event payment_intent.succeeded
        break
        // ... handle other event types
      default:
        console.info(`Unhandled event type ${event.type}`)
    }
  }
}

module.exports = Payment
