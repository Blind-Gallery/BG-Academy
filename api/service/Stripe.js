const { BadRequest } = require('http-errors')
const logger = require('./Logger')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class Payment {
  async createCustomer (metadata) {
    let customer = null
    try {
      customer = await stripe.customers.create({
        ...metadata
      })
    } catch (err) {
      logger.error(err)
    }
    logger.info({ customer })
    return customer
  }

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
      logger.error(err)
    }
    logger.info({ paymentIntent })
    return paymentIntent
  }

  /**
   * Updates a payment intent with the specified ID and receipt email.
   *
   * @param {string} paymentIntentId - The ID of the payment intent to update.
   * @param {string} receiptEmail - The email address to associate with the payment intent receipt.
   * @returns {Promise<Object>} - A promise that resolves to the updated payment intent object.
   */
  async paymentIntentUpdate (paymentIntentId, receiptEmail) {
    let paymentIntent = null
    try {
      paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        receipt_email: receiptEmail
      })
    } catch (err) {
      logger.error(err)
    }
    logger.info({ paymentIntent })
    return paymentIntent
  }

  /**
   * Verifies the webhook event signature and processes the event.
   *
   * @param {string} signature - The signature of the webhook event.
   * @param {object} body - The body of the webhook event.
   * @returns {object} - The processed event object.
   * @throws {BadRequest} - If there is an error in the webhook event.
   */
  async verify (signature, body) {
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
    } catch (err) {
      logger.error(err)
      throw new BadRequest(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        logger.info(event.data.object)
        // Then define and call a function to handle the event payment_intent.succeeded
        break

      case 'payment_intent.payment_failed':
        logger.info(event.data.object)
        break
        // ... handle other event types
      default:
        logger.info(`Unhandled event type ${event.type}`)
    }

    return event
  }

  /**
   * Retrieves the tax settings.
   *
   * @returns {Object} The tax settings object.
   * @throws {Error} If failed to retrieve tax settings.
   */
  async retrieveTaxSettings () {
    let taxSettings = null
    try {
      taxSettings = await stripe.tax.settings.retrieve()
    } catch (err) {
      logger.error(`Error while retrieving tax settings: ${err.message}`)
    }
    if (!taxSettings) {
      throw new Error('Failed to retrieve tax settings')
    }
    return {
      taxCode: taxSettings.defaults.tax_code,
      taxBehavior: taxSettings.defaults.tax_behavior
    }
  }

  async calculateTax (amount, currency, reference) {
    const id = null
    const { taxCode } = await this.retrieveTaxSettings()
    try {
      const calculation = await stripe.tax.calculations.create({
        currency,
        line_items: [
          {
            amount,
            reference,
            tax_code: taxCode
          }
        ]
      })
    } catch (err) {
      logger.error(`Error while calculating tax: ${err.message}`)
    }
  }
}

module.exports = Payment
