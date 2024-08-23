<script>
import { dappClient } from '~/services/tezos'
export default {
  data () {
    return {
      walletForm: {},
      invalidMessage: null
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
        this.$emit('closeModal')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.invalidMessage =
            "This user doesn't exist. Please sign up and create an account first."
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
      class="tw-rounded tw-border tw-text-cyan-500 tw-p-2 tw-border-cyan-500 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200 hover:tw-text-cyan-600 tw-w-full"
      @click="walletConnect"
    >
      <Icon
        icon="material-symbols:account-balance-wallet-outline"
        class="text-cyan-500"
        width="21"
      />
      Connect Wallet
    </button>

    <p
      class="small m-0 text-center"
      style="font-size: small; color: #960505"
    >
      {{ invalidMessage }}
    </p>
  </div>
</template>
