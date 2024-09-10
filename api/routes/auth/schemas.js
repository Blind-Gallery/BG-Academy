const { uuidTypeSchema } = require('../../schemas')

const tags = ['login']

const loginSchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      wallet: { type: 'string' },
      signedMessage: { type: 'string' },
      payload: { type: 'string' },
      ipAddress: { type: 'string' }
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

const signUpSchema = {
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
      publicKey: { type: 'string' }
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

const recoverPasswordSchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      required: ['success'],
      properties: {
        success: { type: 'boolean' },
        userId: { type: 'string' }
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

const logoutSchema = {
  tags,
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

const validateRecoverPasswordCodeSchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      code: { type: 'string' }
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

module.exports = {
  recoverPasswordSchema,
  loginSchema,
  signUpSchema,
  refreshSchema,
  logoutSchema,
  validateRecoverPasswordCodeSchema
}
