'use strict'

const { test } = require('tap')
const IPFS = require('../../service/IPFS.js')

test('IPFS works standalone', async (t) => {
  const ipfs = new IPFS()
  t.ok(ipfs)
  t.end()
})

test('IPFS can add a file', async (t) => {
  const ipfs = new IPFS()
  const res = await ipfs.add(Buffer.from('test'), 'test.txt')
  t.ok(res)
  t.end()
})
