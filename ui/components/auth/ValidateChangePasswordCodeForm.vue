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
      isLoading: false
    }
  },
  methods: {
    async validateCode () {
      try {
        await this.$axios.post('/auth/validate-code', this.form)
        this.$router.push('/auth/change-password')
      } catch (error) {
        this.$toast.error('Invalid code. Please try again.')
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
