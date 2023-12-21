<template>
  <div>
    <div>
      <div class="d-flex flex-column" style="gap:1rem">
        <div>
          <p class=" stripe-label">
            Total price
          </p>
          <h1 style="color: #00b9cd;" class="font-weight-bold">
            ${{ price }}
          </h1>
          <label class="stripe-label">Card Number</label>
          <div id="card-number" class="stripe-input" />
        </div>
        <div class="d-flex align-items-center justify-content-between" style="gap:1rem">
          <div class="w-100">
            <label class="stripe-label">Card Expiry</label>
            <div id="card-expiry" class="stripe-input" />
          </div>
          <div class="w-100">
            <label class="stripe-label">Card CVC</label>
            <div id="card-cvc" class="stripe-input" />
          </div>
        </div>
        <div id="card-error" />

        <button id="custom-button" class="primary-btn w-100" @click="submitPayment">
          {{ loading === false ? 'Confirm payment' : 'Loading transaction' }}

          <Icon
            v-if="loading"
            class="ml-2"
            color="#fff"
            width="1.25rem"
            icon="eos-icons:loading"
          />
        </button>
      </div>
      <p style="font-size: small;" class="mt-4 text-secondary">
        With your purchase you will be able to access all the course content and receive a certificate hosted on the tezos blockchain.
      </p>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    courseId: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      success: null,
      loading: false,
      userEmail: null,
      paymentIntent: null,
      clientSecret: null
    }
  },
  computed: {
    stripeElements () {
      return this.$stripe.elements()
    }
  },
  async mounted () {
    const style = {
      base: {
        iconColor: '#c4f0ff',
        color: 'black',
        fontWeight: '400',
        fontFamily: 'Poppins, Open Sans, Segoe UI, sans-serif',

        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#black'
        },
        '::placeholder': {
          color: '#a8a8a8'
        }
      },
      invalid: {
        iconColor: '#960505',
        color: '#960505'
      }
    }
    this.cardNumber = this.stripeElements.create('cardNumber', { style, showIcon: true })
    this.cardNumber.mount('#card-number')
    this.cardExpiry = this.stripeElements.create('cardExpiry', { style })
    this.cardExpiry.mount('#card-expiry')
    this.cardCvc = this.stripeElements.create('cardCvc', { style })
    this.cardCvc.mount('#card-cvc')
    await this.createIntent()
  },
  beforeDestroy () {
    this.cardNumber.destroy()
    this.cardExpiry.destroy()
    this.cardCvc.destroy()
  },
  methods: {
    async createToken () {
      this.loading = true
      const { token, error } = await this.$stripe.createToken(this.cardNumber)
      if (error) {
        this.loading = false
        this.success = false
        document.getElementById('card-error').innerHTML = error.message
        return
      }
      this.loading = false
      console.info(token)
      this.success = true
      this.$router.push('/buyCourse/success')
    },
    async createIntent () {
      this.loading = true
      const response = await this.$axios.$post('/payments/stripe/create-intent', {
        amount: this.price * 100,
        currency: 'usd',
        paymentMethodTypes: ['card'],
        receiptEmail: 'desneruda@gmail.com'
      })
      console.info('Response payment intent: ', response)
      this.paymentIntent = response.paymentIntent
      this.clientSecret = response.paymentIntent.client_secret
      this.loading = false
      return response.paymentIntent
    },
    async submitPayment () {
      const result = await this.$stripe.handleCard(
        this.clientSecret, {
          payment_method: {
            card: this.cardNumber,
            billing_details: {
              email: 'desneruda@gmail.com'
            }
          }
        }
      )

      console.info(result)
    }
  }
}
</script>
