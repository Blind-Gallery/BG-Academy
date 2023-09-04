<template>
  <div>
    <!--INTRODUCTION CONTAINER-->
    <b-container v-if="!$auth.loggedIn" class="main-container pt-5 pb-5" fluid>
      <b-container style="max-width: 1240px;">
        <b-row class="align-items-center">
          <b-col class="d-flex flex-column intro-left-col" style="gap:1rem">
            <h1>
              Your starting point into
              <span style="color:#00B9CD"> Digital Arts  & Culture</span>
            </h1>
            <p>
              Explore interactive courses led by industry experts, unleashing your artistic potential.
            </p>
            <div class="d-flex gap-2">
              <button class="secondary-btn-black">
                Explore courses
              </button>
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
        <p class="m-0" style="text-align: center; font-weight: 600; opacity: 0.7;">
          Meet out partners
        </p>

        <div class="partners-container ">
          <img
            width="110px"
            alt="joyn"
            src="https://app.joyn.xyz/_next/static/media/logo-dark.1d2f9f52.svg"
          >

          <img
            width="140px"
            alt="autonomy"
            src="https://autonomy.io/Logo.svg"
          >
          <img
            width="95px"
            alt="tezos"
            src="https://imgs.search.brave.com/Ni4B87Cq07txaSZWBtEEf8YjF5llOTY-L8WPXow5tZs/rs:fit:1200:778:1/g:ce/aHR0cHM6Ly9icmFu/ZHBhbGV0dGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNS90ZXpvcy0w/Mi5wbmc"
          >
          <img
            width="140px"
            alt="fxhash"
            src="https://fxhash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84947e48-fba3-4cbb-b203-aaad507b315b%2Ffxhash_tbg_bt_01.png?table=block&id=b34cff0e-7784-40ec-9020-cea678fe9d41&spaceId=f9d1e984-50ed-4650-a543-95d2b6c0ba90&width=1860&userId=&cache=v2"
          >
        </div>
      </b-container>
    </b-container>

    <!--LOGGED CONTAINER-->
    <b-container v-if="$auth.loggedIn" class="mb-5" style="max-width: 1240px;">
      <b-row class="mb-5">
        <b-col cols="12" lg="4">
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

        <b-col cols="12" lg="8">
          <div class="p-5 d-flex flex-column justify-content-center profile-container welcome-card rounded shadow-sm">
            <h1>Welcome Back, {{ $auth.user.name }}!</h1>
            <h4 class="mb-4" style="font-weight: 400;">
              What do you want to learn today?
            </h4>
            <div class="d-flex">
              <a href="#explore-courses" class="secondary-btn-black">
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

              class="d-flex flex-column align-items-center justify-content-center"
              style="height: 65vh;"
            >
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>
            <b-row :style="showAllCourses === false ? 'max-height: 550px; overflow: hidden':'height: auto; overflow: hidden'">
              <!-- <b-col v-for="course in courses" :key="course.id" cols="12" lg="4">
                <PxCard
                  :is-certificate="false"
                  :pfp="course.teacher.pfp"
                  :instructor="course.teacher.name"
                  :description="course.description"
                  :title="course.name"
                  :cover="course.thumbnail"
                />
              </b-col> -->
            </b-row>
          </b-tab>
          <button class="primary-btn small" @click="showAllCourses = !showAllCourses">
            {{ showAllCourses === false?`Show ${coursesFicticial.length - 3} more`:'Show less' }}
          </button>
          <b-tab title="In progress">
            <div v-if="false" class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>

            <b-row v-else style="height: 65vh">
              <!-- <b-col v-for="course in courses" :key="course.id" lg="4">
                <NuxtLink class="course-route" style="text-decoration: none;" :to="{ path: 'courseNavigator', params: { courseId: course.id }, query: { courseId: course.id }}">
                  <PxCard
                    :is-progress="true"
                    :is-certificate="false"
                    :pfp="course.teacher.pfp"
                    :instructor="course.teacher.name"
                    :description="course.description"
                    :title="course.name"
                    :cover="course.thumbnail"
                  />
                </NuxtLink>
              </b-col> -->
            </b-row>
          </b-tab>

          <b-tab title="Certificates">
            <b-row>
              <!-- <b-col v-for="course in courses" :key="course.id" lg="4">
                <PxCard
                  :is-progress="false"
                  :is-certificate="true"
                  :pfp="course.teacher.pfp"
                  :instructor="course.teacher.name"
                  :description="course.description"
                  :title="course.name"
                  :cover="course.thumbnail"
                />
              </b-col> -->
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-container>

    <!--COURSES ROW-->
    <b-container
      style="max-width: 1240px;"
      class="my-5"
    >
      <h4 class="mb-4">
        Increase your potential with the best courses
      </h4>

      <Swiper

        ref="swiper"
        :navigation="{ nextEl: '.next-slide', prevEl: '.last-slide-disabled' }"
        :modules="modules"
        :effect="'fade'"
        :slides-per-view="3"
        :space-between="30"
        :slides-per-group="3"

        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="courseFicticial in coursesFicticial" :key="courseFicticial.title" ref="slide">
          <PxCard
            :is-progress="false"
            :is-certificate="true"
            :pfp="courseFicticial.pfp"
            :instructor="courseFicticial.instructor"
            :description="courseFicticial.description"
            :title="courseFicticial.title"
            :cover="courseFicticial.cover"
          />
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
      <h3 class="m-0">
        Community feedback
      </h3>
      <b-row class="align-items-center pt-5 pb-5">
        <b-col cols="12" lg="4">
          <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded ">
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
          <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded ">
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
          <div style="height: 300px;" class="d-flex flex-column  shadow-sm rounded ">
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
</template>

