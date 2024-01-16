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
   * const paymentIntent = await pay.paymentIntent(5000, 'usd', ['card'], 'email.example.com')
   */
  async paymentIntent (amount, currency, paymentMethodTypes, receiptEmail) {
    console.log('paymentIntent', {
      amount,
      currency,
      paymentMethodTypes,
      receiptEmail
    })
    let paymentIntent = null
    try {
      const paymentIntentParams = {
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true
        }
      }
      if (receiptEmail) {
        paymentIntentParams.receipt_email = receiptEmail
      }
      paymentIntent = await stripe.paymentIntents.create(paymentIntentParams)
    } catch (err) {
      console.error(err)
    }
    console.info({ paymentIntent })
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
        console.info(event.data.object)
        // Then define and call a function to handle the event payment_intent.succeeded
        break

      case 'payment_intent.payment_failed':
        console.info(event.data.object)
        break
        // ... handle other event types
      default:
        console.info(`Unhandled event type ${event.type}`)
    }

    return event
  }
}

module.exports = Payment
