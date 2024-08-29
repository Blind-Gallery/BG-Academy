<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: null
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
    <button type="button" :class="width" class="tw-flex tw-border   tw-gap-1 tw-border-cyan-500 tw-items-center tw-justify-center tw-text-sm tw-text-white tw-bg-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-bg-cyan-600 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200" @click="$emit('click')">
      <Icon v-if="prefixIcon" :icon="`material-symbols-light:${prefixIcon}`" width="1.5rem" />
      <span>{{ text }}</span>
      <div v-if="suffixIcon">
        <Icon v-if="suffixIcon" :icon="`material-symbols-light:${suffixIcon}`" width="1.5rem" />
      </div>
    </button>
  </div>
</template>
