<template>
  <div>
    <b-container style="max-width: 1240px;margin-top: 2rem;">
      <h2 class="mb-3" style="font-weight: bold; color:#00B9CD">
        My courses
      </h2>
      <div class="mb-5">
        <b-tabs content-class="mt-3">
          <b-tab title="All" active>
            <div v-if="!courses" class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>

            <b-row v-else style="height: 65vh">
              <b-col v-for="course in courses" :key="course.id" lg="4">
                <PxCard
                  :is-certificate="false"
                  :pfp="course.teacher.pfp"
                  :instructor="course.teacher.name"
                  :description="course.description"
                  :title="course.name"
                  :cover="course.thumbnail"
                />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="In progress">
            <div v-if="false" class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>

            <b-row v-else style="height: 65vh">
              <b-col v-for="course in courses" :key="course.id" lg="4">
                <NuxtLink class="course-route" style="text-decoration: none;" :to="{ path: 'courseNavigator', params: { courseId: course.id }, query: { courseId: course.id }}">
                  <PxCard
                    :is-progress="true"
                    :is-certificate="false"
                    :pfp="course.teacher.pfp"
                    :instructor="course.teacher.name"
                    :description="course.description"
                    :title="course.name"
                    :cover="course.thumbnail"
                  />
                </NuxtLink>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Certificates">
            <b-row>
              <b-col v-for="course in courses" :key="course.id" lg="4">
                <PxCard
                  :is-progress="false"
                  :is-certificate="true"
                  :pfp="course.teacher.pfp"
                  :instructor="course.teacher.name"
                  :description="course.description"
                  :title="course.name"
                  :cover="course.thumbnail"
                />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>
<script>
import { gql } from 'graphql-tag'

export default {
  apollo: {
    courses: gql`query {
      courses {
        id
        level
        language
        duration
        name
        description
        teacher_id
        thumbnail
        teacher {
          pfp
          name
        }
      }
    }
  `
  },
  data () {
    return {
      value: 50
    }
  },
  mounted () {

  }

}
</script>
<style>
.nav-tabs .nav-link.active{
    color: #495057;
    font-weight: 600;
    background-color: #fff;
    border-color: #ffffff #ffffff rgb(0, 185, 205);;
}

.progress-bar{
  background-color: #00B9CD;
}
</style>
