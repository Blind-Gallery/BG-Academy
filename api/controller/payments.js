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
      customer_id: customerId,
      country
    } = await this.userModel.getUserById(req.body.userId)

    let taxAmountExclusive = 0
    if (customerId) {
      try {
        const {
          sku,
          price,
          discount_price: discountPrice
        } = await this.courseModel.getCourseById(req.body.courseId)
        const taxCalculation = []
        if (country !== req.body.country) {
          taxCalculation.push(false)
          taxCalculation.push(req.body.country)
        } else {
          taxCalculation.push(customerId)
        }
        const { id: taxId, amount, taxAmountExclusive: taxAmount } = await this.paymentsModel.stripe.calculateTax(
          discountPrice || price,
          'usd',
          `course-${sku}`,
          ...taxCalculation
        )

        taxAmountExclusive = taxAmount
        req.body.taxId = taxId
        req.body.amount = amount
      } catch (err) {
        req.log.error(`Failed to calculate tax: ${err.message}`)
      }
    }
    req.log.info(`Creating stripe payment intent for ${req.body.amount} USD - tax: ${taxAmountExclusive}`)
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
