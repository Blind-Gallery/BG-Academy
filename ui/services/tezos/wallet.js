import { char2Bytes } from '@taquito/utils'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { SigningType } from '@airgap/beacon-sdk'
import { Tezos } from './utils'

import { ENDPOINT, DEFAULT_MATRIX_NODE, CHAIN_NAME, APP_NAME } from '@/constants'

const options = {
  name: APP_NAME,
  matrixNodes: [DEFAULT_MATRIX_NODE],
  preferredNetwork: CHAIN_NAME,
  featuredWallets: ['autonomy', 'kukai', 'temple', 'naan'],
  disableDefaultEvents: false
}

class BeaconWalletService {
  constructor () {
    this.beaconWallet = new BeaconWallet(options)
    this.tezosAddress = undefined
    this.publicKey = undefined
    this.isWalletConnected = false
    this.payload = undefined
    this.signedMessage = undefined
  }

  getOptions () {
    return options
  }

  async connect () {
    await this.autoLogin()
    Tezos.setWalletProvider(this.beaconWallet)
    await this.beaconWallet.requestPermissions({
      network: {
        type: CHAIN_NAME,
        rpcUrl: ENDPOINT
      }
    })
    this.tezosAddress = await this.beaconWallet.getPKH()
    this.isWalletConnected = true
    this.publicKey = (await this.beaconWallet.client.getActiveAccount()).publicKey
    try {
      const signedMessage = await this.requestSignPayload()

      this.signedMessage = signedMessage
    } catch (e) {
      console.warn(e)
    }
  }

  async autoLogin () {
    const activateAccount = await this.beaconWallet.client.getActiveAccount()
    if (activateAccount) {
      this.beaconWallet.client.setActiveAccount(activateAccount)
      this.tezosAddress = activateAccount.address
      this.isWalletConnected = true
      this.publicKey = this.beaconWallet.client.getActiveAccount().publicKey
      Tezos.setWalletProvider(this.beaconWallet)
    }
  }

  async requestSignPayload () {
    // The data to format
    const dappUrl = 'tezos-test-d.app'
    const ISO8601formatedTimestamp = new Date().toISOString()
    const input = 'Hello world!'

    // The full string
    const formattedInput = [
      'Tezos Signed Message:',
      dappUrl,
      ISO8601formatedTimestamp,
      input
    ].join(' ')

    // The bytes to sign
    const bytes = char2Bytes(formattedInput)
    const bytesLength = (bytes.length / 2).toString(16)
    const addPadding = `00000000${bytesLength}`
    const paddedBytesLength = addPadding.slice(addPadding.length - 8)
    const payloadBytes = '05' + '01' + paddedBytesLength + bytes

    // The payload to send to the wallet
    const payload = {
      signingType: SigningType.MICHELINE,
      payload: payloadBytes,
      sourceAddress: this.tezosAddress
    }

    this.payload = payloadBytes

    // The signing
    const signedPayload = await this.beaconWallet.client.requestSignPayload(payload)

    // The signature
    const { signature } = signedPayload
    return signature
  }

  disconnect () {
    if (this.beaconWallet) {
      // this.wallet.client.clearActiveAccount()
      // this.wallet.client.removeAllAccounts()
      // this.wallet.client.removeAllPeers()
      // this.wallet.client.destroy()
      // this.wallet = undefined
      // this.tezosAddress = undefined
      // this.publicKey = undefined
      // this.isWalletConnected = false
      // this.payload = undefined
      // this.signedMessage = undefined
      return new BeaconWallet(options)
    }
  }
}

export default BeaconWalletService
