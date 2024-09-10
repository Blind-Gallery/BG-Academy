const { BadRequest, InternalServerError } = require('http-errors')
const logger = require('./Logger')
require('dotenv').config()
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY,
  { apiVersion: '2023-08-16; payment_intent_with_tax_api_beta=v1;' }
)
const axios = require('axios').default

async function safeStripeOperation (operation, errorMessage) {
  try {
    const result = await operation()
    logger.debug(`Stripe operation successful: ${JSON.stringify(result)}`)
    return result
  } catch (err) {
    logger.error(`${errorMessage}: ${err.message}`)
    throw new InternalServerError(errorMessage)
  }
}
class Stripe {
  async getIPDetails (ip) {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`)
    return data
  }

  async customerOperation (operation, id, info = {}) {
    if (!id && operation !== 'create') {
      throw new BadRequest('Customer ID is required!')
    }
    return safeStripeOperation(
      () => stripe.customers[operation](id, info),
      `Failed to ${operation} customer`
    )
  }

  /**
   * Creates a customer using the provided customer information.
   *
   * @param {Object} customerInfo - The customer information.
   * @returns {Promise<Object>} - A promise that resolves to the created customer object.
   */
  async createCustomer (customerInfo) {
    return safeStripeOperation(
      () => stripe.customers.create(customerInfo),
      'Failed to create customer'
    )
  }

  /**
   * Retrieves a customer from Stripe.
   *
   * @param {string} customerId - The ID of the customer to retrieve.
   * @returns {Promise<Object>} - A promise that resolves to the retrieved customer object.
   */
  async retrieveCustomer (customerId) {
    return this.customerOperation('retrieve', customerId)
  }

  /**
   * Updates a customer in Stripe.
   *
   * @param {string} customerId - The ID of the customer to update.
   * @param {Object} customerInfo - The updated customer information.
   * @returns {Promise<Object>} - A promise that resolves to the updated customer object.
   */
  async updateCustomer (customerId, customerInfo) {
    return this.customerOperation('update', customerId, customerInfo)
  }

  /**
   * Deletes a customer from Stripe.
   *
   * @param {string} customerId - The ID of the customer to delete.
   * @returns {Promise<Object>} - A promise that resolves to the deleted customer object.
   */
  async deleteCustomer (customerId) {
    return this.customerOperation('delete', customerId)
  }

  async registerCustomer ({ customerId = null, user, ip }) {
    const { data: details } = await axios.get(`http://ip-api.com/json/${ip}`)
    logger.debug(details)
    const customerInfo = {
      name: user.name,
      address: {
        country: details.countryCode
      },
      tax: {
        ip_address: ip
      },
      metadata: {

      }
    }
    logger.debug({ customerInfo })
    if (user.email_info) {
      customerInfo.email = user.email_info.email
    }
    if (user.tezos_info) {
      customerInfo.metadata.tezos_wallet = user.tezos_info.wallet
    }

    if (customerId) {
      logger.debug(`Updating customer ${customerId}`)
      await this.updateCustomer(customerId, customerInfo)
      return { customerId, country: details.country }
    }

    logger.debug('Creating customer')
    const customer = await this.createCustomer(customerInfo)

    return { customerId: customer.id, country: details.country }
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
  async paymentIntent (amount, currency, paymentMethodTypes, receiptEmail, taxId) {
    let paymentIntent = null
    try {
      const paymentIntentParams = {
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true
        },
        async_workflows: {
          inputs: {
            tax: {
              calculation: taxId
            }
          }
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
      throw new InternalServerError('Failed to retrieve tax settings')
    }
    return {
      taxCode: taxSettings.defaults.tax_code,
      taxBehavior: taxSettings.defaults.tax_behavior
    }
  }

  /**
   * Calculates the tax for a given amount and currency.
   *
   * @param {number} amount - The amount to calculate tax for.
   * @param {string} currency - The currency of the amount.
   * @param {string} reference - The reference for the tax calculation.
   * @param {string} customerId - The ID of the customer.
   * @returns {string} - The ID of the tax calculation.
   * @throws {InternalServerError} - If the tax calculation fails.
   */
  async calculateTax (amount, currency, reference, customerId) {
    let id = null
    const { taxCode } = await this.retrieveTaxSettings()
    try {
      const calculation = await stripe.tax.calculations.create({
        currency,
        customer: customerId,
        line_items: [
          {
            amount,
            reference,
            tax_code: taxCode
          }
        ]
      })
      logger.debug({ calculation })
      id = calculation.id
    } catch (err) {
      logger.error(`Error while calculating tax: ${err.message}`)
    }
    if (!id) {
      throw new InternalServerError('Failed to calculate tax')
    }

    return id
  }
}

module.exports = Stripe
