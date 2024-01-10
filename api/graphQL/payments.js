const { gql } = require('graphql-request')

const GET_COURSE_BY_ID = gql`
query ($id: Int!) {
  courses_by_pk(id: $id) {
    id
    price
  }
}
`

const GET_PAYMENT_INTENT_INFO = gql`
query ($userId: String!, $courseId: Int!) {
  payments(where: {user_id: {_eq: $userId}, course_id: {_eq: $courseId}}) {
    transaction_info {
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

const CREATE_PAYMENT_INTENT = gql`
mutation ($courseId: Int!, $userId: String!) {
  insert_payments_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      transaction_info: {data: {transactions_stripe_transaction_info: {data: {}}, transactions_tezos_transaction_info: {data: {}}}}}, on_conflict: {constraint: payments_pkey, update_columns: updated_at}) {
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

const CREATE_STRIPE_PAYMENT_INTENT = gql`
mutation (
  $courseId: Int!,
  $userId: String!,
  $paymentIntent: String!,
  $paymentIntentClientSecret: String!,
  $amount: numeric!,
  $transactionId: String!
  ) {
  insert_payments_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      transaction_type: stripe,
      transaction_info: {
        data: {transactions_stripe_transaction_info: {
          data: {
            payment_intent: $paymentIntent,
            payment_intent_client_secret: $paymentIntentClientSecret,
            amount: $amount}
          },
          id: $transactionId
        },
        on_conflict: {
          constraint: transactions_pkey,
          update_columns: stripe_transaction_id
        }}},
        on_conflict: {constraint: payments_pkey, update_columns: updated_at}) {
    transaction_id
    transaction_info {
      stripe_transaction_id
      tezos_transaction_id
    }
  }
}
`

const CREATE_TEZOS_PAYMENT_INTENT = gql`
mutation (
  $courseId: Int!,
  $userId: String!,
  $wallet: String!,
  $amount: numeric!,
  $transactionId: String!
  ) {
  insert_payments_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      transaction_type: tezos,
      transaction_info: {
        data: {transactions_tezos_transaction_info: {
          data: {
            wallet: $wallet,
            amount: $amount}
          },
          id: $transactionId
        },
        on_conflict: {
          constraint: transactions_pkey,
          update_columns: tezos_transaction_id
        }}},
        on_conflict: {constraint: payments_pkey, update_columns: updated_at}) {
    transaction_id
    transaction_info {
      stripe_transaction_id
      tezos_transaction_id
    }
  }
}
`
const ADD_USER_TO_COURSE = gql`
mutation ($courseId: Int!, $userId: String!) {
  insert_user_course_one(
    object: {course_id: $courseId, user_id: $userId, progress: 0}) {
    user_id
    course_id
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

module.exports = {
  GET_COURSE_BY_ID,
  GET_PAYMENT_INTENT_INFO,
  CREATE_PAYMENT_INTENT,
  CREATE_STRIPE_PAYMENT_INTENT,
  CREATE_TEZOS_PAYMENT_INTENT,
  ADD_USER_TO_COURSE,
  GET_PAYMENT_INTENT_INFO_FROM_STRIPE_INTENT
}
