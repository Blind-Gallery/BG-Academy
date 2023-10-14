<template>
  <div>
    <div v-if="!$apollo.loading">
      <!--INTRODUCTION CONTAINER-->
      <b-container v-if="!$auth.loggedIn" class="main-container pt-5 pb-5" fluid>
        <b-container style="max-width: 1240px;">
          <b-row class="align-items-center">
            <b-col class="d-flex flex-column intro-left-col" style="gap:1rem">
              <h1>
                Your starting point in
                <span style="color:#00B9CD"> Digital Art & Culture</span>
              </h1>
              <p>
                Explore interactive courses led by industry experts, paving your way in the digital art revolution.
              </p>
              <div class="d-flex gap-2">
                <a style="text-decoration: none;" href="#explore-courses" class="secondary-btn-black">
                  Explore courses
                </a>
              </div>
            </b-col>
            <b-col class="d-lg-flex justify-content-end d-none">
              <img style="border-radius: 10px;" src="https://cdn.discordapp.com/attachments/984632520471633920/1125691815249576016/expertacademy.ai_illustration_of_a_young_male_professional_poin_e0a06885-d02b-4ec2-ac6f-ccfa59844d75.png" width="80%">
            </b-col>
          </b-row>
        </b-container>
      </b-container>
      <!--INFO CONTAINER-->
      <b-container v-if="!$auth.loggedIn" fluid style="background-color: #F6F6F6;">
        <b-container class="mb-5 py-4" style="max-width: 1240px;">
          <!--PARTNERS CONTAINER-->
          <h4 class="m-0" style="text-align: center; font-weight: 600; opacity: 0.7;">
            Meet our partners
          </h4>

          <div class="partners-container ">
            <img
              width="120px"
              alt="joyn"
              src="https://app.joyn.xyz/_next/static/media/logo-dark.1d2f9f52.svg"
            >

            <img
              width="150px"
              alt="autonomy"
              src="https://autonomy.io/Logo.svg"
            >
            <img
              width="105px"
              alt="tezos"
              src="https://imgs.search.brave.com/Ni4B87Cq07txaSZWBtEEf8YjF5llOTY-L8WPXow5tZs/rs:fit:1200:778:1/g:ce/aHR0cHM6Ly9icmFu/ZHBhbGV0dGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNS90ZXpvcy0w/Mi5wbmc"
            >
            <img
              width="160px"
              alt="fxhash"
              src="https://fxhash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84947e48-fba3-4cbb-b203-aaad507b315b%2Ffxhash_tbg_bt_01.png?table=block&id=b34cff0e-7784-40ec-9020-cea678fe9d41&spaceId=f9d1e984-50ed-4650-a543-95d2b6c0ba90&width=1860&userId=&cache=v2"
            >
          </div>
        </b-container>
      </b-container>

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
                <b-avatar class="mb-2" size="5rem" />
                <h4>{{ $auth.user.name }}</h4>
              </div>
              <div class="d-flex flex-row " style="gap:1.25rem; border-top: 1px solid rgb(0 0 0 / 10%); padding-top: 1.5rem;">
                <div class="d-flex flex-column align-items-center">
                  <h4 class="mb-1">
                    0
                  </h4>
                  <div class="d-flex align-items-center justify-content-center">
                    <Icon
                      class=" mr-1"
                      icon="material-symbols:check-circle-outline"
                    />
                    <p class="m-0 " style="font-size: small;">
                      Completed
                    </p>
                  </div>
                </div>

                <div
                  class="d-flex flex-column align-items-center"
                >
                  <h4 class="mb-1">
                    0
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
                    0
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
              <h1>{{ $auth.user.name ? `Welcome Back, ${$auth.user.name}!` : "Welcome Back!" }}</h1>
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
          <b-tabs content-class="mt-3">
            <b-tab title="All" active>
              <div
                v-if="!user_course"
                class="d-flex flex-column"
              >
                <h4>All your courses will appear here</h4>
                <p>Explore our courses and start learning with us!</p>
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
              <div v-if="!user_course" class="d-flex flex-column  ">
                <h4>Your courses in progress will appear here</h4>
                <p>Start a course right now by purchasing a new one or viewing one of your existing ones.</p>
              </div>

              <b-row v-else>
                <b-col v-for="item in user_course" :key="item.id" lg="4">
                  <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/chapter/' + item.last_chapter_id_seen">
                    <PxCard
                      :is-progress="true"
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

            <b-tab title="Certificates">
              <div
                v-if="false"
                class="d-flex flex-column"
              >
                <h4>Your certificates will appear here</h4>
                <p>Complete a course to get your first certificate!</p>
              </div>
              <b-row>
                <b-col v-for="fakeCertificate in fakeCertificates" :key="fakeCertificate.title" lg="6">
                  <PxCertificate
                    :title="fakeCertificate.title"
                    :instructor="fakeCertificate.instructor"
                    :cover="fakeCertificate.cover"
                    :transaction-u-r-l="fakeCertificate.transactionURL"
                    :transaction="fakeCertificate.transaction"
                    :minted-date="fakeCertificate.mintedDate"
                    :student="fakeCertificate.student"
                  />
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </div>
      </b-container>

      <!--COURSES ROW-->
      <b-container
        id="explore-courses"
        style="max-width: 1240px;"
        class="my-5"
      >
        <h4 class="mb-4">
          See our latest courses
        </h4>

        <Swiper

          ref="swiper"
          :navigation="{ nextEl: '.next-slide', prevEl: '.last-slide-disabled' }"
          :modules="modules"
          :effect="'fade'"
          :breakpoints="breakpoints"
          :space-between="30"
          :grid="{
            rows: 2,
          }"
          @slideChange="onSlideChange"
        >
          <SwiperSlide v-for="course in courses" :key="course.id" ref="slide">
            <NuxtLink class="course-route" style="text-decoration: none;" :to="'/buyCourse/' + course.id">
              <PxCard
                :is-progress="false"
                :pfp="course.teacher.pfp"
                :instructor="course.teacher.name"
                :description="course.description"
                :title="course.name"
                :cover="course.thumbnail"
              />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <!--SWIPER CONTROLS-->
        <div class="d-flex align-items-center justify-content-end" style="gap:1rem">
          <p class="m-0">
            <b> {{ currentSlide }} </b>/{{ totalSlides }}
          </p>

          <div ref="lastSlideBtn" :class="isFirstSlide === false? `last-slide`:`last-slide-disabled`" style="cursor: pointer;">
            <Icon
              icon="material-symbols:chevron-left"
              width="2rem"
            />
          </div>
          <div :class="isLastSlide === false ? 'next-slide':'next-slide-disabled'" style="cursor: pointer;">
            <Icon width="2rem" icon="material-symbols:chevron-right" />
          </div>
        </div>
      </b-container>

      <!--COMMUNITY FEEDBACK-->

      <b-container v-if="!$auth.loggedIn" style="max-width: 1240px;" class="my-5">
        <h4 class="m-0">
          Community feedback
        </h4>
        <b-row class="align-items-center pt-5 pb-5">
          <b-col cols="12" lg="4">
            <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded mb-4">
              <div class="feedback-info p-4 d-flex align-items-center">
                <b-avatar style="border: 2px solid #fff;" class="mr-3" size="3.5rem" src="https://userstock.io/data/wp-content/uploads/2020/06/kimson-doan-HD8KlyWRYYM-4-300x300.jpg" />
                <div>
                  <h4 class="m-0">
                    Sofia Rossi
                  </h4>
                  <p class="m-0">
                    Graphic Designer
                  </p>
                </div>
              </div>
              <div class="p-4">
                <p class="small text-secondary m-0">
                  Absolutely captivated by the array of art courses this platform delivers. It's a sanctuary where imagination and skill converge, allowing individuals to paint their aspirations onto the canvas of reality. The fusion of technique, inspiration, and guidance is an artist's dream come true.
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="4">
            <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded mb-4">
              <div class="feedback-info p-4 d-flex align-items-center">
                <b-avatar style="border: 2px solid #fff;" class="mr-3" size="3.5rem" src="https://userstock.io/data/wp-content/uploads/2020/05/warren-wong-VVEwJJRRHgk-300x300.jpg" />
                <div>
                  <h4 class="m-0">
                    Alex Canales
                  </h4>
                  <p class="m-0">
                    Digital Artist
                  </p>
                </div>
              </div>
              <div class="p-4">
                <p class="small text-secondary m-0">
                  The art courses available on this platform are an absolute gem. They don't just teach art techniques; they nurture a deep understanding of artistic concepts. It's a haven for anyone eager to grasp the nuances of visual expression and refine their artistic prowess.
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="4">
            <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded mb-4">
              <div class="feedback-info p-4 d-flex align-items-center">
                <b-avatar style="border: 2px solid #fff;" class="mr-3" size="3.5rem" src="https://userstock.io/data/wp-content/uploads/2020/06/philip-martin-5aGUyCW_PJw-300x300.jpg" />
                <div>
                  <h4 class="m-0">
                    William da Silva
                  </h4>
                  <p class="m-0">
                    Plastic Artist
                  </p>
                </div>
              </div>
              <div class="p-4">
                <p class="small text-secondary m-0">
                  Enrolling in the art courses offered by this platform was a game-changer for me. The instructors possess an unmatched mastery in their fields, and the courses are structured thoughtfully, catering to beginners and seasoned artists alike.
                </p>
              </div>
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
import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'
import { gql } from 'graphql-tag'

