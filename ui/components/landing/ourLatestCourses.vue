<script>
import { gql } from 'graphql-tag'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

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
    }
  },

  data () {
    return {
      finalSlide: false,
      initialSlide: true,
      swiperInstance: null
    }
  },
  mounted () {
    this.initSwiper()
  },

  methods: {
    initSwiper () {
      this.swiperInstance = new SwiperCore('.swiper', {
        modules: [Pagination, Navigation],
        navigation: {
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-back'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          slideChange: () => {
            this.finalSlide = this.swiperInstance.isEnd
            this.initialSlide = this.swiperInstance.isBeginning
          }
        },
        breakpoints: {
          320: {
            slidesPerView: 1.15,
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
    <div class="tw-flex tw-w-full tw-justify-between tw-items-center tw-mb-4">
      <h4>Our latest courses</h4>

      <div class="tw-flex tw-gap-2">
        <div v-show="!initialSlide" class="custom-swiper-back tw-shadow hover:tw-shadow-lg tw-ease-in-oute tw-duration-200 tw-rounded-full tw-w-fit  tw-bg-white tw-cursor-pointer">
          <Icon icon="material-symbols-light:navigate-before" width="2.25rem" />
        </div>
        <div v-show="!finalSlide" class="custom-swiper-next tw-shadow hover:tw-shadow-lg tw-ease-in-oute tw-duration-200 tw-rounded-full tw-w-fit tw-bg-white tw-cursor-pointer">
          <Icon icon="material-symbols-light:navigate-next" width="2.25rem" />
        </div>
      </div>
    </div>

    <div class="swiper tw-overflow-hidden">
      <div class="swiper-wrapper">
        <div v-for="(course, courseIndex) in courses" :key="courseIndex" class="swiper-slide">
          <NuxtLink v-if="!$apollo.loading" class="hover:tw-no-underline" :to="`/buyCourse/${course.id}`">
            <PxCardCourse
              :title="course.name"
              :teacher="course.teacher.name"
              :description="course.description"
              :thumbnail="course.thumbnail"
              :instructor="course.teacher.name"
              :pfp="course.teacher.pfp"
            />
          </NuxtLink>
          <div v-else class="tw-bg-gray-100 tw-animate-pulse tw-rounded tw-w-full tw-h-[350px]" />
        </div>
      </div>
    </div>
  </div>
</template>
