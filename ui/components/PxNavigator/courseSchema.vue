<template>
  <div v-if="!$apollo.loading && courses_by_pk.modules">
    <PxModal ref="modalInstance" />
    <button-PxSecondary
      v-if="!hasFeedback"
      class="tw-mb-2"
      text="Rate this course"
      width="tw-w-full"
      prefix-icon="rate-review-outline-rounded"
      @click="openModal('support-course-feedback-form')"
    />

    <div v-for="(chapterModule, moduleIndex) in courses_by_pk.modules" :ref="`collapseContent${chapterModule.id}`" :key="moduleIndex" class="tw-border tw-rounded tw-mb-2 tw-max-h-[68px] tw-overflow-hidden transition tw-duration-200 tw-ease-in-out">
      <PxNavigator-ModuleCard
        :active-module="activeModuleId"
        :module-info="chapterModule"
        @click.native="triggerCollapse(chapterModule.id)"
      >
        <template #icon>
          <div :ref="`collapseIcon${chapterModule.id}`" class="tw-ease-in-out tw-duration-200">
            <Icon icon="material-symbols-light:keyboard-arrow-down-rounded" width="1rem" />
          </div>
        </template>
      </PxNavigator-ModuleCard>

      <PxNavigator-ChapterCard v-for="(chapter, chapterIndex) in chapterModule.chapters" :key="chapterIndex" :route="chapter.id" :title="chapter.title" :duration="chapter.duration" />

      <PxNavigator-TestCard v-if="chapterModule.questions.length > 0" :route="chapterModule.id" :questions="chapterModule.questions.length" />
    </div>
    <PxNavigatorChallengeCard v-if="courses_by_pk.challenge === 'mint'" :class="$route.path.includes('challenge') ? 'tw-text-cyan-500':''" :route="`/courseNavigator/challenge/${courseId}`" />
    <PxNavigatorExploreCard v-if="courses_by_pk.challenge === 'explore'" :class="$route.path.includes('explore') ? 'tw-text-cyan-500':''" :route="`/courseNavigator/explore/${courseId}`" />
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

const GET_COURSE_SCHEMA = gql`
query MyQuery($id: String!) {
  courses_by_pk(id: $id) {
    challenge
    modules(order_by: {created_at: asc}) {
      id
      next_module_id
      title
      subtitle
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

const COURSE_FEEDBACK = gql`
  query ($courseId: String!, $userId: String!) {
    user_course_by_pk(course_id: $courseId, user_id: $userId) {
      feedback
    }
  }
`

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
      hasFeedback: null,
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
      if (newVal) {
        this.triggerCollapse(newVal)
      }
    }
  },
  async created () {
    await this.getCourseSchema()
    await this.getFeedback()
  },

  methods: {
    async getFeedback () {
      if (!this.courseId) { return }
      try {
        const { data } = await this.$apollo.query({
          query: COURSE_FEEDBACK,
          variables: {
            userId: this.$auth.loggedIn ? this.$auth.user.id : '',
            courseId: this.courseId
          }
        })
        this.hasFeedback = data.user_course_by_pk.feedback
      } catch (error) {
        console.error(error)
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
    },
    openModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
    }

  }
}
</script>
