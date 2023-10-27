'use strict'

const { test } = require('tap')
const GQL = require('../../service/GQL.js')

test('GQL configuration loaded', async (t) => {
  const {
    GRAPHQL_ENDPOINT,
    GRAPHQL_SECRET
  } = process.env

  const gqlConfig = {
    endpoint: GRAPHQL_ENDPOINT,
    secret: GRAPHQL_SECRET
  }

  t.ok(gqlConfig)
  t.type(GRAPHQL_ENDPOINT, 'string')
  t.type(GRAPHQL_SECRET, 'string')
  t.end()
})

test('GQL works standalone', async (t) => {
  const {
    GRAPHQL_ENDPOINT,
    GRAPHQL_SECRET
  } = process.env

  const gqlConfig = {
    endpoint: GRAPHQL_ENDPOINT,
    secret: GRAPHQL_SECRET
  }
  const gql = new GQL(gqlConfig)
  t.ok(gql)
  t.end()
})
