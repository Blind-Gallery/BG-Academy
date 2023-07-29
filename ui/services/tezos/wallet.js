import { BeaconWallet } from '@taquito/beacon-wallet'
import { Tezos } from './utils'

import { ENDPOINT, DEFAULT_MATRIX_NODE, CHAIN_NAME, APP_NAME, SERVICE_API } from '@/constants'

const getWallets = async function (tezosAddress) {
  const response = await fetch(`${SERVICE_API}/wallets?login_wallet=${tezosAddress}`, {
    method: 'GET'
  })
  let addedWallets = []
  if (response.status === 200) {
    const wallets = await response.json()
    addedWallets = wallets.map(wallet => wallet.address)
  }
  return addedWallets ?? []
}

const options = {
  name: APP_NAME,
  matrixNodes: [DEFAULT_MATRIX_NODE],
  preferredNetwork: CHAIN_NAME,
  featuredWallets: ['Autonomy'],
  disableDefaultEvents: false
}

class BeaconWalletService {
  constructor () {
    this.wallet = new BeaconWallet(options)
    this.tezosAddress = undefined
    this.addedWallets = undefined
    this.isWalletConnected = false
    this.isAllowed = false
  }

  async connect () {
    await this.autoLogin()
    Tezos.setWalletProvider(this.wallet)
    await this.wallet.requestPermissions({
      network: {
        type: CHAIN_NAME,
        rpcUrl: ENDPOINT
      }
    })
    this.tezosAddress = await this.wallet.getPKH()
    this.addedWallets = await getWallets(this.tezosAddress)
    this.isWalletConnected = true
  }

  async autoLogin () {
    const activateAccount = await this.wallet.client.getActiveAccount()
    if (activateAccount) {
      this.wallet.client.setActiveAccount(activateAccount)
      this.tezosAddress = activateAccount.address
      this.addedWallets = await getWallets(this.tezosAddress)
      this.isWalletConnected = true
      Tezos.setWalletProvider(this.wallet)
    }
  }

  disconnect () {
    if (this.wallet) {
      this.wallet.client.clearActiveAccount()
      this.wallet.client.removeAllAccounts()
      this.wallet.client.removeAllPeers()
      this.wallet.client.destroy()
      this.wallet = undefined
      this.tezosAddress = undefined
      this.isWalletConnected = false
      this.isAllowed = false

      this.wallet = new BeaconWallet(options)
    }
  }
}

export default BeaconWalletService
