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

const MARK_CHAPTER_AS_COMPLETE = gql`
mutation (
  $userId: String!,
  $chapterId: uuid!
  ) {
  update_user_chapter(
    _set: {completed: true},
    where: {
      user_id: {_eq: $userId},
      chapter_id: {_eq: $chapterId}
    }
    ) {
    affected_rows
    }
}
`

module.exports = {
  UPDATE_FEEDBACK,
  MARK_CHAPTER_AS_COMPLETE
}
