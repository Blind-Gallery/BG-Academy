const { gql } = require('graphql-request')

const UPDATE_FEEDBACK = gql`
mutation (
  $feedback: String!,
  $courseId: Int!,
  $userId: String!
  ) {
  update_user_course(
    _set: {feedback: $feedback},
    where: {
      course_id: {_eq: $courseId},
      user_id: {_eq: $userId}
    }
    ) {
    affected_rows
  }
}
`

module.exports = {
  UPDATE_FEEDBACK
}
