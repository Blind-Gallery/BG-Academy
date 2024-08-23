const { Unauthorized, BadRequest } = require('http-errors')
const log = require('pino')()

const bcrypt = require('bcrypt')
const { verifySignature } = require('@taquito/utils')
const { TZKT_ENDPOINT } = require('../constants/tezos')
const {
  GET_USER_FROM_ID,
  GET_TEZOS_FROM_WALLET,
  GET_USER_BY_EMAIL,
  GET_USER_BY_WALLET,
  CREATE_USER,
  UPDATE_USER,
  REGISTER_WALLET,
  UPDATE_USER_PASSWORD
} = require('../graphQL')

class User {
  constructor ({ gql, email, opts }) {
    this.gql = gql
    this.opts = opts
    this.email = email
  }

  /**
 * Retrieves a user's profile given their alias from the TZKT API.
 *
 * @async
 * @function
 * @param {string} alias - The user's public key.
 * @returns {Promise<object>} A Promise that resolves with the user's profile object.
 * @throws {Error} Throws an error if the TZKT API request fails.
 */
  async getUserFromAccount (wallet) {
    let metadata = {
      account: null,
      alias: null
    }
    const axios = require('axios').default

    const options = {
      method: 'GET',
      url: `${TZKT_ENDPOINT}/v1/accounts/${wallet}`,
      headers: { Accept: '*/*', 'User-Agent': 'Thunder Client (https://www.thunderclient.com)' }
    }

    const response = await axios.request(options)
    if (response.data.metadata) {
      metadata = response.data.metadata
    }

    metadata.account = wallet
    return metadata
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
      log.info('Creating user with email and password')
      return this.createWithPassword({ name, email, password })
    }

    if (wallet && signedMessage) {
      log.info('Creating user with wallet and signed message')
      return this.createWithWallet({ name, wallet, publicKey, signedMessage, payload })
    }

    throw new BadRequest('Invalid parameters')
  }

  async createWithPassword ({ name, email, password }) {
    const verificationCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)
    const data = {
      user: {
        name,
        email_info: {
          data: {
            email,
            password: await bcrypt.hash(password, 10),
            verification_code: verificationCode
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

  async createWithWallet ({ name, wallet, publicKey, signedMessage, payload }) {
    const isVerified = verifySignature(
      payload,
      publicKey,
      signedMessage
    )
    if (!isVerified) {
      throw new Unauthorized('Invalid signature')
    }

    // get user data from blockchain
    const userBlockchainMetadata = await this.getUserFromAccount(wallet)

    const data = {
      user: {
        name,
        pfp: userBlockchainMetadata.logo,
        tezos_info: {
          data: {
            wallet,
            publicKey,
            signedMessage
          }
        }
      }
    }

    if (userBlockchainMetadata.email) {
      data.user.email_info = {
        data: {
          email: userBlockchainMetadata.email
        }
      }
    }

    const { insert_users_one: user } = await this.gql.request(
      CREATE_USER, data)

    log.info(`User created ${JSON.stringify(user)}`)

    // Todo: retrieve user data from blockchain and save it

    return { user }
  }

  async update ({ userId, name, pfp }) {
    const data = {}

    if (name) {
      data.name = name
    }
    if (pfp) {
      data.pfp = pfp
    }
    await this.gql.request(
      UPDATE_USER, { data, userId })

    return { userId }
  }

  async registerWallet (
    {
      userId,
      wallet,
      publicKey,
      signedMessage,
      payload
    }) {
    const { users_by_pk: user } = await this.gql.request(
      GET_USER_FROM_ID, { userId })

    if (!user) {
      throw new BadRequest('User not found')
    }

    if (user.tezos_info) {
      throw new BadRequest('Wallet already registered')
    }

    const { tezos: tezosInfo } = this.gql.request(
      GET_TEZOS_FROM_WALLET, { wallet })

    // merge user
    if (tezosInfo) {
      throw new BadRequest('Wallet already registered')
    }

    const isVerified = verifySignature(
      payload,
      publicKey,
      signedMessage
    )
    if (!isVerified) {
      throw new Unauthorized('Invalid signature')
    }

    const { insert_tezos_one: tezos } = this.gql.request(
      REGISTER_WALLET, {
        userId,
        wallet,
        publicKey,
        signedMessage
      })

    return tezos
  }

  async changePassword ({ userId, password, newPassword }) {
    // get user information, if user not found, throw error
    const { users_by_pk: user } = await this.gql.request(
      GET_USER_FROM_ID, { userId })

    if (!user) {
      throw new BadRequest('User not found')
    }

    await this.gql.request(
      UPDATE_USER_PASSWORD, {
        password: await bcrypt.hash(newPassword, 10),
        userId
      })

    return { userId, success: true }
  }

  async resetPassword ({ userId, password, newPassword }) {
    const { users_by_pk: user } = await this.gql.request(
      GET_USER_FROM_ID, { userId })

    if (!user) {
      throw new BadRequest('User not found')
    }

    await this.gql.request(
      UPDATE_USER_PASSWORD, {
        password: await bcrypt.hash(newPassword, 10),
        userId
      })

    return { userId, success: true }
  }
}

module.exports = User