<script>
import { Pagination, EffectFade, Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'
// import { gql } from 'graphql-tag'

SwiperCore.use([Pagination, Navigation])

export default {
  // apollo: {
  //   courses: gql`query {
  //     courses {
  //       id
  //       level
  //       language
  //       duration
  //       name
  //       description
  //       teacher_id
  //       thumbnail
  //       teacher {
  //         pfp
  //         name
  //       }
  //     }
  //   }
  // `
  // },
  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      showAllCourses: false,
      isFirstSlide: true,
      isLastSlide: false,
      currentSlide: 1,
      totalSlides: 0,
      modules: [Pagination, EffectFade, Navigation],
      coursesFicticial: [
        {
          instructor: 'Hugo Santana',
          pfp: 'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'Introduction to digital objects',
          cover: 'https://cdn.discordapp.com/attachments/995431544019755070/1124593093560254555/anomalyofapes_code_art_black_and_white_tile_texture_flat_graphi_f5d49018-e6de-4513-9679-fcaaef4f7b19.png'
        },
        {
          instructor: 'Kate Vass',
          pfp: 'https://pbs.twimg.com/profile_images/1581225184127815682/8OvEWkSY_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'Gallery business',
          cover: 'https://cdn.discordapp.com/attachments/995431473828077618/1126451747213291600/taylankoca_imagine_a_modern_art_gallery_with_the_curator_in_it._799e1c51-2808-4a56-b4ab-31ca85854b9c.png'
        },
        {
          instructor: 'Aleksandra Art',
          pfp: 'https://pbs.twimg.com/profile_images/1665442400590856195/rZQEm-Vh_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'Getting involved in web 3',
          cover: 'https://cdn.discordapp.com/attachments/933565701162168371/1126481090173997137/aapertureka_a_minimalist_clean_and_sleek_abstract_illustration__db72e08a-dfb4-4df8-ab0a-89ad77bc24f2.png'
        },
        {
          instructor: 'Sean Moss Pultz',
          pfp: 'https://pbs.twimg.com/profile_images/1355778841101299713/FUQe7j45_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'What is a crypto wallet?',
          cover: 'https://cdn.discordapp.com/attachments/933565701162168371/1124863799766302800/DariaSuvorova_Wallet_crypto._Ultra_realistic._728e36ec-35cf-4722-9673-b41849919361.png'
        },
        {
          instructor: 'Hugo Santana',
          pfp: 'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'Digital objects advanced',
          cover: 'https://cdn.discordapp.com/attachments/995431544019755070/1124596257181151243/Hardie_code_art_black_and_white_tile_texture_flat_graphic_Vecto_a0f35d65-195d-4352-a8e9-d6027bab4554.png'
        },
        {
          instructor: 'Anika Meier',
          pfp: 'https://pbs.twimg.com/profile_images/1506308937687224324/8hR0LB5I_400x400.jpg',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.',
          title: 'Introduction to digital art curation',
          cover: 'https://cdn.discordapp.com/attachments/1008571223543922809/1108278018687893514/Ondrej_Bacina_Ultra_photorealistic_canon_DSLR_image_of_an_art_c_87e87c4d-d3eb-4a6c-88e1-5c2ab67bb96e.png'
        }

      ]
    }
  },
  mounted () {
    if (this.$refs.swiper) {
      this.totalSlides = Math.ceil(this.$refs.swiper.$el.swiper.slides.length / 3)
    }
  },

  methods: {
    onSlideChange () {
      this.isFirstSlide = this.$refs.swiper.$el.swiper.isBeginning
      this.isLastSlide = this.$refs.swiper.$el.swiper.isEnd

      this.currentSlide = Math.ceil((this.$refs.swiper.$el.swiper.realIndex + 1) / 3)
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
  filter: brightness(-100%);
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
