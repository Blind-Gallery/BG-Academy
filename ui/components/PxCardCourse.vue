<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <div
      class="tw-h-[350px] tw-w-[600px] tw-bg-gray-200 tw-rounded tw-p-4 tw-flex tw-flex-col tw-justify-between tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative"
      :style="`background-image: url(${thumbnail})`"
    >
      <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-90 tw-z-10 tw-rounded" />
      <div />

      <div class="tw-relative tw-z-20  tw-p-2 tw-rounded tw-text-white">
        <div class="tw-mb-2">
          <h5 class="tw-mb-0">
            {{ title }}
          </h5>
          <span>By {{ instructor }}</span>
        </div>
        <p class="tw-text-sm tw-line-clamp-2">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
