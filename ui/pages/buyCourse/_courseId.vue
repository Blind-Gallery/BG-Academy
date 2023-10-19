<template>
  <div>
    <b-container style="max-width: 1240px; margin-top:2rem; margin-bottom: 4rem;">
      <b-row v-if="!$apollo.loading" class="mt-md-3">
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
              {{ courses[0].name }}
            </h5>
            <p>{{ courses[0].description }}</p>
            <h5 class="mb-3 mt-4">
              You will learn
            </h5>
            <div class="d-flex mb-3 flex-column flex-lg-row" style="gap:1rem">
              <PxWillLearn v-for="itemModule in courses[0].modules" :key="itemModule.id" :title="itemModule.you_will_learn_title" :description="itemModule.you_will_learn" />
            </div>
            <h5 class="mb-3 mt-4">
              Description
            </h5>
            <div>
              <p>
                {{ courses[0].summary }}
              </p>
            </div>

            <h5 class="mb-3 mt-4">
              Course curriculum
            </h5>

            <div
              v-for="(itemModule, moduleIndex) in courses[0].modules"
              :key="moduleIndex"
              class="w-100 shadow-sm  mb-2 rounded"
            >
              <div @click="toggleCollapse(moduleIndex)">
                <PxToggleCollapse :icon-width="'24px'" :toggle-name="itemModule.title" />
              </div>

              <!--CHAPTERS COLLAPSE-->
              <b-collapse
                v-for="(chapter, chapterIndex) in itemModule.chapters"
                :id="`accordion-${moduleIndex}`"
                :key="chapterIndex"
                class="mt-2"
                role="tabpanel"
              >
                <NuxtLink :to="'/courseNavigator/chapter/' + chapter.id">
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
          class="mb-3"
        >
          <div class="d-flex flex-column p-3 shadow-sm rounded ml-sm-3 " style="gap:0.5rem; position:sticky; top: 77px;">
            <iframe
              class="rounded mb-3 d-lg-none"
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/qtPi0JvmWbs"
              title="YouTube video player"
              frameborder="0"
            />
            <div v-b-toggle.instructor class="d-flex align-items-center w-100">
              <b-avatar :src="courses[0].teacher.pfp" size="2rem" />

              <PxToggleCollapse class="w-100" :icon-width="'24px'" :toggle-name="courses[0].teacher.name" :subtitle-name="'Instructor'" />
            </div>
            <b-collapse id="instructor" accordion="intructor" role="tabpanel">
              <p class="small text-secondary">
                {{ courses[0].teacher.description }}
              </p>
            </b-collapse>

            <div class="border rounded p-2">
              <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                ${{ courses[0].price }}
              </h2>
              <p class="m-0">
                Access this course
              </p>
            </div>
            <button v-b-modal.credit-pay class="primary-btn w-100 ">
              <Icon
                icon="material-symbols:credit-card"
                color="#fff"
                width="21"
              />
              Credit card
            </button>
            <b-modal id="credit-pay" centered hidden-header hide-footer>
              <template #modal-header="{ close }">
                <h2>
                  Payment details
                </h2>
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
                <PxPayments :course-id="courses[0].id" :price="courses[0].price" />
              </div>
            </b-modal>

            <button class="secondary-btn w-100">
              <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
              Tezos
            </button>
            <div style="width:100%; margin:1rem 0rem; border-bottom:1px solid #6c757d3b" />
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" class="mr-2" /><p class="small m-0">
                  Aprox. duration 4 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:signal-cellular-alt" class="mr-2" /><p class="small m-0">
                  {{ courses[0].level }} level
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
                  {{ courses[0].language }} subtitles
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
      <b-row v-else>
        <div class="d-flex align-items-center justify-content-center w-100" style="height: 80vh;">
          <div class="d-flex flex-column align-items-center justify-content-center">
            <Icon class="mb-5" icon="eos-icons:bubble-loading" width="4rem" />
            <h5>Loading, please wait...</h5>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { gql } from 'graphql-tag'
import PxPayments from '~/components/PxPayments.vue'

export default {
  apollo: {
    courses: {
      query: gql`
        query ($id: Int!) {
          courses(where: { id: { _eq: $id } }) {
            id
            name
            description
            language
            level
            price
            summary
            thumbnail
            duration
            modules (order_by: {created_at: asc}) {
              title
              id
              chapters {
                id
                title
              }
              you_will_learn_title
              you_will_learn
            }
            teacher {
              name
              pfp
              description
            }
            teacher_id
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.courseId
        }
      }
    }
  },
  components: { PxPayments },
  data () {
    return {}
  },
  methods: {
    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
    }
  }
}
</script>
<style>

.curriculum-chapter {
  max-width: 100%;
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
