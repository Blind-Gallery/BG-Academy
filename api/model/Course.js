const { BadRequest } = require('http-errors')

const { logger } = require('../service')

class Course {
  updateFeedback (feedback, rating, route, userId) {
    logger.info(`Updating feedback for course ${route}`)
    // update feedback
    const courseId = this.getCourseIdFromRoute(route)
  }

  getCourseIdFromRoute (route) {
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
        return routeParts[3]
      case 'chapter':
        return routeParts[3]
      default:
        throw new BadRequest('Invalid route')
    }
  }
}

module.exports = Course
