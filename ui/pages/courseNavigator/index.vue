<template>
  <div>
    <b-container style="margin-top: 2rem; max-width: 1240px">
      <b-row>
        <b-col
          :class="!navBarHidden ? 'course-video':'course-video__toggle'"
          lg="9"
          cols="12"
        >
          <div v-if="true">
            <iframe
              class="
          rounded
          mb-3"
              width="100%"
              height="650px"
              src="https://www.youtube.com/embed/qtPi0JvmWbs"
              title="YouTube video player"
              frameborder="0"
            />
          </div>
          <div v-else class="d-flex flex-column align-items-center">
            <Transition name="fade" mode="out-in">
              <div v-if="showEvIntro" key="1" class="d-flex align-items-center flex-column rounded p-5 w-50 shadow-sm ev-intro">
                <h1 class="text-light">
                  Digital objects
                </h1>
                <p class="text-light m-0">
                  Module 1 | Evaluation
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
                        START
                      </p>
                      <Icon
                        width="24px"
                        icon="material-symbols:chevron-right"
                      />
                    </div>
                  </button>
                </div>
              </div>

              <div v-else key="2" class="shadow-sm">
                <swiper
                  ref="swiper"
                  class="ev-Slider"
                  :allow-touch-move="false"
                  :modules="modules"
                  :effect="'fade'"
                  :space-between="40"
                  :navigation="{
                    enabled:true,
                    nextEl:'.primary-btn',
                    prevEl:'.secondary-btn'
                  }"
                  :pagination="paginationOp"
                >
                  <swiper-slide>
                    <h4 class="m-0 text-center" style="color:#00b9cd">
                      1.- What does NFT stand for, and what is its basic definition?
                    </h4>
                    <hr class="w-100">
                    <p>Choose one option</p>

                    <b-form-checkbox-group
                      v-model="selected"
                      class="d-flex flex-column align-items-start mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
                    >
                      <b-form-checkbox value="orange" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">A)</span> Non-Fungible Token; a type of digital asset representing ownership of a unique item or piece of content.
                      </b-form-checkbox>
                      <b-form-checkbox value="apple" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">B)</span> Non-Finite Transaction; a blockchain-based process for continuous data exchange.
                      </b-form-checkbox>
                      <b-form-checkbox value="pineapple" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">C)</span> Notable Financial Technology; a term used to describe innovative payment systems.
                      </b-form-checkbox>
                      <b-form-checkbox value="grape" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">D)</span> Non-Functional Test; a software testing method for assessing system performance.
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                    <div class="d-flex align-items-center justify-content-center">
                      <button class="secondary-btn mr-3">
                        LAST
                      </button>
                      <button class="primary-btn">
                        NEXT
                      </button>
                    </div>
                  </swiper-slide>

                  <swiper-slide>
                    <h4 class="m-0 text-center" style="color:#00b9cd">
                      1.- What does NFT stand for, and what is its basic definition?
                    </h4>
                    <hr class="w-100">
                    <p>Choose one option</p>

                    <b-form-checkbox-group
                      v-model="selected"
                      class="d-flex flex-column align-items-start mb-3"
                      value-field="item"
                      text-field="name"
                      disabled-field="notEnabled"
                    >
                      <b-form-checkbox value="orange" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">A)</span> Non-Fungible Token; a type of digital asset representing ownership of a unique item or piece of content.
                      </b-form-checkbox>
                      <b-form-checkbox value="apple" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">B)</span> Non-Finite Transaction; a blockchain-based process for continuous data exchange.
                      </b-form-checkbox>
                      <b-form-checkbox value="pineapple" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">C)</span> Notable Financial Technology; a term used to describe innovative payment systems.
                      </b-form-checkbox>
                      <b-form-checkbox value="grape" class="text-secondary small mb-4">
                        <span style="font-weight: 600;">D)</span> Non-Functional Test; a software testing method for assessing system performance.
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                  </swiper-slide>
                </swiper>
              </div>
            </Transition>
          </div>
        </b-col>
        <!--HIDE NAV BAR ICON-->

        <!--NAV BAR COLUMN-->
        <Transition name="slide-fade">
          <b-col v-if="!navBarHidden" key="1" class="border rounded py-3" lg="3" cols="12">
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
                v-for="(module, moduleIndex) in courseModules"
                :key="moduleIndex"
                style="cursor: pointer;"
                class="border d-flex rounded p-3 mb-2"
              >
                <div class="mr-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
                <div class="w-100">
                  <!--TOGGLE MODULE-->
                  <div @click="toggleCollapse(moduleIndex)">
                    <PxToggleCollapse :small-font="true" :toggle-name="module.title" :subtitle-name="`Chapters: 0 / ${module.chapter.length}`" />
                  </div>

                  <!--CHAPTERS COLLAPSE-->
                  <b-collapse
                    v-for="(chapter, chapterIndex) in module.chapter"
                    :id="`accordion-${moduleIndex}`"
                    :key="chapterIndex"
                    class="mb-2 mt-4"
                    role="tabpanel"
                  >
                    <div class="d-flex  flex-column justify-content-between mb-2 position-relative chapter-container rounded p-2">
                      <Icon
                        class="progress-circle"
                        :icon="chapter.isCompleted ? 'material-symbols:check-circle' :'material-symbols:lens-outline'"
                        color="#00b9cd"
                        width="1rem"
                      />
                      <p style="font-size: small; font-weight: 600;" class="m-0 text-secondary">
                        {{ chapter.title }}<br>
                      </p>
                      <p style="font-size: small" class="m-0 text-secondary">
                        5min.<br>
                      </p>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
          </b-col>
        </Transition>
      </b-row>
      <span
        v-b-tooltip.hover
        :title="!navBarHidden ? 'Hide course navigator': 'Show course navigator'"
        style="cursor:pointer"
        @click="doHideNavBar()"
      >
        <Icon
          icon="material-symbols:menu-open"
          :rotate="!navBarHidden ? '2':'null'"
          width="32"
        />
      </span>
      <b-row>
        <b-col>
          <div class="w-100">
            <b-tabs content-class="mt-3">
              <b-tab title="Resources" active>
                <p>I'm the first tab</p>
              </b-tab>
              <b-tab title="Course info">
                <p>I'm a disabled tab!</p>
              </b-tab>
            </b-tabs>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'

