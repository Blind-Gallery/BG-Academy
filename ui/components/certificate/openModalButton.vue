<script>
export default {
  props: {
    approvedCourse: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<template>
  <div>
    <button v-if="approvedCourse" class="tw-mb-2 tw-flex tw-border tw-w-full  tw-gap-1 tw-border-cyan-500 tw-items-center tw-justify-center tw-text-sm tw-text-white tw-bg-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-bg-cyan-600 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200" @click="$emit('click')">
      <Icon icon="material-symbols-light:verified-rounded" width="1.25rem" />
      <span>Get certificate</span>
    </button>

    <button
      v-else
      v-b-tooltip.hover
      title="Complete the exams to obtain the certificate"
      class="tw-opacity-50 tw-cursor-not-allowed tw-mb-2 tw-flex tw-border tw-w-full  tw-gap-1 tw-border-cyan-500 tw-items-center tw-justify-center tw-text-sm tw-text-white tw-bg-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-bg-cyan-600 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200"
    >
      <Icon icon="material-symbols-light:verified-rounded" width="1.25rem" />
      <span>Get certificate</span>
    </button>
  </div>
</template>
