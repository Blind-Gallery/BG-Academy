const { gql } = require('graphql-request')

const GET_COURSE_BY_ID = gql`
query ($id: String!) {
  courses_by_pk(id: $id) {
    onchain_id
    id
    price
    discount_price
    thumbnail
    name
    modules(order_by: {created_at: asc}, limit: 1) {
      chapters(order_by: {created_at: asc}, limit: 1) {
        id
      }
    }
  }
}
`

const CREATE_PAYMENT_INTENT = gql`
mutation ($courseId: String!, $userId: String!) {
  insert_payments_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      transaction_info: {
        data: {
          transactions_stripe_transaction_info: {
            data: {}
          },
          transactions_tezos_transaction_info: {
            data: {}
          }
        }
      }
    },
    on_conflict: { constraint: payments_pkey, update_columns: updated_at
  }) {
    user_id
    course_id
    transaction_info {
      id
      stripe_transaction_id
      tezos_transaction_id
    }
  }
}
`

const GET_PAYMENT_INTENT_INFO = gql`
query ($courseId: String!, $userId: String!) {
  payments_by_pk(course_id: $courseId, user_id: $userId) {
    course_id
    user_id
    transaction_info {
      stripe_transaction_id
      tezos_transaction_id
      transactions_stripe_transaction_info {
        payment_intent
        payment_intent_client_secret
        id
      }
      transactions_tezos_transaction_info {
        operation_hash
        wallet
        id
      }
    }
  }
}
`

const CREATE_STRIPE_PAYMENT_INTENT = gql`
mutation (
  $stripeTransactionId: String!,
  $amount: numeric!,
  $paymentIntent: String!,
  $paymentIntentClientSecret: String!
) {
  update_stripe_transaction_info_by_pk(
    pk_columns: {
      id: $stripeTransactionId
    },
    _set: {
      amount: $amount,
      payment_intent: $paymentIntent,
      payment_intent_client_secret: $paymentIntentClientSecret
    }
  ) {
    transaction_info {
      id
      stripe_transaction_id
      tezos_transaction_id
    }
  }
}

`

const CREATE_TEZOS_PAYMENT_INTENT = gql`
mutation (
  $tezosTransactionId: String!,
  $amount: numeric!,
  $wallet: String!,
  $operationHash: String = ""
) {
  update_tezos_transaction_info_by_pk(
    pk_columns: {
      id: $tezosTransactionId
    },
    _set: {
      amount: $amount,
      wallet: $wallet,
      operation_hash: $operationHash
    }
  ) {
    transaction_info {
      id
      stripe_transaction_id
      tezos_transaction_id
    }
  }
}

`
const ADD_USER_TO_COURSE = gql`
mutation ($courseId: String!, $userId: String!) {
  insert_user_course_one(
    object: {course_id: $courseId, user_id: $userId, progress: 0}) {
    user_id
    course_id
  }
}
`

const GET_USER_COURSE = gql`
query ($courseId: String!, $userId: String!) {
  user_course_by_pk(course_id: $courseId, user_id: $userId) {
    user_id
    course_id
    last_chapter_id_seen
  }
}
`
const GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT = gql`
query ($paymentIntent: String!) {
  stripe_transaction_info(where: {payment_intent: {_eq: $paymentIntent}}) {
    transaction_info {
      id
      payment_info {
        course_id
        user_id
      }
    }
  }
}
`

const UPDATE_PAYMENT_INFO = gql`
mutation (
  $courseId: String!,
  $userId: String!,
  $transactionType: transaction_types_enum!
) {
  update_payments_by_pk(
    pk_columns: {
      user_id: $userId,
      course_id: $courseId
    },
    _set: {
      transaction_type: $transactionType
    }
  ) {
    user_id
    course_id
  }
}
`
module.exports = {
  GET_COURSE_BY_ID,
  GET_PAYMENT_INTENT_INFO,
  CREATE_PAYMENT_INTENT,
  CREATE_STRIPE_PAYMENT_INTENT,
  CREATE_TEZOS_PAYMENT_INTENT,
  ADD_USER_TO_COURSE,
  GET_USER_COURSE,
  GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT,
  UPDATE_PAYMENT_INFO
}
