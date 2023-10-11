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

module.exports = {
  getCertificateSchema
}
