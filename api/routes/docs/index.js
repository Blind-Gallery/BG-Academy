'use strict'

const {
  getCertificateSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/certificate', { schema: getCertificateSchema }, getDocumentHandler)
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
  const token = req.headers.authorization.split(' ')[1]
  req.body.token = token
  const {
    cid
  } = await this.documents.generateCertificate(req.body)

  return { cid }
}
