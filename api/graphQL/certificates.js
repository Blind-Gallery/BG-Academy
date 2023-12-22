const { gql } = require('graphql-request')

const GET_USER_COURSE_INFO = gql`
query ($userId: String = "", $courseId: Int = 10) {
  user_course(where: {user_id: {_eq: $userId}, course_id: {_eq: $courseId}}) {
    certificate_cid
    certificate_image_cid
    user_info {
      name
      tezos_info {
        wallet
      }
    }
  }
}
`

const UPDATE_USER_COURSE_CERTIFICATE = gql`
mutation (
  $courseId: Int!,
  $userId: String!,
  $certificateCID: String!,
  $certificateImageCID: String!
) {
  update_user_course_by_pk(
    pk_columns: {course_id: $courseId, user_id: $userId},
    _set: {certificate_cid: $certificateCID, certificate_image_cid: $certificateImageCID}
    ) {
    certificate_cid
    certificate_image_cid
  }
}
`

module.exports = {
  GET_USER_COURSE_INFO,
  UPDATE_USER_COURSE_CERTIFICATE
}
