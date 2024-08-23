'use strict'

const {
  createUserSchema,
  updateUserSchema,
  registerWalletSchema,
  changePasswordSchema,
  resetPasswordSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/', { schema: createUserSchema }, createUserHandler)
    fastify.post('/update', { schema: updateUserSchema }, updateUserHandler)
    fastify.post('/register-wallet', { schema: registerWalletSchema }, registerWalletHandler)
    fastify.post('/change-password', { schema: changePasswordSchema }, changePasswordHandler)
    fastify.post('/reset-password', { schema: resetPasswordSchema }, resetPasswordHandler)
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

async function registerWalletHandler (req, reply) {
  await this.user.registerWallet(req.body)
  return { success: true }
}

async function changePasswordHandler (req, reply) {
  await this.user.changePassword(req.body)
  return { success: true }
}

async function resetPasswordHandler (req, reply) {
  await this.user.resetPassword(req.body)
  return { success: true }
}
