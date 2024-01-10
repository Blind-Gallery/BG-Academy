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

const CREATE_STRIPE_PAYMENT_INTENT = gql`
mutation (
  $courseId: Int!,
  $userId: String!,
  $paymentIntent: String!,
  $paymentIntentClientSecret: String!,
  $amount: numeric!) {
  insert_payments_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      transaction_info: {
        data: {
          transactions_stripe_transaction_info: {
            data: {
              payment_intent: $paymentIntent,
              payment_intent_client_secret: $paymentIntentClientSecret,
              amount: $amount
            }},
      type: stripe }}}) {
        id
        transaction_id
    }
}
`

const CREATE_TEZOS_PAYMENT_INTENT = gql`
mutation (
  $courseId: Int!,
  $userId: String!,
  $operationHash: String!,
  $amount: numeric!
  ) {
  insert_tezos_transaction_info_one(
    object: {
      course_id: $courseId,
      user_id: $userId,
      operation_hash: $operationHash,
      amount: $amount}
      ) {
    id
  }
}`

module.exports = {
  GET_COURSE_BY_ID,
  GET_PAYMENT_INTENT_INFO,
  CREATE_STRIPE_PAYMENT_INTENT,
  CREATE_TEZOS_PAYMENT_INTENT
}
