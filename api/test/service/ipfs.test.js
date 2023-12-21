'use strict'

const { test } = require('tap')
const IPFS = require('../../service/IPFS.js')

test('IPFS works standalone', async (t) => {
  const ipfs = new IPFS()
  t.ok(ipfs)
  t.end()
})
