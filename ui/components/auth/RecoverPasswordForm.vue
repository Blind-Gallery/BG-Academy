<script>
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      passwordData: {},
      message: '',
      success: false
    }
  },
  methods: {
    validatePasswordMatch () {
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        this.message = 'Passwords do not match.'
        return false
      }
      return true
    },
    async changePassword () {
      if (!this.validatePasswordMatch()) {
        return
      }
      try {
        const payload = {
          newPassword: this.passwordData.newPassword,
          userId: this.userId
        }
        await this.$axios.post('/users/reset-password', payload)
        this.message = 'Password changed successfully.'
        this.success = true
        this.$emit('password-changed')
      } catch (error) {
        console.error(error)
        this.message = 'An error occurred. Please try again.'
      }
    }
  }

}

</script>

<template>
  <div class="my-4">
    <p><b>Change password</b></p>

    <FormulateForm v-slot="{ isLoading }" v-model="passwordData" class="w-100" @submit="changePassword">
      <FormulateInput
        name="newPassword"
        type="password"
        label="New password"
        placeholder="Enter password"
        validation="required|matches:/[0-9]/|min:8,length"
        :validation-messages="{
          matches: 'Passwords must include a number.',
        }"
      />
      <FormulateInput
        name="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Enter password"
        validation="required"
        validation-name="Confirmation"
      />
      <p v-show="success" class="tw-text-green-500 tw-text-xs">
        {{ message }}
      </p>
      <p v-show="!success" class="tw-text-red-500 tw-text-xs">
        {{ message }}
      </p>
      <button :disabled="isLoading" type="submit" class="primary-btn">
        {{ isLoading ? 'Saving changes' : 'Save changes' }}
      </button>
    </FormulateForm>
  </div>
</template>
