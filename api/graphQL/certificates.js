const { gql } = require('graphql-request')

const GET_USER_COURSE_INFO = gql`
query ($userId: String!, $courseId: String!) {
  user_course(where: {user_id: {_eq: $userId}, course_id: {_eq: $courseId}}) {
    certificate_cid
    certificate_image_cid
    course {
      name
      teacher {
        name
      }
      modules {
        questions_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    user_info {
      name
      tezos_info {
        wallet
      }
      user_questions(
        where: {
          question: {
            module: {
              course_id: {
                _eq: $courseId
              }
            }
          }
        }
      ) {
        answer {
          is_correct
        }
      }
    }
  }
}
`

const UPDATE_USER_COURSE_CERTIFICATE = gql`
mutation (
  $courseId: String!,
  $userId: String!,
  $certificateCID: String!,
  $certificateImageCID: String!
) {
  update_user_course_by_pk(
    pk_columns: {course_id: $courseId, user_id: $userId},
    _set: {
      certificate_cid: $certificateCID,
      certificate_image_cid: $certificateImageCID
    }
    ) {
    certificate_cid
    certificate_image_cid
  }
}
`

const UPDATE_USER_COURSE_SOUL_BOUND_CERTIFICATE = gql`
mutation (
  $courseId: String!,
  $userId: String!,
  $soulBoundTokenId: Int!,
  $opHash: String!
) {
  update_user_course_by_pk(
    pk_columns: {course_id: $courseId, user_id: $userId},
    _set: {
      soul_bound_token_id: $soulBoundTokenId,
      certificate_mint_op: $opHash
    }
    ) {
    certificate_cid
    certificate_image_cid
    soul_bound_token_id
  }
}
`

module.exports = {
  GET_USER_COURSE_INFO,
  UPDATE_USER_COURSE_CERTIFICATE,
  UPDATE_USER_COURSE_SOUL_BOUND_CERTIFICATE
}
