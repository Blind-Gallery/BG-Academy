'use strict'

const { test } = require('tap')
const CoinGecko = require('../../service/CoinGecko.js')

test('coingecko works standalone', async (t) => {
  const coingecko = new CoinGecko()
  t.ok(coingecko)
  t.end()
})

test('getCoinPrice returns the correct price', async (t) => {
  const coinGecko = new CoinGecko()
  const ids = ['bitcoin', 'ethereum', 'tezos']
  const currency = 'usd'
  const expectedPrice = {
    bitcoin: { usd: Number },
    ethereum: { usd: Number },
    tezos: { usd: Number }
  }

  const actualPrice = await coinGecko.getCoinPrice({ ids, currency })

  t.match(actualPrice, expectedPrice)
  t.end()
})
