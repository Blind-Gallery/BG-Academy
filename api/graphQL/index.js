const certificateQueries = require('./certificates')
const userQueries = require('./users')
const paymentQueries = require('./payments')

module.exports = {
  ...certificateQueries,
  ...userQueries,
  ...paymentQueries
}
