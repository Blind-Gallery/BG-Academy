<template>
  <div>
    <div
      v-for="(module, moduleIndex) in courseInfo.modules"
      :key="moduleIndex"
      style="cursor: pointer;"
      class="border d-flex rounded  mb-2"
    >
      <div class="ml-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
      <div class="w-100">
        <!--TOGGLE MODULE-->
        <div>
          <div @click="toggleCollapse(module.id)">
            <PxToggleCollapse :small-font="true" :toggle-name="module.title" :subtitle-name="`Chapters: 0 / ${module.chapters.length}`" />
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
            <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/' + chapter.id">
              <div :class="$route.path === ('/courseNavigator/' + chapter.id) ? 'chapter-container_selected' : 'chapter-container'">
                <Icon
                  class="progress-circle"
                  icon="material-symbols:lens-outline"
                  color="#00b9cd"
                  width="1rem"
                />
                <div class="d-flex align-items-center">
                  <p style="font-size: small;" class="m-0 text-secondary">
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
                  5min.<br>
                </p>
              </div>
            </NuxtLink>
            <!-- question -->
            <div :class="$route.path === ('/courseNavigator/' + chapter.id) ? 'chapter-container_selected' : 'chapter-container'">
              <Icon
                class="progress-circle"
                icon="material-symbols:lens-outline"
                color="#00b9cd"
                width="1rem"
              />
              <div class="d-flex align-items-center">
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
                10 questions.<br>
              </p>
            </div>
          </b-collapse>
        </div>
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
      }
    }
  }
}`
export default {
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      courseInfo: {}
    }
  },
  created () {
    this.getCourseSchema()
  },
  methods: {
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
    }
  }
}
</script>

<style>
</style>
