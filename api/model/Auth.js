const { Unauthorized, BadRequest } = require('http-errors')
const { Role } = require('../constants')
const bcrypt = require('bcrypt')
const { verifySignature } = require('@taquito/utils')

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

class Login {
  constructor ({ gql, jwt, opts }) {
    this.gql = gql
    this.opts = opts
    this.jwt = jwt
  }

  async getUserByEmail (email) {
    const { users } = await this.gql.request(
      GET_USER_BY_EMAIL, { email })
    return users.find(user => user.email.email === email)
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

  async login ({ email, password, wallet, publicKey, signedMessage, payload }) {
    if (!email && !wallet) {
      throw new BadRequest('No email or wallet provided')
    }

    if (email) {
      return this.emailLogin({ email, password })
    }
    if (wallet) {
      return this.walletLogin({ wallet, signedMessage, publicKey, payload })
    }
  }

  async emailLogin ({ email, password }) {
    if (!email) {
      throw new BadRequest('No email provided')
    }

    try {
      const user = await this.getUserByEmail(email)
      if (!await bcrypt.compare(password, user.email.password)) {
        throw new Unauthorized('Wrong password')
      }
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
      console.error(e)
      throw new Unauthorized('Wrong email')
    }
  }

  async walletLogin ({ wallet, publicKey, signedMessage, payload }) {
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
      console.error(e)
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
    console.log(refreshToken)
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
}

module.exports = Login
