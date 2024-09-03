<template>
  <div>
    <PxModal ref="modalInstance" />
    <b-container style="max-width: 1240px; margin-top:2rem; margin-bottom: 4rem;">
      <b-row v-if="!$apollo.loading" class="mt-md-3">
        <b-col
          order="2"
          order-lg="1"
          lg="8"
        >
          <div class="course-info">
            <PxPlayer
              :video-id="courses[0].thumbnail_video"
              chapter-id=""
              width="100%"
              class="mb-4 d-lg-block d-none"
            />
            <h5>
              {{ courses[0].name }}
            </h5>
            <p>
              {{ courses[0].summary }}
            </p>
            <h5 class="mb-3 mt-4">
              You will learn
            </h5>

            <div
              v-for="itemModule in courses[0].modules"
              :key="itemModule.id"
            >
              <div v-if="itemModule.you_will_learn" class="d-flex  rounded  mb-2">
                <div style="margin-right:0.5rem">
                  <Icon icon="material-symbols:check-circle-outline-rounded" color="#00c851" width="1.25rem" />
                </div>
                <span class="small ">
                  {{ itemModule.you_will_learn }}
                </span>
              </div>
            </div>
            <h5 class="mt-4">
              Description
            </h5>
            <div>
              <p v-if="showFullDescription">
                {{ courses[0].description }}
              </p>
              <p v-else>
                {{ shortDescription }}
              </p>
              <span v-if="isLargeDescription" style="cursor: pointer; font-weight: 600; font-size: small;" @click="toggleDescription">{{ readDescriptionText }}</span>
            </div>

            <h5 class="mb-3 mt-4">
              Course curriculum
            </h5>

            <accordion-courseCurriculum v-for="(itemModule, moduleIndex) in courses[0].modules" :key="moduleIndex" :title="itemModule.title" :module-id="moduleIndex" :chapters="itemModule.chapters" />
          </div>
        </b-col>

        <b-col
          order="1"
          order-lg="2"
          lg="4"
          class="mb-3"
        >
          <PxPlayer
            :video-id="courses[0].thumbnail_video"
            chapter-id=""
            width="100%"
            class="d-lg-none"
          />
          <div class="d-flex flex-column p-3 shadow-sm rounded " style="gap:0.5rem; position:sticky; top: 77px;">
            <accordion-course-instructor :pfp="courses[0].teacher.pfp" :name="courses[0].teacher.name" :description="courses[0].teacher.description" />
            <div v-if="!userHasCourse || !$auth.loggedIn" class="d-flex flex-column" style="gap:0.5rem">
              <div class="border rounded p-2">
                <div class="tw-flex tw-items-center tw-gap-2">
                  <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                    ${{ courses[0].discount_price || courses[0].price }}
                  </h2>
                  <h6
                    v-if="courses[0].discount_price"
                    class="m-0  tw-line-through tw-text-gray-500"
                  >
                    ${{ courses[0].price }}
                  </h6>
                </div>
                <p class="m-0">
                  Access course
                </p>
                <span v-if="courses[0].discount_price" class="tw-text-green-500 tw-text-xs">Launch Discount (You save {{ 100 - Math.ceil(courses[0].discount_price * 100 / courses[0].price) }}%!)</span>
              </div>
              <div v-if="isAccessible">
                <button class="primary-btn w-100 " @click="openModal">
                  <Icon
                    icon="material-symbols:credit-card"
                    color="#fff"

                    width="21"
                  />
                  Credit card
                </button>

                <payments-tezos-generate :course-id="courses[0].id" />
              </div>
              <div v-else class="tw-p-2 tw-rounded tw-border">
                <span class="tw-text-xs">Launch on {{ courses[0].release_date | formatDate }}</span>
              </div>
            </div>

            <div v-else>
              <NuxtLink :to="'/courseNavigator/chapter/' + courses[0].modules[0].chapters[0].id">
                <button class="primary-btn w-100">
                  View course
                </button>
              </NuxtLink>
            </div>

            <b-modal id="credit-pay" centered hidden-header hide-footer>
              <template #modal-header="{ close }">
                <h2>
                  Payment details
                </h2>
                <span
                  style="cursor: pointer"
                  @click="close()"
                ><Icon
                  width="32"
                  color="#888"
                  icon="material-symbols:close"
                /></span>
              </template>
              <div>
                <!-- this line makes the discount_price have priority over the general price -->
                <payments-stripe-generate
                  :price="courses[0].discount_price || courses[0].price"
                  :course-id="courses[0].id"
                />
              </div>
            </b-modal>

            <div style="width:100%; margin:1rem 0rem; border-bottom:1px solid #6c757d3b" />
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" class="mr-2" /><p class="small m-0">
                  Approx. duration  {{ formattedDuration }}
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:signal-cellular-alt" class="mr-2" /><p class="small m-0">
                  {{ courses[0].level }} level
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon
                  icon="material-symbols:language"

                  class="mr-2"
                /><p class="small m-0">
                  100% Online
                </p>
              </div>

              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:verified-outline" class="mr-2" /><p class="small m-0">
                  Certificate
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row v-else>
        <div class="d-flex align-items-center justify-content-center w-100" style="height: 80vh;">
          <div class="d-flex flex-column align-items-center justify-content-center">
            <Icon class="mb-5" icon="eos-icons:bubble-loading" width="4rem" />
            <h5>Loading, please wait...</h5>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { gql } from 'graphql-tag'
