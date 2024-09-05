'use strict'

const { test } = require('tap')
const Stripe = require('../../service/Stripe.js')
const stripe = new Stripe()
let customerId = null
test('stripe works standalone', async (t) => {
  t.ok(stripe)
  t.end()
})

test('Creates a customer', async (t) => {
  const customer = await stripe.createCustomer({
    email: 'erick@echolabs.co',
    name: 'Erick'
  })
  customerId = customer.id
  t.ok(customer)
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

test('Calculates tax', async (t) => {
  await stripe.calculateTax(5000, 'usd', 'TEST')
  t.end()
})
