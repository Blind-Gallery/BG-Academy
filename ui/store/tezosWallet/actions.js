import { BeaconWalletService } from '@/services/tezos'

export const connect = async function ({ commit }) {
  try {
    const account = new BeaconWalletService()
    console.info('============= connect created: ', account)
    await account.connect()
    console.info('============= connect connected: ', account)
    commit('setWallet', account)
    return account
  } catch (e) {
    console.error(e)
  }
}

export const autoLogin = async function ({ commit }) {
  try {
    const account = new BeaconWalletService()
    console.info('============= autoLogin created: ', account)
    await account.autoLogin()
    console.info('============= autoLogin connected: ', account)
    commit('setWallet', account)
    return account
  } catch (e) {
    console.error(e)
  }
}

export const disconnect = async function ({ commit }) {
  try {
    const _account = new BeaconWalletService()
    console.info('============= disconnect created: ', _account)
    const account = await _account.disconnect()
    console.info('============= disconnect disconnected: ', account)
    commit('disconnectWallet', account)
    return account
  } catch (e) {
    console.error(e)
  }
}
