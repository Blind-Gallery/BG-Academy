const { Unauthorized, BadRequest } = require('http-errors')
const { request, gql } = require('graphql-request')
const { TZIPFactory } = require('../service')

class Documents {
  constructor ({ gql, email, opts, jwt, docs, sbtSC }) {
    this.gql = gql
    this.email = email
    this.jwt = jwt
    this.opts = opts
    this.docs = docs
    this.sbtSC = sbtSC
  }

  async generateCertificate ({ name, courseTitle, teacher, token }) {
    let cid = ''
    try {
      cid = await this.docs.generateCertificate({ name, courseTitle, teacher })
    } catch (err) {
      console.error(err)
    }
  }

  async mintSoulBoundCertificate ({ cid, to, amount, student, teacher, courseTitle }) {

  }
}

module.exports = Documents
