const { Unauthorized, BadRequest } = require('http-errors')
const { request, gql } = require('graphql-request')

const GET_COURSE_BY_ID = gql`
query ($id: Int!) {
  courses_by_pk(id: $id) {
    id
    price
  }
}
`
class Payments {
  constructor ({ gql, email, opts, jwt, stripe, tezos, academySC, coinGecko }) {
    this.gql = gql
    this.email = email
    this.opts = opts
    this.jwt = jwt
    this.stripe = stripe
    this.tezos = tezos
    this.academySC = academySC
    this.coinGecko = coinGecko
  }

  async getCoursePrice (courseId) {
    const { courses_by_pk: course } = await this.gql.request(
      GET_COURSE_BY_ID,
      { id: courseId }
    )

    return course.price
  }

  async getTezosPrice (usdAmount) {
    const { tezos } = await this.coinGecko.getCoinPrice({
      ids: ['tezos'],
      currency: 'usd'
    })
    const conversion = usdAmount / tezos.usd
    return conversion
  }

  async createStripePaymentIntent ({ amount, currency, paymentMethodTypes, receiptEmail }) {
    let paymentIntent = null
    try {
      paymentIntent = await this.stripe.paymentIntent(amount, currency, paymentMethodTypes, receiptEmail)
    } catch (err) {
      console.error(err)
    }
    return paymentIntent
  }

  async verifyStripeWebhook (signature, body) {
    let event = null
    try {
      event = await this.stripe.verify(signature, body)
    } catch (err) {
      console.error(err)
      throw new BadRequest(`Webhook Error: ${err.message}`)
    }
    return event
  }

  async createTezosPaymentIntent ({ courseId, user }) {
    const coursePrice = await this.getCoursePrice(courseId)
    const tezosPrice = await this.getTezosPrice(coursePrice)
    console.info(coursePrice, tezosPrice)

    await this.academySC.addCourseToUser({
      courseId,
      user
    })

    return { tezos: tezosPrice }
  }
}

module.exports = Payments
