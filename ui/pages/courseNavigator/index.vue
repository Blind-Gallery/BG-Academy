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
            <div>
              <PxPlayer :id="chapters_by_pk.video_id" />
            </div>
            <div v-if="false" class="d-flex flex-column align-items-center">
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
                    @reachEnd="paginationHide"
                    @swiper="hideLastBullet"
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
                      <div class="d-flex align-items-center justify-content-center">
                        <button class="secondary-btn mr-3">
                          LAST
                        </button>
                        <button class="primary-btn">
                          NEXT
                        </button>
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
                        ¡Congratulations, you have successfully
                        passed module 1 of this course!
                      </p>

                      <div class="d-flex flex-column align-items-center justify-content-center w-100">
                        <button class="primary-btn d-flex align-items-center justify-content-center mb-2 w-100">
                          NEXT MODULE   <Icon
                            width="24px"
                            icon="material-symbols:chevron-right"
                          />
                        </button>
                        <button class="secondary-btn  w-100  d-flex align-items-center justify-content-center">
                          TRY IT AGAIN  <Icon
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
                v-for="(module, moduleIndex) in chapters_by_pk.module.course.modules"
                :key="moduleIndex"
                style="cursor: pointer;"
                class="border d-flex rounded  mb-2"
              >
                <div class="ml-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
                <div class="w-100">
                  <!--TOGGLE MODULE-->
                  <div @click="toggleCollapse(moduleIndex)">
                    <PxToggleCollapse :small-font="true" :toggle-name="module.title" :subtitle-name="`Chapters: 0 / ${module.chapters.length}`" />
                  </div>

                  <!--CHAPTERS COLLAPSE-->
                  <b-collapse
                    v-for="(chapter, chapterIndex) in module.chapters"
                    :id="`accordion-${moduleIndex}`"
                    :key="chapterIndex"
                    class="mx-2"
                    role="tabpanel"
                  >
                    <div class="d-flex  flex-column justify-content-between mb-2 position-relative chapter-container rounded p-2">
                      <Icon
                        class="progress-circle"
                        icon="material-symbols:lens-outline"
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

      <b-row>
        <b-col>
          <div class="w-100">
            <b-tabs content-class="mt-3">
              <b-tab title="Course info" active>
                <p>{{ chapters_by_pk.info }}</p>
              </b-tab>
              <b-tab title="Resources">
                <p>{{ chapters_by_pk.resources }}</p>
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

export default {

  apollo: {
    chapters_by_pk: {
      query: gql`query ($id: uuid = "") {
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
    `,
      variables () {
        return {
          id: this.$route.query.chapterId
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    PxPlayer
  },

  data () {
    return {
      videoId: '859094052',
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

    hideLastBullet (swiper) {
      const bullets = swiper.pagination.el.children
      const lastBullet = bullets[bullets.length - 1]
      lastBullet.parentNode.removeChild(lastBullet)
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
}

.course-video{
  flex: 0 0 75%;
  max-width: 75%;
  transition: 0.5s ease all;
}

.course-video__toggle{
  transition: 0.5s ease all;
  flex: 0 0 91.666667%;
  max-width: 91.666667%;
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

@media (max-width: 990px) {
  .courseNav-parent{
    flex-wrap: wrap;
  }

  .toggleNav-icon{
    display:none
  }
}

</style>
