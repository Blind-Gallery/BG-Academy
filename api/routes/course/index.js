'use strict'
const { logger } = require('../../service')

const {
  updateFeedbackSchema
} = require('./schemas')

module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/feedback', { schema: updateFeedbackSchema }, updateFeedbackHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'course'
    ]
  }
}

async function updateFeedbackHandler (req, reply) {
  const { feedback, rating, route } = req.body
  await this.course.updateFeedback(feedback, rating, route)
  return { message: 'Feedback updated' }
}
