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

      <p
        class="small m-0 text-center"
        style="font-size: small; color: #960505"
      >
        {{ invalidMessage }}
      </p>
      <div class="tw-mb-2 ">
        <span class="tw-text-sm tw-text-cyan-500 hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200 tw-cursor-pointer" @click="$emit('switchComponent', 'auth-recover-password-flow')"> Did you forget the password?</span>
      </div>
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
    <auth-login-wallet-button />
    <div class="tw-w-100 tw-flex tw-justify-center tw-items-center tw-my-4 tw-gap-1">
      <span class="tw-text-sm tw-text-center tw-text-gray-500">Don't have an account yet?</span>
      <span class="tw-text-sm tw-text-cyan-500 hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200 tw-cursor-pointer" @click="$emit('switchComponent', 'auth-signUpForm')"> Sign Up</span>
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
