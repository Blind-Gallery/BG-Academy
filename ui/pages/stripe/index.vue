<template>
  <div>
    <stripe-element-payment
      v-if="elementsOptions.clientSecret"
      ref="paymentRef"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />
    <button @click="pay">
      Checkout
    </button>
  </div>
</template>

<script>
export default {
  data () {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY
    return {
      elementsOptions: {
        appearance: {} // appearance options
      },
      confirmParams: {
        return_url: 'http://localhost:8082/buyCourse/success' // success url
      }
    }
  },
  created () {
    this.generatePaymentIntent()
  },
  methods: {
    async generatePaymentIntent () {
      const { paymentIntent } = await this.$axios.$post('/payments/stripe/create-intent', {
        amount: 10000, // chance to the current price time 100
        currency: 'usd',
        paymentMethodTypes: ['card'],
        receiptEmail: 'desneruda@gmail.com'
      })
      this.elementsOptions.clientSecret = paymentIntent.client_secret
      this.$forceUpdate()
    },
    pay () {
      this.$refs.paymentRef.submit()
    }
  }
}
</script>