import { mapGetters } from 'vuex'
import { EARLY_ACCESS_USER_IDS } from '@/constants'

const USER_COURSES = gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
        }
      }`

export default {
  apollo: {
    courses: {
      query: gql`
        query ($id: String!) {
          courses(where: { id: { _eq: $id } }) {
            id
            onchain_id
            name
            description
            language
            level
            price
            discount_price
            summary
            thumbnail
            thumbnail_video
            duration
            release_date
            modules (order_by: {created_at: asc}) {
              title
              id
              chapters (order_by: {created_at: asc}) {
                id
                title
              }
              you_will_learn_title
              you_will_learn
            }
            teacher {
              name
              pfp
              description
            }
            teacher_id
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.courseId
        }
      },

      user_course: {
        query: USER_COURSES,
        variables () {
          return {
            id: this.$auth.loggedIn ? this.$auth.user.id : ''
          }
        }
      }
    }
  },
  filters: {
    formatDate (value) {
      const date = new Date(value)

      // Get the month name
      const options = { month: 'long' }
      const month = new Intl.DateTimeFormat('en-US', options).format(date)

      // Get the day and add "rd"
      const day = date.getDate()
      const dayWithSuffix = `${day}rd`

      // Get the hour (6 PM)
      let hours = date.getHours()
      let period = 'AM'
      if (hours >= 12) {
        hours = hours % 12 || 12
        period = 'PM'
      }
      if (hours === 6) { period = 'PM' }

      return `${month} ${dayWithSuffix}, ${hours} ${period}`
    }
  },

  data () {
    return {
      userCourses: [],
      showFullDescription:
      false,
      maxLength: 700,
      nowDate: new Date()
    }
  },
  computed: {
    isAccessible: function () {
      return this.isReleased || this.hasEarlyAccess
    },
    isReleased: function () {
      const releaseDate = this.courses[0].release_date
      return !releaseDate || new Date(releaseDate) < this.nowDate
    },
    hasEarlyAccess: function () {
      if (!this.$auth.loggedIn) {
        return false
      }
      return EARLY_ACCESS_USER_IDS.includes(this.$auth.user.id)
    },
    ...mapGetters('tezosWallet', [
      'wallet',
      'publicKey',
      'tezosAddress',
      'isWalletConnected'
    ]),

    formattedDuration: function () {
      const totalMinutes = Math.floor(this.courses[0].duration / 60)
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60

      if (hours > 0) {
        if (minutes >= 10) {
          return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`
        } else {
          return `${hours} hour${hours > 1 ? 's' : ''}`
        }
      } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`
      }
    },

    userHasCourse () {
      const courseRouteId = this.$route.params.courseId.toString()
      return this.userCourses.find(course => course.course_id === courseRouteId)
    },

    loggedWithEmail () {
      if (this.$auth.user) {
        return !!this.$auth.user.email
      } else {
        return null
      }
    },

    shortDescription () {
      const description = this.courses[0].description
      return description.length > this.maxLength
        ? description.substring(0, this.maxLength) + '...'
        : description
    },
    readDescriptionText () {
      return this.showFullDescription ? 'Read less' : 'Read more'
    },

    isLargeDescription () {
      const description = this.courses[0].description
      return description.length > this.maxLength
    }
  },

  mounted () {
    this.getUserCourses()
    setInterval(() => {
      this.updateNowDate()
    }, 30000)
  },
  methods: {
    updateNowDate () {
      this.nowDate = new Date()
    },
    toggleDescription () {
      this.showFullDescription = !this.showFullDescription
    },
    getUserCourses () {
      this.$apollo.query({
        query: USER_COURSES,
        variables: {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      })
        .then((response) => {
          this.userCourses = response.data.user_course
        })
        .catch((error) => {
          console.error(error)
        })
    },
    openSignUpModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
    },

    openModal () {
      if (this.$auth.loggedIn) {
        return this.$bvModal.show('credit-pay')
      } else {
        this.openSignUpModal('auth-log-in-form')
      }
    }

  }
}
</script>
<style>

.curriculum-chapter {
  max-width: 100%;
}

.formatted-text {
  word-wrap: break-word;
  overflow: hidden;
  white-space: pre-line;
}

@media(max-width: 768px){
  .curriculum-chapter {
  max-width: 500px;
}

@media(max-width: 425px){
  .curriculum-chapter {
  max-width: 200px;
}
}
}
</style>
