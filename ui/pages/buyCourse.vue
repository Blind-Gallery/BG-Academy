<template>
  <div>
    <b-container style="max-width: 1240px;">
      <b-row>
        <b-col lg="8">
          <div class="course-info">
            <iframe
              class="rounded mb-3"
              width="100%"
              height="450px"
              src="https://www.youtube.com/embed/BmzhxCy2VyA"
              title="YouTube video player"
              frameborder="0"
            />
            <h5 class="mb-3">
              Digital objects advanced
            </h5>
            <p>Gain insights into the latest tools and technologies used in the industry and develop a deep understanding of their capabilities.</p>
            <h5 class="mb-3">
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
            <h5 class="mb-3">
              Description
            </h5>
            <div :class="!seeMore ? 'overflow-hidden description-container' : 'overflow-hidden description-container__toggle'">
              <p>
                The "Digital Objects Advanced" course is a comprehensive program designed to empower participants with the skills to create captivating digital art using coding techniques. Through a hands-on learning experience, students will explore the exciting intersection of art and technology, unlocking endless possibilities for artistic expression.
                During this course, participants will dive into the world of generative art, where they will learn how to harness the power of algorithms and procedural methods to generate dynamic and visually stunning artworks. They will delve into the realm of interactive art, discovering how to combine coding with interactivity to engage viewers and create immersive digital art experiences.
                Furthermore, the course will equip students with the ability to transform complex datasets into visually compelling artworks through data visualization techniques. By leveraging code, they will learn to represent information in meaningful and aesthetically pleasing ways, bridging the gap between data and art.
              </p>
            </div>
            <button @click="doSeeMore()">
              SEE MORE
            </button>
          </div>
        </b-col>
        <b-col lg="4">
          <div class="d-flex flex-column p-3 shadow-sm rounded position relative" style="gap:0.5rem">
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
              <div class="position-absolute" style="right:40px" @click="toggleDropdown">
                <Icon
                  :icon="isOpen ? 'material-symbols:keyboard-arrow-down' : 'material-symbols:keyboard-arrow-up'"
                  width="24"
                />
              </div>
            </div>
            <b-collapse id="instructor" visible accordion="intructor" role="tabpanel">
              <p class="small">
                With over a decade of experience, he has taught at prestigious educational institutions and inspired countless students to delve into the fascinating world of creative coding.
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
            <button class="primary-btn w-100 ">
              Credit card
            </button>
            <button class="secondary-btn w-100">
              Crypto
            </button>
            <v-divider />
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
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
    height: 180px;

}

.decription-container__toggle{
    height: 100%;
    -webkit-mask-image: inherit;

}

.course-info h5{
    font-weight: 600;
}
</style>
