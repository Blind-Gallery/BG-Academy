const tags = ['documents']

const getCertificateSchema = {
  tags,
  response: {
    200: {
      type: 'arraybuffer',
      required: ['user']
    }
  }
}

module.exports = {
  getCertificateSchema
}
