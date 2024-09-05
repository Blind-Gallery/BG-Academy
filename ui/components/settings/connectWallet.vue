<script>
import { dappClient } from '~/services/tezos'
export default {
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
      } catch (error) {
        console.error(error)
        // TODO: Handle error alert the user
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

          <button type="button" class="tw-flex tw-gap-2 tw-items-center tw-bg-cyan-500 tw-text-sm tw-px-6 tw-w-fit tw-py-2 tw-text-white hover:tw-bg-cyan-600 tw-duration-200 tw-ease-in-out tw-rounded" @click="connectWallet">
            <div><Icon icon="material-symbols-light:account-balance-wallet-outline" width="1.25rem" /></div> <span>Connect wallet</span>
          </button>
        </div>
        <div v-else>
          <h6 class="tw-font-bold">
            This wallet is linked to your account
          </h6>
          <div class="tw-flex tw-items-center tw-justify-between tw-border tw-rounded tw-p-2">
            <div class="tw-flex tw-items-center tw-gap-2   tw-text-sm tw-text-gray-500">
              <div><Icon icon="material-symbols-light:account-balance-wallet-outline" width="1.25rem" /></div> <span> {{ $auth.user.tezos_info.wallet }}</span>
            </div>
            <Icon style="color:rgb(34 197 94)" icon="svg-spinners:pulse" width="1.25rem" />
          </div>
          <span class="tw-text-xs tw-text-gray-500">Tezos wallet</span>
        </div>
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>
