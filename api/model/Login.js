const { Unauthorized } = require('http-errors')
const { Roles } = require('../constants/roles')
const bcrypt = require('bcrypt')

class Login {
  constructor ({ gql, jwt, opts, user }) {
    this.gql = gql
    this.opts = opts
    this.user = user
    this.jwt = jwt
  }

  async login ({ email, password }) {
    try {
      const user = await this.user.getUserByEmail(email)
      if (!await bcrypt.compare(password, user.passwordHash)) {
        throw new Unauthorized('Wrong password')
      }
      return {
        refreshToken: await this._getJWTRefreshToken({ id: user.userId, user, email }),
        token: await this._getJWTToken(
          { id: user.userId, role: Roles[user.roleId], email }
        ),
        user
      }
    } catch (e) {
      console.error(e)
      throw new Unauthorized('Wrong email')
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
    return { token: null }
  }

  refreshTokenTTLSeconds () {
    return this.opts.refreshTokenExpirationTimeMins * 60
  }

  async refresh (refreshToken) {
    console.log(refreshToken)
    const { email } = this.jwt.verifyToken(refreshToken.refreshToken)
    const user = this.user.getUserByEmail(email)
    return {
      token: await this._getJWTToken(
        { id: user.userId, role: Roles[user.roleId], email })
    }
  }
}

module.exports = Login
