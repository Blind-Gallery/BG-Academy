<template>
  <div>
    <!-- BTN FOR COLLAPSE -->
    <div v-for="(module, moduleIndex) in courses_by_pk.modules" :key="moduleIndex" class="tw-border tw-rounded tw-mb-2 ">
      <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-p-4">
        <span class="tw-font-bold tw-text-sm   tw-mb-0 tw-truncate">
          {{ module.title }}
        </span>
        <span class="tw-text-xs tw-text-gray-500">Chapters: {{ module.chapters.length }}</span>
      </div>
      <!-- CONTENT COLLAPSED -->
      <div v-for="(chapter, chapterIndex) in module.chapters" :key="chapterIndex" class="tw-flex tw-flex-col tw-p-4  hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer">
        <span class="tw-text-xs">{{ chapter.title }}</span>
        <span class="tw-text-xs tw-text-gray-500">{{ chapter.duration }}</span>
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
  computed: {

    activeModuleId () {
      if (!this.courseInfo.modules) { return null }
      if (this.$route.params.moduleId) { return this.$route.params.moduleId }
      const chapterIdFromRoute = this.$route.params.chapterId
      for (const module of this.courseInfo.modules) {
        for (const chapter of module.chapters) {
          if (chapter.id === chapterIdFromRoute) {
            return module.id
          }
        }
      } return null
    }
  },
  async created () {
    await this.getCourseSchema()
  },

  methods: {
    formatDuration (duration) {
      const minutes = Math.floor(duration / 60)
      const seconds = duration % 60

      if (minutes > 0 && seconds > 0) {
        return `${minutes} min ${seconds} sec`
      } else if (minutes > 0) {
        return `${minutes} min`
      } else {
        return `${seconds} sec`
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
    isChapterActive (moduleId) {
      return moduleId === this.activeModuleId
    }

  }
}
</script>

<style>
</style>
