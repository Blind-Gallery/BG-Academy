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
              :video-id="courses_by_pk.thumbnail_video"
              chapter-id=""
              width="100%"
              class="mb-4 d-lg-block d-none"
            />
            <h5>
              {{ courses_by_pk.name }}
            </h5>
            <p>
              {{ courses_by_pk.summary }}
            </p>
            <div v-if="courses_by_pk?.recommendations.length" class="tw-mt-8">
              <h5>Recommendations</h5>
              <div class="tw-relative">
                <swiper
                  :space-between="16"
                  :loop="false"
                  :breakpoints="breakpoints"
                >
                  <swiper-slide v-for="(recommendation, index) in courses_by_pk?.recommendations" :key="index" class="tw-my-6 tw-px-2">
                    <course-recommendation
                      :quote="recommendation.quote"
                      :name="recommendation.name"
                      :twitter="recommendation.twitter"
                      :farcaster="recommendation.farcaster"
                      :pfp="recommendation.pfp"
                      :role="recommendation.role"
                    />
                  </swiper-slide>
                </swiper>

                <div class="tw-pointer-events-none tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-16 tw-bg-gradient-to-l tw-from-white tw-to-transparent tw-z-10" />
              </div>
            </div>

            <h5 class="mb-3 mt-4">
              You will learn
            </h5>

            <div
              v-for="itemModule in courses_by_pk.modules"
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
                {{ courses_by_pk.description }}
              </p>
              <p v-else>
                {{ shortDescription }}
              </p>
              <span v-if="isLargeDescription" style="cursor: pointer; font-weight: 600; font-size: small;" @click="toggleDescription">{{ readDescriptionText }}</span>
            </div>

            <h5 class="mb-3 mt-4">
              Course curriculum
            </h5>

            <accordion-courseCurriculum v-for="(itemModule, moduleIndex) in courses_by_pk.modules" :key="moduleIndex" :title="itemModule.title" :module-id="moduleIndex" :chapters="itemModule.chapters" />
          </div>
        </b-col>

        <b-col
          order="1"
          order-lg="2"
          lg="4"
          class="mb-3"
        >
          <PxPlayer
            :video-id="courses_by_pk.thumbnail_video"
            chapter-id=""
            width="100%"
            class="d-lg-none"
          />
          <div class="d-flex flex-column p-3 shadow-sm rounded " style="gap:0.5rem; position:sticky; top: 77px;">
            <accordion-course-instructor :pfp="courses_by_pk.teacher.pfp" :name="courses_by_pk.teacher.name" :description="courses_by_pk.teacher.description" />
            <div v-if="!userHasCourse || !$auth.loggedIn" class="d-flex flex-column" style="gap:0.5rem">
              <div class="border rounded p-2">
                <div class="tw-flex tw-items-center tw-gap-2">
                  <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                    ${{ courses_by_pk.discount_price || courses_by_pk.price }}
                  </h2>
                  <h6
                    v-if="courses_by_pk.discount_price"
                    class="m-0  tw-line-through tw-text-gray-500"
                  >
                    ${{ courses_by_pk.price }}
                  </h6>
                </div>
                <p class="m-0">
                  Access course
                </p>
                <span v-if="courses_by_pk.discount_price" class="tw-text-green-500 tw-text-xs">Launch Discount (You save {{ 100 - Math.ceil(courses_by_pk.discount_price * 100 / courses_by_pk.price) }}%!)</span>
              </div>
              <div v-if="isAccessible">
                <button-px-primary prefix-icon="credit-card" text="Credit card" width="tw-w-full" @click="openModal" />

                <payments-tezos-generate v-if="$auth.user?.tezos_info" :course-id="courses_by_pk.id" />
              </div>
              <div v-else class="tw-p-2 tw-rounded tw-border">
                <span class="tw-text-xs">Launch on {{ courses_by_pk.release_date | formatDate }}</span>
              </div>
            </div>

            <div v-else>
              <NuxtLink :to="'/courseNavigator/chapter/' + courses_by_pk.modules[0].chapters[0].id">
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
                  :price="courses_by_pk.discount_price || courses_by_pk.price"
                  :course-id="courses_by_pk.id"
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
                  {{ courses_by_pk.level }} level
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
import { Swiper, SwiperSlide } from 'swiper-vue2'
import courseRecommendation from '../../components/courseRecommendation.vue'
import { ALLOW_LIST } from '@/constants'

const USER_COURSES = gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
        }
      }`

export default {
  components: {
    courseRecommendation,
    Swiper,
    SwiperSlide
  },
  apollo: {
    courses_by_pk: {
      query: gql`
        query ($id: String!) {
          courses_by_pk(id: $id) {
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
              you_will_learn_title
              you_will_learn
              chapters (order_by: {created_at: asc}) {
                id
                title
              }
              questions_aggregate {
                aggregate {
                  count(columns: answer_id)
                }
              }
            }
            teacher {
              name
              pfp
              description
            }
            teacher_id
            recommendations {
              name
              pfp
              quote
              role
              twitter
              farcaster
            }
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

      function getOrdinalSuffix (number) {
        const remainder10 = number % 10
        const remainder100 = number % 100

        if (remainder100 >= 11 && remainder100 <= 13) {
          return number + 'th'
        }

        switch (remainder10) {
          case 1:
            return number + 'st'
          case 2:
            return number + 'nd'
          case 3:
            return number + 'rd'
          default:
            return number + 'th'
        }
      }
      const dayWithSuffix = getOrdinalSuffix(day)

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
      nowDate: new Date(),
      breakpoints: {
        425: {
          slidesPerView: 1.25,
          spaceBetween: 30,
          slidesPerGroup: 1
        },
        768: {
          slidesPerView: 2.25,
          spaceBetween: 30,
          slidesPerGroup: 1
        },

        1024: {
          slidesPerView: 2.25,
          spaceBetween: 30,
          slidesPerGroup: 1
        }
      }
    }
  },
  computed: {
    isAccessible: function () {
      return this.isReleased || this.hasEarlyAccess
    },
    isReleased: function () {
      const releaseDate = this.courses_by_pk.release_date
      return !releaseDate || new Date(releaseDate) < this.nowDate
    },
    hasEarlyAccess: function () {
      if (!this.$auth.loggedIn) {
        return false
      }
      return ALLOW_LIST.EARLY_ACCESS_USER_IDS.includes(this.$auth.user.id)
    },
    ...mapGetters('tezosWallet', [
      'wallet',
      'publicKey',
      'tezosAddress',
      'isWalletConnected'
    ]),
    formattedDuration: function () {
      const totalQuestions = this.courses_by_pk.modules.reduce((acc, module) => {
        return acc + module.questions_aggregate.aggregate.count
      }, 0)
      const totalMinutes = Math.floor(this.courses_by_pk.duration / 60) + totalQuestions
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
      const description = this.courses_by_pk.description
      return description.length > this.maxLength
        ? description.substring(0, this.maxLength) + '...'
        : description
    },
    readDescriptionText () {
      return this.showFullDescription ? 'Read less' : 'Read more'
    },

    isLargeDescription () {
      const description = this.courses_by_pk.description
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
