import { BeaconWalletService } from '@/services/tezos'

export const connect = async function ({ commit }) {
  try {
    const wallet = new BeaconWalletService()
    await wallet.connect()
    commit('setWallet', wallet)
    return wallet
  } catch (e) {
    throw new Error(e)
  }
}

export const autoLogin = async function ({ commit }) {
  try {
    const wallet = new BeaconWalletService()
    await wallet.autoLogin()
    commit('setWallet', wallet)
    return wallet
  } catch (e) {
    throw new Error(e)
  }
}

export const disconnect = async function ({ commit }) {
  try {
    const wallet = new BeaconWalletService()
    await wallet.disconnect()
    commit('setWallet', wallet)
    return wallet
  } catch (e) {
    throw new Error(e)
  }
}
