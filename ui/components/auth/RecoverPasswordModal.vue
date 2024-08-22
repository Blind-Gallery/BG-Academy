<script>
export default {
  data () {
    return {
      recoverPasswordForm: {
        email: ''
      },
      successMessage: ''
    }
  },
  methods: {
    async doRecover () {
      try {
        this.successMessage = ''
        await this.$axios.post('/auth/recover-password', this.recoverPasswordForm)
        this.successMessage = 'Password recovery email sent. Check your inbox.'
      } catch (error) {
        this.successMessage = 'An error occurred. Please try again.'
      }
    }
  }
}

</script>

<template>
  <b-modal id="recoverPassword" centered hidden-header hide-footer>
    <template #modal-header="{ close }">
      <h2>Recover password</h2>

      <span style="cursor: pointer" @click="close()">
        <Icon width="32" color="#888" icon="material-symbols:close" />
      </span>
    </template>
    <p style="font-size: small">
      Enter the email address you use on the platform. We will send you a
      link to reset your password.
    </p>
    <FormulateForm v-slot="{ isLoading }" v-model="recoverPasswordForm" class="login-form" @submit="doRecover">
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <p style="color: green; font-size: 0.8em">
        {{ successMessage }}
      </p>
      <FormulateInput type="submit" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Recover password'" />
    </FormulateForm>
  </b-modal>
</template>
