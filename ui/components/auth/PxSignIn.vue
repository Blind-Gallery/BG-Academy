<script>
export default {
  data () {
    return {
      signInForm: {},
      invalidMessage: null
    }
  },

  methods: {
    async emailConnect () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            ...this.signInForm
          }
        })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.invalidMessage = 'Invalid email or password'
        } else {
          this.invalidMessage = 'Sign In error'
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
      class="login-form"
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

      <FormulateInput
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Sign In'"
      />
    </FormulateForm>
  </div>
</template>
