const { BadRequest } = require('http-errors')
const { logger } = require('../service')

const { TZIPFactory } = require('../service')
const { TZKT_ENDPOINT } = require('../constants/tezos')
const {
  GET_USER_COURSE_INFO,
  UPDATE_USER_COURSE_CERTIFICATE,
  UPDATE_USER_COURSE_SOUL_BOUND_CERTIFICATE
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

  async uploadFile ({ buffer, fileType, fileName }) {
    const cid = await this.docs.uploadToIPFS(buffer, fileName)
    return { cid }
  }

  async getCertificate ({ courseId, userId }) {
    try {
      const { user_course: userCourse } = await this.gql.request(GET_USER_COURSE_INFO, { courseId, userId })
      return userCourse
    } catch (err) {
      logger.error(err)
      throw new BadRequest('Error getting certificate')
    }
  }

  async updateCertificate ({ courseId, userId, certificateCID, certificateImageCID }) {
    try {
      const { update_user_course_by_pk: userCourse } = await this.gql.request(UPDATE_USER_COURSE_CERTIFICATE, { courseId, userId, certificateCID, certificateImageCID })
      return userCourse
    } catch (err) {
      logger.error(err)
      throw new BadRequest('Error updating certificate')
    }
  }

  async getContractStorageFromOperationHash (opHash, intent = 0) {
    if (intent > 5) {
      logger.error(`Error while getting information about ${opHash}`)
      return null
    }

    const axios = require('axios').default
    const options = {
      method: 'GET',
      url: `${TZKT_ENDPOINT}/v1/operations/${opHash}`,
      headers: { Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)' }
    }

    try {
      const { data } = await axios.request(options)
      logger.debug(`Response for ${opHash} on attempt ${intent}: ${JSON.stringify(data)}`)
      if (data && data[0] && data[0].storage) {
        return data[0].storage // Return storage data immediately on success
      } else {
        logger.error(`Unexpected response structure for ${opHash} on attempt ${intent}`)
      }
    } catch (e) {
      logger.error(`Error(${intent}) while getting information about ${opHash}: ${e.message}`)
    }

    return await this.getContractStorageFromOperationHash(opHash, intent + 1)
  }

  async getSoulBoundTokenIdFromOpHash (opHash) {
    const storage = await this.getContractStorageFromOperationHash(opHash)
    return storage.last_token_id - 1
  }

  async updateSoulBoundCertificate ({ courseId, userId, soulBoundTokenId, opHash }) {
    const userCourse = await this.getCertificate({ courseId, userId })
    const { certificate_cid: certificateCID, certificate_image_cid: certificateImageCID } = userCourse[0]
    if (!userCourse) throw new BadRequest('No certificate found')
    if (!certificateCID || !certificateImageCID) throw new BadRequest('Certificate not generated')
    if (!soulBoundTokenId) {
      if (!opHash) throw new BadRequest('No opHash provided')
      soulBoundTokenId = await this.getSoulBoundTokenIdFromOpHash(opHash)
    }
    try {
      const { update_user_course_by_pk: userCourse } = await this.gql.request(
        UPDATE_USER_COURSE_SOUL_BOUND_CERTIFICATE,
        { courseId, userId, soulBoundTokenId, opHash })
      return { userCourse, soulBoundTokenId }
    } catch (err) {
      logger.error(err)
      throw new BadRequest('Error updating certificate')
    }
  }

  async assertUserIsAllowedToGenerateCertificate ({ courseId, userId }) {
    logger.info(`Checking if user ${userId} is allowed to generate certificate for course ${courseId}`)
    const { user_course: userCourse } = await this.gql.request(GET_USER_COURSE_INFO, { courseId, userId })

    if (!userCourse[0]) throw new BadRequest('User not enrolled in course')

    const userQuestions = userCourse[0].user_info.user_questions
    if (!userQuestions.length) throw new BadRequest('User has not completed any questions')

    const courseQuestions = userCourse[0].course.modules
    const totalQuestions = courseQuestions.reduce((acc, module) => acc + module.questions_aggregate.aggregate.count, 0)
    logger.debug(`Total questions in course: ${totalQuestions}`)

    const correctQuestions = userQuestions.filter(q => q.answer.is_correct).length
    const percentage = (correctQuestions / totalQuestions) * 100
    logger.info(`User has completed ${percentage}% of questions, correct: ${correctQuestions}, total: ${totalQuestions}`)
    if (percentage < 70) throw new BadRequest('User has not completed enough questions')

    logger.info('User is allowed to generate certificate')
  }

  async generateCertificate ({ courseId, userId }) {
    await this.assertUserIsAllowedToGenerateCertificate({ courseId, userId })
    let cid = ''
    // Check if certificate already exists
    const userCourse = await this.getCertificate({ courseId, userId })
    if (userCourse[0].certificate_cid && userCourse[0].certificate_image_cid) {
      return { cid: userCourse[0].certificate_cid.replace('ipfs://', '') }
    }
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
      logger.error(err)
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
      const tokenCall = this.sbtSC.createBadge(userCourse.user_info.tezos_info.wallet, metadataCID, 1)
      calls.push(tokenCall)
      const { status, opHash } = await this.sbtSC.mint(calls)
      const { soulBoundTokenId } = await this.updateSoulBoundCertificate({ courseId, userId, opHash })
      logger.info(`Minted soul bound certificate for user ${userId} in course ${courseId} - tokenId: ${soulBoundTokenId}`)
      return { status, opHash, soulBoundTokenId }
    } catch (err) {
      logger.error(err)
      throw new BadRequest('Error minting certificate')
    }
  }
}

module.exports = Documents
