const { logger } = require('../service')
class AuthController {
  constructor ({ login, stripe }) {
    this.loginModel = login
    this.stripe = stripe
  }

  async login (req, res) {
    const {
      token,
      refreshToken,
      user
    } = await this.loginModel.login(req.body)

    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: this.loginModel.refreshTokenTTLSeconds()
    })

    return { token, refreshToken, user }
  }

  async signup (req, res) {
    const {
      token,
      refreshToken,
      user
    } = await this.loginModel.signUp(req.body)

    res.setCookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: this.loginModel.refreshTokenTTLSeconds()
    })

    return { token, refreshToken, user }
  }

  async refresh (req, res) {
    logger.info('======================= Refreshing token')
    logger.info(`refresh_token: ${JSON.stringify(req.cookies, null, 4)}`)
    const {
      refreshToken
    } = req.cookies
    return this.loginModel.refresh({ refreshToken })
  }

  async logout (req, res) {
    res.setCookie('refresh_token', null, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 0
    })
    return this.loginModel.logOut()
  }

  async user (req, res) {
    const token = req.headers.authorization.split(' ')[1]
    return this.loginModel.user(token)
  }

  async recoverPassword (req, res) {
    return this.loginModel.recoverPassword(req.body)
  }

  async validateRecoverPasswordCode (req, res) {
    const response = await this.loginModel.validateRecoverPasswordCode(req.body)
    return response
  }
}

module.exports = AuthController