SwiperCore.use([Pagination, Navigation])

export default {
  apollo: {
    courses: {
      query: gql`query {
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
    user_course: {
      query: gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
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
  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      targetBreakpoint: null,
      screenWidth: 0,
      breakpoints: {
        320: {
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 10
        },
        650: {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 2
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3
        }
      },
      showAllCourses: false,
      isFirstSlide: true,
      isLastSlide: false,
      currentSlide: 1,
      totalSlides: 0,
      modules: [Pagination, EffectFade, Navigation],
      fakeCertificates: [{
        cover: 'https://cdn.discordapp.com/attachments/989274745495240734/1146438618689306634/marcccio_3d_isometric_holographic_gold_cube_badge_passport_futu_2b1930fa-abad-4d0d-b718-cfdb2152463f.png',
        title: 'Introduction to digital objects',
        instructor: 'Hugo Santana',
        student: 'David Muñoz Guzmán',
        mintedDate: '04/09/2023',
        transaction: 'ooRhd...JVYDAM',
        transactionURL: 'https://tzkt.io/ooRhdcXTPCoYcAp33sRA3R1d5YFbbWXQDSVczTKjL3a8NJVYDAM/64307659/1'
      }]

    }
  },

  watch: {
    // This function allows you to listen to changes in screen size in order to determine the total slides of the swiper.
    screenWidth (newValue) {
      this.screenWidth = newValue
      if (this.$refs.swiper) {
        if (this.screenWidth > 1024) {
          this.targetBreakpoint = 1024
        } else if (this.screenWidth > 650) {
          this.targetBreakpoint = 650
        } else {
          this.targetBreakpoint = 320
        }

        this.totalSlides = Math.ceil(
          this.$refs.swiper.$el.swiper.slides.length /
        this.breakpoints[this.targetBreakpoint].slidesPerGroup
        )

        this.currentSlide = Math.ceil((this.$refs.swiper.$el.swiper.realIndex + 1) / this.breakpoints[this.targetBreakpoint].slidesPerGroup)
      }
    }

  },

  mounted () {
    window.addEventListener('resize', this.updateScreenWidth)
    this.updateScreenWidth()
  },

  methods: {
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    onSlideChange () {
      this.isFirstSlide = this.$refs.swiper.$el.swiper.isBeginning
      this.isLastSlide = this.$refs.swiper.$el.swiper.isEnd

      this.currentSlide = Math.ceil((this.$refs.swiper.$el.swiper.realIndex + 1) / this.breakpoints[this.targetBreakpoint].slidesPerGroup)
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

.partners-container img{
  filter: brightness(0%);
  justify-self: center;
  opacity: 0.5;

}

.partners-container{
  display:grid;
  grid-template-columns: repeat(4,0.2fr);
  align-items: center;
  justify-content: center;
  gap:1.5rem;
  padding:1.25rem
}

.feedback-info{
  background: linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
  color:#fff;
  border-radius: 5px 5px 0px 0px;
}

.profile-container{
  min-height: 380px;
  margin: 1rem 0rem;
}

.last-slide, .next-slide{
  padding:0.25rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 50%;
}

.last-slide-disabled, .next-slide-disabled{
  opacity: .35;

  pointer-events: none;
}

@media(max-width:768px){
.partners-container{
  display:grid;
  grid-template-columns: repeat(2,0.5fr);
}
}

@media (max-width: 425px){
  .intro-left-col{
    align-items: center;
  }
  .intro-left-col h1, .intro-left-col p{
    text-align: center;
  }

}
</style>
