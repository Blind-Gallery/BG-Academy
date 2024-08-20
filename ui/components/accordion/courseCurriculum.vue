<script>
export default {
  props: {
    moduleId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    chapters: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isCollapsed: true
    }
  },
  methods: {
    toggleCollapse (moduleIndex) {
      const iconRef = this.$refs[`collapseIcon${moduleIndex}`]
      iconRef.classList.toggle('tw-rotate-180')
      this.isCollapsed = !this.isCollapsed
    },
    beforeEnter (el) {
      el.style.maxHeight = '0'
    },
    enter (el) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.transition = 'max-height 0.3s ease-in-out'
    },
    afterEnter (el) {
      el.style.maxHeight = 'none'
    },
    beforeLeave (el) {
      el.style.maxHeight = el.scrollHeight + 'px'
    },
    leave (el) {
      setTimeout(() => {
        el.style.maxHeight = '0'
      }, 10)
    },
    afterLeave (el) {
      el.style.maxHeight = 'none'
    }
  }
}
</script>

<template>
  <div>
    <div :ref="`collapseContent${moduleId}`" class="tw-border tw-rounded tw-mb-2 tw-overflow-hidden">
      <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-p-4" @click="toggleCollapse(moduleId)">
        <div class="tw-w-full tw-justify-between tw-flex">
          <span>{{ title }}</span>
          <div :ref="`collapseIcon${moduleId}`" class="tw-transform tw-ease-in-out tw-duration-200">
            <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1.5rem" />
          </div>
        </div>
        <span class="tw-text-gray-500 tw-text-sm">Chapters: {{ chapters.length }}</span>
      </div>

      <transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-show="!isCollapsed">
          <div v-for="(chapter, chapterIndex) in chapters" :key="chapterIndex">
            <div class="tw-p-4 tw-flex tw-items-center tw-gap-2">
              <Icon icon="material-symbols-light:smart-display-outline-rounded" width="1rem" />
              <span class="tw-text-sm">{{ chapter.title }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>

</style>
