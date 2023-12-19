const tags = ['payments']

const stripeSchema = {
  tags,
  Headers: {
    type: 'object',
    required: ['stripe-signature'],
    properties: {
      'stripe-signature': { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' }
      }
    }
  }
}

const stripePaymentIntent = {
  tags,
  body: {
    amount: { type: 'number' },
    currency: { type: 'string' },
    paymentMethodTypes: { type: 'array' },
    receiptEmail: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['paymentIntent'],
      properties: {
        paymentIntent: {
          type: 'object',
          required: ['client_secret'],
          properties: {
            client_secret: { type: 'string' }
          }
        }
      }
    }
  }
}

const tezosPaymentIntent = {
  tags,
  body: {
    courseId: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      required: ['tezos'],
      properties: {
        tezos: { type: 'number' }
      }
    }
  }
}

const tezosPaymentVerify = {
  tags,
  body: {
    transaction: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' }
      }
    }
  }
}

module.exports = {
  stripeSchema,
  stripePaymentIntent,
  tezosPaymentIntent,
  tezosPaymentVerify
}
