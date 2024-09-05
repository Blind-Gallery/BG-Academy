'use strict'

const { test } = require('tap')
const Stripe = require('../../service/Stripe.js')
const stripe = new Stripe()
test('stripe works standalone', async (t) => {
  t.ok(stripe)
  t.end()
})

test('paymentIntent returns a valid paymentIntent', async (t) => {
  const paymentIntent = await stripe.paymentIntent(5000, 'usd', ['card'], 'email@example.com')
  t.ok(paymentIntent)
  t.type(paymentIntent, 'object')
  t.end()
})

test('paymentIntent returns a valid paymentIntent', async (t) => {
  const paymentIntent = await stripe.paymentIntent(5000, 'usd', ['card'], 'email@example.com')
  t.ok(paymentIntent)
  t.type(paymentIntent, 'object')
  t.end()
})

test('Retrieves tax settings', async (t) => {
  const taxSettings = await stripe.retrieveTaxSettings()
  t.ok(taxSettings)
  t.type(taxSettings, 'object')
  t.ok(taxSettings.taxCode)
  t.end()
})
