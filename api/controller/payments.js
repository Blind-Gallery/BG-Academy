class PaymentController {
  constructor ({ paymentsModel, userModel, courseModel }) {
    this.paymentsModel = paymentsModel
    this.userModel = userModel
    this.courseModel = courseModel
  }

  async stripeWebhook (req, res) {
    const sig = req.headers['stripe-signature']
    const response = await this.paymentsModel.verifyStripeWebhook(sig, req.rawBody)
    req.log.debug(`stripe verify response:  ${JSON.stringify(response)}`)

    return response
  }

  async stripePaymentIntent (req, res) {
    const {
      customer_id: customerId,
      country
    } = await this.userModel.getUserById(req.body.userId)

    const {
      sku,
      price,
      discount_price: discountPrice
    } = await this.courseModel.getCourseById(req.body.courseId)

    let cost = discountPrice || price
    cost *= 100

    const { taxId, amount, taxAmountExclusive } = await this.paymentsModel.createStripeTaxCalculation({
      customerId,
      country: req.body.country,
      sku,
      cost,
      userCountry: country
    })

    req.body.taxId = taxId
    req.body.amount = amount // amount with tax included

    req.log.debug(`Creating stripe payment intent for ${req.body.amount} USD - tax: ${taxAmountExclusive}`)
    const paymentIntent = await this.paymentsModel.createStripePaymentIntent(req.body)
    return { paymentIntent, taxAmount: taxAmountExclusive }
  }

  async stripePaymentIntentConfirm (req, res) {
    return this.paymentsModel.verifyStripePayment(req.body)
  }

  async tezosPaymentIntent (req, res) {
    return this.paymentsModel.createTezosPaymentIntent(req.body)
  }

  async tezosPaymentIntentConfirm (req, res) {
    return this.paymentsModel.verifyTezosPayment(req.body)
  }

  async giftCourse (req, res) {
    return this.paymentsModel.giftCourse(req.body)
  }
}

module.exports = PaymentController
