'use strict'

const fastifyPlugin = require('fastify-plugin')
const { Unauthorized } = require('http-errors')

const hasuraDomain = 'https://hasura.io/jwt/claims'

async function authenticate (req) {
  const logger = req.log
  if (req.headers && req.headers.authorization) {
    const authComponents = req.headers.authorization.split(' ')
    if (authComponents.length === 2 && authComponents[0].toLowerCase() === 'bearer') {
      const token = authComponents[1]
      if (token !== '') {
        try {
          logger.info(`Received access token from request header: ${token}`)
          const verifiedToken = this.jwt.verifyToken(token)
          logger.info(`Verified token: ${JSON.stringify(verifiedToken, null, 4)}`)
          const hasuraClaims = verifiedToken[hasuraDomain]

          req.user = {
            userId: hasuraClaims['x-hasura-user-id']
          }
          return
        } catch (err) {
          const msg = `Authentication failed, error: ${err}`
          logger.info(`Authentication failed, error: ${err}`)
          throw new Unauthorized(msg)
        }
      }
    }
  }
  throw new Unauthorized('JWT token not found')
}

function verifyJWT (instance, options, done) {
  try {
    instance.decorate('authenticate', authenticate)
    done()
  } catch (e) {
    done(e)
  }
}

module.exports = fastifyPlugin(verifyJWT, { name: 'verify-jwt', fastify: '4.x' })
