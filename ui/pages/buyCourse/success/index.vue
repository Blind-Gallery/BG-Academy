<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 90vh;">
    <div
      class="
      d-flex
      flex-column
      align-items-center
      justify-content-center
      p-5
      rounded
      shadow-sm
      "
    >
      <Icon
        class="mb-2"
        color="#4ECB71"
        width="8rem"
        icon="material-symbols:check-circle-rounded"
      />
      <h1>Done!</h1>
      <p class="text-center">
        Your payment has been successfully
        processed,<br> you will receive an email shortly.
      </p>
      <NuxtLink to="/">
        <button class="primary-btn">
          Home page
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY
    return {
      error: null
    }
  },
  created () {
    this.checkParams()
  },
  methods: {
    /**
     * Check if the user has been redirected from the payment page
     * and if the payment was successful give the user access to the course
     *
     * The user can be redirected from the payment page if the payment was successful
     * in two case scenarios:
     * 1. The user paid with a credit card
     * 2. The user paid with Tezos
     *
     * In the first case the user will be redirected to the success page with the
     * query param "payment_intent" set to the payment intent id of the payment
     * and the "payment_intent_client_secret" set to the client secret of the payment intent
     *
     * In the second case the user will be redirected to the success page with the
     * query param "opHash" set to the operation hash of the payment
     * and the "courseId" set to the id of the course
     */
    checkParams () {
      if (!this.$auth.loggedIn) {
        console.error('You need to be logged in to access this page')
        return
      }
      const { payment_intent: paymentIntent, payment_intent_client_secret: paymentIntentClientSecret, opHash, courseId } = this.$route.query
      if (paymentIntent && paymentIntentClientSecret) {
        this.stripeVerify(paymentIntent, paymentIntentClientSecret)
      } else if (opHash && courseId) {
        this.tezosVerify(opHash, courseId)
      } else {
        this.error = 'Something went wrong'
      }
    },
    stripeVerify (paymentIntent, paymentIntentClientSecret) {
      try {
        this.$axios.$post('/payments/stripe/verify-payment', {
          userId: this.$auth.user.id,
          paymentIntent,
          paymentIntentClientSecret
        })
      } catch (error) {
        this.error = error.message
      }
    },
    tezosVerify (opHash, courseId) {
      try {
        this.$axios.$post('/payments/tezos/verify-payment', {
          userId: this.$auth.user.id,
          opHash,
          courseId
        })
      } catch (error) {
        this.error = error.message
      }
    }
  }
}
</script>
