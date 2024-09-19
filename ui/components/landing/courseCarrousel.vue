<script>
import { gql } from 'graphql-tag'
import SwiperCore, { Navigation, EffectCoverflow, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Pagination, Navigation, EffectCoverflow])

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
    }

  },
  data () {
    return {
      swiperInstance: null
    }
  },
  mounted () {
    this.initSwiper()
  },
  methods: {
    initSwiper () {
      this.swiperInstance = new SwiperCore('.swiper', {
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true
        },
        modules: [Pagination, Navigation, EffectCoverflow],
        navigation: {
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-back'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        centeredSlides: true,
        initialSlide: 2,
        loop: true,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }

      })
    }
  }

}
</script>

<template>
  <div class="tw-container">
    <div class="tw-w-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-my-4">
      <h2 class="tw-font-normal tw-text-center">
        Your starting point to learn <span class="tw-text-cyan-500 tw-font-bold">Blockchain Art</span>
      </h2>
      <p class="tw-text-gray-500 tw-text-center">
        Explore interactive courses led by industry experts, paving your way in the digital art revolution.
      </p>
    </div>
    <div class="tw-container tw-relative">
      <div v-if="!$apollo.loading">
        <div class="swiper tw-overflow-hidden ">
          <div class="swiper-wrapper">
            <div v-for="(course, courseIndex) in courses" :key="courseIndex" class="swiper-slide">
              <NuxtLink class="hover:tw-no-underline" :to="`/buyCourse/${course.id}`">
                <PxCardCourse :title="course.name" :description="course.description" :thumbnail="course.thumbnail" :instructor="course.teacher.name" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="swiper-pagination tw-w-full tw-justify-center tw-items-center tw-flex tw-gap-2 tw-my-4" />

        <div class="custom-swiper-back tw-shadow hover:tw-shadow-lg tw-ease-in-oute tw-duration-200 tw-rounded-full tw-absolute tw-top-[50%] tw-left-0 tw-z-20 tw-bg-white tw-cursor-pointer">
          <Icon icon="material-symbols-light:navigate-before" width="2.25rem" />
        </div>
        <div class="custom-swiper-next tw-shadow hover:tw-shadow-lg tw-ease-in-oute tw-duration-200 tw-rounded-full tw-absolute tw-top-[50%] tw-right-0 tw-z-20 tw-bg-white tw-cursor-pointer">
          <Icon icon="material-symbols-light:navigate-next" width="2.25rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
