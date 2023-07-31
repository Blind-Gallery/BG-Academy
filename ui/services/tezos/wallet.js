import { char2Bytes } from '@taquito/utils'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { SigningType } from '@airgap/beacon-sdk'
import { Tezos } from './utils'

import { ENDPOINT, DEFAULT_MATRIX_NODE, CHAIN_NAME, APP_NAME } from '@/constants'

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
    this.publicKey = undefined
    this.isWalletConnected = false
    this.payload = undefined
    this.signedMessage = undefined
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
    this.isWalletConnected = true
    this.publicKey = (await this.wallet.client.getActiveAccount()).publicKey
    try {
      const signedMessage = await this.requestSignPayload()

      this.signedMessage = signedMessage
    } catch (e) {
    }
  }

  async autoLogin () {
    const activateAccount = await this.wallet.client.getActiveAccount()
    if (activateAccount) {
      this.wallet.client.setActiveAccount(activateAccount)
      this.tezosAddress = activateAccount.address
      this.isWalletConnected = true
      this.publicKey = this.wallet.client.getActiveAccount().publicKey
      Tezos.setWalletProvider(this.wallet)
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
    const signedPayload = await this.wallet.client.requestSignPayload(payload)

    // The signature
    const { signature } = signedPayload
    return signature
  }

  disconnect () {
    if (this.wallet) {
      this.wallet.client.clearActiveAccount()
      this.wallet.client.removeAllAccounts()
      this.wallet.client.removeAllPeers()
      this.wallet.client.destroy()
      this.wallet = undefined
      this.tezosAddress = undefined
      this.publicKey = undefined
      this.isWalletConnected = false
      this.payload = undefined
      this.signedMessage = undefined
      this.wallet = new BeaconWallet(options)
    }
  }
}

export default BeaconWalletService
