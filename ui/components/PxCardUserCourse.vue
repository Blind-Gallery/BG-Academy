<template>
  <div class="tw-rounded tw-overflow-hidden tw-shadow hover:tw-shadow-md tw-duration-200 tw-ease-in-out">
    <div class="tw-w-full tw-h-[260px]">
      <img class="tw-w-full tw-h-full tw-object-cover" :src="cover">
    </div>
    <div class="tw-p-4">
      <h6 class="tw-font-bold tw-m-0">
        {{ title }}
      </h6>
      <div class="tw-flex tw-items-center tw-gap-2 tw-mt-2">
        <img class="tw-h-[20px] tw-w-[20px] tw-rounded-full" :src="pfp">
        <span class="tw-text-xs">Instructed by {{ instructor }}</span>
      </div>
      <hr>
      <p class="tw-p-0 tw-mt-2 tw-line-clamp-3  tw-text-xs tw-text-gray-500">
        {{ description }}
      </p>
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
    description: {
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
    }

  }

}
</script>
