const { BadRequest } = require('http-errors')
const { logger } = require('../service')

const {
  GET_COURSE_ID_FROM_CHAPTER_ID,
  GET_COURSE_ID_FROM_MODULE_ID,
  UPDATE_FEEDBACK
} = require('../graphQL')

class Course {
  constructor ({ gql }) {
    this.gql = gql
  }

  async updateFeedback (feedback, rating, route, userId) {
    logger.info(`Updating feedback for course ${route}`)
    // update feedback
    const courseId = await this.getCourseIdFromRoute(route)
    const feedbackText = `${feedback} - ${rating}/5 (feedback from ${route})`
    logger.debug(`Feedback: ${feedbackText}`)
    await this.gql.request(UPDATE_FEEDBACK, {
      feedback: feedbackText,
      courseId,
      userId
    })
  }

  async getCourseIdFromRoute (route) {
    const routeParts = route.split('/')
    if (routeParts.length !== 4) {
      throw new BadRequest('Invalid route')
    }
    if (routeParts[1] !== 'courseNavigator') {
      throw new BadRequest('Invalid route')
    }
    const routeType = routeParts[2]
    switch (routeType) {
      case 'challenge':
        return routeParts[3]
      case 'test':
        // eslint-disable-next-line no-case-declarations
        const { modules_by_pk: modules } = await this.gql.request(
          GET_COURSE_ID_FROM_MODULE_ID, { id: routeParts[3] })
        return modules.course_id
      case 'chapter':
        // eslint-disable-next-line no-case-declarations
        const { chapters_by_pk: chapters } = await this.gql.request(
          GET_COURSE_ID_FROM_CHAPTER_ID, { id: routeParts[3] })
        return chapters.module.course_id
      default:
        throw new BadRequest('Invalid route')
    }
  }
}

module.exports = Course
