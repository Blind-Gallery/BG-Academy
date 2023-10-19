'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fp = require('fastify-plugin')
// const rawBody = require('raw-body')

const {
  Login,
  User,
  Documents
} = require('./model')

const {
  GQL,
  JWT,
  Email,
  Documents: Docs,
  Payments
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

  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  const payments = new Payments()
  const login = new Login({
    gql,
    jwt,
    email,
    opts
  })
  const user = new User({
    gql,
    jwt,
    email,
    opts
  })
  const documents = new Documents({
    gql,
    jwt,
    email,
    opts,
    docs: new Docs()
  })
  fastify.decorate('login', login)
  fastify.decorate('user', user)
  fastify.decorate('jwt', jwt)
  fastify.decorate('documents', documents)
  fastify.decorate('payments', payments)
}

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {
  port: 3000,
  host: '0.0.0.0'
}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(fp(decorateFastifyInstance))
  fastify.register(require('@fastify/cookie'), {
    hook: 'onRequest',
    parseOptions: {}
  })
  await fastify.register(import('fastify-raw-body'), {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
    routes: [] // array of routes, **`global`** will be ignored, wildcard routes not supported
  })

  // fastify.addContentTypeParser('*', (req, done) => {
  //   rawBody(req, {
  //     length: req.headers['content-length'],
  //     limit: '1mb',
  //     encoding: 'utf8' // Remove if you want a buffer
  //   }, (err, body) => {
  //     if (err) return done(err)
  //     done(null, parse(body))
  //   })
  // })

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
