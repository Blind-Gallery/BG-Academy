<script>
export default {
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        code: ''
      },
      success: false,
      isLoading: false,
      message: ''
    }
  },
  methods: {
    async validateCode () {
      if (!this.form.code) {
        this.message = 'Please enter the code.'
        return
      }
      if (!this.form.code) {
        this.message = 'Please enter the code.'
        return
      }
      try {
        const payload = {
          email: this.email,
          code: this.form.code
        }
        this.isLoading = true
        this.success = true
        await this.$axios.post('/auth/validate-recover-password-code', payload)
        this.$emit('code-validated')
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.success = false
        this.message = 'An error occurred. Please try again.'
      }
    }
  }

}
</script>

<template>
  <div>
    <FormulateForm v-model="form" class="w-100" @submit="validateCode">
      <FormulateInput name="code" type="text" label="Code" placeholder="Enter code" validation="required" />
      <p v-show="success" style="color: green; font-size: 0.8em">
        {{ message }}
      </p>
      <p v-show="!success" style="color: red; font-size: 0.8em">
        {{ message }}
      </p>
      <button type="submit" class="primary-btn" @click="validateCode">
        {{ isLoading ? 'Validating code' : 'Validate code' }}
      </button>
    </FormulateForm>
  </div>
</template>
