import { BeaconWalletService } from '@/services/tezos'

export const connect = async function ({ commit }) {
  try {
    const wallet = new BeaconWalletService()
    console.info('============= connect created: ', wallet)
    await wallet.connect()
    console.info('============= connect connected: ', wallet)
    commit('setWallet', wallet)
    return wallet
  } catch (e) {
    console.error(e)
  }
}

export const autoLogin = async function ({ commit }) {
  try {
    const wallet = new BeaconWalletService()
    console.info('============= autoLogin created: ', wallet)
    await wallet.autoLogin()
    console.info('============= autoLogin connected: ', wallet)
    commit('setWallet', wallet)
    return wallet
  } catch (e) {
    console.error(e)
  }
}

export const disconnect = async function ({ commit }) {
  try {
    const _wallet = new BeaconWalletService()
    console.info('============= disconnect created: ', _wallet)
    const wallet = await _wallet.disconnect()
    console.info('============= disconnect disconnected: ', wallet)
    commit('disconnectWallet', wallet)
    return wallet
  } catch (e) {
    console.error(e)
  }
}
