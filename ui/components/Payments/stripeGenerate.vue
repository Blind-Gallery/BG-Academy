<template>
  <div>
    <FormulateForm v-if="elementsOptions.clientSecret">
      <FormulateInput
        v-model="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
        style="margin-bottom: 0.6rem;"
      />
      <stripe-element-payment
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
    <div v-else class="d-flex align-items-center justify-content-center w-100">
      <div class="d-flex flex-column align-items-center justify-content-center my-4">
        <Icon icon="eos-icons:bubble-loading" width="3rem" />
      </div>
    </div>
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
      domain: window.location.origin,
      elementsOptions: {
        appearance: {
          rules: {
            '.Input:focus': {
              border: '1px solid #00B9CD;',
              boxShadow: ''
            },
            '.Input': {
              boxShadow: 'none'
            },
            '.Input--empty': {
              borderColor: '#cecece'
            },
            '.Input--invalid': {
              borderColor: '#cecece',
              color: 'transparent',
              boxShadow: 'none'
            },

            '.Input::placeholder': {
              fontSize: '12px',
              color: '#a8a8a8'
            },
            '.Error': {
              fontSize: '.8em',
              fontWeight: '300'
            }

          },
          variables: {
            colorPrimary: '#0570de',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#960505',
            fontFamily: 'Poppins, system-ui, sans-serif',
            spacingUnit: '3.5px',
            borderRadius: '5px'
            // See all possible variables below
          }

        } // appearance options
      },
      confirmParams: {

      }

    }
  },
  created () {
    this.generatePaymentIntent()
    this.defineConfirmParams()
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

    defineConfirmParams () {
      this.confirmParams = {
        return_url: `${this.domain}/buyCourse/success`
      }
    },
    pay () {
      this.$refs.paymentRef.submit()
    }
  }
}
</script>
