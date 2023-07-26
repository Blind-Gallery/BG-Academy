'use strict'

const {
  loginSchema,
  refreshSchema
} = require('./schemas')

/**
 * Provides the endpoints for user authentication
 */
module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    fastify.post('/login', { schema: loginSchema }, loginHandler)
    fastify.post('/refresh', { schema: refreshSchema }, refreshHandler)
  })
}

module.exports[Symbol.for('plugin-meta')] = {
  decorators: {
    fastify: [
      'login'
    ]
  }
}

async function loginHandler (req, reply) {
  const {
    token,
    refreshToken,
    user
  } = await this.login.login(req.body)

  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: this.login.refreshTokenTTLSeconds()
  })

  return { token, refreshToken, user }
}

async function refreshHandler (req, reply) {
  console.log('refreshToken: ', JSON.stringify(req.cookies, null, 4))
  const {
    refreshToken
  } = req.cookies
  return this.login.refresh({ refreshToken })
}
