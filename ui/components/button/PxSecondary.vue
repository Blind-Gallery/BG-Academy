<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<template>
  <div>
    <button class="tw-flex tw-gap-1 tw-items-center tw-text-sm tw-text-cyan-500 tw-border  tw-border-cyan-500 tw-rounded tw-p-2 hover:tw-border-cyan-600  hover:tw-text-cyan-600 tw-ease-in-out tw-duration-200">
      <span>{{ text }}</span>
      <div v-if="icon">
        <Icon :icon="`material-symbols-light:${icon}`" width="1.5rem" />
      </div>
    </button>
  </div>
</template>
