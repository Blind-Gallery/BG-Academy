<template>
  <div>
    <b-container style="max-width: 1240px; margin-top:2rem; margin-bottom: 4rem;">
      <!--PAYMENT MODAL-->
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
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Card name"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"

              placeholder="Enter the number that appears on your card"
              required
            />
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Card number"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"

              placeholder="Enter the card number"
              required
            />
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Card number"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"

              placeholder="Enter the card number"
              required
            />
          </b-form-group>
        </b-form>
      </b-modal>
      <!--CONFIRM PAYMENT MODAL-->
      <b-modal id="confirm-buycourse" centered hidden-header hide-footer>
        <template #modal-header="{ close }">
          <h2>
            Access course
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
        <p class="small">
          Once you purchase this course, you will have access to:
        </p>
        <div class="border rounded text-secondary small p-2 my-4">
          <ul class="m-0">
            <li>All modules and classes.</li>
            <li>Resources provided by the teacher.</li>
            <li>Certificate which you will also be able to mint on the Tezos blockchain.</li>
          </ul>
        </div>
        <p class="small">
          Make your payment with:
        </p>
        <div class="d-flex align-items-center justify-content-center" style="gap: 1rem;">
          <button class="secondary-btn w-100" @click="$bvModal.hide('confirm-buycourse')">
            <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
            Tezos
          </button>
          <button class="primary-btn w-100" @click="$bvModal.show('credit-pay'); $bvModal.hide('confirm-buycourse')">
            <Icon
              icon="material-symbols:credit-card"
              color="#fff"
              width="21"
            />
            Credit card
          </button>
        </div>
      </b-modal>

      <b-row v-if="!$apollo.loading" class="mt-md-3">
        <!--COURSE INFO COLUMN-->
        <b-col
          order="2"
          order-lg="1"
          lg="8"
        >
          <!--INFO-->
          <div class="course-info">
            <div><img class="w-100 d-lg-block d-none" :src="courses[0].thumbnail"></div>
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
            <!--COURSE CORRICULUM COLLAPSE-->
            <h5 class="mb-3 mt-4">
              Course curriculum
            </h5>

            <div
              v-for="(itemModule, moduleIndex) in courses[0].modules"
              :key="moduleIndex"
              class="w-100 shadow-sm  mb-2 rounded"
            >
              <div @click="toggleCollapse(moduleIndex)">
                <PxToggleCollapse :icon-width="'24px'" :toggle-name="itemModule.title" :subtitle-name="`Chapters: ${itemModule.chapters.length}`" />
              </div>

              <!--CHAPTERS COLLAPSE-->
              <b-collapse
                v-for="(chapter, chapterIndex) in itemModule.chapters"
                :id="`accordion-${moduleIndex}`"
                :key="chapterIndex"
                role="tabpanel"
              >
                <div style="cursor: pointer;" class="d-flex justify-content-between p-3 position-relative rounded chapter-collapse" @click="checkNavAccess(chapter.id)">
                  <div class="d-flex align-items-center">
                    <Icon
                      icon="material-symbols:smart-display-outline-rounded"
                      width="18"
                      class="mr-2"
                      color="#00b9cd"
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
              </b-collapse>
            </div>
          </div>
        </b-col>
        <!--PROPERTIES COURSE COLUMN-->
        <b-col
          order="1"
          order-lg="2"
          lg="4"
          class="mb-3"
        >
          <div class="d-flex flex-column p-3 shadow-sm rounded ml-sm-3 " style="gap:0.5rem; position:sticky; top: 77px;">
            <div><img class="w-100 d-lg-none" :src="courses[0].thumbnail"></div>
            <div v-b-toggle.instructor class="d-flex align-items-center w-100">
              <b-avatar :src="courses[0].teacher.pfp" size="2rem" />

              <PxToggleCollapse class="w-100" :icon-width="'24px'" :toggle-name="courses[0].teacher.name" :subtitle-name="'Instructor'" />
            </div>
            <b-collapse id="instructor" accordion="intructor" role="tabpanel">
              <p class="small text-secondary">
                {{ courses[0].teacher.description }}
              </p>
            </b-collapse>
            <div v-if="!userHasCourse || !$auth.loggedIn" class="d-flex flex-column" style="gap:0.5rem">
              <div class="border rounded p-2">
                <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                  ${{ courses[0].price }}
                </h2>
                <p class="m-0">
                  Access course
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

              <button class="secondary-btn w-100">
                <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
                Tezos
              </button>
            </div>

            <div v-else>
              <NuxtLink :to="'/courseNavigator/chapter/' + userCourses[0].last_chapter_id_seen">
                <button class="primary-btn w-100">
                  View course
                </button>
              </NuxtLink>
              <div>
                <b-progress
                  class="my-2"
                  height="5px"
                  :value="userCourses[0].progress"
                />
                <p class="m-0 small text-secondary">
                  Total progress: {{ userCourses[0].progress }}%
                </p>
              </div>
            </div>
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

const USER_COURSES = gql`query ($id: String = "") {
        user_course( where:
          {user_id: {_eq: $id}}) {
          last_chapter_id_seen
          course_id
          progress
        }
      }`

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
              chapters  (order_by: {created_at: asc}){
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
    },

    user_course: {
      query: USER_COURSES,
      variables () {
        return {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    }

  },
  data () {
    return {
      userCourses: []
    }
  },

  computed: {
    // Function to know if the user has the course or not
    userHasCourse () {
      const courseRouteId = parseInt(this.$route.params.courseId)
      return this.userCourses.find(course => course.course_id === courseRouteId)
    }
  },
  mounted () {
    this.getUserCourses()
  },
  methods: {

    getUserCourses () {
      this.$apollo.query({
        query: USER_COURSES,
        variables: {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      })
        .then((response) => {
          this.userCourses = response.data.user_course
        })
        .catch((error) => {
          console.error(error)
        })
    },
    // Function validate if the user can access to the courseNavigator view
    checkNavAccess (chapter) {
      if (this.$auth.loggedIn && this.userHasCourse) {
        this.$router.push('/courseNavigator/chapter/' + chapter)
      } else if (this.$auth.loggedIn && !this.userHasCourse) {
        this.$bvModal.show('confirm-buycourse')
      } else {
        return this.$bvModal.show('signin')
      }
    },

    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
    }
  }
}
</script>
<style>

.chapter-collapse:hover{
  transition: all 0.3ms;
  background-color: #f7f7f7;
}
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
