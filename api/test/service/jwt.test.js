'use strict'

const { test } = require('tap')
const JWT = require('../../service/JWT.js')

test('JWT works standalone', async (t) => {
  const jwt = new JWT()
  t.ok(jwt)
  t.end()
})
