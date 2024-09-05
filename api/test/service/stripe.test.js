'use strict'
const { faker } = require('@faker-js/faker')

const { describe, test, before, after } = require('node:test')
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

describe('Test Stripe service - Customers', () => {
  let stripe = null
  let customerId = null
  before(async () => {
    stripe = new Stripe()
  })

  test('Creates a customer', async (t) => {
    // arrange
    const customerInfo = {
      email: faker.internet.email(),
      name: faker.person.firstName()
    }
    // act
    const customer = await stripe.createCustomer(customerInfo)

    // assert
    assert.ok(customer)
    assert.ok(customer.id)

    customerId = customer.id
  })

  test('Retrieves a customer', async (t) => {
    // arrange
    // act
    const customer = await stripe.retrieveCustomer(customerId)

    // assert
    assert.ok(customer)
    assert.ok(customer.id)
  })

  test('Updates a customer', async (t) => {
    // arrange
    const customerInfo = {
      email: faker.internet.email(),
      name: faker.person.firstName()
    }
    // act
    const customer = await stripe.updateCustomer(customerId, customerInfo)

    // assert
    assert.ok(customer)
    assert.ok(customer.id)
  })

  test('Deletes a customer', async (t) => {
    // arrange
    // act
    const customer = await stripe.deleteCustomer(customerId)

    // assert
    assert.ok(customer)
    assert.ok(customer.id)
  })

  test('Create a customer without email should not fail', async (t) => {
    // arrange
    const customerInfo = {
      name: faker.person.firstName()
    }
    // act
    const customer = await stripe.createCustomer(customerInfo)

    // assert
    assert.ok(customer)
    assert.ok(customer.id)

    await stripe.deleteCustomer(customer.id)
  })
})

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
  let customerId = null
  before(async () => {
    stripe = new Stripe()
    const customerInfo = {
      email: faker.internet.email(),
      name: faker.person.firstName()
    }
    // act
    const customer = await stripe.createCustomer(customerInfo)
    customerId = customer.id
  })

  after(async () => {
    await stripe.deleteCustomer(customerId)
  })

  test('Retrieves tax settings', async (t) => {
    // arrange

    // act
    const taxSettings = await stripe.retrieveTaxSettings()

    // assert
    assert.ok(taxSettings)
    assert.ok(taxSettings.taxCode)
  })

  test('Calculates tax without a customer should fail', async (t) => {
    // arrange
    let failed = false
    let errorMessages = ''
    // act
    try {
      await stripe.calculateTax(5000, 'usd', 'TEST', null)
    } catch (err) {
      failed = true
      errorMessages = err.message
    }
    // assert
    assert.ok(failed)
    assert.equal(errorMessages, 'Failed to calculate tax')
  })

  test('Calculates tax with a customer', async (t) => {
    // arrange

    // act
    const taxId = await stripe.calculateTax(5000, 'usd', 'TEST', customerId)

    // assert
    assert.ok(taxId)
  })
})
