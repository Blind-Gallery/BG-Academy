import { TezosToolkit } from '@taquito/taquito'
import { validateAddress } from '@taquito/utils'

import { ENDPOINT } from '@/constants'

export const Tezos = new TezosToolkit(ENDPOINT)

// ACCOUNT BALANCE
export function getBalance (pkh) {
  return Tezos.tz.getBalance(pkh)
    .then(balance => balance.toNumber() / 1000000)
}

export function getContract (address) {
  return Tezos.wallet.at(address)
}

export function isValidAddress (pkh) {
  const validation = validateAddress(pkh)

  if (validation !== 0) { return true }
  return false
};
