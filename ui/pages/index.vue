<template>
  <div>
    <div v-if="!$apollo.loading">
      <landing-course-release v-if="!$auth.loggedIn" />

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
              <PxCardCourse
                :is-progress="false"
                :pfp="course.teacher.pfp"
                :instructor="course.teacher.name"
                :description="course.description"
                :title="course.name"
                :url="'/buyCourse/' + course.id"
                :cover="course.thumbnail"
              />
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <!--SWIPER CONTROLS-->
        <div class="d-flex align-items-center justify-content-end" style="gap:1rem">
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

        <div class="my-5">
          <h4 class="mb-4">
            Upcoming courses
          </h4>
          <b-row>
            <b-col v-for="(course,index) in comingCourses" :key="index" cols="12" lg="6">
              <PxCardCourse
                is-progress="false"
                :pfp="course.pfp"
                :instructor="course.instructor"
                :description="course.description"
                :title="course.title"
                url=""
                :cover="course.cover"
                :coming-soon="true"
                :category="course.category"
              />
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div v-if="!$auth.loggedIn">
        <b-container fluid style="background-color: #F6F6F6;">
          <b-container style="max-width: 1240px;">
            <b-row class="align-items-center">
              <b-col cols="12" lg="6">
                <div class="my-4">
                  <h4>Where Art Meets Innovation</h4>
                  <p>
                    Academy by Blind Gallery is more than just an educational platform; it's a bridge connecting the realms of art and technology. We are dedicated to empowering digital art professionals – artists, curators, gallerists, and collectors – with cutting-edge knowledge and insights.
                  </p>
                  <p style="font-weight: 600;">
                    Crafted by Art and Tech Enthusiasts
                  </p>
                  <ul>
                    <li>
                      <span style="font-weight: 600;">Expertly Designed Curriculum:</span>  Every course at Academy is meticulously designed by connoisseurs of digital art.
                    </li>
                    <li class="mt-4 ">
                      <span style="font-weight: 600;">Join Our Educator Community:</span> Are you experienced in the field of digital art? We welcome trailblazers to join our educator team. Share your expertise and shape the future of digital art education. Interested? Reach out <span v-b-modal.educatorsForm style="color: #00B9CD; text-decoration:underline;">
                        here.
                      </span>
                    </li>
                  </ul>
                </div>
              </b-col>
              <b-col cols="12" lg="6">
                <div class="w-100">
                  <img width="100%" src="/videos/about.gif" alt="about">
                </div>
              </b-col>
            </b-row>
          </b-container>
        </b-container>

        <!--COMMUNITY FEEDBACK-->

        <b-container style="max-width: 1240px;" class="my-5">
          <h4 class="m-0 text-center">
            Community feedback
          </h4>
          <b-row class="align-items-center pt-5 pb-5 justify-content-center">
            <b-col cols="12" lg="4">
              <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded mb-4">
                <a href="https://twitter.com/Datzel3" target="_blank" style="text-decoration: none;">
                  <div class="feedback-info p-4 d-flex align-items-center">
                    <b-avatar style="border: 2px solid #fff;" class="mr-3" size="3.5rem" src="https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg" />
                    <div>
                      <h4 class="m-0">
                        Datzel
                      </h4>
                      <p class="m-0">
                        Graphic Designer and Artist
                      </p>
                    </div>
                  </div>

                  <div class="p-4">
                    <p class="small text-secondary m-0">
                      I wish I had discovered this platform when I first started my journey as a blockchain artist. A platform that teaches you everything about the ecosystem is a great advantage!
                    </p>
                  </div>
                </a>
              </div>
            </b-col>
            <b-col cols="12" lg="4">
              <a href="https://twitter.com/aljaparis" target="_blank" style="text-decoration: none;">
                <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded mb-4">

                  <div class="feedback-info p-4 d-flex align-items-center">
                    <b-avatar style="border: 2px solid #fff;" class="mr-3" size="3.5rem" src="https://pbs.twimg.com/profile_images/1665442400590856195/rZQEm-Vh_400x400.jpg" />
                    <div>
                      <h4 class="m-0">
                        Aleksandra Art
                      </h4>
                      <p class="m-0">
                        Art Curator
                      </p>
                    </div>
                  </div>

                  <div class="p-4">
                    <p class="small text-secondary m-0">
                      Educational endeavors within the Blockchain art sphere have been some of the most important steps for reaching a mutual understanding with the wider creative industry. It's imperative for art practitioners to grasp the core principles of Web 3 in a structured and coherent fashion - I'm excited to be a part of it!
                    </p>
                  </div>
                </div>
              </a>
            </b-col>
          </b-row>
        </b-container>

        <b-container style="max-width: 1240px;" class="my-5 py-5">
          <b-row class="align-items-end">
            <b-col cols="12" lg="6">
              <div>
                <h4>Frequently Asked Questions</h4>

                <div v-b-toggle.accordion-1 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    What is the Academy by Blind Gallery?
                  </p>
                  <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      The Academy aims to provide educational content for anyone interested in learning the digital art market.
                    </p>
                  </b-collapse>
                </div>

                <div v-b-toggle.accordion-2 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    What is the Blind Gallery?
                  </p>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      The <a href="https://www.blindgallery.xyz/" target="_blank">
                        Blind Gallery
                      </a> is a digital gallery specializing in blockchain art. It has collaborated with over 70 artists, reaching over 1,000 collectors worldwide.
                    </p>
                  </b-collapse>
                </div>

                <div v-b-toggle.accordion-3 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    Who is the founder of the Blind Gallery?
                  </p>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      <a href="https://www.kaloh.xyz/" target="_blank"> Kaloh</a> founded the Blind Gallery in 2022, and we are a team of five blockchain art enthusiasts.
                    </p>
                  </b-collapse>
                </div>

                <div v-b-toggle.accordion-4 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    Who creates the content?
                  </p>
                  <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      The Blind Gallery team.
                      <br><br>
                      In addition, we are looking for experts interested in sharing their knowledge in the blockchain art space. Please reach out <a href="#" target="_blank">here</a> if interested.
                    </p>
                  </b-collapse>
                </div>
                <div v-b-toggle.accordion-5 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    What payment methods are available?
                  </p>
                  <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      You can purchase the courses using a Credit Card via Stripe or XTZ (Tezos) cryptocurrency.
                    </p>
                  </b-collapse>
                </div>

                <div v-b-toggle.accordion-6 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    What login methods are available?
                  </p>
                  <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      You can create an account using an email or a Tezos crypto wallet.
                    </p>
                  </b-collapse>
                </div>
                <div v-b-toggle.accordion-7 class="shadow-sm p-3 mb-2" block>
                  <p class="m-0">
                    Where can I ask questions and get support?
                  </p>
                  <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
                    <p class="text-secondary my-2">
                      You can find the customer support team on our <a href="https://discord.gg/zxxZv6HUfr" target="_blank">Discord server </a>
                    </p>
                  </b-collapse>
                </div>
              </div>
            </b-col>

            <b-col cols="12" lg="6">
              <div>
                <iframe
                  src="https://blindgallery.substack.com/embed"
                  height="150"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                />
              </div>
            </b-col>
          </b-row>
        </b-container>
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
import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'
import { gql } from 'graphql-tag'

