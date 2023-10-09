<template>
  <div class="d-flex flex-column" style="gap:1rem">
    <div>
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
    <button id="custom-button" class="primary-btn w-100" @click="createToken">
      Confirm payment
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null
    }
  },
  computed: {
    stripeElements () {
      return this.$stripe.elements()
    }
  },
  mounted () {
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
  },
  beforeDestroy () {
    this.cardNumber.destroy()
    this.cardExpiry.destroy()
    this.cardCvc.destroy()
  },
  methods: {
    async createToken () {
      const { token, error } = await this.$stripe.createToken(this.cardNumber)
      if (error) {
        // handle error here
        document.getElementById('card-error').innerHTML = error.message
        return
      }
      console.info(token)
      // handle the token
      // send it to your server
    }
  }
}
</script>

  <style>

  #card-error {
   color: #960505;
    font-size: .8em;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 0.25em;
  }

  .stripe-input {
    border: 1px solid #CECECE;
    padding: .75em;
    font-size: 0.9em;
    border-radius: .3em;
  }

  .stripe-label{
    font-size: 0.9em;
    line-height: 1.5px;
  }
  </style>
