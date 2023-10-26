require('dotenv').config()

const CHAIN = process.env.TEZOS_PROTOCOL
const DEFAULT_CONFIRMATION_BLOCKS = 1

const endpoints = {
  mainnet: 'https://rpc.tzkt.io/mainnet',
  ghostnet: 'https://rpc.ghostnet.teztnets.xyz'
}

const contractAddresses = {
  mainnet: {
    academy: ''
  },
  ghostnet: {
    academy: ''
  }
}

const ENDPOINT = endpoints[CHAIN]
const CONTRACT_ADDRESSES = contractAddresses[CHAIN]

module.exports = {
  CHAIN,
  ENDPOINT,
  CONTRACT_ADDRESSES,
  DEFAULT_CONFIRMATION_BLOCKS
}
