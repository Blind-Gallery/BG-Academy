const { TezosToolkit } = require('@taquito/taquito')
const { InMemorySigner } = require('@taquito/signer')
const { TezosConstants } = require('../constants')

const Tezos = new TezosToolkit(TezosConstants.ENDPOINT)

Tezos.setProvider({
  signer: new InMemorySigner(process.env.TEZOS_PRIVATE_KEY)
})

module.exports = Tezos
