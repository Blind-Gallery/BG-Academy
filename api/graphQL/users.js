const { gql } = require('graphql-request')

const GET_USER_FROM_ID = gql`
query ($userId: String!) {
  users_by_pk(id: $userId) {
    id
    tezos_info {
      wallet
    }
    email_info {
      email
    }
  }
}
`

const GET_TEZOS_FROM_WALLET = gql`
query ($wallet: String!) {
  tezos(where: {wallet: {_eq: $wallet}}) {
    wallet
  }
}
`

const GET_USER_FROM_ALIAS = gql`
  query Tzprofiles($where: tzprofiles_bool_exp) {
    tzprofiles(where: $where) {
      account
      alias
      contract
      description
      discord
      domain_name
      ethereum
      github
      logo
      twitter
      website
    }
  }
`

const GET_USER_BY_EMAIL = gql`
query ($email: String = "") {
  users(where: {email_info: {email: {_eq: $email}}}) {
    id
    name
    pfp
    email_info {
      email
      password
      verification_code
      change_password_request_code
    }
    tezos_info {
      signedMessage
      wallet
    }
  }
}
`

const GET_USER_BY_WALLET = gql`
query ($wallet: String = "") {
  users(where: {tezos_info: {wallet: {_eq: $wallet}}}) {
    id
    name
    pfp
    email_info {
      email
      password
      verification_code
    }
    tezos_info {
      signedMessage
      wallet
    }
  }
}
`

const CREATE_USER = gql`
mutation ($user: users_insert_input!) {
  insert_users_one(object: $user) {
    id
  }
}
`

const UPDATE_USER = gql`
mutation ($data: users_set_input!, $userId: String!) {
  update_users_by_pk(
    _set: $data,
    pk_columns: {id: $userId}
    ) {
    id
  }
}
`

const REGISTER_WALLET = gql`
mutation (
  $publicKey: String!,
  $signedMessage: String!,
  $wallet: String!,
  $userId: String!) {
  insert_tezos_one(
    object: {
      publicKey: $publicKey,
      signedMessage: $signedMessage,
      wallet: $wallet,
      id: $userId}
      ) {
    wallet
    id
  }
}
`

const UPDATE_USER_PASSWORD = gql`
mutation (
  $userId: String!,
  $password: String!
  ) {
  update_emails(
    where: {
      user_info: {id: {_eq: $userId}}},
      _set: {password: $password}) {
    affected_rows
  }
}
`

const UPDATE_CHANGE_PASSWORD_REQUEST_CODE = gql`
mutation (
  $email: String = "",
  $code: String = ""
) {
  update_emails(
    where: {
      email: {_eq: $email}
    },
    _set: {
      change_password_request_code: $code
    }
  ) {
    affected_rows
  }
}
`

module.exports = {
  GET_USER_FROM_ID,
  GET_TEZOS_FROM_WALLET,
  GET_USER_FROM_ALIAS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_WALLET,
  CREATE_USER,
  UPDATE_USER,
  REGISTER_WALLET,
  UPDATE_USER_PASSWORD,
  UPDATE_CHANGE_PASSWORD_REQUEST_CODE
}
