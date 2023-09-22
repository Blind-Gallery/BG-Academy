'use strict'

const { test } = require('tap')
const Email = require('../../service/Email.js')

test('emails works standalone', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })

  const res = await email.sendWelcomeEmail({ to: 'desneruda@gmail.com' })
})
