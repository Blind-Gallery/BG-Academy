'use strict'

const { test } = require('tap')
const Stripe = require('../../service/Stripe.js')

test('stripe works standalone', async (t) => {
  const stripe = new Stripe()
  t.ok(stripe)
  t.end()
})

test('paymentIntent returns a valid paymentIntent', async (t) => {
  const stripe = new Stripe()
  const paymentIntent = await stripe.paymentIntent(5000, 'usd', ['card'], 'email@example.com')
  t.ok(paymentIntent)
  t.type(paymentIntent, 'object')
  t.end()
})
