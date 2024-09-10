<script>
import { dappClient } from '~/services/tezos'
export default {
  data () {
    return {
      walletForm: {},
      errorMessage: null
    }
  },

  methods: {
    async getIp () {
      try {
        const response = await this.$axios.$get('https://api.ipify.org?format=json')
        return response.ip
      } catch (error) {
        console.error('Error fetching IP:', error)
        return null
      }
    },
    async walletConnect () {
      try {
        const ipAddress = await this.getIp()
        const data = await this.getWalletAccessData()
        data.ipAddress = ipAddress
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
          this.errorMessage =
            "This user doesn't exist. Please sign up and create an account first."
        } else {
          this.errorMessage =
            'Something went wrong, please try again.'
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
      class="tw-text-red-500 tw-text-xs tw-mb-0 tw-mt-2"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
