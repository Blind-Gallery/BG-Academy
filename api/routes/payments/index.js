'use strict'

const {
  stripeSchema,
  stripePaymentIntent
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    // This is a webhook for stripe
    fastify.post('/stripe', { schema: stripeSchema, config: { rawBody: true } }, stripeVerificationHandler)
    // Endpoint when a user wants to pay
    fastify.post('/stripe/create-intent', { schema: stripePaymentIntent }, stripePaymentIntentHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'payments'
    ]
  }
}

async function stripeVerificationHandler (req, reply) {
  const sig = req.headers['stripe-signature']
  const response = await this.payments.verify(sig, req.rawBody)
}

async function stripePaymentIntentHandler (req, reply) {
  const paymentIntent = await this.payments.paymentIntent(
    req.body.amount,
    req.body.currency,
    req.body.paymentMethodTypes,
    req.body.receiptEmail
  )

  console.info('Payment intent: ', paymentIntent)
  reply.code(200).send({ paymentIntent })
  return { paymentIntent }
}
