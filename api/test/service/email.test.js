'use strict'

const { test } = require('tap')
const Email = require('../../service/Email.js')

const to = 'desneruda@gmail.com'

test('emails works standalone', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  t.ok(email)
  t.end()
})

test('emails can be sent', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  const res = await email.sendEmail({
    to,
    subject: 'Test email',
    text: 'Test email',
    html: '<strong>Test email</strong>'
  })
  t.ok(res)
  t.equal(res.statusCode, 202)
})

test('a welcome email can be sent', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  const res = await email.sendWelcomeEmail({ to })
  t.ok(res)
  t.equal(res.statusCode, 202)
})

test('a recover password email can be sent', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  const res = await email.sendRecoverPasswordEmail({ to })
  t.ok(res)
  t.equal(res.statusCode, 202)
})
