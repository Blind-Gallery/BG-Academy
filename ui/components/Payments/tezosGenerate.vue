<template>
  <button
    v-show="tezosPrice > 0"
    class="secondary-btn w-100"
    @click="pay"
  >
    <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
    {{ tezosPrice }} Tezos
  </button>
</template>

<script>
import { dappClient } from '~/services/tezos'
import { CONTRACT_ADDRESS } from '~/constants'
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
      contractAddress: CONTRACT_ADDRESS.academy,
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
            .pay_course(this.onchainId)
            .toTransferParams({ amount: this.tezosPrice })
        }
      ]

      const batch = Tezos.wallet.batch(calls)
      try {
        const batchOp = await batch.send()
        await batchOp.confirmation(1)
        const status = await batchOp.status()
        console.info(batchOp)
        if (status === 'applied') {
          console.info('Payment successful')
          this.$router.push(`/buyCourse/success?opHash=${batchOp.opHash}&courseId=${this.onchainId}`)
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
