<template>
  <div>
    <b-container style="margin-top: 2rem; max-width: 1240px">
      <b-row
        style="
        max-height: 700px;
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
            height="650px"
            src="https://www.youtube.com/embed/qtPi0JvmWbs"
            title="YouTube video player"
            frameborder="0"
          />
        </b-col>

        <!--NAV BAR COLUMN-->
        <b-col :class="!navBarHidden ? 'columnNav':'columnNav__toggle'" lg="3" cols="12">
          <!--HIDE NAV BAR ICON-->
          <span
            v-b-tooltip.hover
            :title="!navBarHidden ? 'Hide course navigator': 'Show course navigator'"
            style="cursor:pointer"
            @click="doHideNavBar()"
          >
            <Icon
              icon="material-symbols:menu-open"
              :rotate="!navBarHidden ? '2':'null'"
              width="32"
              color="#6c757d"
            />
          </span>

          <!--NAV BAR PARENT CONTAINER-->
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
              <b-progress
                class="mb-2"
                height="5px"
                value="2"
              />
              <div class="d-flex justify-content-between">
                <p class="small">
                  Progress
                </p>
                <p class="small">
                  2%
                </p>
              </div>
            </div>

            <!--MODULES-->
            <div
              v-for="(module, moduleIndex) in courseModules"
              :key="moduleIndex"
              style="cursor: pointer;"
              class="border d-flex rounded p-3 mb-2"
              @click="toggleCollapse(moduleIndex)"
            >
              <div class="mr-3 rounded" style="border:1px solid #00b9cd; width: 2px;" />
              <div>
                <!--TOGGLE MODULE-->
                <div
                  class="w-100"
                  style="text-align: start"
                  block

                  variant="info"
                >
                  <div>
                    <span class="small" style="font-weight: 600; color:#00b9cd">{{ module.title }}</span>
                    <br>
                    <span class="small text-secondary ">{{ module.chapter.length }} Chapters</span>
                  </div>
                </div>

                <!--CHAPTERS COLLAPSE-->
                <b-collapse
                  v-for="(chapter, chapterIndex) in module.chapter"
                  :id="`accordion-${moduleIndex}`"
                  :key="chapterIndex"
                  class="mb-2 mt-4"
                  role="tabpanel"
                >
                  <div class="d-flex justify-content-between mb-2 position-relative chapter-container rounded p-2">
                    <Icon
                      class="progress-circle"
                      icon="material-symbols:lens-outline"
                      color="#00b9cd"
                      width="1rem"
                    />
                    <p class="m-0 small">
                      {{ chapter.title }}
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
      navBarHidden: false,
      courseModules: [
        {
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
    doHideNavBar () {
      this.navBarHidden = !this.navBarHidden
    },

    toggleCollapse (moduleIndex) {
      this.$root.$emit('bv::toggle::collapse', `accordion-${moduleIndex}`)
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
