<script>
export default {
  data () {
    return {
      recoverPasswordForm: {
        email: ''
      },
      message: '',
      success: false,
      showInsertCodeForm: false,
      showNewPasswordForm: false,
      userId: ''
    }
  },
  methods: {
    async sendEmailConfirmation () {
      try {
        const { data: { userId } } = await this.$axios.post('/auth/recover-password', this.recoverPasswordForm)
        this.userId = userId
        this.message = 'Password recovery email sent. Check your inbox.'
        this.success = true
        this.showInsertCodeForm = true
      } catch (error) {
        this.message = 'An error occurred. Please try again.'
      }
    },
    passwordChanged () {
      this.showInsertCodeForm = false
      this.showNewPasswordForm = false
      this.$emit('switchComponent', 'auth-log-in-form')
    }
  }
}

</script>

<template>
  <div>
    <p style="font-size: small">
      Enter the email address you use on the platform. We will send you a
      link to reset your password.
    </p>
    <FormulateForm
      v-slot="{ isLoading }"
      v-model="recoverPasswordForm"
      class="login-form"
      @submit="sendEmailConfirmation"
    >
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        validation="required|email"
      />
      <p v-show="success" style="color: green; font-size: 0.8em">
        {{ message }}
      </p>
      <p v-show="!success" style="color: red; font-size: 0.8em">
        {{ message }}
      </p>
      <FormulateInput
        v-show="!showInsertCodeForm"
        type="submit"
        :disabled="isLoading"
        :label="isLoading ? 'Loading...' : 'Recover password'"
      />
    </FormulateForm>
    <auth-validate-change-password-code-form
      v-if="showInsertCodeForm && !showNewPasswordForm"
      :email="recoverPasswordForm.email"
      @code-validated="showNewPasswordForm = true"
    />
    <auth-recover-password-form v-if="showNewPasswordForm" :user-id="userId" @password-changed="passwordChanged" />
  </div>
</template>
