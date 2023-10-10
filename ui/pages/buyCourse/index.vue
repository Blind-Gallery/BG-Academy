<template>
  <div>
    <b-container style="max-width: 1240px; margin-top:2rem; margin-bottom: 4rem;">
      <b-row class="mt-md-3">
        <b-col
          order="2"
          order-lg="1"
          lg="8"
        >
          <div class="course-info">
            <iframe
              class="rounded mb-3 d-lg-block d-none"
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/qtPi0JvmWbs"
              title="YouTube video player"
              frameborder="0"
            />
            <h5 class="mb-3">
              Digital objects advanced
            </h5>
            <p>Gain insights into the latest tools and technologies used in the industry and develop a deep understanding of their capabilities.</p>
            <h5 class="mb-3 mt-4">
              You will learn
            </h5>
            <div class="d-flex mb-3 flex-column flex-lg-row" style="gap:1rem">
              <div class="d-flex flex-column shadow-sm rounded p-3">
                <Icon icon="material-symbols:check-small" color="#00c851" width="32" />
                <p class="m-0" style="font-weight: 600;">
                  Generative Art
                </p>
                <p class="small">
                  You will explore algorithms and procedural methods to generate visually captivating and ever-evolving artworks.
                </p>
              </div>
              <div class="d-flex flex-column shadow-sm rounded p-3">
                <Icon icon="material-symbols:check-small" color="#00c851" width="32" />
                <p class="m-0" style="font-weight: 600;">
                  Interactive Art
                </p>
                <p class="small">
                  Participants will discover how to combine coding with interactivity to develop engaging digital art experiences.
                </p>
              </div>
              <div class="d-flex flex-column shadow-sm rounded p-3">
                <Icon icon="material-symbols:check-small" color="#00c851" width="32" />
                <p class="m-0" style="font-weight: 600;">
                  Creative Coding Techniques:
                </p>
                <p class="small">
                  You will explore algorithms and procParticipants will discover how to combine coding with interactivity to develop engaging digital art experiences.
                </p>
              </div>
            </div>
            <h5 class="mb-3 mt-4">
              Description
            </h5>
            <div :class="!seeMore ? 'overflow-hidden description-container' : 'overflow-hidden description-container__toggle'">
              <p>
                The "Digital Objects Advanced" course is a comprehensive program designed to empower participants with the skills to create captivating digital art using coding techniques. Through a hands-on learning experience, students will explore the exciting intersection of art and technology, unlocking endless possibilities for artistic expression.<br><br>
                During this course, participants will dive into the world of generative art, where they will learn how to harness the power of algorithms and procedural methods to generate dynamic and visually stunning artworks. They will delve into the realm of interactive art, discovering how to combine coding with interactivity to engage viewers and create immersive digital art experiences.<br><br>
                Furthermore, the course will equip students with the ability to transform complex datasets into visually compelling artworks through data visualization techniques. By leveraging code, they will learn to represent information in meaningful and aesthetically pleasing ways, bridging the gap between data and art.
              </p>
            </div>
            <p style="text-align: center; cursor: pointer;font-weight: 600;" @click="doSeeMore()">
              {{ seeMore ? 'SEE LESS' : 'SEE MORE' }}
            </p>

            <h5 class="mb-3 mt-4">
              Course curriculum
            </h5>

            <div
              v-for="(module, moduleIndex) in courseModules"
              :key="moduleIndex"
              class="w-100 shadow-sm  mb-2 rounded"
            >
              <div @click="toggleCollapse(moduleIndex)">
                <PxToggleCollapse :icon-width="'24px'" :subtitle-name="`Chapters: ${module.chapter.length} | 1h 30min`" :toggle-name="module.title" />
              </div>

              <!--CHAPTERS COLLAPSE-->
              <b-collapse
                v-for="(chapter, chapterIndex) in module.chapter"
                :id="`accordion-${moduleIndex}`"
                :key="chapterIndex"
                class="mt-2"
                role="tabpanel"
              >
                <NuxtLink to="/courseNavigator">
                  <div class="d-flex justify-content-between p-3 position-relative  rounded">
                    <div class="d-flex align-items-center">
                      <Icon
                        icon="material-symbols:smart-display-outline-rounded"
                        width="18"
                        class="mr-2"
                      />
                      <p
                        class="curriculum-chapter m-0 small text-secondary text-truncate"
                      >
                        {{ chapter.title }}
                      </p>
                    </div>
                    <div>
                      <p class="small m-0 text-secondary">
                        15min
                      </p>
                    </div>
                  </div>
                </NuxtLink>
              </b-collapse>
            </div>
          </div>
        </b-col>
        <b-col
          order="1"
          order-lg="2"
          lg="4"
        >
          <div class="d-flex flex-column p-3 mb-3 shadow-sm  rounded ml-sm-3" style="gap:0.5rem; position:sticky; top: 77px;">
            <iframe
              class="rounded mb-3 d-lg-none"
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/qtPi0JvmWbs"
              title="YouTube video player"
              frameborder="0"
            />
            <div v-b-toggle.instructor class="d-flex align-items-center w-100" @click="toggleDropdown">
              <b-avatar src="https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg" size="2rem" />

              <PxToggleCollapse class="w-100" :icon-width="'24px'" :toggle-name="'Instructor name'" :subtitle-name="'Instructor'" />
            </div>
            <b-collapse id="instructor" accordion="intructor" role="tabpanel">
              <p class="small text-secondary">
                With over a decade of experience, he has taught at prestigious educational institutions and inspired countless students to delve into the fascinating world of creative coding.<br><br>
                His unique approach combines traditional art with cutting-edge technology, earning him recognition for pushing the boundaries of artistic expression.
              </p>
            </b-collapse>

            <div>
              <div class="border rounded p-2 mb-2">
                <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                  $200
                </h2>
                <p class="m-0">
                  Access this course
                </p>
              </div>

              <button class="primary-btn w-100 mb-2" @click="!$auth.loggedIn ? $bvModal.show('signin'): $bvModal.show('credit-pay')">
                <Icon
                  icon="material-symbols:credit-card"
                  color="#fff"
                  width="21"
                />
                Credit card
              </button>
              <button class="secondary-btn w-100" @click="!$auth.loggedIn ? $bvModal.show('signin'): ''">
                <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
                Tezos
              </button>
            </div>

            <b-modal id="credit-pay" centered hidden-header hide-footer>
              <template #modal-header="{ close }">
                <div>
                  <h2 style="color:#00b9cd">
                    Payment data
                  </h2>
                </div>
                <span
                  style="cursor: pointer"
                  @click="close()"
                ><Icon
                  width="32"
                  color="#888"
                  icon="material-symbols:close"
                /></span>
              </template>
              <div>
                <StripeElements />
              </div>
            </b-modal>

            <div style="width:100%; margin:1rem 0rem; border-bottom:1px solid #6c757d3b" />
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" class="mr-2" /><p class="small m-0">
                  Aprox. duration 4 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:signal-cellular-alt" class="mr-2" /><p class="small m-0">
                  Advanced level
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon
                  icon="material-symbols:language"

                  class="mr-2"
                /><p class="small m-0">
                  100% Online
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:closed-caption-outline" class="mr-2" /><p class="small m-0">
                  English subtitles
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:verified-outline" class="mr-2" /><p class="small m-0">
                  Certificate
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      seeMore: false,
      isOpen: false,
      courseModules: [
        {
          collapsed: true,
          title: 'Introduction to generative art',
          chapter: [
            {
              title: 'Exploring the foundation of generative art'
            },
            {
              title: 'Understanding algorithms and creative coding'
            },
            {
              title: 'Creating dynamic visual sistems'
            },
            {
              title: 'Embracing randomness in generative art'
            },
            {
              title: 'Expressing creativity through generative art techniques'
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
      ]
    }
  },
  methods: {
    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
    },
    doSeeMore () {
      this.seeMore = !this.seeMore
    },
    toggleDropdown () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style>

.curriculum-chapter {
  max-width: 100%;
}
.description-container{
    mask-image: linear-gradient(to top,transparent 0,transparent 51px,#000 77px,#000 100%);
    height: 200px;

}

.decription-container__toggle{
    height: 100%;
    mask-image: inherit;

}
@media(max-width: 768px){
  .curriculum-chapter {
  max-width: 500px;
}

@media(max-width: 425px){
  .curriculum-chapter {
  max-width: 200px;
}
}
}
</style>
