require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class Payment {
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
    return paymentIntent
  }
}

module.exports = Payment
