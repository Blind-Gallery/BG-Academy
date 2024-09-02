<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    sales: {
      type: Number,
      default: 0,
      validator: value => value >= 0
    },
    volume: {
      type: Number,
      default: null
    },
    date: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedVolume () {
      if (this.volume === null) { return null }
      return this.title.includes('credit') ? `$${this.volume}` : `$XTZ ${this.volume}`
    }
  }
}
</script>

<template>
  <div class="tw-flex tw-flex-col hover:tw-shadow tw-duration-200 tw-ease-in-out tw-justify-between tw-border tw-rounded tw-w-full tw-h-[150px] tw-p-4 tw-mb-2 lg:tw-mb-0 tw-border-l-4 tw-border-l-cyan-500 tw-shadow-sm">
    <div class="tw-border tw-rounded-full tw-p-1 tw-w-fit tw-text-gray-500">
      <Icon :icon="icon" width="1.4rem" />
    </div>
    <div class="tw-flex tw-flex-col">
      <h4 v-if="formattedVolume" class="tw-truncate tw-text-cyan-500 tw-mb-0">
        {{ formattedVolume }}
      </h4>
      <h4 v-if="sales" class="tw-truncate tw-text-cyan-500 tw-mb-0">
        {{ sales }}
      </h4>
      <h4 v-if="date" class="tw-truncate tw-text-cyan-500 tw-mb-0">
        {{ date }}
      </h4>
      <span class="tw-text-gray-500 tw-text-sm">{{ title }}</span>
    </div>
  </div>
</template>
