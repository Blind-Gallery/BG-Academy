const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

class JWT {
  constructor (opts) {
    this.opts = opts
    this.opts.jwtSecret = 'secret'
    this.opts.tokenExpirationTimeMins = 60
    this.opts.refreshTokenExpirationTimeMins = 1440
  }

  init () {
    this.opts.jwtSecret = 'secret'
  }

  generateToken (tokenContent) {
    return jwt.sign(tokenContent, this.opts.jwtSecret, {
      expiresIn: '15min'
    })
  }

  generateRefreshToken (tokenContent) {
    console.log('tokenContent', tokenContent)
    return jwt.sign(tokenContent, this.opts.jwtSecret, {
      expiresIn: '20min'
    })
  }

  verifyToken (token) {
    console.log(token)
    if (!token) {
      throw new Unauthorized('No authorization header')
    }
    const decoded = jwt.decode(token, { complete: true })
    if (!decoded) {
      throw new Unauthorized('Unable to decode JWT token')
    }

    console.log('decoded', decoded)
    return jwt.verify(token, this.opts.jwtSecret)
  }
}

module.exports = JWT
