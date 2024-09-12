<template>
  <div>
    <button
      v-if="tezosPrice > 0"
      class="tw-flex tw-w-full tw-mt-2  tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200"
      @click="pay"
    >
      <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
      {{ tezosPrice }} Tezos
    </button>
    <button v-else disabled class="tw-flex tw-mt-2 tw-w-full tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200">
      <Icon icon="eos-icons:bubble-loading" width="1rem" /> <span>Loading</span>
    </button>
  </div>
</template>

<script>
import { dappClient } from '~/services/tezos'
import { TEZOS } from '~/constants'
const { OpKind } = require('@taquito/taquito')

export default {
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      onchainId: 0,
      contractAddress: TEZOS.CONTRACT_ADDRESS.academy,
      tezosPrice: 0
    }
  },
  mounted () {
    this.createPaymentIntent()
  },
  methods: {
    async createPaymentIntent () {
      // wait 2 seconds and then get the payment intent
      await new Promise(resolve => setTimeout(resolve, 2000))
      try {
        const { getClientWallet } = dappClient()
        const wallet = await getClientWallet()
        const tezosAddress = await wallet.getPKH()
        if (!tezosAddress || !this.$auth.user.id || !this.courseId) {
          return
        }
        const { tezos, onchainId } = await this.$axios.$post('/payments/tezos/payment-intent', {
          courseId: this.courseId,
          wallet: tezosAddress,
          userId: this.$auth.user.id
        })
        // floor price to 2 decimals
        this.tezosPrice = Math.floor(tezos * 100) / 100
        this.onchainId = onchainId
      } catch (error) {
        console.error(error.message)
      }
    },
    async pay () {
      if (!this.$auth.user.tezos_info) {
        console.info('Non blockchain user')
        return
      }

      const Tezos = await dappClient().tezos()
      const academyContract = await Tezos.contract.at(this.contractAddress)
      const calls = [
        {
          kind: OpKind.TRANSACTION,
          ...academyContract.methods
            .buy_course(this.onchainId, this.$auth.user.tezos_info.wallet)
            .toTransferParams({ amount: this.tezosPrice })
        }
      ]

      const batch = Tezos.wallet.batch(calls)
      try {
        const batchOp = await batch.send()
        await batchOp.confirmation(1)
        const status = await batchOp.status()
        if (status === 'applied') {
          console.info('Payment successful')
          this.$router.push(`/buyCourse/success?opHash=${batchOp.opHash}&courseId=${this.courseId}&onchainId=${this.onchainId}`)
        } else {
          console.error('Payment failed')
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}
</script>
