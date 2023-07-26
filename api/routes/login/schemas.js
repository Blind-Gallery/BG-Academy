const { uuidTypeSchema } = require('../../schemas')

const tags = ['login']

const loginSchema = {
  tags,
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      required: ['token', 'refreshToken', 'user'],
      properties: {
        token: { type: 'string' },
        refreshToken: { type: 'string' },
        user: {
          type: 'object',
          required: ['userId', 'email', 'name'],
          properties: {
            userId: uuidTypeSchema,
            email: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    }
  }
}

const refreshSchema = {
  tags,
  response: {
    200: {
      type: 'object',
      required: ['token'],
      properties: {
        token: { type: 'string' }
      }
    }
  }
}

module.exports = {
  loginSchema,
  refreshSchema
}
