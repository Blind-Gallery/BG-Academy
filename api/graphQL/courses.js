const { gql } = require('graphql-request')

const GET_COURSE_BY_ID = gql`
query ($id: String!) {
  courses_by_pk(id: $id) {
    id
    sku
    name
    price
    discount_price
    onchain_id
    teacher {
      name
    }
  }
}
`
const GET_COURSE_ID_FROM_CHAPTER_ID = gql`
query (
  $id: uuid!
) {
  chapters_by_pk(id: $id) {
    module {
      course_id
    }
  }
}
`

const GET_COURSE_ID_FROM_MODULE_ID = gql`
query (
  $id: uuid!
) {
  modules_by_pk(id: $id) {
    course_id
  }
}
`
const UPDATE_FEEDBACK = gql`
mutation (
  $feedback: String!,
  $courseId: String!,
  $userId: String!
  $rating: Int!
  $route: String!
  ) {
  update_user_course(
    _set: {
      feedback: $feedback,
      feedback_rating: $rating,
      feedback_route: $route
    },
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
  GET_COURSE_BY_ID,
  GET_COURSE_ID_FROM_CHAPTER_ID,
  GET_COURSE_ID_FROM_MODULE_ID,
  UPDATE_FEEDBACK,
  MARK_CHAPTER_AS_COMPLETE
}
