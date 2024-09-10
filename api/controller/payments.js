class PaymentController {
  constructor ({ paymentsModel, userModel, courseModel }) {
    this.paymentsModel = paymentsModel
    this.userModel = userModel
    this.courseModel = courseModel
  }

  async stripeWebhook (req, res) {
    const sig = req.headers['stripe-signature']
    const response = await this.paymentsModel.verifyStripeWebhook(sig, req.rawBody)
    req.log.info(`stripe verify response:  ${JSON.stringify(response)}`)

    return response
  }

  async stripePaymentIntent (req, res) {
    const {
      customer_id: customerId
    } = await this.userModel.getUserById(req.body.userId)

    const {
      sku,
      price,
      discount_price: discountPrice
    } = await this.courseModel.getCourseById(req.body.courseId)
    const taxId = await this.paymentsModel.stripe.calculateTax(
      discountPrice || price,
      'usd',
      `course-${sku}`,
      customerId
    )
    req.body.taxId = taxId
    const paymentIntent = await this.paymentsModel.createStripePaymentIntent(req.body)
    return { paymentIntent }
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
