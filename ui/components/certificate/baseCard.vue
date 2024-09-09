<template>
  <div>
    <PxModal ref="activityModal">
      <template #body>
        <share-activity-claim-certificate :title="title" :instructor="instructor" />
      </template>
    </PxModal>
    <div :class="approvedCourse ? '':'tw-opacity-50 tw-cursor-not-allowed' " class="tw-rounded tw-shadow tw-overflow-hidden">
      <div class="tw-w-full tw-h-[260px]">
        <img class="tw-w-full tw-h-full tw-object-cover" :src="cover" alt="Cover Image">
      </div>
      <div class="tw-p-4">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-flex tw-items-center tw-gap-2">
            <h6 class="tw-font-bold tw-truncate">
              {{ title }}
            </h6>
            <div>
              <Icon
                v-if="approvedCourse"
                v-b-tooltip.hover
                title="Course certificate"
                color="#00b9cd"
                icon="material-symbols-light:verified-outline"
                width="1.5rem"
              />
            </div>
          </div>
          <button v-if="approvedCourse" class="tw-cursor-pointer tw-shadow-sm  tw-w-[30px] tw-h-[30px] tw-rounded tw-flex tw-justify-center tw-items-center hover:tw-shadow  tw-duration-200 tw-ease-in-out" @click="openActivityModal()">
            <Icon
              v-b-tooltip.hover
              title="Share on socials"
              icon="material-symbols-light:share-outline"
              width="1.5rem"
            />
          </button>
        </div>
        <p class="tw-text-sm tw-text-gray-500">
          Instructed by {{ instructor }}
        </p>
        <div v-if="approvedCourse" class="tw-flex tw-flex-col tw-gap-2">
          <certificate-download-button
            :course-id="courseId"
          />

          <certificate-mint-button v-if="$auth?.user?.tezos_info" :hash="opHash" :course-id="courseId" :title="title" :instructor="instructor" />
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
    openActivityModal (component) {
      const modalInstance = this.$refs.activityModal
      if (modalInstance) {
        modalInstance.showModal(component)
      }
    },
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
