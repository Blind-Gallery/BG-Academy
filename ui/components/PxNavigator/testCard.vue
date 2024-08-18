<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    },
    questions: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <NuxtLink :to="'/courseNavigator/test/' + route" class="tw-flex tw-flex-col tw-p-4 tw-text-inherit hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer hover:tw-no-underline hover:tw-text-inherit">
      <div class="tw-w-full tw-flex  tw-justify-between">
        <span class="tw-text-xs">Test</span>
        <div>
          <Icon icon="material-symbols-light:checklist" width="1rem" />
        </div>
      </div>

      <span class="tw-text-xs tw-text-gray-500">Total questions: {{ questions }}</span>
    </NuxtLink>
  </div>
</template>
