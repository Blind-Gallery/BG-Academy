require('dotenv').config()
const sgMail = require('@sendgrid/mail')

const WELCOME_MESSAGE = `
Hello there!

Welcome to the Academy by Blind Gallery -  SLOGAN.

You can access our platform here : https://qa-bg-academy-client-c92169fac952.herokuapp.com/

If you have any questions, reply to this email.
`

const WELCOME_MESSAGE_HTML = `
<strong>Hello there!</strong>

<p>Welcome to the Academy by Blind Gallery -  SLOGAN.</p>

<p>You can access our platform <a href="https://qa-bg-academy-client-c92169fac952.herokuapp.com/">here</a></p>

<p>If you have any questions, reply to this email.</p>

<p>Best regards,</p>

<p>Blind Gallery Team</p>
`

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
    const html = WELCOME_MESSAGE_HTML

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
