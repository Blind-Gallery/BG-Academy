<template>
  <div>
    <stripe-element-payment
      v-if="elementsOptions.clientSecret"
      ref="paymentRef"
      :pk="pk"
      :elements-options="elementsOptions"
      :confirm-params="confirmParams"
    />
    <button class="primary-btn mt-4 w-100" @click="pay">
      Confirm purchase
    </button>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
      default: 1
    },
    email: {
      type: String,
      required: true
    }
  },
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
        amount: this.price * 100,
        currency: 'usd',
        paymentMethodTypes: ['card'],
        receiptEmail: this.email
      })
      this.elementsOptions.clientSecret = paymentIntent.client_secret
      this.$forceUpdate() // this is a hack to force the component to re-render and update the client secret
    },
    pay () {
      this.$refs.paymentRef.submit()
    }
  }
}
</script>
