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
      type: 'object'
    }
  }
}

const stripePaymentIntent = {
  tags,
  body: {
    amount: { type: 'number' },
    currency: { type: 'string' },
    paymentMethodTypes: { type: 'array' },
    receiptEmail: { type: 'string' },
    courseId: { type: 'string' },
    userId: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['paymentIntent'],
      properties: {
        paymentIntent: {
          type: 'object',
          required: ['client_secret', 'id'],
          properties: {
            client_secret: { type: 'string' },
            id: { type: 'string' }
          }
        },
        taxAmount: { type: 'number' }
      }
    }
  }
}

const tezosPaymentIntent = {
  tags,
  body: {
    courseId: { type: 'string' },
    userId: { type: 'string' },
    wallet: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['tezos'],
      properties: {
        tezos: { type: 'number' },
        onchainId: { type: 'number' }
      }
    }
  }
}

const tezosPaymentVerify = {
  tags,
  body: {
    userId: { type: 'string' },
    opHash: { type: 'string' },
    courseId: { type: 'string' },
    onchainId: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        courseId: { type: 'string' }
      }
    }
  }
}

const stripePaymentVerify = {
  tags,
  body: {
    userId: { type: 'string' },
    paymentIntent: { type: 'string' },
    paymentIntentClientSecret: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        courseId: { type: 'string' }
      }
    }
  }
}

const giftCourseSchema = {
  tags,
  body: {
    courseId: { type: 'string' },
    email: { type: 'string' }
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
  tezosPaymentVerify,
  stripePaymentVerify,
  giftCourseSchema
}
