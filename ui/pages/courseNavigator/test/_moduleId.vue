<template>
  <div>
    <PxModal ref="activityModal">
      <template #body>
        <share-activity-pass-test :title="certificateInfo?.course?.name" :instructor="certificateInfo?.course?.teacher?.name" :course-id="courseId" />
      </template>
    </PxModal>
    <div v-if="!$apollo.loading">
      <b-container style="margin-top: 2rem; max-width: 1240px">
        <b-row class="courseNav-parent mb-3">
          <b-col
            lg="9"
            cols="12"
            :class="!navBarHidden ? 'course-video mb-1':'course-video__toggle mb-1'"
          >
            <span
              v-b-tooltip.hover
              :title="!navBarHidden ? 'Hide course navigator': 'Show course navigator'"
              class="toggleNav-icon"
              @click="doHideNavBar()"
            >
              <Icon
                icon="material-symbols:menu-open"
                :rotate="!navBarHidden ? '2':'null'"
                width="32"
                color="#fff"
              />
            </span>

            <div class="d-flex flex-column align-items-center mb-5">
              <Transition name="fade" mode="out-in">
                <div v-if="showEvIntro" key="1" class="d-flex align-items-center flex-column rounded p-5  shadow-sm ev-intro">
                  <h3 class="text-light text-center">
                    {{ module.title }}
                  </h3>
                  <p class="text-light m-0">
                    Evaluation
                  </p>
                  <hr style=" border-color: #fff;  width: 100%;">
                  <p style="text-align: center;" class="text-light small">
                    Multiple choice assessment: in each question
                    you will be able to select one of the options
                    you consider correct.<br><br>

                    Once completed, you will receive
                    a note for this module.
                  </p>
                  <div class="d-flex mt-3 w-100">
                    <button class="primary-btn w-100" @click="showEvIntro = !showEvIntro">
                      <div class="d-flex align-items-center justify-content-center">
                        <p class="m-0">
                          Start
                        </p>
                        <Icon
                          width="24px"
                          icon="material-symbols:chevron-right"
                        />
                      </div>
                    </button>
                  </div>
                </div>

                <div key="2" class="shadow-sm">
                  <swiper
                    ref="mySwiper"
                    class="ev-Slider"
                    :allow-touch-move="false"
                    :modules="modules"
                    :effect="'fade'"
                    :space-between="40"
                    :navigation="{
                      enabled:true,
                      nextEl:'',
                      prevEl:''
                    }"
                    :pagination="paginationOp"
                    @reachEnd="paginationHide"
                    @swiper="hideLastBullet"
                  >
                    <swiper-slide v-for="(test, index) in module.questions" :key="index">
                      <div class="d-flex flex-column justify-content-between " style="height: 90%;">
                        <div>
                          <h5 class="tw-cyan-500 ">
                            {{ `${test.text}` }}
                          </h5>

                          <hr class="w-100">
                        </div>
                        <div>
                          <FormulateForm ref="test" :name="`test_${index}`">
                            <FormulateInput
                              :value="test.selectedOption"
                              :options="formatOptions(test.options)"
                              type="radio"
                              @input="(value) => {
                                test.selectedOption = value
                              }"
                            />
                          </FormulateForm>

                          <p style="color:#960505" class="m-0 small text-center">
                            {{ testMessage }}
                          </p>
                        </div>

                        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center my-5" style="gap:1rem">
                          <button v-if="!isFirstSlide" class="last-btn w-100" @click="previousSlide(test, index)">
                            Previous
                          </button>
                          <button class="next-btn w-100" @click="nextSlide(test, index)">
                            Next
                          </button>
                        </div>
                      </div>
                    </swiper-slide>

                    <swiper-slide class="d-flex flex-column align-items-center justify-content-center">
                      <h4>Total score</h4>
                      <h1 style="font-size: 4rem; color:#00b9cd">
                        {{ scorePercentage }}%
                      </h1>
                      <hr class="w-100">
                      <div class="d-flex mb-4">
                        <div v-show="correctAnswers" class="d-flex align-items-center mr-4">
                          <Icon class="mr-1" icon="material-symbols:check-circle-rounded" color="#28a745" width="18" />
                          <p class="text-success m-0">
                            Correct: {{ correctAnswers }}
                          </p>
                        </div>
                        <div v-show="correctAnswers !== module.questions.length" class="d-flex align-items-center">
                          <Icon class="mr-1" icon="mdi:close-circle" color="#dc3545" width="18" />
                          <p class="text-danger m-0">
                            Wrong: {{ module.questions.length - correctAnswers }}
                          </p>
                        </div>
                      </div>
                      <p v-show="scorePercentage >= 80" class="small text-secondary text-center">
                        Congratulations, you have successfully
                        passed the test!
                      </p>

                      <div class="d-flex flex-column align-items-center justify-content-center w-100">
                        <!-- TODO: Send user to the next module if exists and passed the exam -->
                        <button v-if="scorePercentage >= 80" style="cursor:pointer" class="primary-btn d-flex align-items-center justify-content-center mb-2 w-100" @click="nextModule">
                          {{ isLastModule ? 'Claim certificate':'Next module' }}
                          <Icon
                            width="24px"
                            icon="material-symbols:chevron-right"
                          />
                        </button>
                        <button v-if="scorePercentage !== 100" style="cursor:pointer" class="secondary-btn  w-100  d-flex align-items-center justify-content-center" @click="doTryAgain">
                          Try it again  <Icon
                            width="21px"
                            icon="material-symbols:restart-alt"
                          />
                        </button>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </Transition>
            </div>
          </b-col>

          <!--NAV BAR COLUMN-->

          <Transition name="fade">
            <b-col v-if="!navBarHidden" key="1" lg="3" cols="12">
              <!--NAV BAR PARENT CONTAINER-->

              <div>
                <!-- TODO: ADD VALIDATION TO KNOW IF THE USER HAS ALREADY ENDED THE EXAMS -->
                <certificate-open-modal-button :course-id="courseId" @click="openModal('certificate-modal-card')" />
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

                <PxNavigatorCourseSchema
                  v-if="courseId"
                  :course-id="courseId"
                />
              </div>
            </b-col>
          </Transition>
        </b-row>

        <b-row v-if="false">
          <b-col>
            <div class="w-100">
              <b-tabs content-class="mt-3">
                <b-tab title="Course info" active>
                  <p>{{ module.info }}</p>
                </b-tab>
                <b-tab title="Resources">
                  <p>{{ module.resources }}</p>
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
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'

