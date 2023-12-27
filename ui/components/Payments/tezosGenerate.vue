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
  mounted () {
    this.createPaymentIntent()
  },
  methods: {
    async createPaymentIntent () {
      if (!this.$auth.user?.tezos_info) {
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
      } catch (error) {
        console.error(error.message)
      }
    },
    pay () {
      if (!this.$auth.user.tezos_info) {
        console.info('Non blockchain user')
      }
    }
  }
}
</script>
