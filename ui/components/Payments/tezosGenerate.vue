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

export default {
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      contractAddress: CONTRACT_ADDRESS.academy,
      tezosPrice: 0
    }
  },
  mounted () {
    this.createPaymentIntent()
  },
  methods: {
    async createPaymentIntent () {
      try {
        const { getClientWallet } = dappClient()
        const wallet = await getClientWallet()
        const tezosAddress = await wallet.getPKH()
        const { tezos } = await this.$axios.$post('/payments/tezos/payment-intent', {
          courseId: this.courseId,
          user: tezosAddress
        })
        this.tezosPrice = tezos
      } catch (error) {
        console.error(error.message)
      }
    },
    pay () {
      if (!this.$auth.user.tezos_info) {
        console.info('Non blockchain user')
        return
      }

      const { tezos } = dappClient()
      console.info(tezos)
    }
  }
}
</script>
