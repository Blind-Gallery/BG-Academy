<script>
export default {
  props: {
    quote: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    twitter: {
      type: String,
      required: false,
      default: ''
    },
    farcaster: {
      type: String,
      required: false,
      default: ''
    },
    pfp: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="tw-flex tw-rounded tw-shadow tw-flex-col tw-gap-2 tw-p-4 tw-relative tw-h-[250px] tw-justify-between">
    <div
      class="tw-w-[40px] tw-h-[40px] tw-rounded-full tw-top-[-9%] tw-left-[10%] tw-shadow-sm tw-bg-cyan-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-absolute"
    >
      <Icon icon="material-symbols-light:format-quote" width="1.5rem" height="1.5rem" style="color: white" />
    </div>
    <div v-if="!quote">
      <slot name="quote" />
    </div>
    <div>
      <p class="tw-text-gray-500 tw-m-0 tw-text-xs tw-whitespace-pre-line">
        {{ quote }}
      </p>
    </div>

    <div class="tw-flex tw-items-center tw-justify-between tw-border-t-2 tw-pt-2">
      <div class="tw-flex tw-items-center tw-items-center tw-gap-2 tw-text-ellipsis tw-truncate">
        <div>
          <img
            class="tw-w-[30px] tw-max-w-[30px]  tw-rounded-full tw-overflow-hidden tw-object-cover"
            :src="pfp"
            :alt="`${name}'s profile picture`"
          >
        </div>
        <div class="tw-flex tw-flex-col">
          <h6 class="tw-text-sm  tw-truncate tw-m-0">
            {{ name }}
          </h6>
          <span class="tw-text-xs tw-text-gray-500">{{ role }}</span>
        </div>
      </div>
      <div>
        <a v-show="twitter" :href="twitter" target="_blank">
          <Icon icon="ri:twitter-x-line" width="1rem" height="1rem" />
        </a>
        <a v-show="farcaster" :href="farcaster" target="_blank">
          <Icon icon="simple-icons:farcaster" width="1rem" height="1rem" />
        </a>
      </div>
    </div>
  </div>
</template>
