import { SigningType } from '@airgap/beacon-sdk'
import { char2Bytes } from '@taquito/utils'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { TEZOS, METADATA } from '@/constants'

export const dappClient = () => {
  let instance

  function init () {
    const options = {
      name: METADATA.APP_NAME,
      matrixNodes: [TEZOS.DEFAULT_MATRIX_NODE],
      preferredNetwork: TEZOS.CHAIN_NAME,
      featuredWallets: ['autonomy', 'kukai', 'temple', 'naan'],
      disableDefaultEvents: false
    }
    return new BeaconWallet(options)
  }

  function loadWallet () {
    if (!instance) {
      instance = init()
    }
    return instance
  }

  function getClient () {
    const wallet = loadWallet()
    return wallet.client
  }

  function getClientWallet () {
    const wallet = loadWallet()
    return wallet
  }

  async function disconnectWallet () {
    const response = {
      success: false,
      wallet: null
    }
    const wallet = getClientWallet()
    try {
      await wallet.client.clearActiveAccount()
      await wallet.disconnect()
      response.success = true
    } catch (e) {
      console.error(e)
      response.error = e
    }
    return response
  }

  async function connectAccount () {
    const response = {
      success: false
    }
    try {
      const client = getClient()
      const activeAccount = await client.getActiveAccount()
      if (!activeAccount) {
        await client.requestPermissions({
          network: {
            type: TEZOS.CHAIN_NAME,
            rpcUrl: TEZOS.ENDPOINT
          }
        })
      }
      response.success = true
    } catch (e) {
      console.error(e)
      response.error = e
    }

    return response
  }

  async function checkIfWalletIsConnected () {
    const response = {
      success: false,
      connected: false
    }
    try {
      const wallet = getClientWallet()
      const activeAccount = await wallet.client.getActiveAccount()
      if (activeAccount) {
        response.connected = true
      }
      response.success = true
    } catch (e) {
      console.error(e)
      response.error = e
    }

    return response
  }

  async function requestLoginSignPayload () {
    const response = {
      success: false,
      signedMessage: null
    }
    try {
      const wallet = getClientWallet()
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
        sourceAddress: await wallet.getPKH()
      }

      const signedPayload = await wallet.client.requestSignPayload(payload)
      response.signedPayload = signedPayload.signature
      response.payload = payload.payload
      response.publicKey = (await wallet.client.getActiveAccount()).publicKey
      response.wallet = await wallet.getPKH()
    } catch (e) {
      console.error(e)
      response.error = e
    }

    return response
  }

  function tezos () {
    const Tezos = new TezosToolkit(TEZOS.ENDPOINT)
    const wallet = getClientWallet()
    if (wallet) {
      Tezos.setWalletProvider(wallet)
    }
    return Tezos
  }

  return {
    loadWallet,
    getClient,
    getClientWallet,
    connectAccount,
    disconnectWallet,
    checkIfWalletIsConnected,
    requestLoginSignPayload,
    tezos
  }
}
