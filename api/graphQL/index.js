const certificateQueries = require('./certificates')
const userQueries = require('./users')
const paymentQueries = require('./payments')
const coursesQueries = require('./courses')

module.exports = {
  ...certificateQueries,
  ...userQueries,
  ...paymentQueries,
  ...coursesQueries
}
