require('dotenv').config()
const sgMail = require('@sendgrid/mail')

class Email {
  constructor ({ apiKey }) {
    this.sendgrid = sgMail
    this.sendgrid.setApiKey(apiKey)
  }

  async sendEmail ({ to, from = 'academy@blindgallery.xyz', subject, text, html }) {
    const msg = {
      to,
      from,
      subject,
      text,
      html
    }

    const res = await this.sendgrid.send(msg)

    return res
  }

  async sendWelcomeEmail ({ to }) {
    const subject = 'Welcome to the Academy by Blind Gallery'
    const text = 'Welcome to Blind Gallery'
    const html = 'Hello there! Welcome to the Academy by Blind Gallery -  SLOGAN.'

    const res = await this.sendEmail({ to, subject, text, html })

    return res
  }

  async sendRecoverPasswordEmail ({ to }) {
    const subject = 'Recover Password'
    const text = 'Recover Password'
    const html = '<strong>Recover Password</strong>'

    const res = await this.sendEmail({ to, subject, text, html })

    return res
  }
}

module.exports = Email
