'use strict'
const multipart = require('@fastify/multipart')

const {
  getCertificateSchema,
  mintCertificateSchema,
  uploadFileSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.register(multipart, { limits: { fileSize: 1048576 * 124 } })
    fastify.post('/certificate', { schema: getCertificateSchema }, getDocumentHandler)
    fastify.post('/mint', { schema: mintCertificateSchema }, mintDocumentHandler)
    fastify.post('/upload', { schema: uploadFileSchema }, uploadFileHandler)
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

async function uploadFileHandler (req, reply) {
  const file = await req.file()
  try {
    const buffer = await file.toBuffer()
    return await this.documents.uploadFile({
      buffer,
      fileType: file.mimetype,
      fileName: file.filename
    })
  } catch (err) {
    console.error(err)
    return { message: 'fileSize limit reached' }
  }
}
