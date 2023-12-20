const GQL = require('./GQL')
const JWT = require('./JWT')
const Email = require('./Email')
const Documents = require('./Documents')
const IPFS = require('./IPFS')
const Stripe = require('./Stripe')
const Tezos = require('./Tezos')
const CoinGecko = require('./CoinGecko')
const {
  AcademySmartContract,
  SbtSmartContract
} = require('./smart-contracts')

module.exports = {
  GQL,
  JWT,
  Email,
  Documents,
  IPFS,
  Stripe,
  Tezos,
  CoinGecko,
  AcademySmartContract,
  SbtSmartContract
}
