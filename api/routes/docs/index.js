'use strict'

const {
  getCertificateSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.get('/', { schema: getCertificateSchema }, getDocumentHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'documents'
    ]
  }
}

async function getDocumentHandler (req, reply) {
  const {
    user
  } = await this.user.create(req.body)

  return { user }
}
