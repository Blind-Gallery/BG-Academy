'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fp = require('fastify-plugin')
const { TezosConstants } = require('./constants')

// const rawBody = require('raw-body')

const {
  LoginModel,
  UserModel,
  DocumentsModel,
  PaymentsModel,
  EmailsModel,
  CourseModel
} = require('./model')

const {
  GQL,
  JWT,
  Email,
  Documents: Docs,
  Stripe,
  Tezos,
  CoinGecko,
  AcademySmartContract,
  SbtSmartContract
} = require('./service')

const {
  AuthController,
  PaymentController
} = require('./controller')

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
  const stripe = new Stripe()
  const coinGecko = new CoinGecko()
  const academySC = new AcademySmartContract({ contract: TezosConstants.CONTRACT_ADDRESSES.academy })
  const sbtSC = new SbtSmartContract({ contract: TezosConstants.CONTRACT_ADDRESSES.sbt })

  const loginModel = new LoginModel({
    gql,
    jwt,
    email,
    stripe,
    opts
  })
  const userModel = new UserModel({
    gql,
    jwt,
    email,
    opts
  })
  const documentsModel = new DocumentsModel({
    gql,
    jwt,
    email,
    opts,
    docs: new Docs(),
    sbtSC
  })
  const paymentsModel = new PaymentsModel({
    gql,
    email,
    opts,
    jwt,
    stripe,
    coinGecko,
    tezos: Tezos,
    academySC
  })
  const emailsModel = new EmailsModel({
    email
  })
  const courseModel = new CourseModel({
    gql,
    jwt
  })

  const authController = new AuthController({
    loginModel,
    stripe
  })
  const paymentController = new PaymentController({
    paymentsModel,
    userModel
  })

  fastify.decorate('authController', authController)
  fastify.decorate('user', userModel)
  fastify.decorate('jwt', jwt)
  fastify.decorate('documents', documentsModel)
  fastify.decorate('payments', paymentController)
  fastify.decorate('emails', emailsModel)
  fastify.decorate('course', courseModel)
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
    origin: '*',
    credentials: true,
    allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
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
