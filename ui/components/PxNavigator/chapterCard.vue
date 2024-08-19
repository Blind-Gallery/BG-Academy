<script>
export default {
  props: {
    title: {
      type: String,
      required: true

    },
    duration: {
      type: Number,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  methods: {
    formattedDuration (duration) {
      const totalMinutes = Math.floor(duration / 60)
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60

      if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`
      } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`
      }
    }
  }
}
</script>
<template>
  <div>
    <NuxtLink :to="'/courseNavigator/chapter/' + route" :class="route === $route.params.chapterId ? 'tw-bg-gray-100':''" class="tw-flex tw-flex-col tw-p-4 tw-text-inherit hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer hover:tw-no-underline hover:tw-text-inherit">
      <div class="tw-w-full tw-flex  tw-justify-between">
        <span class="tw-text-xs">{{ title }}</span>
        <div>
          <Icon icon="material-symbols-light:smart-display-outline-rounded" width="1rem" />
        </div>
      </div>
      <span class="tw-text-xs tw-text-gray-500">{{ formattedDuration(duration) }}</span>
    </NuxtLink>
  </div>
</template>
