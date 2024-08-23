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
    async changePassword () {
      try {
        const payload = {
          password: this.passwordData.newPassword,
          userId: this.userId
        }
        await this.$axios.post('/users/change-password', payload)
        this.message = 'Password changed successfully.'
        this.success = true
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
        label="Current password"
        placeholder="Enter password"
        validation="required|matches:/[0-9]/|min:8,length"
        :validation-messages="{
          matches: 'Passwords must include a number.',
        }"
      />
      <FormulateInput
        name="confirmPassword"
        type="password"
        label="New password"
        placeholder="Enter password"
        validation="required"
        validation-name="Confirmation"
      />
      <p v-show="success" style="color: green; font-size: 0.8em">
        {{ message }}
      </p>
      <p v-show="!success" style="color: red; font-size: 0.8em">
        {{ message }}
      </p>
      <button :disabled="isLoading" type="submit" class="primary-btn">
        {{ isLoading ? 'Saving changes' : 'Save changes' }}
      </button>
    </FormulateForm>
  </div>
</template>