SwiperCore.use([Pagination, Navigation])

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
  components: {
    Swiper,
    SwiperSlide

  },

  data () {
    return {
      totalCertificates: [],
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
          slidesPerView: 2,
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
      comingCourses:
      [
        {
          pfp: 'https://pbs.twimg.com/profile_images/1510148081475629058/Q85gM-EI_400x400.jpg',
          instructor: 'By Uncap Collective',
          title: 'A Collectors Journey',
          description: 'Uncap Collective shares advice for collectors, including the different genres and how to approach this dynamic art ecosystem.',
          cover: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmW16LtcSVTnXjbuqwmQ84WLDomGbMKDRfhPcFWfBiiT9s',
          category: 'Collectors'
        },
        {
          pfp: 'https://pbs.twimg.com/profile_images/1589977797451288576/zZ_JdJaB_400x400.jpg',
          instructor: 'By Dist',
          title: 'Designing Sounds for Beginners',
          description: 'Learn the fundamentals of digital sound-making for creatives.',
          cover: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmannDKXVxP2sqg9hKcEUi9ytRDBxRVS4zAAyYttmmxsVn',
          category: 'Artists'
        },
        {
          pfp: 'https://pbs.twimg.com/profile_images/1525982570327990273/YJ8grBE8_400x400.jpg',
          instructor: 'By Haiver',
          title: 'Mastering The Artist Statement',
          description: 'Learn how to create a simple and powerful artist statement.',
          cover: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmTf43Zy5TEbBMb3gW3Vj9HcfNEjLqiiRCG8gBhLSZk6XK',
          category: 'Artists'
        },
        {
          pfp: 'https://pbs.twimg.com/profile_images/1562451296338206720/kyeAnsga_400x400.jpg',
          instructor: 'By Heeey',
          title: 'Generative Coded Art 101',
          description: 'Learn the fundamental concepts and history behind generative art.',
          cover: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmWLSjZT33uBizZ3pPe3c7xLT8PdZzjg8727efLNHuhckC',
          category: 'Artists, Collectors'
        }

      ]

    }
  },
  computed: {
    user () {
      return this.$auth.user
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
    },
    user (newValue) {
      if (newValue) {
        this.totalCertificates = []
      }
    }

  },
  mounted () {
    window.addEventListener('resize', this.updateScreenWidth)
    this.updateScreenWidth()
    this.handleCertificate()
  },

  methods: {
    handleCertificate (status) {
      if (status) {
        this.totalCertificates.push(status)
      }
      if (!this.$auth.user) { this.totalCertificates = [] }
    },
    updateScreenWidth () {
      this.screenWidth = window.innerWidth
    },
    onSlideChange () {
      this.isFirstSlide = this.$refs.swiper.$el.swiper.isBeginning
      this.isLastSlide = this.$refs.swiper.$el.swiper.isEnd

      this.currentSlide = Math.ceil((this.$refs.swiper.$el.swiper.realIndex + 1) / this.breakpoints[this.targetBreakpoint].slidesPerGroup)
    },

    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
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
