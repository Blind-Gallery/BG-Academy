<template>
  <div>
    <div v-if="!$apollo.loading">
      <b-container style="margin-top: 2rem; max-width: 1240px">
        <b-row class="courseNav-parent mb-3">
          <b-col lg="9" cols="12" :class="!navBarHidden ? 'course-video mb-1':'course-video__toggle mb-1'">
            <span
              v-b-tooltip.hover
              :title="!navBarHidden ? 'Hide course navigator': 'Show course navigator'"
              class="toggleNav-icon"
              @click="doHideNavBar()"
            >
              <Icon icon="material-symbols:menu-open" :rotate="!navBarHidden ? '2':'null'" width="32" color="#fff" />
            </span>

            <div>
              <PxPlayer
                :is-ended-video="isEndedVideo"
                :video-id="chapterInfo.video_id"
                :chapter-id="chapterInfo.id"
                width="100%"
                @ended-video="handleEndedVideo"
              />
            </div>
            <div class="d-flex justify-content-between mt-2">
              <div>
                <h4>{{ chapterInfo.title }}</h4>
              </div>
              <div>
                <button
                  v-if="!endOfCourse"
                  class="primary-btn d-flex align-items-center justify-content-center"
                  @click="nextChapter"
                >
                  <span>Next</span>
                  <Icon icon="material-symbols:skip-next-rounded" width="24" color="#fff" />
                </button>
              </div>
            </div>

            <div v-if="loading">
              <b-skeleton-img />
            </div>
          </b-col>
          <!--HIDE NAV BAR ICON-->

          <!--NAV BAR COLUMN-->

          <Transition name="fade">
            <b-col v-if="!navBarHidden" key="1" lg="3" cols="12">
              <!--NAV BAR PARENT CONTAINER-->

              <div class="course-nav-container">
                <certificate-open-modal-button :course-id="courseId" @click="openModal()" />

                <PxModal ref="modalInstance">
                  <template #body>
                    <div>
                      <certificate-base-card
                        v-if="courseId"
                        :title="certificateInfo?.course?.name"
                        :instructor="certificateInfo?.course?.teacher?.name"
                        :cover="certificateInfo?.course?.thumbnail"
                        :student="$auth.user.name"
                        :course-id="courseId"
                        :op-hash="certificateInfo?.certificate_mint_op"
                      />
                    </div>
                  </template>
                </PxModal>

                <PxNavigatorCourseSchema v-if="courseId" :course-id="courseId" />
              </div>
            </b-col>
          </Transition>
        </b-row>

        <b-row v-if="(chapterInfo.info || chapterInfo.resources) && !loading">
          <b-col>
            <div class="w-100">
              <b-tabs content-class="mt-3">
                <b-tab v-if="chapterInfo.info" title="Chapter info">
                  <vue-markdown :source="chapterInfo.info" />
                </b-tab>
                <b-tab v-if="chapterInfo.resources" title="Resources">
                  <vue-markdown :source="chapterInfo.resources" />
                </b-tab>
              </b-tabs>
            </div>
          </b-col>
        </b-row>
      </b-container>
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

import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'
import PxPlayer from '~/components/PxPlayer.vue'

SwiperCore.use([Pagination, Navigation])

const GET_CHAPTER_QUERY = gql`
query ($id: uuid!) {
  chapters_by_pk(id: $id) {
    id
    info
    title
    resources
    video_id
    next_chapter_id
    module {
      id
      duration
      description
      created_at
      previous_module_id
      next_module_id
      title
      you_will_learn
      you_will_learn_title
      questions {
        id
        text
        options {
          id
          text
        }
      }
      course {
        id
        name
        challenge
        modules(order_by: {created_at: asc}) {
          id
          next_module_id
          title
          chapters(order_by: {created_at: asc}) {
            id
            title
            video_id
          }
        }
      }
    }
  }
}`
const USER_COURSES = gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
        }
      }`

const COURSE_CERTIFICATE = gql`
  query ($courseId: String!, $userId: String!) {
    user_course_by_pk(course_id: $courseId, user_id: $userId) {
      certificate_mint_op
      course {
        name
        teacher {
          name
        }
        thumbnail
      }
    }
  }
