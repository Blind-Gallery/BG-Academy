'use strict'
const log = require('pino')()

const {
  loginSchema,
  signUpSchema,
  refreshSchema,
  logoutSchema,
  recoverPasswordSchema,
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

  reply.setCookie('refresh_token', refreshToken, {
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
  } = await this.login.signUp(req.body)

  reply.setCookie('refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: this.login.refreshTokenTTLSeconds()
  })

  return { token, refreshToken, user }
}

async function refreshHandler (req, reply) {
  log.info('======================= Refreshing token')
  log.info(`refresh_token: ${JSON.stringify(req.cookies, null, 4)}`)
  const {
    refreshToken
  } = req.cookies
  return this.login.refresh({ refreshToken })
}

async function logoutHandler (req, reply) {
  reply.setCookie('refresh_token', null, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 0
  })
  return this.login.logOut()
}

async function userHandler (req, reply) {
  const token = req.headers.authorization.split(' ')[1]
  return this.login.user(token)
}

async function recoverPasswordHandler (req, reply) {
  return this.login.recoverPassword(req.body)
}
