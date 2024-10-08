import { char2Bytes } from '@taquito/utils'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { SigningType } from '@airgap/beacon-sdk'
import { Tezos } from './utils'

import { TEZOS, METADATA } from '@/constants'

const options = {
  name: METADATA.APP_NAME,
  matrixNodes: [TEZOS.DEFAULT_MATRIX_NODE],
  preferredNetwork: TEZOS.CHAIN_NAME,
  featuredWallets: ['autonomy', 'kukai', 'temple', 'naan'],
  disableDefaultEvents: false
}
export default class BeaconWalletService {
  constructor () {
    this.beaconWallet = undefined
    this.tezosAddress = undefined
    this.publicKey = undefined
    this.isWalletConnected = false
    this.payload = undefined
    this.signedMessage = undefined
  }

  init () {
    this.beaconWallet = BeaconWallet(options)
    return this.beaconWallet
  }

  loadWallet () {
    if (!this.beaconWallet) {
      this.init()
    }

    return this.beaconWallet
  }

  getClient () {
    const wallet = this.loadWallet()
    return wallet.client
  }

  getClientWallet () {
    const wallet = this.loadWallet()
    return wallet
  }

  async connectAccount () {
    const client = this.getClient()
    await client.clearActiveAccount()
    return client.requestPermissions({
      network: {
        type: TEZOS.CHAIN_NAME,
        rpcUrl: TEZOS.ENDPOINT
      }
    })
  }

  async connect () {
    await this.autoLogin()
    Tezos.setWalletProvider(this.beaconWallet)
    await this.beaconWallet.requestPermissions({
      network: {
        type: TEZOS.CHAIN_NAME,
        rpcUrl: TEZOS.ENDPOINT
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

  async contractInteraction (contractAddress, entryPoint, parameter) {
    await Tezos.wallet.at(contractAddress)
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
    const dappUrl = 'https://blindgallery.xyz/'
    const ISO8601formatedTimestamp = new Date().toISOString()
    const input = 'Signed message to prove ownership of the wallet'

    // The full string
    const formattedInput = [
      'Message to sign:',
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
    const signedPayload = await this.beaconWallet.client.requestLoginSignPayload(payload)

    // The signature
    const { signature } = signedPayload
    return signature
  }

  disconnect () {
    if (this.beaconWallet) {
      return new BeaconWallet(options)
    }
  }
}
