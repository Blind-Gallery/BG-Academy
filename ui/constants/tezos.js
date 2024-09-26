export const TEZTOK_API = 'https://api.teztok.com/v1/graphql'
export const FXHASH_API = 'https://api.fxhash.xyz/graphql'
export const OBJKT_API = 'https://data.objkt.com/v3/graphql'
export const STATS_API = 'https://qav2-dot-stats-dot-curious-domain-369714.uc.r.appspot.com'
export const SERVICE_API = 'https://kalohservices-dot-curious-domain-369714.uc.r.appspot.com'

export const RCP_URI = 'https://mainnet.api.tez.ie'

const endpoints = {
  mainnet: 'https://rpc.tzkt.io/mainnet',
  ghostnet: 'https://rpc.ghostnet.teztnets.com/'
}

const tzktEndpoints = {
  mainnet: 'https://tzkt.io',
  ghostnet: 'https://ghostnet.tzkt.io'
}

const betterCallDevChainNames = {
  mainnet: 'mainnet',
  ithacanet: 'ithacanet',
  hangzhounet: 'hangzhou2net',
  ghostnet: 'ghostnet'
}

const contractAddresses = {
  mainnet: {
    academy: 'KT1NG9fRNfhTMKy5vaVFuDpcKaasUaUAcMkR',
    sbt: 'KT1CYWz3izwBR7s2PjZ7BCmVFJuPzfDeKMAd'
  },
  ghostnet: {
    academy: 'KT1FjxZye7Ev8gvTmTfq4kpYtaNZ4EQhFs36',
    sbt: 'KT1CQFNnsKerP3AvjrGJkYPe2LSMvxzNJKgD'
  }
}

export const CHAIN = process.env.TEZOS_PROTOCOL
export const DEFAULT_CONFIRMATION_BLOCKS = 1

export const CHAIN_NAME = betterCallDevChainNames[CHAIN]
export const ENDPOINT = endpoints[CHAIN]
export const TZKT_ENDPOINT = tzktEndpoints[CHAIN]

export const CONTRACT_ADDRESS = contractAddresses[CHAIN]

// Beacon
export const DEFAULT_MATRIX_NODE = 'beacon-node-1.sky.papers.tech'
