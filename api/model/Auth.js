const { Unauthorized, BadRequest } = require('http-errors')
const { Role } = require('../constants')
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

class Login {
  constructor ({ gql, jwt, opts, user }) {
    this.gql = gql
    this.opts = opts
    this.user = user
    this.jwt = jwt
  }

  async getUserByEmail (email) {
    const { users } = await this.gql.request(
      GET_USER_BY_EMAIL, { email })
    return users.find(user => user.email.email === email)
  }

  async login ({ email, password, wallet, signedMessage }) {
    if (!email && !wallet) {
      throw new BadRequest('No email or wallet provided')
    }

    if (email) {
      this.emailLogin({ email, password })
    } else if (wallet) {
      this.walletLogin({ wallet, signedMessage })
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
          { id: user.id, role: Role.USER, email }
        ),
        user
      }
    } catch (e) {
      console.error(e)
      throw new Unauthorized('Wrong email')
    }
  }

  async walletLogin ({ wallet, signedMessage }) {
    if (!wallet) {
      throw new BadRequest('No wallet provided')
    }

    try {
      // compare signedMessage with taquito
      const isVerified = verifySignature(
        payloadBytes,
        wallet,
        signedMessage
      )
      const { users } = await this.gql.request(
        GET_USER_BY_WALLET, { wallet })
      const user = users.find(user => user.tezo.wallet === wallet)
      if (!user) {
        throw new Unauthorized('Wallet not found')
      }
      return {
        refreshToken: await this._getJWTRefreshToken({ id: user.id, user, wallet }),
        token: await this._getJWTToken(
          { id: user.id, role: Role.USER, wallet }
        ),
        user
      }
    } catch (e) {
      console.error(e)
      throw new Unauthorized('Wrong wallet')
    }
  }

  async _getJWTToken ({ id, role, email }) {
    const tokenContent = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-default-role': role,
        'x-hasura-allowed-roles': [role],
        'x-hasura-user-id': id
      },
      email,
      ...this._getJWTBaseTokenContent(id)
    }
    return this.jwt.generateToken(tokenContent)
  }

  async _getJWTRefreshToken ({ id, user, email }) {
    const tokenContent = {
      ...this._getJWTBaseTokenContent(id),
      user,
      email
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
    const { email } = this.jwt.verifyToken(refreshToken.refreshToken)
    const user = this.getUserByEmail(email)
    return {
      token: await this._getJWTToken(
        { id: user.id, role: Roles[user.roleId], email })
    }
  }
}

module.exports = Login
