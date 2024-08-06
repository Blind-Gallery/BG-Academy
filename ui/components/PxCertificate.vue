<template>
  <div>
    <div class="card-body shadow-sm rounded d-flex flex-column align-items-center">
      <div class="w-100">
        <img width="100%" class="rounded" :src="cover">
      </div>
      <div class="d-flex flex-column mt-3 w-100">
        <div class="d-flex" style="gap:0.5rem">
          <h6 style="font-weight: 600;" class="card-title m-0 text-truncate">
            {{ title }}
          </h6>
          <Icon
            v-b-tooltip.hover
            title="Course certificate"
            color="#00b9cd"
            icon="material-symbols:verified-outline"
            width="1.25rem"
          />
        </div>
        <p class="text-secondary small">
          Instructed by {{ instructor }}
        </p>

        <certificates-download-button
          :course-id="courseId"
          class="mb-2"
        />
        <div v-if="$auth?.user?.tezos_info" class="d-flex w-100">
          <certificates-mint-button v-if="!opHash" :course-id="courseId" />
          <a v-else class="text-decoration-none w-100" :href="`${TZKT_ENDPOINT}/${opHash}`" target="_blank">
            <button class="secondary-btn w-100">

              Check transaction

            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { TZKT_ENDPOINT } from '~/constants'

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
      type: Number,
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
      TZKT_ENDPOINT: null
    }
  },
  mounted () {
    this.TZKT_ENDPOINT = TZKT_ENDPOINT
  },
  methods: {

  }

}
</script>
<style></style>
