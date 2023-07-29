'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fp = require('fastify-plugin')

const {
  Login,
} = require('./model')

const {
  GQL,
  JWT
} = require('./service')

const {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SECRET
} = process.env

const gqlConfig = {
  endpoint: GRAPHQL_ENDPOINT,
  secret: GRAPHQL_SECRET
}

async function decorateFastifyInstance (fastify) {
  const gql = new GQL(gqlConfig)
  const jwt = new JWT({})
  const opts = {
    tokenExpirationTimeMins: 60,
    refreshTokenExpirationTimeMins: 1440
  }
  jwt.init()

  const login = new Login({
    gql,
    jwt,
    opts
  })
  fastify.decorate('login', login)
  fastify.decorate('jwt', jwt)
}

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(fp(decorateFastifyInstance))
  fastify.register(require('@fastify/cookie'), {
      hook: 'onRequest',
      parseOptions: {}
    })

  fastify.register(require('@fastify/cors'), {
      origin: true,
      credentials: true,
      allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
    })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
