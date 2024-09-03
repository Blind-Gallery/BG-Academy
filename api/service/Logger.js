const pino = require('pino')
const level = process.env.LOG_LEVEL || 'info'
const logger = pino({
  level,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

module.exports = logger
