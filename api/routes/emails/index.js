'use strict'

const {
  sendEmailSchema,
  becomeAnInstructorSchema,
  sendContactEmailSchema
} = require('./schemas')

/**
 * Provides the endpoints for sending emails
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/', { schema: sendEmailSchema }, sendEmailHandler)
    fastify.post('/become-an-instructor', { schema: becomeAnInstructorSchema }, becomeAnInstructorHandler)
    fastify.post('/contact', { schema: sendContactEmailSchema }, sendContactEmailHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'emails'
    ]
  }
}

async function sendEmailHandler (req, reply) {
  await this.emails.sendEmail(req.body)

  return { status: 'sent' }
}

async function becomeAnInstructorHandler (req, reply) {
  const response = await this.emails.sendBecomeAnInstructorEmail(req.body)

  return response
}

async function sendContactEmailHandler (req, reply) {
  const response = await this.emails.sendContactEmail(req.body)

  return response
}
