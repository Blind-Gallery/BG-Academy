<script>
export default {
  props: {
    pfp: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isCollapsed: true
    }
  },

  methods: {
    toggleCollapse () {
      const iconRef = this.$refs.collapseIcon
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
    },
    toggleIcon () {
      const iconInstance = this.$refs.collapseIcon
      iconInstance.classList.toggle('tw-rotate-180')
    }
  }
}
</script>

<template>
  <div ref="collapseContent" class="tw-border tw-rounded tw-overflow-hidden">
    <div class=" tw-cursor-pointer hover:tw-bg-gray-100 tw-easy-in-out tw-duration-200" @click="toggleCollapse()">
      <div class="tw-flex  tw-flex tw-gap-2 tw-items-center tw-p-2">
        <b-avatar :src="pfp" size="2rem" />
        <div class="tw-flex tw-flex-col tw-w-full">
          <div class="tw-flex tw-justify-between tw-items-center tw-w-full">
            <span class="tw-text-sm tw-font-semibold">{{ name }}</span>
            <div ref="collapseIcon" class="tw-ease-in-out tw-duration-200">
              <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1rem" />
            </div>
          </div>
          <span class="tw-text-xs">Instructor</span>
        </div>
      </div>
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
        <vue-markdown
          class="tw-text-sm tw-text-gray-500 tw-m-0 tw-p-2"
          :source="description"
        />
      </div>
    </transition>
  </div>
</template>
