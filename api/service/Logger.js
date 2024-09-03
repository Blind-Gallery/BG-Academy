const pino = require('pino')
const pretty = require('pino-pretty')
const level = process.env.LOG_LEVEL || 'info'
const stream = pretty({
  colorize: true
})
const logger = pino({ level }, stream)

module.exports = logger
