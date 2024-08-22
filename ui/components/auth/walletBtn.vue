<script>
import { dappClient } from '~/services/tezos'
export default {
  data () {
    return {
      walletForm: {}
    }
  },

  methods: {
    async walletConnect () {
      try {
        const data = await this.getWalletAccessData()
        await this.$auth.loginWith('local', {
          data
        })
        const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
        const { connected: isWalletConnected } =
          await checkIfWalletIsConnected()
        if (isWalletConnected && !this.$auth.loggedIn) {
          await disconnectWallet()
        }

        this.$bvModal.hide('signin')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.info(error)
        }
      }
    },

    async getWalletAccessData () {
      const { connectAccount, requestLoginSignPayload } = dappClient()
      const wallet = await connectAccount()
      if (!wallet.success) {
        console.error('Wallet not connected')
      }
      const {
        publicKey,
        wallet: tezosAddress,
        signedPayload: signedMessage,
        payload
      } = await requestLoginSignPayload()
      const data = {
        ...this.walletForm,
        publicKey,
        wallet: tezosAddress,
        signedMessage,
        payload
      }
      return data
    }
  }
}
</script>

<template>
  <div>
    <button
      class="secondary-btn"
      style="width: 100%; position: relative; margin-bottom: 1rem"
      @click="walletConnect"
    >
      <Icon
        icon="material-symbols:account-balance-wallet-outline"
        color="#00b9cd"
        width="21"
        style="position: absolute; left: 24px; top: 9px"
      />
      Connect Wallet
    </button>
  </div>
</template>
