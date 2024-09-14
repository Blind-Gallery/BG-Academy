const TRANSACTION_TYPES = {
  STRIPE: 'stripe',
  TEZOS: 'tezos',
  GIFT: 'gift'
}

const TAX_CODES = {
  DIGITAL_GOODS: 'txcd_10000000'
}

const TAX_BEHAVIOR = {
  INCLUSIVE: 'inclusive',
  EXCLUSIVE: 'exclusive'
}

module.exports = {
  TRANSACTION_TYPES,
  TAX_BEHAVIOR,
  TAX_CODES
}
