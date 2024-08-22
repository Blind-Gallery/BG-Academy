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
    <div class="divider">
      <hr>

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
      <span>OR </span>
      <hr>
    </div>
    <auth-walletBtn />
  </div>
</template>
