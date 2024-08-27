<script>
export default {
  props: {

    route: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <NuxtLink :to="route" class="tw-flex tw-flex-col tw-border tw-rounded tw-p-4 tw-text-inherit hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer hover:tw-no-underline hover:tw-text-inherit">
      <div class="tw-w-full tw-flex tw-items-center  tw-justify-between">
        <span class="tw-text-sm tw-font-bold">Challenge</span>
        <div>
          <Icon icon="material-symbols-light:category-outline-rounded" width="1rem" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
