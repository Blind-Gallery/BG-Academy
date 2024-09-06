'use strict'

// Read the .env file.
require('dotenv').config()

// Require the framework
const Fastify = require('fastify')

// Instantiate Fastify with some config
const LOGGER_ENV = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  },
  production: true,
  test: false
}
const app = Fastify({
  logger: LOGGER_ENV[process.env.NODE_ENV] || LOGGER_ENV.development,
  pluginTimeout: 10000
})

// Register your application as a normal plugin.
app.register(require('./app.js'))

// Start listening.
app.listen({
  port: process.env.PORT || 3000,
  host: process.env.HOST || '::'
}, (err) => {
  if (err) {
    app.logger.error(err)
    process.exit(1)
  }
})
