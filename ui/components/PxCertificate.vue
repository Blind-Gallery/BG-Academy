<template>
  <div>
    <div class="card-body shadow-sm rounded d-flex flex-column align-items-center">
      <div class="w-100">
        <img width="100%" class="rounded" :src="cover">
      </div>
      <div class="d-flex flex-column mt-3">
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
        <p class="m-0 text-secondary">
          Transaction: <a :href="`${TZKT_ENDPOINT}/${opHash}`" target="_blank">
            {{ opHash }}
          </a>
        </p>
        <certificates-mint-button :course-id="courseId" />
        <certificates-download-button
          class="mb-2"
          :course-id="courseId"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import { TZKT_ENDPOINT } from '~/constants'

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

    }
  },
  methods: {

  }

}
</script>
<style></style>
