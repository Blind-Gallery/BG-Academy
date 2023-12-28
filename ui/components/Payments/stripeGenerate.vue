<template>
  <div>
    <FormulateForm>
      <FormulateInput
        v-model="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <stripe-element-payment
        v-if="elementsOptions.clientSecret"
        ref="paymentRef"
        :pk="pk"
        :elements-options="elementsOptions"
        :confirm-params="confirmParams"
      />
      <FormulateInput
        class="mt-4"
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Confirm payment'"
        @click="pay"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
      default: 1
    }

  },
  data () {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY
    return {
      email: 'youremail@email.com',

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
      this.email = ''
    },
    pay () {
      this.$refs.paymentRef.submit()
    }
  }
}
</script>
<style scoped>

</style>
