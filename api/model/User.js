const { Unauthorized, BadRequest } = require('http-errors')
const bcrypt = require('bcrypt')
const { verifySignature } = require('@taquito/utils')

const GET_USER_BY_EMAIL = `
query ($email: String = "") {
  users(where: {email: {email: {_eq: $email}}}) {
    id
    lastname
    name
    pfp
    email {
      email
      password
      verificationCode
    }
    tezo {
      signedMessage
      wallet
    }
  }
}
`

const GET_USER_BY_WALLET = `
query ($wallet: String = "") {
  users(where: {tezo: {wallet: {_eq: $wallet}}}) {
    id
    lastname
    name
    pfp
    email {
      email
      password
      verificationCode
    }
    tezo {
      signedMessage
      wallet
    }
  }
}
`

const CREATE_USER = `
mutation ($user: users_insert_input!) {
  insert_users_one(object: $user) {
    id
  }
}
`

class User {
  constructor ({ gql, opts }) {
    this.gql = gql
    this.opts = opts
  }

  async getUserByEmail (email) {
    const { users } = await this.gql.request(
      GET_USER_BY_EMAIL, { email })
    return users.find(user => user.email.email === email)
  }

  async getUserByWallet (wallet) {
    const { users } = await this.gql.request(
      GET_USER_BY_WALLET, { wallet })
    return users.find(user => user.tezo.wallet === wallet)
  }

  async create ({ name, email, password, wallet, signedMessage }) {
    // Check if user already exists
    const user = await this.getUserByEmail(email)
    if (user) {
      throw new BadRequest('User already exists')
    }

    // Check if wallet already exists
    const userByWallet = await this.getUserByWallet(wallet)
    if (userByWallet) {
      throw new BadRequest('Wallet already exists')
    }

    // Create user
    if (email && password) {
      console.log('Creating user with email and password')
      return this.createWithPassword({ name, email, password })
    }

    if (wallet && signedMessage) {
      console.log('Creating user with wallet and signed message')
      return this.createWithWallet({ wallet, signedMessage })
    }

    throw new BadRequest('Invalid parameters')
  }

  async createWithPassword ({ name, email, password }) {
    const verificationCode = `${Math.floor(Math.random() * 1000000)}`
    const data = {
      user: {
        name,
        email: {
          data: {
            email,
            password: await bcrypt.hash(password, 10),
            verificationCode
          }
        }
      }
    }

    const { insert_users_one: user } = await this.gql.request(
      CREATE_USER, data)

    console.log('User created', user)
    // Todo: send email with verification code
    return { user }
  }

  async createWithWallet ({ wallet, signedMessage, payload }) {
    const isVerified = verifySignature(
      payload,
      wallet,
      signedMessage
    )
    if (!isVerified) {
      throw new Unauthorized('Invalid signature')
    }

    const data = {
      user: {
        tezo: {
          data: {
            wallet,
            signedMessage
          }
        }
      }
    }

    const { insert_users_one: user } = await this.gql.request(
      CREATE_USER, data)

    console.log('User created', user)

    // Todo: retrieve user data from blockchain and save it

    return { user }
  }
}

module.exports = User
