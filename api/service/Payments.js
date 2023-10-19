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
}

module.exports = Payment
