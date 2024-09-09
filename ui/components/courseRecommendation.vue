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
    rol: {
      type: String,
      required: true
    },
    social: {
      type: String,
      required: true
    },
    pfp: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="tw-flex tw-rounded tw-shadow tw-flex-col tw-gap-2 tw-p-8 tw-relative tw-h-[250px] tw-justify-between">
    <div class="tw-w-[40px] tw-h-[40px] tw-rounded-full tw-top-[-9%] tw-left-[10%] tw-shadow-sm tw-bg-cyan-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-absolute">
      <Icon icon="material-symbols-light:format-quote" width="1.5rem" height="1.5rem" style="color: white" />
    </div>
    <div>
      <p class="tw-text-gray-500 tw-m-0 tw-text-sm">
        {{ quote }}
      </p>
    </div>

    <div class="tw-flex tw-items-center tw-justify-between tw-border-t-2 tw-pt-2">
      <div class="tw-flex tw-items-center tw-gap-2 tw-text-ellipsis tw-truncate">
        <div>
          <img class="tw-w-[30px] tw-max-w-[30px]  tw-rounded-full tw-overflow-hidden tw-object-cover" :src="pfp" alt="Profile picture">
        </div>

        <h6 class="tw-text-sm tw-text-gray-500 tw-truncate">
          {{ name }}
        </h6>
      </div>
      <NuxtLink :to="social" target="_blank">
        <Icon icon="ri:twitter-x-line" width="1rem" height="1rem" />
      </NuxtLink>
    </div>
  </div>
</template>
