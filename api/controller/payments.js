class PaymentController {
  constructor ({ paymentsModel, userModel }) {
    this.paymentsModel = paymentsModel
    this.userModel = userModel
  }

  async stripeWebhook (req, res) {
    const sig = req.headers['stripe-signature']
    const response = await this.payments.verifyStripeWebhook(sig, req.rawBody)
    req.log.info(`stripe verify response:  ${JSON.stringify(response)}`)

    return response
  }

  async stripePaymentIntent (req, res) {
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
