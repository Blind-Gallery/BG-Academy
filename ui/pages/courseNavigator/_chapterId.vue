<template>
  <div>
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

          <div>
            <PxPlayer
              :is-ended-video="isEndedVideo"
              :video-id="chapterInfo.video_id"
              :chapter-id="chapterInfo.id"
              width="100%"

              @ended-video="handleEndedVideo"
            />
          </div>
          <Transition name="fade">
            <button v-if="isEndedVideo === true" class="primary-btn my-4">
              <span>Go to the next chapter</span>
              <Icon
                icon="material-symbols:chevron-right"
                width="28"
                color="#fff"
              />
            </button>
          </Transition>

          <div v-if="loading">
            <b-skeleton-img />
          </div>

          <!--  Questions -->
          <!-- TODO: Update to show only when is the last chapter of the module -->
          <div class="d-flex flex-column align-items-center">
            <Transition name="fade" mode="out-in">
              <div v-if="showEvIntro" key="1" class="d-flex align-items-center flex-column rounded p-5 w-50 shadow-sm ev-intro">
                <h1 class="text-light">
                  Digital objects
                </h1>
                <p class="text-light m-0">
                  {{ chapterInfo.module.title }} | Evaluation
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
                  <swiper-slide v-for="(test, index) in chapterInfo.module.questions" :key="index">
                    <div class="d-flex flex-column justify-content-between " style="height: 90%;">
                      <div>
                        <h4 class="m-0 " style="color:#00b9cd">
                          {{ `${index + 1}.-${test.text}` }}
                        </h4>

                        <hr class="w-100">
                      </div>
                      <div>
                        <FormulateForm ref="test" :name="`test_${index}`">
                          <FormulateInput

                            :value="test.selectedOption"
                            :options="formatOptions(test.options)"
                            type="radio"
                            class="test"
                            @input="(value) => test.selectedOption = value"
                          />
                        </FormulateForm>
                        <p style="color:#960505" class="m-0 small text-center">
                          {{ testMessage }}
                        </p>
                      </div>

                      <div class="d-flex align-items-center justify-content-center">
                        <button class="last-btn mr-3" @click="lastSlide(test, index)">
                          Last
                        </button>
                        <button class="next-btn" @click="nextSlide(test, index)">
                          Next
                        </button>
                      </div>
                    </div>
                  </swiper-slide>

                  <swiper-slide class="d-flex flex-column align-items-center justify-content-center">
                    <h4>Total score</h4>
                    <h1 style="font-size: 4rem; color:#00b9cd">
                      100%
                    </h1>
                    <hr class="w-100">
                    <div class="d-flex mb-4">
                      <div class="d-flex align-items-center mr-4">
                        <Icon class="mr-1" icon="material-symbols:check-circle-rounded" color="#28a745" width="18" />
                        <p class="text-success m-0">
                          Correct: 10
                        </p>
                      </div>
                      <div class="d-flex align-items-center">
                        <Icon class="mr-1" icon="mdi:close-circle" color="#dc3545" width="18" />
                        <p class="text-danger m-0">
                          Wrong: 0
                        </p>
                      </div>
                    </div>
                    <p class="small text-secondary text-center">
                      Congratulations, you have successfully
                      passed module 1 of this course!
                    </p>

                    <div class="d-flex flex-column align-items-center justify-content-center w-100">
                      <!-- TODO: Send user to the next module if exists and passed the exam -->
                      <button style="cursor:pointer" class="primary-btn d-flex align-items-center justify-content-center mb-2 w-100">
                        Next module   <Icon
                          width="24px"
                          icon="material-symbols:chevron-right"
                        />
                      </button>
                      <button style="cursor:pointer" class="secondary-btn  w-100  d-flex align-items-center justify-content-center" @click="doTryAgain">
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
        <!--HIDE NAV BAR ICON-->

        <!--NAV BAR COLUMN-->

        <Transition name="fade">
          <b-col v-if="!navBarHidden" key="1" lg="3" cols="12">
            <!--NAV BAR PARENT CONTAINER-->

            <div class="course-nav-container">
              <div class="d-flex justify-content-between">
                <p class="small" style="font-weight: 600;">
                  Modules
                </p>
                <p class="small">
                  Completed: 0/3
                </p>
              </div>

              <div class="d-flex flex-column">
                <b-progress
                  class="mb-2"
                  height="5px"
                  value="2"
                />
                <div class="d-flex justify-content-between">
                  <p class="small">
                    Progress
                  </p>
                  <p class="small">
                    2%
                  </p>
                </div>
              </div>

              <!--MODULES-->
              <div
                v-for="(module, moduleIndex) in chapterInfo.module.course.modules"
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
                    </b-collapse>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </Transition>
      </b-row>

      <b-row>
        <b-col>
          <div class="w-100">
            <b-tabs content-class="mt-3">
              <b-tab title="Course info" active>
                <p>{{ chapterInfo.info }}</p>
              </b-tab>
              <b-tab title="Resources">
                <p>{{ chapterInfo.resources }}</p>
              </b-tab>
            </b-tabs>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { gql } from 'graphql-tag'

import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'
import PxPlayer from '~/components/PxPlayer.vue'

SwiperCore.use([Pagination, Navigation])

const GET_USER_CHAPTER_QUERY = gql`
query ($chapter_id: uuid!, $user_id: String!) {
  user_chapter_by_pk(chapter_id: $chapter_id, user_id: $user_id) {
    completed
    updated_at
    chapter {
      id
      info
      title
      resources
      video_id
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
        course {
          modules {
            id
            next_module_id
            title
            chapters {
              id
              title
              video_id
            }
          }
        }
      }
    }
  }
}`

const GET_CHAPTER_QUERY = gql`
query ($id: uuid!) {
  chapters_by_pk(id: $id) {
    id
    info
    title
    resources
    video_id
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
        modules {
          id
          next_module_id
          title
          chapters {
            id
            title
            video_id
          }
        }
      }
    }
  }
}`

export default {
  components: {
    Swiper,
    SwiperSlide,
    PxPlayer
  },

  apollo: {
    user_chapter_by_pk: {
      query: GET_USER_CHAPTER_QUERY,
      variables () {
        return {
          chapter_id: this.$route.params.chapterId,
          user_id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    }
  },

  data () {
    return {
      testMessage: '',
      isEndedVideo: false,
      loading: false,
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
      for (const module of this.chapterInfo.module.course.modules) {
        for (const chapter of module.chapters) {
          if (chapter.id === chapterIdFromRoute) {
            return module.id
          }
        }
      } return null
    }
  },

  created () {
    this.getChapter()
    this.doResetTest()
  },

  methods: {
    isChapterActive (moduleId) {
      return moduleId === this.activeModuleId
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

.ev-intro{
  background: rgb(26,55,75);
  background: -moz-linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
  background: -webkit-linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
  background: linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1a374b",endColorstr="#195b88",GradientType=1);
}

.ev-Slider{
  width: 450px;
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding:2rem;
  border-radius: 5px;
  height: 560px;
}

.test .formulate-input .formulate-input-label{
  font-weight: 400;
  margin-bottom: 1rem;
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
  .courseNav-parent{
    flex-wrap: wrap;
  }

  .toggleNav-icon{
    display:none
  }
}

</style>
