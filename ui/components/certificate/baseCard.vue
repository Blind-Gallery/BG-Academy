<template>
  <div>
    <div class="tw-rounded tw-shadow tw-overflow-hidden">
      <div class="tw-w-full tw-h-[260px]">
        <img class="tw-w-full tw-h-full tw-object-cover" :src="cover" alt="Cover Image">
      </div>
      <div class="tw-p-4">
        <div class="tw-flex tw-items-center tw-gap-2">
          <h6 class="tw-font-bold tw-truncate">
            {{ title }}
          </h6>
          <div>
            <Icon
              v-b-tooltip.hover
              title="Course certificate"
              color="#00b9cd"
              icon="material-symbols:verified-outline"
              width="1.25rem"
            />
          </div>
        </div>
        <p class="tw-text-sm tw-text-gray-500">
          Instructed by {{ instructor }}
        </p>
        <div class="tw-flex tw-flex-col tw-gap-2">
          <certificate-download-button
            :course-id="courseId"
          />

          <certificate-mint-button v-if="$auth?.user?.tezos_info" :hash="opHash" :course-id="courseId" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    cover: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    student: {
      type: String,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    tokenId: {
      type: Number,
      required: false,
      default: null
    },
    opHash: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      TZKT_ENDPOINT: null,
      approvedCourse: null
    }
  },

  async mounted () {
    await this.getCertificate()
  },

  methods: {
    async getCertificate () {
      try {
        const { cid } = await this.$axios.$post('/docs/certificate', {
          userId: this.$auth.user.id,
          courseId: this.courseId
        })

        this.approvedCourse = cid
        this.$emit('certificate-received', cid)
        this.$forceUpdate()
      } catch (error) {
        console.error('No certificate', error)
        this.$emit('certificate-received', false)
      }
    }
  }

}
</script>
<style></style>
