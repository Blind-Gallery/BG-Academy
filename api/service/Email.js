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
    const subject = 'Welcome to Blind Gallery'
    const text = 'Welcome to Blind Gallery'
    const html = '<strong>Welcome to Blind Gallery</strong>'

    const res = await this.sendEmail({ to, subject, text, html })

    return res
  }
}

module.exports = Email
