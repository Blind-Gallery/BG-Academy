const { Unauthorized, BadRequest } = require('http-errors')
const bcrypt = require('bcrypt')
const { verifySignature } = require('@taquito/utils')
const { request, gql } = require('graphql-request')

const getUserFromAliasQuery = gql`
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

const GET_USER_BY_EMAIL = `
query ($email: String = "") {
  users(where: {email_info: {email: {_eq: $email}}}) {
    id
    lastname
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

const GET_USER_BY_WALLET = `
query ($wallet: String = "") {
  users(where: {tezos_info: {wallet: {_eq: $wallet}}}) {
    id
    lastname
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

const CREATE_USER = `
mutation ($user: users_insert_input!) {
  insert_users_one(object: $user) {
    id
  }
}
`

class User {
  constructor ({ gql, email, opts }) {
    this.gql = gql
    this.opts = opts
    this.email = email
  }

  /**
 * Retrieves a user's profile given their alias from the Teztok API.
 *
 * @async
 * @function
 * @param {string} alias - The user's public key.
 * @returns {Promise<object>} A Promise that resolves with the user's profile object.
 * @throws {Error} Throws an error if the Teztok API request fails.
 */
  async getUserFromAccount (wallet) {
    const teztokResponse = await request('https://api.teztok.com/v1/graphql', getUserFromAliasQuery, {
      where: {
        account: {
          _eq: wallet
        }
      }
    })

    return teztokResponse.tzprofiles[0]
  };

  async getUserByEmail (email) {
    const { users } = await this.gql.request(
      GET_USER_BY_EMAIL, { email })
    return users.find(user => user.email_info.email === email)
  }

  async getUserByWallet (wallet) {
    const { users } = await this.gql.request(
      GET_USER_BY_WALLET, { wallet })
    return users.find(user => user.tezos_info.wallet === wallet)
  }

  async create ({ name, email, password, wallet, publicKey, signedMessage, payload }) {
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
      console.info('Creating user with email and password')
      return this.createWithPassword({ name, email, password })
    }

    if (wallet && signedMessage) {
      console.info('Creating user with wallet and signed message')
      return this.createWithWallet({ wallet, publicKey, signedMessage, payload })
    }

    throw new BadRequest('Invalid parameters')
  }

  async createWithPassword ({ name, email, password }) {
    const verificationCode = `${Math.floor(Math.random() * 1000000)}`
    const data = {
      user: {
        name,
        email_info: {
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

    await this.email.sendWelcomeEmail({ to: email })
    // Todo: send email with verification code
    return { user }
  }

  async createWithWallet ({ wallet, publicKey, signedMessage, payload }) {
    const isVerified = verifySignature(
      payload,
      publicKey,
      signedMessage
    )
    if (!isVerified) {
      throw new Unauthorized('Invalid signature')
    }

    // get user data from blockchain
    const userFromBlockchain = await this.getUserFromAccount(wallet)

    const data = {
      user: {
        name: userFromBlockchain.alias || wallet,
        pfp: userFromBlockchain.logo,
        tezos_info: {
          data: {
            wallet,
            publicKey,
            signedMessage
          }
        }
      }
    }

    const { insert_users_one: user } = await this.gql.request(
      CREATE_USER, data)

    console.info('User created', user)

    // Todo: retrieve user data from blockchain and save it

    return { user }
  }
}

module.exports = User
