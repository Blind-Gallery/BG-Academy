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

export const CHAIN = 'mainnet'
export const DEFAULT_CONFIRMATION_BLOCKS = 1

export const CHAIN_NAME = betterCallDevChainNames[CHAIN]
export const ENDPOINT = endpoints[CHAIN]

// Beacon
export const DEFAULT_MATRIX_NODE = 'beacon-node-1.sky.papers.tech'

// Marketplaces
export const MARKETPLACES = {
  fxhash: {
    name: 'FXHASH',
    articles: 'KT1GtbuswcNMGhHF2TSuH1Yfaqn16do8Qtva',
    marketplaceV1: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
    marketplaceV2: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
    marketplaceV3: 'KT1M1NyU9X4usEimt2f3kDaijZnDMNBu42Ja',
    gentkV1: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
    gentkV2: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
    gentkV3: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr'
  },
  objkt: {
    name: 'OBJKT',
    marketplaceV1: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
    marketplaceV4: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC'
  },
  hen: {
    name: 'HEN',
    fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton'
  }
}
// Discord
export const DISCORD_WEBHOOK = {
  feedback: {
    url: 'https://discord.com/api/webhooks/1080923718366265365/pyCb9WcBGtHTwZeKBowau-R-71IyDOwIQPgoZJkhOqBz3cjsiJv1_shMwp4t4NY1WOjx',
    color: 13454573
  },
  logger: {
    url: 'https://discord.com/api/webhooks/1082394638196949043/CYONQt8J_w2Y7lACNMgJ09U6MdLM6_lVx5sQTstZAZF0ZKzZKarlWveu7I3KzMfqYokU',
    color: 10100000
  },
  allowList: {
    url: 'https://discord.com/api/webhooks/1105497171857514638/5C4K47qQIGRTkFAUAJsdSN7V-C_LH3tCjSGzUdULyAIVY0naOzPBdUuofgVNKTkmEbe5',
    color: 15257231
  },
  subscription: {
    url: 'https://discord.com/api/webhooks/1105497171857514638/5C4K47qQIGRTkFAUAJsdSN7V-C_LH3tCjSGzUdULyAIVY0naOzPBdUuofgVNKTkmEbe5',
    color: 7669673
  },
  referralSubscribed: {
    url: 'https://discord.com/api/webhooks/1105497171857514638/5C4K47qQIGRTkFAUAJsdSN7V-C_LH3tCjSGzUdULyAIVY0naOzPBdUuofgVNKTkmEbe5',
    color: 13456473
  },
  referralBenefit: {
    url: 'https://discord.com/api/webhooks/1105497171857514638/5C4K47qQIGRTkFAUAJsdSN7V-C_LH3tCjSGzUdULyAIVY0naOzPBdUuofgVNKTkmEbe5',
    color: 7663673
  }
}
