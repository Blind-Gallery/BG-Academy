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
  const { feedback, rating, route, userId } = req.body
  await this.course.updateFeedback(feedback, rating, route, userId)
  return { message: 'Feedback updated' }
}
