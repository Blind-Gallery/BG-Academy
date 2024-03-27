const tags = ['documents']

const getCertificateSchema = {
  tags,
  body: {
    courseId: { type: 'number' },
    userId: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        certificate: { type: 'string' },
        cid: { type: 'string' }
      }
    }
  }
}

const mintCertificateSchema = {
  tags,
  body: {
    courseId: { type: 'number' },
    userId: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        opHash: { type: 'string' }
      }
    }
  }
}

const uploadFileSchema = {
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        cid: { type: 'string', maxLength: 255 },
        message: { type: 'string', maxLength: 255 }
      }
    }
  }
}

module.exports = {
  getCertificateSchema,
  mintCertificateSchema,
  uploadFileSchema
}
