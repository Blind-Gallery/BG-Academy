const tags = ['emails']

const sendEmailSchema = {
  tags,
  body: {
    to: { type: 'string' },
    subject: { type: 'string' },
    text: { type: 'string' },
    html: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      }
    }
  }
}

const becomeAnInstructorSchema = {
  tags,
  body: {
    name: { type: 'string' },
    email: { type: 'string' },
    description: { type: 'string' }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' }
      }
    }
  }
}
module.exports = {
  sendEmailSchema,
  becomeAnInstructorSchema
}
