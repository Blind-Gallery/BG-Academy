const { Unauthorized, BadRequest } = require('http-errors')
const { request, gql } = require('graphql-request')

class Documents {
  constructor ({ gql, email, opts, jwt, docs }) {
    this.gql = gql
    this.email = email
    this.opts = opts
    this.docs = docs
  }

  async generateCertificate ({ name, courseTitle, teacher, token }) {
    let cid = ''
    try {
      cid = await this.docs.generateCertificate({ name, courseTitle, teacher })
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Documents
