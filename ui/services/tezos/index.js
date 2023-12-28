import { SigningType } from '@airgap/beacon-sdk'
import { char2Bytes } from '@taquito/utils'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { ENDPOINT, DEFAULT_MATRIX_NODE, CHAIN_NAME, APP_NAME } from '@/constants'

export const dappClient = () => {
  let instance

  function init () {
    const options = {
      name: APP_NAME,
      matrixNodes: [DEFAULT_MATRIX_NODE],
      preferredNetwork: CHAIN_NAME,
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

  async function connectAccount () {
    const client = getClient()
    await client.clearActiveAccount()
    return client.requestPermissions({
      network: {
        type: CHAIN_NAME,
        rpcUrl: ENDPOINT
      }
    })
  }

  async function disconnectWallet () {
    const response = {
      success: false,
      wallet: null
    }
    const wallet = getClientWallet()
    try {
      await wallet.disconnect()
      response.success = true
    } catch (e) {
      console.error(e)
      response.error = e
    }
    return response
  }

  async function CheckIfWalletConnected () {
    const response = {
      success: false
    }
    try {
      const client = getClient()
      const activeAccount = await client.getActiveAccount()
      if (!activeAccount) {
        console.info('No active account found')
        await client.requestPermissions({
          network: {
            type: CHAIN_NAME,
            rpcUrl: ENDPOINT
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
    const Tezos = new TezosToolkit(ENDPOINT)
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
    CheckIfWalletConnected,
    requestLoginSignPayload,
    tezos
  }
}
