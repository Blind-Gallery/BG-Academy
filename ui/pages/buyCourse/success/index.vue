<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 90vh;">
    <PxModal ref="activityModal">
      <template #body>
        <share-activity-course-purchase :title="courseInfo?.name" :thumbnail="courseInfo?.thumbnail" :instructor="courseInfo?.teacher?.name" />
      </template>
    </PxModal>
    <div
      class="
      d-flex
      flex-column
      align-items-center
      justify-content-center
      p-5
      rounded
      shadow-sm
      "
    >
      <Icon
        class="mb-2"
        color="#4ECB71"
        width="8rem"
        icon="material-symbols:check-circle-rounded"
      />
      <h1>Done!</h1>
      <p class="text-center">
        Your payment has been successfully
        processed,<br> you will receive an email shortly.
      </p>
      <button
        class="primary-btn"
        @click="goToFirstChapterId"
      >
        Home page
      </button>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

const COURSE_INFO = gql`
query ($id: String!) {
  courses_by_pk(id: $id) {
   name
   thumbnail
   teacher {
      name
    }
    modules (order_by: {created_at: asc}) {
      chapters (order_by: {created_at: asc}) {
        id
      }
    }
  }
}
`
export default {
  data () {
    this.pk = process.env.STRIPE_PUBLISHABLE_KEY
    return {
      courseId: null,
      error: null,
      courseInfo: null
    }
  },

  computed: {
    handleCourseId () {
      return this.courseId
    }
  },
  watch: {
    handleCourseId (newVal) {
      if (newVal) {
        this.getCourseInfo(newVal)
      }
    }
  },
  created () {
    this.checkParams()
  },
  mounted () {
    this.openActivityModal('share-activity-course-purchase')
  },
  methods: {
    openActivityModal (component) {
      const modalInstance = this.$refs.activityModal
      if (modalInstance) {
        modalInstance.showModal(component)
      }
    },
    /**
     * Check if the user has been redirected from the payment page
     * and if the payment was successful give the user access to the course
     *
     * The user can be redirected from the payment page if the payment was successful
     * in two case scenarios:
     * 1. The user paid with a credit card
     * 2. The user paid with Tezos
     *
     * In the first case the user will be redirected to the success page with the
     * query param "payment_intent" set to the payment intent id of the payment
     * and the "payment_intent_client_secret" set to the client secret of the payment intent
     *
     * In the second case the user will be redirected to the success page with the
     * query param "opHash" set to the operation hash of the payment
     * and the "courseId" set to the id of the course
     */
    checkParams () {
      if (!this.$auth.loggedIn) {
        console.error('You need to be logged in to access this page')
        return
      }
      const { payment_intent: paymentIntent, payment_intent_client_secret: paymentIntentClientSecret, opHash, courseId, onchainId } = this.$route.query
      if (paymentIntent && paymentIntentClientSecret) {
        this.stripeVerify(paymentIntent, paymentIntentClientSecret)
      } else if (opHash && courseId && onchainId) {
        this.tezosVerify(opHash, courseId, onchainId)
      } else {
        this.error = 'Something went wrong'
      }
    },
    async stripeVerify (paymentIntent, paymentIntentClientSecret) {
      try {
        const { courseId } = await this.$axios.$post('/payments/stripe/verify-payment', {
          userId: this.$auth.user.id,
          paymentIntent,
          paymentIntentClientSecret
        })
        this.courseId = courseId
      } catch (error) {
        this.error = error.message
      }
    },
    async tezosVerify (opHash, courseId, onchainId) {
      try {
        await this.$axios.$post('/payments/tezos/verify-payment', {
          userId: this.$auth.user.id,
          opHash,
          courseId,
          onchainId
        })
        this.courseId = courseId
      } catch (error) {
        this.error = error.message
      }
    },
    async getCourseInfo () {
      const { data } = await this.$apollo.query({
        query: COURSE_INFO,
        variables: {
          id: this.courseId
        }
      })
      return data.courses_by_pk
    },
    async goToFirstChapterId () {
      const course = await this.getCourseInfo()
      this.$router.push(`/courseNavigator/chapter/${course.modules[0].chapters[0].id}`)
    }
  }
}
</script>
