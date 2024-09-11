<template>
  <div class="w-100">
    <PxModal ref="activityModal">
      <template #body>
        <share-activity-claim-certificate :title="title" :instructor="instructor" :course-id="courseId" />
      </template>
    </PxModal>
    <button
      v-if="!soulBoundTokenId"
      class="tw-flex tw-w-full  tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200"
      :disabled="loading"
      @click="getCertificate"
    >
      <span v-if="loading">Claiming Certificate... Please wait</span>
      <span v-else>Claim certificate</span>
    </button>

    <a v-else class="text-decoration-none w-100" :href="`https://objkt.com/tokens/${contractAddress}/${soulBoundTokenId}`" target="_blank">
      <button class="tw-flex tw-w-full  tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200">
        See in objkt
      </button>
    </a>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'
import { TEZOS } from '~/constants'

const GET_CERTIFICATE_INFO = gql`
  query ($courseId: String!, $userId: String!) {
  user_course_by_pk(course_id: $courseId, user_id: $userId) {
    soul_bound_token_id
  }
}
`
export default {
  apollo: {
    user_course_by_pk: {
      query: GET_CERTIFICATE_INFO,
      variables () {
        return {
          courseId: this.courseId,
          userId: this.$auth.user.id
        }
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      contractAddress: TEZOS.CONTRACT_ADDRESS.sbt,
      tokenId: null,
      loading: false,
      url: null,
      TZKT_ENDPOINT: TEZOS.TZKT_ENDPOINT
    }
  },
  computed: {
    soulBoundTokenId () {
      return this.user_course_by_pk?.soul_bound_token_id || this.tokenId
    }
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
        this.loading = true
        const { soulBoundTokenId } = await this.$axios.$post('/docs/mint', {
          userId: this.$auth.user.id,
          courseId: this.courseId
        })
        this.$notify({ type: 'success', text: 'Certificate successfully minted' })
        this.tokenId = soulBoundTokenId
        this.openActivityModal()
      } catch (e) {
        console.error(e)
        this.loading = false
        this.$notify({ type: 'error', text: 'Something went wrong, please try again' })
      } finally {
        this.loading = false
      }
    }

  }
}
</script>
