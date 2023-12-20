const { TezosToolkit } = require('@taquito/taquito')
const { InMemorySigner } = require('@taquito/signer')
const { TezosConstants } = require('../constants')

const Tezos = new TezosToolkit(TezosConstants.ENDPOINT)

Tezos.setProvider({
  signer: new InMemorySigner(process.env.TEZOS_PRIVATE_KEY)
})
class TezosTransactions {
  constructor () {
    this.tezos = Tezos
  }

  async getBalance (address) {
    return await this.tezos.tz.getBalance(address)
  }

  async getStorage (address) {
    return await this.tezos.contract.at(address)
  }
}

module.exports = TezosTransactions