SwiperCore.use([Pagination, Navigation])

const USER_COURSES = gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
          course {
            challenge
          }
        }
      }`

const GET_QUESTIONS_BY_MODULE = gql`
query ($id: uuid!) {
  modules_by_pk(id: $id) {
    id
    title
    course {
      challenge
      id
      modules(order_by: {created_at: asc}) {
        id
        chapters(order_by: {created_at: asc}) {
          id
        }
      }
    }
    questions(order_by: {priority: asc}) {
      id
      text
      answer_id
      priority
      options {
        text
        id
      }
    }
  }
}`

const GET_ANSWERS_BY_USER = gql`
query ($moduleId: uuid!, $userId: String!) {
  user_question(where: {question: {module_id: {_eq: $moduleId}}, user_id: {_eq: $userId}}) {
    answer_id
    is_correct_answer
  }
}`

const UPDATE_USER_ANSWERS = gql`
mutation ($objects: [user_question_insert_input!]!) {
  insert_user_question(objects: $objects, on_conflict: {constraint: user_question_pkey, update_columns: [answer_id, is_correct_answer, updated_at]}) {
    affected_rows
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
    Swiper,
    SwiperSlide
  },

  apollo: {
    user_question: {
      query: GET_ANSWERS_BY_USER,
      variables () {
        return {
          moduleId: this.$route.params.moduleId,
          userId: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
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
  },

  data () {
    return {
      isFirstSlide: false,
      testMessage: '',
      isEndedVideo: false,
      courseId: null,
      opHash: null,
      correctAnswers: 0,
      scorePercentage: 0,
      challenge: null,
      loading: false,
      certificateInfo: null,
      module: {
        id: '',
        title: '',
        questions: []
      },
      modules: [Pagination, EffectFade, Navigation],
      paginationOp:
      {
        type: 'bullets',
        clickable: false,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
      },
      showEvIntro: true,
      navBarHidden: false,
      courseModules: []
    }
  },

  computed: {
    activeModuleId () {
      return this.$route.params.moduleId
    },

    isLastModule () {
      const modules = this.module && this.module.course && this.module.course.modules

      if (modules && modules.length > 0) {
        const lastIndex = modules.length - 1
        return this.activeModuleId === modules[lastIndex].id
      }

      return false
    }

  },

  created () {
    this.getModule()
    this.doResetTest()
  },

  mounted () {
    this.redirectionHome()
  },

  methods: {
    openActivityModal (component) {
      const modalInstance = this.$refs.activityModal
      if (modalInstance) {
        modalInstance.showModal(component)
      }
    },
    openModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
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

    redirectionHome () {
      if (!this.$auth.loggedIn) {
        this.$router.push('/')
      }
    },
    isChapterActive (moduleId) {
      return moduleId === this.activeModuleId
    },

    async getModule () {
      try {
        const { data } = await this.$apollo.query({
          query: GET_QUESTIONS_BY_MODULE,
          variables: {
            id: this.$route.params.moduleId
          }
        })
        this.module = Object.assign({}, data.modules_by_pk)
        this.courseId = data.modules_by_pk.course.id
        this.challenge = data.modules_by_pk.course.challenge
        this.verifyUserCourses(this.courseId)
        this.getCertificateData(this.courseId)
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

      this.isFirstSlide = swiper.isBeginning
    },

    nextSlide (test, index) {
      if (test.selectedOption === false || test.selectedOption === '') {
        this.testMessage = 'Please, select one option'
        return
      }

      this.testMessage = ''

      if (index === this.module.questions.length - 1) {
        this.updateUserScore()
      }
      this.$refs.mySwiper.$el.swiper.slideNext()
      this.isFirstSlide = this.$refs.mySwiper.$el.swiper.isBeginning
    },

    previousSlide () {
      this.$refs.mySwiper.$el.swiper.slidePrev()
      this.isFirstSlide = this.$refs.mySwiper.$el.swiper.isBeginning
    },

    updateUserScore () {
      this.correctAnswers = 0
      const questions = this.module.questions
      for (const question of questions) {
        if (question.selectedOption === question.answer_id) {
          this.correctAnswers++
        }
      }

      this.scorePercentage = Math.floor((this.correctAnswers / questions.length) * 100)
      if (this.scorePercentage >= 80) {
        this.openActivityModal()
      }

      this.$apollo.mutate({
        mutation: UPDATE_USER_ANSWERS,
        variables: {
          objects: this.module.questions.map((question) => {
            return {
              user_id: this.$auth.loggedIn ? this.$auth.user.id : '',
              question_id: question.id,
              answer_id: question.selectedOption,
              is_correct_answer: question.selectedOption === question.answer_id
            }
          })
        }
      })
    },

    doResetTest () {
      if (this.getChapter) {
        setTimeout(() => {
          const questions = this.module.questions
          for (const question of questions) {
            question.selectedOption = false
            question.isCorrectOption = false
          }
        }, 1000)
      }
    },

    doTryAgain () {
      const swiper = this.$refs.mySwiper.$el.swiper
      const questions = this.module.questions
      const tests = this.$refs.test

      swiper.enable()

      swiper.slideTo(0)

      for (const question of questions) {
        question.selectedOption = false
        question.isCorrectOption = false
      }

      for (const test of tests) {
        this.$formulate.reset(test.name)
      }

      this.correctAnswers = 0
      this.scorePercentage = 0
      this.isFirstSlide = this.$refs.mySwiper.$el.swiper.isBeginning
    },

    nextModule () {
      const modules = this.module.course.modules
      const index = modules.findIndex(module => module.id === this.activeModuleId)

      if (index !== -1 && index < modules.length - 1) {
        this.$router.push(`/courseNavigator/chapter/${modules[index + 1].chapters[0].id}`)
      } else {
        this.$bvModal.show('claim-certificate')

        this.confettiStart()
      }
    },

    confettiStart () {
      this.$confetti.start({
        canvasElement: this.$refs.customCanvas,
        particles: [
          {
            type: 'rect'
          }
        ],
        defaultColors: [
          'red',
          'blue',
          'green',
          'yellow',
          'purple',
          'pink'
        ],
        size: 2
      })
      setTimeout(() => {
        this.$confetti.stop()
      }, 5000)
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

input:checked ~ label {
  border-color: #00b9cd;
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

.ev-intro{
  background: -webkit-linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
  width: 450px;
}

.ev-Slider{
  width: 450px;
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding:2rem;
  border-radius: 5px;
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

.swiper-slide{
  height: auto;
}
.test label{
  margin: 0;
}

.formulate-input-group-item {
  position: relative;

  /* This makes the whole respond like a label to clicks */
  label::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    cursor: pointer;
  }

  &[data-has-value] {
    background-color:#f3f4f6;
  }
}
.formulate-input-element .formulate-input-element--radio{
  width: fit-content;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 990px) {
  .course-video{
  flex: 0 0 100%;
  max-width: 100%;
  transition: 0.5s ease all;
}

  .courseNav-parent{
    flex-wrap: wrap;
  }

  .toggleNav-icon{
    display:none
  }
}
@media(max-width:425px){
  .ev-Slider, .ev-intro{
    width: 390px
  }

  .swiper-slide{
    width: auto;
  }
}
@media(max-width: 375px){
  .ev-Slider, .ev-intro{
    width: 345px;
  }
}

</style>
