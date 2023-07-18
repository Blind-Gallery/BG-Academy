<template>
  <div>
    <b-container style="max-width: 1240px; margin-top:2rem; margin-bottom: 4rem;">
      <b-row>
        <b-col lg="8">
          <div class="course-info">
            <iframe
              class="rounded mb-3"
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
            <div class="d-flex mb-3" style="gap:1rem">
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

            <button v-b-toggle.accordion-1 class="secondary-btn w-100 mb-2" style="text-align: start;" block variant="info">
              <span>Introduction to Generative Art</span><br>
              <span class="small text-secondary">5 chapters | 1h 5m</span>
            </button>

            <b-collapse id="accordion-1" class="mb-2 " accordion="my-accordion" role="tabpanel">
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  1. Exploring the Foundations of Generative Art
                </p><p class="m-0">
                  5min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0 ">
                  2. Understanding Algorithms and Creative Coding
                </p><p class="m-0">
                  15min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  3. Creating Dynamic Visual Systems
                </p><p class="m-0">
                  30min.
                </p>
              </div>

              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  4. Embracing Randomness in Generative Art
                </p><p class="m-0">
                  25min.
                </p>
              </div>

              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  5. Expressing Creativity Through Generative Art Techniques
                </p><p class="m-0">
                  50min.
                </p>
              </div>
            </b-collapse>

            <button v-b-toggle.accordion-2 class="secondary-btn w-100 mb-2" style="text-align: start;" block variant="info">
              <span>Interactive art with code</span><br>
              <span class="small text-secondary">3 chapters | 1h 1m</span>
            </button>

            <b-collapse id="accordion-2" class="mb-2 " accordion="my-accordion" role="tabpanel">
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  1.  Introduction to Interactive Art and Coding
                </p><p class="m-0">
                  8min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  2.Creating Immersive Experiences with Interactive Code
                </p><p class="m-0">
                  23min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  3. Exploring User Engagement and Interaction in Code-based Art
                </p><p class="m-0">
                  30min.
                </p>
              </div>
            </b-collapse>

            <button v-b-toggle.accordion-3 class="secondary-btn w-100 mb-2" style="text-align: start;" block variant="info">
              <span>Data Visualization and Art</span><br>
              <span class="small text-secondary">4 chapters | 2h 14m</span>
            </button>

            <b-collapse id="accordion-3" class="mb-2" accordion="my-accordion" role="tabpanel">
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  1. Introduction to Data Visualization in Art
                </p><p class="m-0">
                  4min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0 ">
                  2. Exploring Data Sources and Formats for Artistic Visualizations
                </p><p class="m-0">
                  45min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  3. Creative Approaches to Data Interpretation and Representation
                </p><p class="m-0">
                  35min.
                </p>
              </div>
              <div class="d-flex justify-content-between p-2 mb-2">
                <p class="m-0">
                  4. Interactive Data Visualizations and Engaging Audiences
                </p><p class="m-0">
                  50min.
                </p>
              </div>
            </b-collapse>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="d-flex flex-column p-3 shadow-sm rounded ml-3" style="gap:0.5rem; position:sticky; top: 77px;">
            <div v-b-toggle.instructor class="d-flex align-items-center" style="gap:0.5rem">
              <b-avatar src="https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg" size="2rem" />
              <div class="d-flex flex-column align-items-start">
                <p class="m-0 small">
                  Instructor
                </p>

                <p class="m-0 text-dark">
                  Hugo Santana
                </p>
              </div>
              <div class="position-absolute" style="right:20px" @click="toggleDropdown">
                <Icon
                  :icon="isOpen ? 'material-symbols:keyboard-arrow-down' : 'material-symbols:keyboard-arrow-up'"
                  width="24"
                />
              </div>
            </div>
            <b-collapse id="instructor" visible accordion="intructor" role="tabpanel">
              <p class="small">
                With over a decade of experience, he has taught at prestigious educational institutions and inspired countless students to delve into the fascinating world of creative coding.<br><br>
                His unique approach combines traditional art with cutting-edge technology, earning him recognition for pushing the boundaries of artistic expression.
              </p>
            </b-collapse>

            <div class="border rounded p-2">
              <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                $200
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

            <button class="secondary-btn w-100">
              <Icon icon="cryptocurrency:xtz" color="#00b9cd" width="21" />
              Tezos
            </button>
            <div style="width:100%; margin:1rem 0rem; border-bottom:1px solid #6c757d3b" />
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 4 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:signal-cellular-alt" color="#888" class="mr-2" /><p class="small m-0">
                  Advanced level
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon
                  icon="material-symbols:language"
                  color="#888"
                  class="mr-2"
                /><p class="small m-0">
                  100% Online
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:closed-caption-outline" color="#888" class="mr-2" /><p class="small m-0">
                  English subtitles
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:verified-outline" color="#888" class="mr-2" /><p class="small m-0">
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
      isOpen: false
    }
  },
  methods: {
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
.description-container{
    -webkit-mask-image: linear-gradient(to top,transparent 0,transparent 51px,#000 77px,#000 100%);
    height: 200px;

}

.decription-container__toggle{
    height: 100%;
    -webkit-mask-image: inherit;

}

</style>
