<template>
  <div>
    <!-- BTN FOR COLLAPSE -->
    <div v-for="(module, moduleIndex) in courses_by_pk.modules" :ref="`collapseContent${moduleIndex}`" :key="moduleIndex" class="tw-border tw-rounded tw-mb-2 tw-max-h-[68px] tw-overflow-hidden transition tw-duration-200 tw-ease-in-out">
      <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-p-4" @click="triggerCollapse(moduleIndex)">
        <div class="tw-w-full tw-flex tw-justify-between">
          <span class="tw-font-bold tw-text-sm   tw-mb-0 tw-truncate">
            {{ module.title }}
          </span>
          <div :ref="`collapseIcon${moduleIndex}`" class="tw-ease-in-out tw-duration-200">
            <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1rem" />
          </div>
        </div>
        <span class="tw-text-xs tw-text-gray-500">Chapters: {{ module.chapters.length }}</span>
      </div>
      <!-- CONTENT COLLAPSED -->

      <div v-for="(chapter, chapterIndex) in module.chapters" :key="chapterIndex" class="tw-flex tw-flex-col tw-p-4  hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer ">
        <span class="tw-text-xs">{{ chapter.title }}</span>
        <span class="tw-text-xs tw-text-gray-500">{{ formattedDuration(chapter.duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

const GET_COURSE_SCHEMA = gql`
query MyQuery($id: String!) {
  courses_by_pk(id: $id) {
    modules(order_by: {created_at: asc}) {
      id
      next_module_id
      title
      questions {
        id
      }
      chapters(order_by: {created_at: asc}) {
        id
        title
        video_id
        duration
      }
    }
  }
}`
export default {
  apollo: {
    courses_by_pk: {
      query: GET_COURSE_SCHEMA,
      variables () {
        return {
          id: this.courseId
        }
      },
      update: data => data.courses_by_pk
    }
  },
  props: {
    courseId: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      courseInfo: {
        modules: []
      }
    }
  },

  async created () {
    await this.getCourseSchema()
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
    },

    async getCourseSchema () {
      if (!this.courseId) { return }
      try {
        const { data } = await this.$apollo.query({
          query: GET_COURSE_SCHEMA,
          variables: {
            id: this.courseId
          }
        })
        this.courseInfo = Object.assign({}, data.courses_by_pk)
      } catch (error) {
        console.error(error)
      }
    },

    toggleIcon (element, className) {
      element.classList.toggle(className)
    },

    toggleContent (element) {
      element.classList.toggle('tw-overflow-hidden')
      element.classList.toggle('tw-max-h-[900px]')
    },

    triggerCollapse (moduleIndex) {
      this.toggleIcon(this.$refs[`collapseIcon${moduleIndex}`][0], 'tw-rotate-180')
      const contentInstance = this.$refs[`collapseContent${moduleIndex}`][0]
      this.toggleContent(contentInstance)
    }

  }
}
</script>

<style>
</style>
