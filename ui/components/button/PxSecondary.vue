<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    suffixIcon: {
      type: String,
      required: false,
      default: null
    },
    prefixIcon: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<template>
  <div>
    <button class="tw-flex tw-min-w-40 tw-gap-1 tw-items-center tw-justify-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-p-2 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200" @click="$emit('click')">
      <Icon v-if="prefixIcon" :icon="`material-symbols-light:${prefixIcon}`" width="1.5rem" />
      <span>{{ text }}</span>
      <div v-if="suffixIcon">
        <Icon :icon="`material-symbols-light:${suffixIcon}`" width="1.5rem" />
      </div>
    </button>
  </div>
</template>
