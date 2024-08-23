<script>
export default {
  data () {
    return {
      educatorsForm: {}
    }
  },
  methods: {
    sendEducatorForm () {
      try {
        this.$axios.$post('/emails/become-an-instructor', this.educatorsForm)
        this.$bvModal.hide('educatorsForm')
        this.$refs.alert.showAlert('Success', 'Thank you for applying!')
      } catch (error) {
        console.error(error)
      }
      console.info(`Send this form ${this.educatorsForm}`)
    }
  }
}
</script>

<template>
  <div>
    <h2>Become an educator</h2>
    <div class="mb-4">
      <p class="m-0 small">
        <span style="font-weight: 600">Join Our Educator Community:</span><br>
        Are you an experienced in the field of digital art?
      </p>
      <span class="text-secondary small">We welcome passionate educators to join our community. Share your
        expertise and shape the future of digital art education.
      </span>
    </div>
    <FormulateForm v-slot="{ isLoading }" v-model="educatorsForm" class="login-form" @submit="sendEducatorForm">
      <FormulateInput name="name" type="text" label="Your name" placeholder="Name" validation="required" />
      <FormulateInput
        name="email"
        type="email"
        label="Email address"
        placeholder="educator@academy.co"
        validation="required|email"
      />
      <FormulateInput
        name="description"
        type="textarea"
        label="What kind of educational course would you like to create?"
        placeholder=""
        validation="required"
      />
      <FormulateInput type="submit" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Apply'" />
    </FormulateForm>
  </div>
</template>
