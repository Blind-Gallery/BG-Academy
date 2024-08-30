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
      if (!this.$auth.loggedIn) {
        this.invalidMessage = 'Please login to submit feedback'
        return
      }
      if (!this.courseRate) {
        this.invalidMessage = 'Please rate the course'
        return
      }
      try {
        const payload = {
          route: this.$nuxt.$route.path,
          rating: this.courseRate,
          feedback: this.courseFeedback.feedback,
          userId: this.$auth.user.id
        }
        await this.$axios.post('/course/feedback', payload)
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
    <h4 class="tw-text-cyan-500">
      Help us to rate this course to keep improving our content
    </h4>
    <hr>

    <div class="mb-4">
      <b-form-rating v-model="courseRate" color="#00b9cd" size="lg" />
    </div>
    <FormulateForm v-slot="{ isLoading }" v-model="courseFeedback" class="login-form" @submit="submitFeedback">
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
