require('dotenv').config()

const CHAIN = process.env.TEZOS_PROTOCOL
const DEFAULT_CONFIRMATION_BLOCKS = 1

const endpoints = {
  mainnet: 'https://rpc.tzkt.io/mainnet',
  ghostnet: 'https://rpc.tzkt.io/ghostnet'
}

const tzktEndpoints = {
  mainnet: 'https://api.tzkt.io',
  ghostnet: 'https://api.ghostnet.tzkt.io'
}

const contractAddresses = {
  mainnet: {
    academy: 'KT1NG9fRNfhTMKy5vaVFuDpcKaasUaUAcMkR',
    sbt: 'KT1CYWz3izwBR7s2PjZ7BCmVFJuPzfDeKMAd'
  },
  ghostnet: {
    academy: 'KT1FjxZye7Ev8gvTmTfq4kpYtaNZ4EQhFs36',
    sbt: 'KT1RHPX4jGFGDkqhrwNUVfuCBBnGSz9bmBER'
  }
}

const TZKT_ENDPOINT = tzktEndpoints[CHAIN]
const ENDPOINT = endpoints[CHAIN]
const CONTRACT_ADDRESSES = contractAddresses[CHAIN]

module.exports = {
  CHAIN,
  TZKT_ENDPOINT,
  ENDPOINT,
  CONTRACT_ADDRESSES,
  DEFAULT_CONFIRMATION_BLOCKS
}
