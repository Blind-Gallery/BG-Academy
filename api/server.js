'use strict'

// Read the .env file.
require('envkey')

// Require the framework
const Fastify = require('fastify')

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
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
    app.log.error(err)
    process.exit(1)
  }
})
