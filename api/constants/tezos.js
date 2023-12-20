require('dotenv').config()

const CHAIN = process.env.TEZOS_PROTOCOL
const DEFAULT_CONFIRMATION_BLOCKS = 1

const endpoints = {
  mainnet: 'https://rpc.tzkt.io/mainnet',
  ghostnet: 'https://rpc.ghostnet.teztnets.xyz'
}

const contractAddresses = {
  mainnet: {
    academy: '',
    sbt: ''
  },
  ghostnet: {
    academy: 'KT1QrdkUXvVgai4FWF5bTbkjcngg6z7Aijcy',
    sbt: 'KT1CQFNnsKerP3AvjrGJkYPe2LSMvxzNJKgD'
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
