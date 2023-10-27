'use strict'

const { test } = require('tap')
const Tezos = require('../../service/Tezos.js')

test('tezos works standalone', async (t) => {
  t.ok(Tezos)
  t.end()
})
