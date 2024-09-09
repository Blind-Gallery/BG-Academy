<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="!emailRegistered" key="1">
        <FormulateForm @submit="sendEmail">
          <FormulateInput
            v-model="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="required|email"
            style="margin-bottom: 0.6rem;"
          />
          <FormulateInput
            v-model="selectedCountry"
            type="select"
            label="What planet is the largest?"
            :options="country"
            style="margin-bottom: 0.6rem;"
          />
          <FormulateInput class="mt-4" type="submit" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Next'" />
        </FormulateForm>
      </div>
      <div v-else>
        <div v-if="elementsOptions.clientSecret">
          <stripe-element-payment
            ref="paymentRef"
            :pk="pk"
            :elements-options="elementsOptions"
            :confirm-params="confirmParams"
          />
          <button class="primary-btn mt-4 w-100" @click="pay">
            Confirm payment
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import country from '@/constants/country.json'
export default {
  props: {
    price: {
      type: Number,
      required: true,
      default: 1
    },
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY
    return {
      selectedCountry: null,
      emailRegistered: false,
      email: this.$auth.user.email_info?.email || '',
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
  computed: {
    country () {
      return country.map(c => ({
        value: c.code,
        label: c.name
      }))
    }
  },
  created () {
    this.defineConfirmParams()
    this.getIp()
  },
  methods: {
    async getIp () {
      try {
        const response = await this.$axios.$get('https://api.ipify.org?format=json')
        return response.ip
      } catch (error) {
        console.error('Error fetching IP:', error)
        return null
      }
    },
    sendEmail () {
      this.emailRegistered = true
      // tax calculation
      this.generatePaymentIntent()
    },
    async generatePaymentIntent () {
      const { paymentIntent } = await this.$axios.$post('/payments/stripe/create-intent', {
        amount: this.price * 100,
        currency: 'usd',
        paymentMethodTypes: ['card'],
        receiptEmail: this.email,
        userId: this.$auth.user.id,
        courseId: this.courseId
      })
      this.elementsOptions.clientSecret = paymentIntent.client_secret
      this.$forceUpdate() // this is a hack to force the component to re-render and update the client secret
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
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
