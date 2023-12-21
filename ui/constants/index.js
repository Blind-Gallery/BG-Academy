export const TEZTOK_API = 'https://api.teztok.com/v1/graphql'
export const FXHASH_API = 'https://api.fxhash.xyz/graphql'
export const OBJKT_API = 'https://data.objkt.com/v3/graphql'
export const STATS_API = 'https://qav2-dot-stats-dot-curious-domain-369714.uc.r.appspot.com'
export const SERVICE_API = 'https://kalohservices-dot-curious-domain-369714.uc.r.appspot.com'
// export const SERVICE_API = 'http://localhost:8080'

export const ARTICLES_LOGO = {
  'https://podtail.com/podcast/waiting-to-be-signed/':
    'https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/0d/8f/77/0d8f7768-65ec-860e-0bf2-0033cac2762e/mza_14045945247737239663.jpg/250x250bb.jpg',
  'https://www.kaloh.xyz/':
    'https://substackcdn.com/image/fetch/w_264,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F5693fd18-8784-4b9e-9fc0-a7e429161e94_1280x1280.png',
  'https://www.fxhash.xyz/': 'https://www.fxhash.xyz/images/logo.svg',
  'http://www.rightclicksave.com/':
    'https://pbs.twimg.com/profile_images/1487967921200631810/NxITkm8t_400x400.jpg'
}

// Kaloh's info
export const APP_NAME = 'Blind Gallery Academy'
export const BLIND_GALLERY_API = 'blind-gallery-api.herokuapp.com'
// export const BLIND_GALLERY_API = 'localhost:3000'

// Tezos
export const TEZOS_RCP_URI = 'https://mainnet.api.tez.ie'

const betterCallDevChainNames = {
  mainnet: 'mainnet',
  ithacanet: 'ithacanet',
  hangzhounet: 'hangzhou2net',
  ghostnet: 'ghostnet'
}

const endpoints = {
  mainnet: 'https://rpc.tzkt.io/mainnet',
  granadanet: 'https://granadanet.smartpy.io',
  florencenet: 'https://florencenet.smartpy.io',
  hangzhounet: 'https://hangzhounet.smartpy.io',
  ithacanet: 'https://ithacanet.smartpy.io',
  ghostnet: 'https://rpc.ghostnet.teztnets.xyz'
}

export const CHAIN = process.env.TEZOS_PROTOCOL
export const DEFAULT_CONFIRMATION_BLOCKS = 1

export const CHAIN_NAME = betterCallDevChainNames[CHAIN]
export const ENDPOINT = endpoints[CHAIN]

// Beacon
export const DEFAULT_MATRIX_NODE = 'beacon-node-1.sky.papers.tech'

const contractAddresses = {
  mainnet: {
    academy: ''
  },
  ghostnet: {
    academy: 'KT1QrdkUXvVgai4FWF5bTbkjcngg6z7Aijcy',
    sbt: 'KT1CQFNnsKerP3AvjrGJkYPe2LSMvxzNJKgD'
  }
}

export const CONTRACT_ADDRESS = contractAddresses[CHAIN]
