'use strict'

const {
  loginSchema,
  signUpSchema,
  refreshSchema,
  logoutSchema
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

async function signUpHandler (req, reply) {
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

async function logoutHandler (req, reply) {
  reply.setCookie('refreshToken', null, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 0
  })
  return this.login.logOut()
}
