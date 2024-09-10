'use strict'
const {
  loginSchema,
  signUpSchema,
  refreshSchema,
  logoutSchema,
  recoverPasswordSchema,
  validateRecoverPasswordCodeSchema,
  userSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/login', { schema: loginSchema }, loginHandler)
    fastify.post('/signup', { schema: signUpSchema }, signUpHandler)
    fastify.post('/refresh', { schema: refreshSchema }, refreshHandler)
    fastify.post('/logout', { schema: logoutSchema }, logoutHandler)
    fastify.get('/user', { schema: userSchema }, userHandler)
    fastify.post('/recover-password', { schema: recoverPasswordSchema }, recoverPasswordHandler)
    fastify.post('/validate-recover-password-code', { schema: validateRecoverPasswordCodeSchema }, validateRecoverPasswordCodeHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'authController'
    ]
  }
}

async function loginHandler (req, reply) {
  return this.authController.login(req, reply)
}

async function signUpHandler (req, reply) {
  return this.authController.signup(req, reply)
}

async function refreshHandler (req, reply) {
  return this.authController.refresh(req, reply)
}

async function logoutHandler (req, reply) {
  return this.authController.logout(req, reply)
}

async function userHandler (req, reply) {
  return this.authController.user(req, reply)
}

async function recoverPasswordHandler (req, reply) {
  return this.authController.recoverPassword(req.body)
}

async function validateRecoverPasswordCodeHandler (req, reply) {
  return this.authController.validateRecoverPasswordCode(req.body)
}
