'use strict'

const {
  stripeSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/stripe', { schema: stripeSchema, config: { rawBody: true } }, stripeVerificationHandler)
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
