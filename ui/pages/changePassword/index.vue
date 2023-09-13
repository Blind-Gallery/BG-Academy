<template>
  <div>
    <b-container style="max-width: 1240px">
      <PxAlert ref="alert" />
      <div class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
        <div class="w-50">
          <h4>Change your password</h4>
          <FormulateForm
            v-slot="{ isLoading }"
            v-model="changePasswordForm"
            class="login-form"
            @submit="doChangePassword"
          >
            <FormulateInput
              label="New password"
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
            <FormulateInput
              type="submit"
              :disabled="isLoading"
              :label="isLoading ? 'Loading...' : 'Change password'"
            />
          </FormulateForm>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import PxAlert from '~/components/PxAlert.vue'

export default {
  components: { PxAlert },
  data () {
    return {
      changePasswordForm: {}
    }
  },
  methods: {
    doChangePassword () {
      this.$refs.alert.showAlert('Password successfully changed!')
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  }
}
</script>
<style></style>
