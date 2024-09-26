'use strict'

const { test } = require('tap')
const Email = require('../../service/Email.js')

const to = 'erick@echolabs.co'

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

test('a thanks for buying a course email can be sent', async (t) => {
  const email = new Email({ apiKey: process.env.SENDGRID_API_KEY })
  const data = {
    to,
    title: 'Introduction to the Blockchain Art World',
    image: 'https://cdn.discordapp.com/attachments/1170326964943462470/1192849058528772217/thumbnail1.png?ex=65aa9241&is=65981d41&hm=ac5c43d936aed83b150efac64e1a215e0de1ee0e2d2ac1359e23b4bec4463ea8&',
    link: 'https://academy.blindgallery.xyz/courseNavigator/chapter/2f2cf15e-ba25-4dbc-a5ae-384973fed5f5'
  }
  const res = await email.sendThanksForPurchaseEmail(data)
  t.ok(res)
  t.equal(res.statusCode, 202)
})
