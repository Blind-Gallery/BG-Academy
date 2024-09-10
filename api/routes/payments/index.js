'use strict'
const {
  stripeSchema,
  stripePaymentIntent,
  stripePaymentVerify,
  tezosPaymentIntent,
  tezosPaymentVerify,
  giftCourseSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    // This is a webhook for stripe
    fastify.post('/stripe', { schema: stripeSchema, config: { rawBody: true } }, stripeVerificationHandler)
    // Endpoint when a user wants to pay
    fastify.post('/stripe/payment-intent', { schema: stripePaymentIntent }, stripePaymentIntentHandler)
    // Endpoint when a user wants to verify a stripe payment
    fastify.post('/stripe/verify-payment', { schema: stripePaymentVerify }, stripePaymentVerifyHandler)
    // Endpoint when a user wants to pay with tezos
    fastify.post('/tezos/payment-intent', { schema: tezosPaymentIntent }, tezosPaymentIntentHandler)
    // Endpoint when a user wants to verify a tezos payment
    fastify.post('/tezos/verify-payment', { schema: tezosPaymentVerify }, tezosPaymentVerifyHandler)
    // Endpoint when a user wants to gift a course
    fastify.post('/gift-course', { schema: giftCourseSchema }, giftCourseHandler)
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
  return this.payments.stripeWebhook(req, reply)
}

async function stripePaymentIntentHandler (req, reply) {
  return this.payments.stripePaymentIntent(req, reply)
}

async function stripePaymentVerifyHandler (req, reply) {
  return this.payments.stripePaymentIntentConfirm(req, reply)
}

async function tezosPaymentIntentHandler (req, reply) {
  return this.payments.tezosPaymentIntent(req, reply)
}

async function tezosPaymentVerifyHandler (req, reply) {
  return this.payments.tezosPaymentIntentConfirm(req, reply)
}

async function giftCourseHandler (req, reply) {
  return this.payments.giftCourse(req, reply)
}
