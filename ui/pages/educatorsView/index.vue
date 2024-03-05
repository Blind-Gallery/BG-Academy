<template>
  <b-container style="max-width: 1240px;">
    <h4 class="mt-5">
      Your statistics
    </h4>
    <b-row class="mb-5">
      <b-col lg="3" md="6">
        <div class="d-flex flex-column mb-4">
          <div class="d-flex shadow-sm rounded p-4">
            <div>
              <h3 style="color: #00B9CD;">
                24
              </h3>
              <div class="d-flex justify-content-center align-items-center">
                <Icon icon="material-symbols:person-raised-hand-outline-rounded" width="1.25rem" class="mr-2" /><p class="m-0">
                  Students
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="3" md="6">
        <div class="d-flex flex-column mb-4">
          <div class="d-flex shadow-sm rounded p-4">
            <div>
              <h3 style="color: #00B9CD;">
                24
              </h3>
              <div class="d-flex justify-content-center align-items-center">
                <Icon
                  icon="material-symbols:shopping-cart-outline-rounded"
                  width="1.25rem"
                  class="mr-2"
                /><p class="m-0">
                  Sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="3" md="6">
        <div class="d-flex flex-column mb-4">
          <div class="d-flex shadow-sm rounded p-4">
            <div class="w-100">
              <h3 v-if="!revenueXTZ" style="color: #00B9CD;">
                $1450
              </h3>
              <h3 v-else style="color: #00B9CD;">
                ꜩ1,250
              </h3>

              <div class="d-flex  align-items-center justify-content-between w-100">
                <div class="d-flex">
                  <Icon icon="material-symbols:payments-outline-rounded" width="1.25rem" class="mr-2" />
                  <p class="m-0">
                    Revenue
                  </p>
                </div>
                <div class="d-flex align-items-center">
                  <span class="text-secondary small">USD</span>
                  <b-form-checkbox v-model="revenueXTZ" class="ml-2" name="check-button" switch />
                  <span class="text-secondary small">XTZ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <h4>Your courses</h4>
    <b-row>
      <b-col v-for="(course, index) in educatorCourses" :key="index" lg="4" sm="12" md="6">
        <div class="mb-4 shadow-sm p-3 rounded">
          <div>
            <img :src="course.thumbnail" class="mb-2 rounded" alt="cover" width="100%">
            <p class="m-0">
              <b>{{ course.title }}</b>
            </p>
          </div>
          <div>
            <div class="py-2" @click="toggleCollapse(index)">
              <PxToggleCollapse class="text-secondary" toggle-name="Show feedback" :padding="false" />
            </div>
            <div class="collapse-container">
              <b-collapse v-for="(courseFeedback, indexFeedback) in course.feedback" :id="`accordion-${index}`" :key="indexFeedback">
                <div class="d-flex py-4" style="border-top: 1px solid #cecece;">
                  <div>
                    <b-avatar class="mr-3" size="2.5rem" :src="courseFeedback.pfp" />
                  </div>
                  <div>
                    <p class="m-0">
                      {{ courseFeedback.username }}
                    </p>
                    <b-form-rating
                      :value="courseFeedback.value"
                      color="#00b9cd"
                      size="sm"
                      inline
                      no-border
                      readonly
                      class="m-0 p-0"
                    />
                    <p class="text-secondary small m-0">
                      {{ courseFeedback.comment }}
                    </p>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {

  data () {
    return {
      isOpen: false,
      revenueXTZ: false,
      educatorCourses: [
        {
          thumbnail: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmdrfgeDKpZPubbMxnkYsc4yESpy84Kd11gujjp7pxAU3s',
          title: 'Introducing to the Blockchain Artworld',
          feedback: [
            {
              username: 'Datzel1',
              pfp: 'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg',
              value: '5',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              username: 'Datzel1',
              pfp: 'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg',
              value: '5',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            {
              username: 'Datzel1',
              pfp: 'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg',
              value: '5',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          ]

        },
        {
          thumbnail: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmR2BG2V3CtT4g7vq7Dn8tgjuYSKxzxzzhukYKx6V8wdmW',
          title: 'Introducing to Generative Art',
          feedback: [
            {
              username: 'Datzel2',
              pfp: 'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg',
              value: '5',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          ]

        },
        {
          thumbnail: 'https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmR2BG2V3CtT4g7vq7Dn8tgjuYSKxzxzzhukYKx6V8wdmW',
          title: 'A Collectors Journey',
          feedback: [
            {
              username: 'Datzel3',
              pfp: 'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg',
              value: '5',
              comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
          ]

        }

      ]
    }
  },
  methods: {
    toggleCollapse (indexFeedback) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${indexFeedback}`)
    }
  }
}
</script>
<style>
.custom-control-input:checked ~ .custom-control-label::before {
  background-color:#00b9cd;
  border-color:#00b9cd
}
.collapse-container{
  height: auto;
  overflow-y: auto;
}
</style>
