const { logger } = require('../service')
class AuthController {
  constructor (login, stripe) {
    this.login = login
    this.stripe = stripe
  }

  async login (req, res) {
    const {
      token,
      refreshToken,
      user
    } = await this.login.login(req.body)

    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: this.login.refreshTokenTTLSeconds()
    })

    return { token, refreshToken, user }
  }

  async signup (req, res) {
    const {
      token,
      refreshToken,
      user
    } = await this.login.signUp(req.body)

    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: this.login.refreshTokenTTLSeconds()
    })

    return { token, refreshToken, user }
  }

  async refresh (req, res) {
    logger.info('======================= Refreshing token')
    logger.info(`refresh_token: ${JSON.stringify(req.cookies, null, 4)}`)
    const {
      refreshToken
    } = req.cookies
    return this.login.refresh({ refreshToken })
  }

  async logout (req, res) {
    res.setCookie('refresh_token', null, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 0
    })
    return this.login.logOut()
  }

  async user (req, res) {
    const token = req.headers.authorization.split(' ')[1]
    return this.login.user(token)
  }

  async recoverPassword (req, res) {
    return this.login.recoverPassword(req.body)
  }

  async validateRecoverPasswordCode (req, res) {
    const response = await this.login.validateRecoverPasswordCode(req.body)
    return response
  }
}

module.exports = AuthController
