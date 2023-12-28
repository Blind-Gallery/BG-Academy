'use strict'

const {
  stripeSchema,
  stripePaymentIntent,
  tezosPaymentIntent,
  tezosPaymentVerify
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    // This is a webhook for stripe
    fastify.post('/stripe-webhook', { schema: stripeSchema, config: { rawBody: true } }, stripeVerificationHandler)
    // Endpoint when a user wants to pay
    fastify.post('/stripe/create-intent', { schema: stripePaymentIntent }, stripePaymentIntentHandler)
    // Endpoint when a user wants to pay with tezos
    fastify.post('/tezos/payment-intent', { schema: tezosPaymentIntent }, tezosPaymentIntentHandler)
    // Endpoint when a user wants to verify a tezos payment
    fastify.post('/tezos/payment-verify', { schema: tezosPaymentVerify }, tezosPaymentVerifyHandler)
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
  const response = await this.payments.verifyStripeWebhook(sig, req.rawBody)
  console.info('stripe verify response: ' + JSON.stringify(response))
}

async function stripePaymentIntentHandler (req, reply) {
  const paymentIntent = await this.payments.createStripePaymentIntent(req.body)
  console.info('Payment intent: ', paymentIntent)
  reply.code(200).send({ paymentIntent })
  return { paymentIntent }
}

async function tezosPaymentIntentHandler (req, reply) {
  const paymentIntent = await this.payments.createTezosPaymentIntent(req.body)
  return paymentIntent
}

async function tezosPaymentVerifyHandler (req, reply) {
  const sucess = await this.payments.verifyTezosPayment(req.body)
}
