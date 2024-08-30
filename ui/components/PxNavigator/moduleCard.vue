<script>
export default {
  props: {
    moduleInfo: {
      type: Object,
      required: true
    },
    activeModule: {
      type: String,
      required: false,
      default: null
    }

  }
}
</script>

<template>
  <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-p-4">
    <div class="tw-w-full tw-flex tw-justify-between">
      <span :class="moduleInfo.id === activeModule ? 'tw-text-cyan-500': ''" class="tw-font-bold tw-text-sm   tw-mb-0 tw-truncate">
        {{ moduleInfo.title }}
      </span>
      <slot name="icon" />
    </div>
    <span class="tw-text-xs tw-text-gray-500">Chapters: {{ moduleInfo.chapters.length }}</span>
  </div>
</template>
