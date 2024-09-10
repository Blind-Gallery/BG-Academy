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
    thumbnail: {
      type: String,
      required: true
    }
  }
}

</script>
<template>
  <div>
    <h4 class="tw-text-cyan-500 tw-mb-4">
      Share your activity
    </h4>
    <div class="tw-border tw-flex tw-flex-col tw-rounded tw-p-4 tw-gap-4">
      <img :src="thumbnail">
      <p class="tw-m-0">
        I just enrolled in <span class="tw-font-bold tw-text-cyan-500">{{ title }}</span> by {{ instructor }}! Check it out below
      </p>
    </div>
    <hr>
    <div>
      <span class="tw-font-bold tw-text-xs">Share this link via:</span>
      <div class="tw-flex tw-gap-2 tw-items-center">
        <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
          <Icon icon="simple-icons:farcaster" width="1rem" height="1rem" />
        </div>
        <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
          <Icon icon="ri:twitter-x-line" width="1rem" height="1rem" />
        </div>
        <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
          <Icon icon="mdi:instagram" width="1rem" height="1rem" />
        </div>
      </div>
    </div>
  </div>
</template>
