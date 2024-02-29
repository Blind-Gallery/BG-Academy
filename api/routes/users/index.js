'use strict'

const {
  createUserSchema,
  updateUserSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/', { schema: createUserSchema }, createUserHandler)
    fastify.post('/update', { schema: updateUserSchema }, updateUserHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'user'
    ]
  }
}

async function createUserHandler (req, reply) {
  const {
    user
  } = await this.user.create(req.body)
  return { user }
}

async function updateUserHandler (req, reply) {
  const {
    userId
  } = await this.user.update(req.body)
  return { userId }
}
