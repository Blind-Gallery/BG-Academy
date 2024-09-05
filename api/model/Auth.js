const { Unauthorized, BadRequest } = require('http-errors')
const { logger } = require('../service')

const { Role } = require('../constants')
const bcrypt = require('bcrypt')
const { verifySignature } = require('@taquito/utils')
const {
  GET_USER_BY_EMAIL,
  GET_USER_BY_WALLET,
  UPDATE_CHANGE_PASSWORD_REQUEST_CODE,
  REGISTER_CUSTOMER_ID
} = require('../graphQL')

class Login {
  constructor ({ gql, jwt, email, opts, stripe }) {
    this.gql = gql
    this.opts = opts
    this.email = email
    this.jwt = jwt
    this.stripe = stripe
  }

  async stripeRegister (user, ip) {
    const { customerId } = await this.stripe.registerCustomer({ customerId: user.customer_id, user, ip })
    if (!user.customer_id) {
      try {
        await this.gql.request(
          REGISTER_CUSTOMER_ID, { id: user.id, customerId })
      } catch (e) {
        logger.error(`Error registering customer: ${e.message}`)
      }
    }
  }

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

  async signUp ({ name, email, password, wallet, signedMessage }) {
    // users are been created on ./User.js
  }

  async user (token) {
    let user
    const { loginMechanism, loginPayload } = this.jwt.verifyToken(token)
    if (loginMechanism === 'email') {
      user = await this.getUserByEmail(loginPayload)
    }
    if (loginMechanism === 'wallet') {
      user = await this.getUserByWallet(loginPayload)
    }
    return { user }
  }

  async login ({ email, password, wallet, publicKey, signedMessage, payload, ipAddress }) {
    logger.debug(`Login: ${email} ${wallet} ${ipAddress}`)
    if (!email && !wallet) {
      throw new BadRequest('No email or wallet provided')
    }

    if (email) {
      return this.emailLogin({ email, password, ipAddress })
    }
    if (wallet) {
      return this.walletLogin({ wallet, signedMessage, publicKey, payload, ipAddress })
    }
  }

  async emailLogin ({ email, password, ipAddress }) {
    if (!email) {
      throw new BadRequest('No email provided')
    }

    try {
      const user = await this.getUserByEmail(email)
      if (!await bcrypt.compare(password, user.email_info.password)) {
        throw new Unauthorized('Wrong password')
      }
      this.stripeRegister(user, ipAddress)
      return {
        refreshToken: await this._getJWTRefreshToken({ id: user.id, user, email }),
        token: await this._getJWTToken(
          {
            id: user.id,
            role: Role.USER,
            loginMechanism: 'email',
            loginPayload: email
          }
        ),
        user
      }
    } catch (e) {
      logger.error(e.message)
      throw new Unauthorized('Wrong email')
    }
  }

  async walletLogin ({ wallet, publicKey, signedMessage, payload, ipAddress }) {
    if (!wallet) {
      throw new BadRequest('No wallet provided')
    }

    try {
      // compare signedMessage with taquito
      const isVerified = verifySignature(
        payload,
        publicKey,
        signedMessage
      )
      if (!isVerified) {
        throw new Unauthorized('Wrong wallet')
      }
      const { users } = await this.gql.request(
        GET_USER_BY_WALLET, { wallet })
      const user = users.find(user => user.tezos_info.wallet === wallet)
      if (!user) {
        throw new Unauthorized('Wallet not found')
      }
      this.stripeRegister(user, ipAddress)
      return {
        refreshToken: await this._getJWTRefreshToken({ id: user.id, user, wallet }),
        token: await this._getJWTToken(
          {
            id: user.id,
            role: Role.USER,
            loginMechanism: 'wallet',
            loginPayload: wallet
          }
        ),
        user
      }
    } catch (e) {
      logger.error(e.message)
      throw new Unauthorized('Wrong wallet')
    }
  }

  async _getJWTToken ({ id, role, loginMechanism, loginPayload }) {
    const tokenContent = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-default-role': role,
        'x-hasura-allowed-roles': [role],
        'x-hasura-user-id': id
      },
      loginMechanism,
      loginPayload,
      ...this._getJWTBaseTokenContent(id)
    }
    return this.jwt.generateToken(tokenContent)
  }

  async _getJWTRefreshToken ({ id, user, email, wallet }) {
    const tokenContent = {
      ...this._getJWTBaseTokenContent(id),
      user,
      loginMechanism: email ? 'email' : 'wallet',
      loginPayload: email || wallet
    }
    return this.jwt.generateToken(tokenContent)
  }

  _getJWTBaseTokenContent (id) {
    return {
      iat: Math.floor(Date.now() / 1000),
      sub: id
    }
  }

  logOut () {
    return { token: null, success: true }
  }

  refreshTokenTTLSeconds () {
    return this.opts.refreshTokenExpirationTimeMins * 60
  }

  async refresh (refreshToken) {
    let user
    const { loginMechanism, loginPayload } = this.jwt.verifyToken(refreshToken.refreshToken)
    if (loginMechanism === 'email') {
      user = await this.getUserByEmail(loginPayload)
    }
    if (loginMechanism === 'wallet') {
      user = await this.getUserByWallet(loginPayload)
    }
    return {
      token: await this._getJWTToken(
        { id: user.id, role: Role.USER, loginMechanism, loginPayload })
    }
  }

  async recoverPassword ({ email }) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new Unauthorized('Wrong email')
    }
    logger.info(`Recover password for user: ${user.id}`)
    const code = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)
    await this.gql.request(
      UPDATE_CHANGE_PASSWORD_REQUEST_CODE, { email, code })

    await this.email.sendRecoverPasswordEmail({ to: email, code })

    return { success: true, userId: user.id }
  }

  async validateRecoverPasswordCode ({ email, code }) {
    const user = await this.getUserByEmail(email)
    if (!user) {
      throw new Unauthorized('Wrong email')
    }
    if (user.email_info.change_password_request_code !== code) {
      throw new Unauthorized('Wrong code')
    }
    return { success: true }
  }
}

module.exports = Login
