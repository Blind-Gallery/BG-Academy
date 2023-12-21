'use strict'

const {
  getCertificateSchema,
  mintCertificateSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/certificate', { schema: getCertificateSchema }, getDocumentHandler)
    fastify.post('/mint', { schema: mintCertificateSchema }, mintDocumentHandler)
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

async function mintDocumentHandler (req, reply) {
  // const token = req.headers.authorization.split(' ')[1]
  // req.body.token = token
  await this.documents.mintSoulBoundCertificate(req.body)

  return { certificate: 'minted' }
}