`

export default {
  components: {
    PxPlayer
  },

  data () {
    return {
      courseId: '',
      testMessage: '',
      isEndedVideo: false,
      loading: false,
      challenge: null,
      certificateInfo: null,
      chapterInfo: {
        id: '',
        video_id: '862461136',
        module: {
          title: '',
          questions: [],
          course: { modules: [] }
        }
      },
      modules: [Pagination, EffectFade, Navigation],
      paginationOp:
      {
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
      },
      showEvIntro: true,
      navBarHidden: false,
      courseModules: [
      ]

    }
  },

  computed: {
    activeModuleId () {
      const chapterIdFromRoute = this.$route.params.chapterId

      const foundModule = this.chapterInfo.module.course.modules.find((module) => {
        return module.chapters.some(chapter => chapter.id === chapterIdFromRoute)
      })

      return foundModule ? foundModule.id : null
    },
    endOfCourse () {
      const { next_module_id: nextModuleId, questions } = this.chapterInfo.module
      const { next_chapter_id: nextChapterId } = this.chapterInfo

      const isLastModule = !nextModuleId
      const isLastChapter = !nextChapterId
      const noPendingQuestions = questions.length === 0

      return isLastModule && isLastChapter && noPendingQuestions
    }

  },

  async created () {
    await this.getChapter()
    await this.doResetTest()
  },

  methods: {
    openModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
    },
    isChapterActive (moduleId) {
      return moduleId === this.activeModuleId
    },

    verifyUserCourses (courseId) {
      this.$apollo.query({
        query: USER_COURSES,
        variables: {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      })
        .then((response) => {
          const userCourses = response.data.user_course
          const userHasCourse = userCourses.find(course => course.course_id === courseId)

          if (!userHasCourse || !this.$auth.loggedIn) {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    async getCertificateData (id) {
      try {
        const { data } = await this.$apollo.query({
          query: COURSE_CERTIFICATE,
          variables: {
            userId: this.$auth.loggedIn ? this.$auth.user.id : '',
            courseId: id
          }
        })
        this.certificateInfo = Object.assign({}, data.user_course_by_pk)
      } catch (err) {
        this.loading = false
        console.error('error fetching course', err)
      }
    },

    async getChapter () {
      try {
        const { data } = await this.$apollo.query({
          query: GET_CHAPTER_QUERY,
          variables: {
            id: this.$route.params.chapterId
          }
        })
        this.chapterInfo = Object.assign({}, data.chapters_by_pk)
        this.$set(this.chapterInfo, 'video_id', data.chapters_by_pk.video_id)
        const courseId = this.chapterInfo.module.course.id
        this.courseId = data.chapters_by_pk.module.course.id
        this.challenge = data.chapters_by_pk.module.course.challenge
        this.verifyUserCourses(courseId)
        this.getCertificateData(courseId)
      } catch (err) {
        this.loading = false
        console.error('error fetching course', err)
        console.error(this.$route.params.chapterId)
      }
    },
    formatOptions (options) {
      const formattedOptions = {}
      for (const option of options) {
        formattedOptions[option.id] = option.text
      }
      return formattedOptions
    },

    doHideNavBar () {
      this.navBarHidden = !this.navBarHidden
    },

    toggleCollapse (moduleId) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleId}`)
    },

    hideLastBullet (swiper) {
      const bullets = swiper.pagination.el.children
      const lastBullet = bullets[bullets.length - 1]
      lastBullet.parentNode.removeChild(lastBullet)
    },

    nextSlide (test) {
      if (test.selectedOption === false || test.selectedOption === '') {
        this.testMessage = 'Please, select one option'
      } else {
        this.testMessage = ''
        this.$refs.mySwiper.$el.swiper.slideNext()
      }
    },

    lastSlide () {
      this.$refs.mySwiper.$el.swiper.slidePrev()
      this.testMessage = ''
    },

    handleEndedVideo (value) {
      this.isEndedVideo = value
    },

    doResetTest () {
      if (this.getChapter) {
        setTimeout(() => {
          const questions = this.chapterInfo.module.questions
          for (const question of questions) {
            question.selectedOption = false
          }
        }, 1000)
      }
    },

    doTryAgain () {
      const swiper = this.$refs.mySwiper.$el.swiper
      const questions = this.chapterInfo.module.questions
      const tests = this.$refs.test

      swiper.enable()

      swiper.slideTo(0)

      for (const question of questions) {
        question.selectedOption = false
      }

      for (const test of tests) {
        this.$formulate.reset(test.name)
      }
    },

    nextChapter () {
      const { next_chapter_id: nextChapterId, module } = this.chapterInfo
      const { questions, next_module_id: nextModuleId, id: currentModuleId, course } = module
      const moduleHasTest = questions.length > 0

      const getFirstChapterId = () => {
        const nextModule = course.modules.find(module => module.id === nextModuleId)
        return nextModule ? nextModule.chapters[0].id : null
      }

      const navigateTo = path => this.$router.push(path)

      if (nextChapterId) {
        navigateTo(`/courseNavigator/chapter/${nextChapterId}`)
      } else if (moduleHasTest) {
        navigateTo(`/courseNavigator/test/${currentModuleId}`)
      } else {
        const firstChapterId = getFirstChapterId()
        if (firstChapterId) {
          navigateTo(`/courseNavigator/chapter/${firstChapterId}`)
        }
      }
    },

    paginationHide (swiper) {
      swiper.disable()
    }

  }
}
</script>
<style>
.progress-circle{
  color: black;
  left: -17px;
  top: 10px;
  position: absolute;
  background-color: white
}

