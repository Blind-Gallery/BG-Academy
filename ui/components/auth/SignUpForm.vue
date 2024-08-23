<script>
export default {
  data () {
    return {
      signUpForm: {},
      invalidMessage: null
    }
  },

  methods: {
    async doEmailSignUp () {
      try {
        const signUpForm = this.signUpForm
        await this.$axios.$post('users', signUpForm)
        this.$auth.loginWith('local', {
          data: {
            ...signUpForm
          }
        })
        this.$bvModal.hide('signup')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.invalidMessage =
            'There is already an existing account with the email address'
        } else {
          this.invalidMessage = 'Sing Up error'
        }
      }
    }
  }
}
</script>
<template>
  <div>
    <h2 class="tw-text-cyan-500">
      Create new account
    </h2>
    <FormulateForm
      v-slot="{ isLoading }"
      v-model="signUpForm"
      class="login-form"
      @submit="doEmailSignUp"
    >
      <FormulateInput
        name="name"
        type="text"
        label="Your name"
        placeholder="Your name"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <FormulateInput
        label="Password"
        type="password"
        name="password"
        validation="required|matches:/[0-9]/|min:8,length"
        :validation-messages="{
          matches: 'Passwords must include a number.',
        }"
      />
      <FormulateInput
        label="Confirm password"
        type="password"
        name="password_confirm"
        validation="required|confirm"
        validation-name="Password confirmation"
      />
      <p class="small" style="font-size: small; color: #960505">
        {{ invalidMessage }}
      </p>
      <FormulateInput
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Sign up'"
      />
    </FormulateForm>
    <div class="divider">
      <hr>
      <span>OR </span>
      <hr>
    </div>

    <button
      class="tw-rounded tw-border tw-text-cyan-500 tw-p-2 tw-border-cyan-500 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200 hover:tw-text-cyan-600 tw-w-full"
      @click="$emit('switchComponent', 'auth-sign-up-wallet-form')"
    >
      <Icon
        icon="material-symbols:account-balance-wallet-outline"
        class="text-cyan-500"
        width="21"
      />
      Continue with wallet
    </button>

    <div class="tw-w-100 tw-flex tw-justify-center tw-items-center tw-my-4 tw-gap-1">
      <span class="tw-text-sm tw-text-center tw-text-gray-500">Already have an account?</span>
      <span class="tw-text-sm tw-text-cyan-500 hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200 tw-cursor-pointer" @click="$emit('switchComponent', 'auth-log-in-form')"> Sign In</span>
    </div>
  </div>
</template>
