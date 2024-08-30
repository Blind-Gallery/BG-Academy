const tags = ['course']

const updateFeedbackSchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      feedback: { type: 'string' },
      rating: { type: 'number' },
      route: { type: 'string' },
      userId: { type: 'string' }
    },
    required: ['feedback', 'rating', 'route', 'userId']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
}

module.exports = {
  updateFeedbackSchema
}
