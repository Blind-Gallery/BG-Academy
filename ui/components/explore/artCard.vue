<script>
export default {
  props: {
    collectionData: {
      type: Object,
      required: true
    }
  }
}
</script>
<template>
  <div class="tw-my-4 tw-border tw-rounded hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200">
    <a
      class="hover:tw-no-underline tw-text-inherit hover:tw-text-inherit"
      :href="collectionData.route"
      target="_blank"
    >
      <div class="lg:tw-flex tw-items-center tw-gap-4">

        <img :src="collectionData.cover" class="tw-object-cover tw-aspect-square lg:tw-w-[350px] lg:tw-h-[350px]">

        <div class="tw-p-4">
          <h5>{{ collectionData.title }}</h5>
          <p class="tw-text-xs tw-text-gray-500">
            By {{ collectionData.creator }}
          </p>
          <p class="tw-text-gray-500 tw-text-sm">{{ collectionData.description }}</p>
          <span class="tw-text-gray-500 tw-text-xs">Published on {{ collectionData.published }}</span>
        </div>
      </div>
    </a>
  </div>
</template>
