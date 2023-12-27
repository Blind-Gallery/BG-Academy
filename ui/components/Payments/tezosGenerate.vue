<template>
  <div />
</template>

<script>
import { mapGetters } from 'vuex'
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
      contractAddress: CONTRACT_ADDRESS,
      tezosPrice: 0
    }
  },
  computed: {
    ...mapGetters('tezosWallet', [
      'wallet',
      'isWalletConnected',
      'tezosAddress'
    ])
  },
  created () {
    this.createPaymentIntent()
  },
  methods: {
    async createPaymentIntent () {
      if (!this.$auth.user.tezos_info) {
        console.info('Non blockchain user')
        return
      }
      if (!this.isWalletConnected) {
        console.info('Non connected wallet')
        await this.$store.dispatch('tezosWallet/autoLogin')
        return this.createPaymentIntent()
      }
      try {
        const { tezos } = await this.$axios.$post('/payments/tezos/payment-intent', {
          courseId: this.courseId,
          user: this.tezosAddress
        })
        this.tezosPrice = tezos
        const Tezos = this.wallet.client
        console.info(CONTRACT_ADDRESS.academy)
        // const contract = await Tezos.wallet.at(CONTRACT_ADDRESS.academy)
        // console.info(contract)
        console.info(Tezos)
      } catch (error) {
        console.error(error.message)
      }
    }
  }
}
</script>
