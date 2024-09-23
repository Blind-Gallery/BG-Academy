<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    pfp: {
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
    },
    categories: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<template>
  <div>
    <div
      class="tw-h-[350px] tw-w-full tw-bg-gray-200 tw-rounded tw-p-4 tw-flex tw-flex-col tw-justify-between tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-shadow hover:tw-shadow-lg tw-ease-in-out tw-duration-200"
      :style="`background-image: url(${thumbnail})`"
    >
      <div
        v-if="categories"
        class="tw-absolute tw-p-3 tw-top-0 tw-left-0 tw-z-30  tw-py-2 tw-rounded-full tw-bg-black tw-m-4 tw-opacity-70 tw-w-[100px] tw-flex tw-items-center tw-justify-center"
      >
        <span class="tw-text-xs tw-text-white">{{ categories }}</span>
      </div>
      <div class="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-black tw-to-transparent tw-opacity-90 tw-z-10 tw-rounded" />
      <div />

      <div class="tw-relative tw-z-20  tw-p-2 tw-rounded tw-text-white">
        <div class="tw-mb-2">
          <div class="tw-flex tw-items-center tw-gap-2 tw-text-black tw-bg-white  tw-rounded-full tw-w-fit tw-px-2 tw-py-1 tw-text-xs tw-mt-2">
            <div class="tw-w-[20px] tw-h-[20px] tw-overflow-hidden tw-rounded-full">
              <img width="100%" :src="pfp">
            </div>
            <span>By {{ instructor }}</span>
          </div>
          <h5 class="tw-mb-0">
            {{ title }}
          </h5>
        </div>
        <p class="tw-text-sm tw-line-clamp-2">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
