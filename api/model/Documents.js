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

  async mintSoulBoundCertificate ({ to, student, teacher, courseTitle, courseId }) {
    try {
      const { pdfCID, imageCID } = await this.docs.generateCertificate({ student, courseTitle: 'Title', teacher })
      const metadata = {
        name: `${courseTitle} - Certificate of Completion`,
        description: `Certificate of Completion for ${student} in ${courseTitle}. This certificate is soul bound to ${student} and cannot be transferred.`,
        artifact: { uri: `ipfs://${pdfCID}` },
        thumbnail: { uri: `ipfs://${imageCID}` },
        display: { uri: `ipfs://${imageCID}` }
      }

      console.log(metadata)
      const metadataCID = await TZIPFactory.createWithDefaults(metadata).getMetadataCID()
      console.log(metadataCID)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Documents
