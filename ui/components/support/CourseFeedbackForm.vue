<script>
export default {
  data () {
    return {
      courseRate: null,
      courseFeedback: {}
    }
  },

  methods: {
    async submitFeedback () {
      try {
        await this.$axios.post('/course/feedback', this.feedbackForm)
        this.$emit('closeModal')
      } catch (error) {
        this.invalidMessage = 'Feedback submission error'
      }
    }
  }
}
</script>

<template>
  <div>
    <h4>
      Congratulations for completing <span style="color:#00B9CD">Introduction to the Blockchain Art World</span>
    </h4>
    <hr>
    <p class="small">
      Help us to rate this course to keep improving our content
    </p>
    <div class="mb-4">
      <b-form-rating v-model="courseRate" color="#00b9cd" size="lg" />
    </div>
    <FormulateForm v-slot="{ isLoading }" v-model="courseFeedback" class="login-form" @submit="sendFeedback">
      <FormulateInput
        name="feedback"
        type="textarea"
        label="Tell us what you liked and what you would improve about this course."
        placeholder=""
      />

      <FormulateInput type="submit" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Send feedback'" />
    </FormulateForm>
  </div>
</template>