.courseNav-parent{
  overflow-x: hidden;
  flex-wrap: nowrap;
  min-height: 600px;
}

.course-video{
  flex: 0 0 75%;
  max-width: 75%;
  transition: 0.5s ease all;
}

input:checked ~ label {
  border-color: #00b9cd;
}

.course-video__toggle{
  transition: 0.5s ease all;
  flex: 0 0 100%;
  max-width: 100%;
}

.course-nav-container{
  max-height: 600px;
  overflow-y: auto;
  padding-right: 5px;

}

.course-nav-container::-webkit-scrollbar {
    width: 8px;
}

.course-nav-container::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

.course-nav-container::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

.course-nav-container::-webkit-scrollbar-track {
    background-color: #f1f1f1;
}

.chapter-container{
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
}

.chapter-container:hover{
  background-color: #f7f7f7;
}

.chapter-container_selected{
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  background-color: #f7f7f7;
}

.fade-enter-active {
  transition: opacity 1s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 15px;
    left: 0;
    width: 100%;
  }

.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: #fff;
  border: 1px solid #00b9cd;

}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #00b9cd;
}

.toggleNav-icon{
  position:absolute;
  z-index: 2;
  right:0;
  top:0%;
  cursor: pointer;
  background-color: black;
  border-radius: 5px;
  padding:0.25rem;
  border:1px solid #f7f7f7;
}

.last-btn{
  border: 1px solid #00b9cd;
  border-radius: 5px;
  color: #00b9cd;

  background-color: #fff;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
}
.next-btn{
  background-color: #00b9cd;
  border-radius: 5px;
  border: none;

  color: #fff;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
}

@media (max-width: 990px) {
  .course-video{
    max-width: 100%;
    flex: 0 0 100%;
  }
  .courseNav-parent{
    flex-wrap: wrap;
  }

  .toggleNav-icon{
    display:none
  }
}

</style>
