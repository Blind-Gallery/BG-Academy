<script>
import { dappClient } from '~/services/tezos'

export default {
  data () {
    return {
      walletForm: {}
    }
  },

  methods: {
    async doSignUpWallet () {
      try {
        const data = await this.getWalletAccessData()
        await this.$axios.$post('users', data)
        await this.$auth.loginWith('local', {
          data
        })

        const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
        const { connected: isWalletConnected } =
          await checkIfWalletIsConnected()

        if (isWalletConnected && !this.$auth.loggedIn) {
          await disconnectWallet()
        }

        this.$bvModal.hide('signup')
      } catch (error) {
        console.error(error)

        if (error.response && error.response.status === 400) {
          this.invalidMessage = 'This wallet is already registered'
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
    <h2 class="tw-text-cyan-500">
      Create new account
    </h2>
    <FormulateForm
      v-slot="{ isLoading }"
      v-model="walletForm"
      @submit="doSignUpWallet"
    >
      <FormulateInput
        name="name"
        type="text"
        label="Your name"
        placeholder="Your name"
        validation="required"
      />

      <FormulateInput
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Connect wallet'"
        @submit="doSignUpWallet"
      />
      <p
        class="small m-0 text-center"
        style="font-size: small; color: #960505"
      >
        {{ invalidMessage }}
      </p>
    </FormulateForm>
  </div>
</template>
