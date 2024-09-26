<template>
  <div>
    <div v-if="!$apollo.loading">
      <landing-course-carrousel v-if="!$auth.loggedIn" />

      <!--LOGGED CONTAINER-->
      <b-container v-if="$auth.loggedIn" class="mb-5" style="max-width: 1240px;">
        <b-row class="mb-5">
          <b-col
            order="2"
            order-lg="1"
            cols="12"
            lg="4"
          >
            <div class="d-flex flex-column align-items-center shadow-sm  rounded profile-container justify-content-center">
              <div class="d-flex flex-column align-items-center " style="padding-bottom: 1.5rem;">
                <b-avatar class="mb-2" size="5rem" :src="$auth.user.pfp" />
                <h4 class="text-truncate" style="max-width: 235px;">
                  {{ $auth.user.name }}
                </h4>
              </div>
              <div class="d-flex flex-row " style="gap:1.25rem; border-top: 1px solid rgb(0 0 0 / 10%); padding-top: 1.5rem;">
                <div class="d-flex flex-column align-items-center">
                  <h4 class="mb-1">
                    {{ totalCertificates.length }}
                  </h4>
                  <div class="d-flex align-items-center justify-content-center">
                    <Icon
                      class=" mr-1"
                      icon="material-symbols:check-circle-outline"
                    />
                    <p class="tw-text-xs" style="font-size: small;">
                      Completed
                    </p>
                  </div>
                </div>

                <div
                  class="d-flex flex-column align-items-center"
                >
                  <h4 class="mb-1">
                    {{ user_course.filter(item => item.certificate_cid === null).length }}
                  </h4>
                  <div class="d-flex align-items-center justify-content-center">
                    <Icon
                      class=" mr-1"
                      icon="material-symbols:progress-activity"
                    />
                    <p class=" m-0 " style="font-size: small;">
                      In progress
                    </p>
                  </div>
                </div>
                <div class="d-flex flex-column align-items-center ">
                  <h4 class="mb-1">
                    {{ totalCertificates.length }}
                  </h4>
                  <div class="d-flex align-items-center justify-content-center">
                    <Icon
                      class="mr-1"
                      icon="material-symbols:verified-outline-rounded"
                    />
                    <p class=" m-0 " style="font-size: small;">
                      Certificates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <b-col order="1" order-lg="2" cols="12" lg="8">
            <div class="p-5 d-flex flex-column justify-content-center profile-container welcome-card rounded shadow-sm">
              <h1 class="text-truncate">
                {{ $auth.user.name ? `Welcome Back, ${$auth.user.name}!` : "Welcome Back!" }}
              </h1>
              <h4 class="mb-4" style="font-weight: 400;">
                What do you want to learn today?
              </h4>
              <div class="d-flex">
                <a style="text-decoration: none;" href="#explore-courses" class="secondary-btn-black">
                  Explore courses
                </a>
              </div>
            </div>
          </b-col>
        </b-row>

        <h4 class="mb-3">
          My courses
        </h4>
        <div class="mb-5">
          <b-tabs content-class="mt-3 ">
            <b-tab title="All" active>
              <div
                v-if="user_course.length === 0"
                class="d-flex flex-column"
              >
                <p>Your purchased courses will appear here.</p>
              </div>
              <b-row :style="showAllCourses === false ? 'max-height: 550px; overflow: hidden':'height: auto; overflow: hidden'">
                <b-col v-for="item in user_course" :key="item.id" cols="12" lg="4">
                  <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/chapter/' + item.last_chapter_id_seen">
                    <PxCard
                      :pfp="item.course.teacher.pfp"
                      :instructor="item.course.teacher.name"
                      :description="item.course.description"
                      :title="item.course.name"
                      :cover="item.course.thumbnail"
                    />
                  </NuxtLink>
                </b-col>
              </b-row>
            </b-tab>
            <button v-if="false" class="primary-btn small" @click="showAllCourses = !showAllCourses">
              {{ showAllCourses === false?`Show ${coursesFicticial.length - 3} more`:'Show less' }}
            </button>
            <b-tab title="In progress">
              <div v-if="user_course.filter(item => item.certificate_cid === null).length" class="d-flex flex-column  ">
                <p>Your in progress courses will appear here.</p>
              </div>

              <b-row v-else>
                <b-col v-for="item in user_course.filter(item => item.certificate_cid === null)" :key="item.id" lg="4">
                  <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/chapter/' + item.last_chapter_id_seen">
                    <PxCard
                      :is-progress="true"
                      :pfp="item.course.teacher.pfp"
                      :instructor="item.course.teacher.name"
                      :description="item.course.description"
                      :title="item.course.name"
                      :cover="item.course.thumbnail"
                      :token-id="item.soul_bound_token_id"
                      :op-hash="item.certificate_mint_op"
                    />
                  </NuxtLink>
                </b-col>
              </b-row>
            </b-tab>

            <b-tab title="Certificates">
              <div
                v-if="false"
                class="d-flex flex-column"
              >
                <h4>Your certificates will appear here</h4>
                <p>Complete a course to get your first certificate!</p>
              </div>
              <b-row>
                <b-col v-for="certificates in user_course" :key="certificates?.course_id" lg="4">
                  <certificate-base-card
                    :title="certificates?.course?.name"
                    :instructor="certificates?.course?.teacher?.name"
                    :cover="certificates?.course?.thumbnail"
                    :student="$auth.user.name"
                    :course-id="certificates?.course_id"
                    :op-hash="certificates?.certificate_mint_op"
                    @certificate-received="handleCertificate"
                  />
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </div>
      </b-container>
      <landing-upcoming-courses />
      <div v-if="!$auth.loggedIn">
        <landing-product-section />
        <landing-community-feedback />
        <landing-frequently-questions />
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
import 'swiper/swiper-bundle.css'

export default {
  apollo: {
    courses: {
      query: gql`query {
        courses(
          where: {
            visible: {
              _eq: true
            }
          }
        ) {
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
    user_course: {
      query: gql`query ($id: String = "") {
        user_course(
          where: {
            user_id: {
              _eq: $id
            }
          }
        ) {
          last_chapter_id_seen
          course_id
          progress
          certificate_cid
          certificate_image_cid,
          soul_bound_token_id,
          certificate_mint_op,
          course {
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
      }`,
      variables () {
        return {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    }
  },

  data () {
    return {
      totalCertificates: [],
      showAllCourses: false
    }
  },
  computed: {
    user () {
      return this.$auth.user
    }
  },

  watch: {
    user (newValue) {
      if (newValue) {
        this.totalCertificates = []
      }
    }

  },

  methods: {
    handleCertificate (status) {
      if (status) {
        this.totalCertificates.push(status)
      }
      if (!this.$auth.user) { this.totalCertificates = [] }
    }
  }

}
</script>
<style>
.main-container, .welcome-card{
  background: rgb(26,55,75);
  background: linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
}

.main-container  h1, .main-container p, .welcome-card h1, .welcome-card p, .welcome-card h4{
  color:#fff
}

.profile-container{
  min-height: 380px;
  margin: 1rem 0rem;
}

</style>
