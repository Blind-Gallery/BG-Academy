const { BadRequest } = require('http-errors')
const { logger } = require('../service')

const {
  GET_COURSE_BY_ID,
  GET_COURSE_ID_FROM_CHAPTER_ID,
  GET_COURSE_ID_FROM_MODULE_ID,
  UPDATE_FEEDBACK
} = require('../graphQL')

const routeTypeHandlers = {
  challenge: async (id) => id,
  test: async (id, gql) => {
    const { modules_by_pk: modules } = await gql.request(GET_COURSE_ID_FROM_MODULE_ID, { id })
    return modules.course_id
  },
  chapter: async (id, gql) => {
    const { chapters_by_pk: chapters } = await gql.request(GET_COURSE_ID_FROM_CHAPTER_ID, { id })
    return chapters.module.course_id
  }
}
class Course {
  constructor ({ gql }) {
    this.gql = gql
  }

  async getCourseById (id) {
    const { courses_by_pk: course } = await this.gql.request(GET_COURSE_BY_ID, { id })
    return course
  }

  async getCourseIdFromRoute (route) {
    const [, courseNavigator, routeType, id] = route.split('/')
    if (courseNavigator !== 'courseNavigator' || !routeType || !id) {
      throw new BadRequest('Invalid route')
    }
    const handler = routeTypeHandlers[routeType]
    if (!handler) {
      throw new BadRequest('Invalid route type')
    }
    return handler(id, this.gql)
  }

  async callUpdateFeedback (feedback, rating, route, courseId, userId) {
    return this.gql.request(UPDATE_FEEDBACK, {
      feedback, rating, route, courseId, userId
    })
  }

  async updateFeedback (feedback, rating, route, userId) {
    logger.info(`Updating feedback for course ${route}`)
    const courseId = await this.getCourseIdFromRoute(route)
    logger.debug(`Feedback: ${feedback} ${rating} Route: ${route}/5 User: ${userId}`)
    await this.callUpdateFeedback(feedback, rating, route, courseId, userId)
  }
}

module.exports = Course
