const tags = ['documents']

const getCertificateSchema = {
  tags,
  body: {
    courseId: { type: 'number' }
  },
  response: {
    200: {
      type: 'object',
      required: ['certificate'],
      properties: {
        certificate: { type: 'string' }
      }
    }
  }
}

const mintCertificateSchema = {
  tags,
  body: {
    courseId: { type: 'number' },
    to: { type: 'string' },
    student: { type: 'string' },
    teacher: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      required: ['certificate'],
      properties: {
        certificate: { type: 'string' }
      }
    }
  }
}

module.exports = {
  getCertificateSchema,
  mintCertificateSchema
}
