<template>
  <div>
    <div v-if="!$apollo.loading">
      <div
        v-for="(module, moduleIndex) in courses_by_pk.modules"
        :key="moduleIndex"
        style="cursor: pointer;"
        class="border d-flex rounded  mb-2"
      >
        <div class="ml-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
        <div class="w-100">
          <!--TOGGLE MODULE-->
          <div>
            <div @click="toggleCollapse(module.id)">
              <PxToggleCollapse :id="`toggle-${module.id}`" ref="toggle" :small-font="true" :toggle-name="module.title" />
            </div>

            <!--CHAPTERS COLLAPSE-->
            <b-collapse
              v-for="(chapter, chapterIndex) in module.chapters"
              :id="`accordion-${module.id}`"
              :key="chapterIndex"
              class="mx-2"
              role="tablist"
              appear
              :visible="isChapterActive(module.id)"
            >
              <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/chapter/' + chapter.id">
                <div :class="$route.path === ('/courseNavigator/chapter/' + chapter.id) ? 'chapter-container_selected' : 'chapter-container'">
                  <Icon
                    class="progress-circle"
                    icon="material-symbols:lens-outline"
                    color="#00b9cd"
                    width="1rem"
                  />
                  <div class="d-flex justify-content-between ">
                    <p
                      style="font-size: small; width: 190px;"
                      class="m-0  text-secondary "
                    >
                      {{ chapter.title }}<br>
                    </p>

                    <Icon
                      v-b-tooltip.hover
                      title="Video"
                      icon="material-symbols:smart-display-outline"
                      color="#00b9cd"
                      width="1rem"
                      class="ml-2"
                    />
                  </div>
                  <p style="font-size: small" class="m-0 text-secondary">
                    {{ formatDuration(chapter.duration) }}
                  </p>
                </div>
              </NuxtLink>
            </b-collapse>
            <b-collapse
              v-if="module.questions.length > 0"
              :id="`accordion-${module.id}`"
              :key="chapterIndex"
              class="mx-2"
              role="tablist"
              appear
              :visible="isChapterActive(module.id)"
            >
              <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/test/' + module.id">
                <div :class="$route.path === ('/courseNavigator/test/' + module.id) ? 'chapter-container_selected' : 'chapter-container'">
                  <Icon
                    class="progress-circle"
                    icon="material-symbols:lens-outline"
                    color="#00b9cd"
                    width="1rem"
                  />
                  <div class="d-flex justify-content-between">
                    <p style="font-size: small;" class="m-0 text-secondary">
                      Test<br>
                    </p>
                    <Icon
                      v-b-tooltip.hover
                      title="Test"
                      icon="material-symbols:checklist-rounded"
                      color="#00b9cd"
                      width="1rem"
                      class="ml-2"
                    />
                  </div>
                  <p style="font-size: small" class="m-0 text-secondary">
                    {{ module.questions.length }} questions.<br>
                  </p>
                </div>
              </NuxtLink>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex align-items-center justify-content-center w-100" style="height: 80vh;">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <Icon class="mb-5" icon="eos-icons:bubble-loading" width="4rem" />
        <h5>Loading, please wait...</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag'

const GET_COURSE_SCHEMA = gql`
query MyQuery($id: Int!) {
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
      type: Number,
      required: true,
      default: 1
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
    this.toggleCollapseActive()
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
      const { data } = await this.$apollo.query({
        query: GET_COURSE_SCHEMA,
        variables: {
          id: this.courseId
        }
      })

      this.courseInfo = Object.assign({}, data.courses_by_pk)
    },
    isChapterActive (moduleId) {
      return moduleId === this.activeModuleId
    },
    toggleCollapse (moduleId) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleId}`)
    },

    toggleCollapseActive () {
      for (const toggle of this.$refs.toggle) {
        if (toggle.$attrs.id.includes(this.activeModuleId)) {
          toggle.toggleCollapse = true
        }
      }
    }
  }
}
</script>

<style>
</style>
