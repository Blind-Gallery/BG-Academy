<template>
  <div>
    <b-container style="margin-top: 2rem; max-width: 1240px">
      <b-row
        style="
        max-height: 630px;
        overflow-y: hidden;"
      >
        <b-col
          :class="!navBarHidden ? 'course-video':'course-video__toggle'"
          lg="9"
          cols="12"
        >
          <iframe
            class="
          rounded
          mb-3"
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/qtPi0JvmWbs"
            title="YouTube video player"
            frameborder="0"
          />
        </b-col>

        <b-col :class="!navBarHidden ? 'columnNav':'columnNav__toggle'" lg="3" cols="12">
          <span v-b-tooltip.hover :title="!navBarHidden ? 'Hide course navigator': 'Show course navigator'" style="cursor:pointer" @click="doHideNavBar()">
            <Icon icon="material-symbols:menu-open" :rotate="!navBarHidden ? '2':'null'" width="32" color="#6c757d" /></span>
          <div :class=" !navBarHidden? 'course-nav-container':'course-nav-container__toggle'">
            <div class="d-flex justify-content-between">
              <p class="small" style="font-weight: 600;">
                Modules
              </p>
              <p class="small">
                Completed: 0/3
              </p>
            </div>
            <div class="d-flex flex-column">
              <b-progress class="mb-2" height="5px" value="2" />
              <div class="d-flex justify-content-between">
                <p class="small">
                  Progress
                </p>
                <p class="small">
                  2%
                </p>
              </div>
            </div>

            <!--MODULE 1-->
            <div class="border d-flex rounded p-3 mb-2">
              <div class="mr-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
              <div>
                <!--TOGGLE CONTAINER-->
                <div v-b-toggle.accordion-1 class="w-100" style="text-align: start;" block variant="info">
                  <div>
                    <span class="small" style="font-weight: 600; color:#00b9cd">Introduction to Generative Art</span>
                    <br>
                    <span class="small text-secondary ">5 chapters | 1h 5m</span>
                  </div>
                </div>

                <!--CHAPTERS COLLAPSE-->
                <b-collapse id="accordion-1" class="mb-2 mt-4" accordion="my-accordion" role="tabpanel">
                  <!--CHAPTER 1-->
                  <div class="d-flex justify-content-between mb-2 position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Exploring the Foundations of Generative Art
                    </p>
                  </div>
                  <!--CHAPTER 2-->
                  <div class="d-flex justify-content-between mb-2 position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Understanding Algorithms and Creative Coding
                    </p>
                  </div>
                  <!--CHAPTER 3-->
                  <div class="d-flex justify-content-between mb-2 position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Creating Dynamic Visual Systems
                    </p>
                  </div>
                  <!--CHAPTER 4-->
                  <div class="d-flex justify-content-between  mb-2 position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Embracing Randomness in Generative Art
                    </p>
                  </div>
                  <!--CHAPTER 5-->
                  <div class="d-flex justify-content-between position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Expressing Creativity Through Generative Art Techniques
                    </p>
                  </div>
                </b-collapse>
              </div>
            </div>

            <!--MODULE 2-->
            <div class="border d-flex rounded p-3 mb-2">
              <div class="mr-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />

              <div>
                <!--TOGGLE CONTAINER-->
                <div v-b-toggle.accordion-2 class="w-100" style="text-align: start;" block variant="info">
                  <div>
                    <span class="small" style="font-weight: 600; color:#00b9cd">Interactive art with code</span><br>
                    <span class="small text-secondary ">3 chapters | 1h 1m</span>
                  </div>
                </div>

                <!--CHAPTERS COLLAPSE-->
                <b-collapse id="accordion-2" class="mb-2 mt-4" accordion="my-accordion" role="tabpanel">
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Introduction to Interactive Art and Coding
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Creating Immersive Experiences with Interactive Code
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Exploring User Engagement and Interaction in Code-based Art
                    </p>
                  </div>
                </b-collapse>
              </div>
            </div>

            <!--MODULE 3-->
            <div class="border d-flex rounded p-3 mb-2">
              <div class="mr-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />

              <div>
                <!--TOGGLE CONTAINER-->
                <div v-b-toggle.accordion-3 class="w-100" style="text-align: start;" block variant="info">
                  <div>
                    <span class="small" style="font-weight: 600; color:#00b9cd">Data visualization and art</span><br>
                    <span class="small text-secondary ">4 chapters | 2h 14m</span>
                  </div>
                </div>

                <!--CHAPTERS COLLAPSE-->
                <b-collapse id="accordion-3" class="mb-2 mt-4" accordion="my-accordion" role="tabpanel">
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Introduction to Data Visualization in Art
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Exploring Data Sources and Formats for Artistic Visualizations
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Creative Approaches to Data Interpretation and Representation
                    </p>
                  </div>

                  <div class="d-flex justify-content-between mb-4 position-relative">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      Interactive Data Visualizations and Engaging Audiences
                    </p>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="w-100">
            <b-tabs content-class="mt-3">
              <b-tab title="Resources" active>
                <p>I'm the first tab</p>
              </b-tab>
              <b-tab title="Community">
                <p>I'm the second tab</p>
              </b-tab>
              <b-tab title="Course info">
                <p>I'm a disabled tab!</p>
              </b-tab>
            </b-tabs>
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
      navBarHidden: false
    }
  },
  methods: {
    doHideNavBar () {
      this.navBarHidden = !this.navBarHidden
    }
  }
}
</script>
<style>
.progress-circle{
  color: black;
  left: -25px;
  top: 10px;
  position: absolute;
  background-color: white
}

.course-nav-container{
  max-height: 600px;
  overflow-y: auto;
  padding-right: 5px;
  transition: transform 0.3s ease;
}

.course-nav-container__toggle{
  transition: transform 0.3s ease;
  transform: translateX(120%);
}

.course-video{
  flex: 0 0 75%;
  max-width: 75%;
  transition: 0.3s ease;
}

.course-video__toggle{
  transition: 0.3s ease;
  flex: 0 0 91.666667%;
  max-width: 91.666667%;
}

.columnNav{
  flex: 0 0 25%;
  max-width: 25%;
  transition: 0.3s ease;
  overflow-x: hidden;
}

.columnNav__toggle{
  transition: 0.3s ease;
  flex: 0 0 8.333333%;
  max-width: 8.333333%;
  overflow-x: hidden;
}

.chapter-container{
  cursor: pointer;
  transition: all 0.3s;
}

.chapter-container:hover{
  background-color: #f7f7f7;
}
</style>
