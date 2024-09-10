<script>
export default {
  data () {
    return {
      signInForm: {}
    }
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
    async emailConnect () {
      try {
        const ipAddress = await this.getIp()
        await this.$auth.loginWith('local', {
          data: {
            ipAddress,
            ...this.signInForm
          }
        })
        this.$emit('closeModal')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$formulate.handle({
            formErrors: ['Invalid email or password. Please check your credentials and try again.']
          }, 'login')
        } else {
          this.$formulate.handle({
            formErrors: ['Something went wrong, please try again.']
          }, 'login')
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="tw-text-cyan-500">
      Welcome Back
    </h2>
    <FormulateForm
      v-slot="{ isLoading }"
      v-model="signInForm"
      name="login"
      @submit="emailConnect"
    >
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        validation="required|matches:/[0-9]/|min:8,length"
        :validation-messages="{
          matches: 'Passwords must include a number.',
        }"
      />

      <div class="tw-mb-2 ">
        <span class="tw-text-sm tw-text-cyan-500 hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200 tw-cursor-pointer" @click="$emit('switchComponent', 'auth-recover-password-flow')"> Did you forget the password?</span>
      </div>
      <FormulateErrors />
      <FormulateInput
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Sign In'"
      />
    </FormulateForm>
    <div class="divider">
      <hr>
      <span>OR </span>
      <hr>
    </div>
    <auth-log-in-wallet-button
      @closeModal="$emit('closeModal')"
    />
    <div class="tw-w-100 tw-flex tw-justify-center tw-items-center tw-my-4 tw-gap-1">
      <span class="tw-text-sm tw-text-center tw-text-gray-500">Don't have an account yet?</span>
      <span class="tw-text-sm tw-text-cyan-500 hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200 tw-cursor-pointer" @click="$emit('switchComponent', 'auth-sign-up-form')"> Sign Up</span>
    </div>
  </div>
</template>

<style scoped>
.divider {
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0rem;
}

.divider > hr {
  margin: 0px;
  height: 1px;
  border: none;
  flex: 1 1 0%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.divider > span {
  font-size: small;
  color: #888888;
  padding: 0.3rem;
}
</style>
