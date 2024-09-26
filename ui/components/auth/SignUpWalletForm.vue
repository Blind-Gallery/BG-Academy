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
        this.$emit('closeModal')
      } catch (error) {
        console.error(error)

        if (error.response && error.response.status === 400) {
          this.$formulate.handle({
            formErrors: ['This wallet has already been registered before.']
          }, 'walletSignUp')
        } else {
          this.$formulate.handle({
            formErrors: ['Something went wrong, please try again.']
          }, 'walletSignUp')
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
      name="walletSignUp"
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
      <FormulateErrors />
    </FormulateForm>
  </div>
</template>
