'use strict'
const { faker } = require('@faker-js/faker')

const { describe, test, before } = require('node:test')
const assert = require('node:assert')
const Stripe = require('../../service/Stripe.js')

describe('Stripe', () => {
  test('Stripe service works standalone', async (t) => {
    // arrange
    // act
    const stripe = new Stripe()
    // assert
    assert.ok(stripe)
  })
})

// describe.skip('Test Stripe service - Customers', () => {
//   let stripe = null
//   // const customerId = null
//   before(() => {
//     stripe = new Stripe()
//   })

//   test('Creates a customer', async (t) => {
//     // arrange

//     // act
//     // const customer = await stripe.createCustomer({
//     //   email: 'erick@echolabs.co',
//     //   name: 'Erick'
//     // })

//     // assert
//   })
// })

describe('Test Stripe service - Payment intents', () => {
  let stripe = null
  before(() => {
    stripe = new Stripe()
  })

  test('paymentIntent returns a valid paymentIntent', async (t) => {
    // arrange
    const amount = 5000
    const currency = 'usd'
    const paymentMethodTypes = ['card']
    const email = faker.internet.email()

    // act
    const paymentIntent = await stripe.paymentIntent(
      amount,
      currency,
      paymentMethodTypes,
      email
    )

    // assert
    assert.ok(paymentIntent)
  })
})

describe('Test Stripe service - Taxes', () => {
  let stripe = null
  before(() => {
    stripe = new Stripe()
  })

  test('Retrieves tax settings', async (t) => {
    // arrange

    // act
    const taxSettings = await stripe.retrieveTaxSettings()

    // assert
    assert.ok(taxSettings)
    assert.ok(taxSettings.taxCode)
  })

  test('Calculates tax without a customer', async (t) => {
    // arrange
    let failed = false
    let errorMessages = ''
    // act
    try {
      await stripe.calculateTax(5000, 'usd', 'TEST')
    } catch (err) {
      failed = true
      errorMessages = err.message
    }
    // assert
    assert.ok(failed)
    assert.equal(errorMessages, 'Failed to calculate tax')
  })
})
