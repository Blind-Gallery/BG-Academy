const { CoinGeckoClient } = require('coingecko-api-v3')

const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true
})

class CoinGecko {
  async getCoinPrice ({ ids, currency }) {
    const price = await client.simplePrice({
      ids,
      vs_currencies: currency
    })

    return price
  }
}

module.exports = CoinGecko
