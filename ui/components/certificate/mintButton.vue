<template>
  <div class="w-100">
    <button
      v-if="!hash"
      class="tw-flex tw-w-full  tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200"
      :disabled="loading"
      @click="getCertificate"
    >
      <span v-if="loading">Claiming Certificate...</span>
      <span v-else>Claim certificate</span>
    </button>

    <a v-else class="text-decoration-none w-100" :href="`${TZKT_ENDPOINT}/${hash}`" target="_blank">
      <button class="tw-flex tw-w-full  tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200">
        Check transaction
      </button>
    </a>
  </div>
</template>

<script>
import { TZKT_ENDPOINT } from '~/constants'
export default {
  props: {
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
      loading: false,
      url: null,
      TZKT_ENDPOINT: null
    }
  },

  mounted () {
    this.TZKT_ENDPOINT = TZKT_ENDPOINT
  },
  methods: {
    async getCertificate () {
      try {
        this.loading = true
        const { status, opHash } = await this.$axios.$post('/docs/mint', {
          userId: this.$auth.user.id,
          courseId: this.courseId
        })
        console.info(status, opHash)
        this.$notify({ type: 'success', text: 'Certificate successfully minted' })
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
