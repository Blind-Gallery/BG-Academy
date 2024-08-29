<template>
  <div v-if="!$apollo.loading && courses_by_pk.modules">
    <!-- WRAPPER -->
    <div v-for="(chapterModule, moduleIndex) in courses_by_pk.modules" :ref="`collapseContent${chapterModule.id}`" :key="moduleIndex" class="tw-border tw-rounded tw-mb-2 tw-max-h-[68px] tw-overflow-hidden transition tw-duration-200 tw-ease-in-out">
      <!-- COLLAPSE BUTTON -->
      <div class="tw-cursor-pointer tw-flex tw-flex-col hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-p-4" @click="triggerCollapse(chapterModule.id)">
        <div class="tw-w-full tw-flex tw-justify-between">
          <span :class="chapterModule.id === activeModuleId ? 'tw-text-[#00b9cd]':''" class="tw-font-bold tw-text-sm   tw-mb-0 tw-truncate">
            {{ chapterModule.title }}
          </span>
          <div :ref="`collapseIcon${chapterModule.id}`" class="tw-ease-in-out tw-duration-200">
            <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1rem" />
          </div>
        </div>
        <span class="tw-text-xs tw-text-gray-500">Chapters: {{ chapterModule.chapters.length }}</span>
      </div>
      <!-- CHAPTER CONTENT -->

      <PxNavigator-ChapterCard v-for="(chapter, chapterIndex) in chapterModule.chapters" :key="chapterIndex" :route="chapter.id" :title="chapter.title" :duration="chapter.duration" />

      <!-- TEST CONTENT -->
      <PxNavigator-TestCard v-if="chapterModule.questions.length > 0" :route="chapterModule.id" :questions="chapterModule.questions.length" />
      <PxNavigator-challengeCard v-if="false" />
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
        chapterModules: []
      }
    }
  },
  computed: {
    activeModuleId () {
      const { moduleId, chapterId } = this.$route.params
      const { modules } = this.courseInfo

      if (moduleId) { return moduleId }

      if (!modules) { return moduleId }

      return modules.find(module =>
        module.chapters.some(chapter => chapter.id === chapterId)
      )?.id || null
    }
  },

  watch: {
    activeModuleId (newVal) {
      this.triggerCollapse(newVal)
    }
  },
  async created () {
    await this.getCourseSchema()
  },

  methods: {

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
