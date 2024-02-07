const { uuidTypeSchema } = require('../../schemas')

const tags = ['user']

const createUserSchema = {
  tags,
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      wallet: { type: 'string' },
      signedMessage: { type: 'string' },
      payload: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      required: ['user'],
      properties: {
        token: { type: 'string' },
        refreshToken: { type: 'string' },
        user: {
          type: 'object',
          required: ['id'],
          properties: {
            id: uuidTypeSchema,
            email: { type: 'string' },
            name: { type: 'string' },
            wallet: { type: 'string' }
          }
        }
      }
    }
  }
}

module.exports = {
  createUserSchema
}
