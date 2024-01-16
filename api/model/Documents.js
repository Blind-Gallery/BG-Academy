const { BadRequest } = require('http-errors')
const { TZIPFactory } = require('../service')
const {
  GET_USER_COURSE_INFO,
  UPDATE_USER_COURSE_CERTIFICATE,
  UPDATE_USER_COURSE_SOULBOUND_CERTIFICATE
} = require('../graphQL')

class Documents {
  constructor ({ gql, email, opts, jwt, docs, sbtSC }) {
    this.gql = gql
    this.email = email
    this.jwt = jwt
    this.opts = opts
    this.docs = docs
    this.sbtSC = sbtSC
  }

  async getCertificate ({ courseId, userId }) {
    try {
      const { user_course: userCourse } = await this.gql.request(GET_USER_COURSE_INFO, { courseId, userId })
      return userCourse
    } catch (err) {
      console.error(err)
      throw new BadRequest('Error getting certificate')
    }
  }

  async updateCertificate ({ courseId, userId, certificateCID, certificateImageCID }) {
    try {
      const { update_user_course_by_pk: userCourse } = await this.gql.request(UPDATE_USER_COURSE_CERTIFICATE, { courseId, userId, certificateCID, certificateImageCID })
      return userCourse
    } catch (err) {
      console.error(err)
      throw new BadRequest('Error updating certificate')
    }
  }

  async updateSoulBoundCertificate ({ courseId, userId, soulBoundTokenId }) {
    const userCourse = await this.getCertificate({ courseId, userId })
    if (!userCourse) throw new BadRequest('No certificate found')
    if (!userCourse.certificate_cid || !userCourse.certificate_image_cid) throw new BadRequest('Certificate not generated')

    try {
      const { update_user_course_by_pk: userCourse } = await this.gql.request(UPDATE_USER_COURSE_SOULBOUND_CERTIFICATE, { courseId, userId, soulBoundTokenId })
      return userCourse
    } catch (err) {
      console.error(err)
      throw new BadRequest('Error updating certificate')
    }
  }

  async generateCertificate ({ courseId, userId }) {
    let cid = ''
    const userCourse = await this.getCertificate({ courseId, userId })
    try {
      const student = userCourse[0].user_info?.name || userCourse[0].user_info?.tezos_info?.wallet
      const { pdfCID, imageCID } = await this.docs.generateCertificate({
        student,
        courseTitle: userCourse[0].course.name
      })
      await this.updateCertificate({
        courseId,
        userId,
        certificateCID: `ipfs://${pdfCID}`,
        certificateImageCID: `ipfs://${imageCID}`
      })

      cid = pdfCID
    } catch (err) {
      console.error(err)
    }

    return { cid }
  }

  async mintSoulBoundCertificate ({ userId, courseId, intent = 0 }) {
    const userCourses = await this.getCertificate({ courseId, userId })
    const userCourse = userCourses[0]
    if (!userCourse) throw new BadRequest('No certificate found')
    if (!userCourse.certificate_cid || !userCourse.certificate_image_cid) {
      if (intent > 3) throw new BadRequest('Certificate not generated')
      await this.generateCertificate({ courseId, userId })
      return this.mintSoulBoundCertificate({ userId, courseId, intent: intent + 1 })
    }
    try {
      const metadata = {
        name: `${userCourse.course.name} - Certificate of Completion`,
        description: `Certificate of Completion for ${userCourse.user_info.name} in ${userCourse.course.name}. This certificate is soul bound to ${userCourse.user_info.name} and cannot be transferred.`,
        artifact: { uri: userCourse.certificate_cid },
        thumbnail: { uri: userCourse.certificate_image_cid },
        display: { uri: userCourse.certificate_image_cid }
      }
      const metadataCID = await TZIPFactory.createWithDefaults(metadata).getMetadataCID()
      if (!metadataCID) throw new BadRequest('Error creating metadata')
      const calls = []
      calls.push(this.sbtSC.createBadge(userCourse.user_info.tezos_info.wallet, metadataCID, 1))
      const { status, opHash } = await this.sbtSC.mint(calls)
      return { status, opHash }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Documents
