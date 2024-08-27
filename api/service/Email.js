require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const logger = require('./Logger')
class Email {
  constructor ({ apiKey }) {
    this.sendgrid = sgMail
    this.sendgrid.setApiKey(apiKey)
  }

  // eslint-disable-next-line camelcase
  async sendDynamicTemplate (to, template_id, dynamic_template_data) {
    let response = null
    const msg = {
      from: {
        email: 'academy@blindgallery.xyz'
      },
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          // eslint-disable-next-line camelcase
          dynamic_template_data
        }
      ],
      // eslint-disable-next-line camelcase
      template_id
    }

    try {
      response = await this.sendgrid.send(msg)
      logger.info(`Status code: ${response[0].statusCode}`)
    } catch (error) {
      logger.error(`Error sending email to ${to} with error: `, error)
    }

    return response[0]
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

    return res[0]
  }

  async sendWelcomeEmail ({ to }) {
    // const subject = 'Welcome to the Academy by Blind Gallery'
    const res = await this.sendDynamicTemplate(to, 'd-5c203a8116914367a9da56dd352ef786')
    return res
  }

  async sendRecoverPasswordEmail ({ to, code }) {
    // const subject = 'Recover your password'
    const res = await this.sendDynamicTemplate(to, 'd-0e252054914c4f7ea06b627f65fc23a6', { code })
    return res
  }

  async sendThanksForPurchaseEmail ({ to, title, image, link }) {
    const res = await this.sendDynamicTemplate(to, 'd-ca164928139a4d5da393809c8fc7d1a4', { title, image, link })
    return res
  }
}

module.exports = Email
