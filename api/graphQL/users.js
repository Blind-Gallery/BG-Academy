const { gql } = require('graphql-request')

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
      verificationCode
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
      verificationCode
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

module.exports = {
  GET_USER_FROM_ALIAS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_WALLET,
  CREATE_USER
}
