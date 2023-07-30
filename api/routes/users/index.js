'use strict'

const {
  createUserSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/', { schema: createUserSchema }, createUserHandler)
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
  console.log('user', user)

  return { user }
}
