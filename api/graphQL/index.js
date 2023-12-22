const certificateQueries = require('./certificates')
const userQueries = require('./users')

module.exports = {
  ...certificateQueries,
  ...userQueries
}
