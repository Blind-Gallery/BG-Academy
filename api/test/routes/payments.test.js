'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = await build(t)

  await app.inject({
    url: '/payments/tezos/payment-intent'
  })

  // console.log(res)
})
