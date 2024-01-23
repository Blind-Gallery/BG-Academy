// General use
const uuidTypeSchema = { type: 'string', minLength: 36, maxLength: 36 }

const response204 = {
  204: {
    type: 'null',
    description: 'Empty response on success'
  }
}

const securityDataSchema = {
  type: 'string',
  minLength: 3,
  maxLength: 200,
  nullable: true
}

module.exports = {
  uuidTypeSchema,
  response204,
  securityDataSchema
}
