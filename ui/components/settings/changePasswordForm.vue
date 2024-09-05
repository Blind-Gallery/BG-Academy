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
  <div>
    <div class="tw-pb-2 tw-border-b-2">
      <h4 class="tw-text-cyan-500">
        Change password
      </h4>
    </div>

    <div class="tw-my-4">
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
          validation-name="Current password"
        />
        <FormulateInput
          name="confirmPassword"
          type="password"
          label="New password"
          placeholder="Enter password"
          validation="required"
          validation-name="New password"
        />
        <p v-show="success" style="color: green; font-size: 0.8em">
          {{ message }}
        </p>
        <p v-show="!success" style="color: red; font-size: 0.8em">
          {{ message }}
        </p>
        <button :disabled="isLoading" :class="isLoading ? 'tw-bg-cyan-400 hover:tw-bg-cyan-400': ''" type="submit" class="tw-bg-cyan-500 tw-rounded hover:tw-bg-cyan-600 tw-duration-200 tw-ease-in-out tw-text-white tw-text-sm tw-py-2 tw-px-6">
          <span v-if="!isLoading">Save changes</span>
          <div v-else class="tw-flex tw-gap-2 tw-items-center">
            <Icon icon="eos-icons:bubble-loading" width="1rem" />
            <span>Saving changes</span>
          </div>
        </button>
      </FormulateForm>
    </div>
  </div>
</template>