SwiperCore.use([Pagination, Navigation])
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination, EffectFade, Navigation]
    }
  },
  data () {
    return {
      paginationOp:
      {
        clickable: true,
        className: '.bullets',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
      },
      showEvIntro: true,
      navBarHidden: false,
      courseModules: [
        {
          title: 'Introduction to generative art',
          isActive: true,
          chapter: [
            {
              title: 'Exploring the foundation of generative art',
              isCompleted: true
            },
            {
              title: 'Understanding algorithms and creative coding',
              isCompleted: false
            },
            {
              title: 'Creating dynamic visual sistems',
              isCompleted: false
            },
            {
              title: 'Embracing randomness in generative art',
              isCompleted: false
            },
            {
              title: 'Expressing creativity through generative art techniques',
              isCompleted: false
            }
          ]
        },

        {
          title: 'Interactive art with code',
          chapter: [
            {
              title: 'Introduction to Interactive Art and Coding'
            },
            {
              title: 'Creating Immersive Experiences with Interactive Code'
            },
            {
              title: 'Exploring User Engagement and Interaction in Code-based Art'
            }
          ]
        },

        {
          title: 'Data visualization and art',
          chapter: [
            {
              title: 'Introduction to Data Visualization in Art'
            },
            {
              title: 'Exploring Data Sources and Formats for Artistic Visualizations'
            },
            {
              title: 'Creative Approaches to Data Interpretation and Representation'
            },
            {
              title: 'Interactive Data Visualizations and Engaging Audiences'
            }
          ]
        }
      ],

      selected: [],
      options: [
        { item: 'A', name: 'A) Non-Fungible Token; a type of digital asset representing ownership of a unique item or piece of content.' },
        { item: 'B', name: 'B) Non-Finite Transaction; a blockchain-based process for continuous data exchange.' },
        { item: 'C', name: 'C) Notable Financial Technology; a term used to describe innovative payment systems.' },
        { item: 'D', name: 'D) Non-Functional Test; a software testing method for assessing system performance.' }
      ]
    }
  },

  methods: {
    doHideNavBar () {
      this.navBarHidden = !this.navBarHidden
    },

    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
    },
    onNext () {
      this.$refs.swiper.next()
    }
  }
}
</script>
<style>
.progress-circle{
  color: black;
  left: -25px;
  top: 10px;
  position: absolute;
  background-color: white
}

.course-nav-container{
  max-height: 600px;
  overflow-y: auto;
  padding-right: 5px;

}

.chapter-container{
  cursor: pointer;
  transition: all 0.3s;
}

.chapter-container:hover{
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

</style>
