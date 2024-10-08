<script>
import { dappClient } from '~/services/tezos'
export default {
  data () {
    return {
      message: '',
      success: false
    }
  },
  computed: {
    formattedWallet () {
      const wallet = this.$auth.user.tezos_info.wallet
      if (wallet && wallet.length > 10) {
        return `${wallet.substring(0, 7)}...${wallet.substring(wallet.length - 5)}`
      }
      return wallet
    }
  },
  methods: {
    async getWalletAccessData () {
      const { connectAccount, requestLoginSignPayload, checkIfWalletIsConnected } = dappClient()

      const { connected: isWalletConnected } = await checkIfWalletIsConnected()

      if (!isWalletConnected) {
        const wallet = await connectAccount()
        if (!wallet.success) {
          console.error('Wallet not connected')
        }
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
    },

    async connectWallet () {
      const data = await this.getWalletAccessData()
      data.userId = this.$auth.user.id
      try {
        await this.$axios.$post('users/register-wallet', data)
        this.message = 'Wallet linked successfully.'
        this.success = true
      } catch (error) {
        this.message = 'Please consider we do not support merging accounts yet. Otherwise, an error occurred. Please try again.'
      }
    }
  }
}
</script>

<template>
  <div>
    <div v-if="$auth.user.tezos_info || $auth.user.email_info">
      <div class="tw-pb-2 tw-border-b-2">
        <h4 class="tw-text-cyan-500">
          Connect wallet
        </h4>
      </div>

      <div class="tw-my-4">
        <div v-if="!$auth.user.tezos_info">
          <div>
            <h6 class="tw-font-bold">
              Link a Tezos wallet
            </h6>
            <p class="tw-text-sm tw-text-gray-500">
              This will allow you to buy courses with Tezos and mint certificates on the blockchain.
            </p>
          </div>

          <button
            type="button"
            class="tw-flex tw-gap-2 tw-items-center tw-bg-cyan-500 tw-text-sm tw-px-6 tw-w-fit tw-py-2 tw-text-white hover:tw-bg-cyan-600 tw-duration-200 tw-ease-in-out tw-rounded"
            @click="connectWallet"
          >
            <div>
              <Icon icon="material-symbols-light:account-balance-wallet-outline" width="1.25rem" />
            </div> <span>Connect wallet</span>
          </button>
          <p v-show="success" style="color: green; font-size: 0.8em">
            {{ message }}
          </p>
          <p v-show="!success" style="color: red; font-size: 0.8em">
            {{ message }}
          </p>
        </div>
        <div v-else>
          <h6 class="tw-font-bold tw-text-sm">
            Wallet linked to your account
          </h6>
          <div class="tw-flex tw-items-center tw-justify-between  tw-border tw-p-2 tw-rounded tw-truncate">
            <div class="tw-flex tw-items-center tw-gap-2">
              <div>
                <Icon style="color:#0D61FF" icon="cryptocurrency:xtz" width="1.5rem" height="1.5rem" />
              </div>
              <div>
                <span class="tw-text-gray-500 tw-text-sm">{{ formattedWallet }}</span>
              </div>
            </div>
            <div v-if="$auth.user.email_info">
              <button class="tw-text-sm tw-text-red-500 hover:tw-text-red-500 tw-ease-in-out tw-duration-200">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>
