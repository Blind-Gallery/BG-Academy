<script>
import { gql } from 'graphql-tag'

export default {
  apollo: {
    user_course: {
      query: gql`query ($id: String = "") {
        user_course(
          where: {
            user_id: {
              _eq: $id
            }
          }
        ) {
          last_chapter_id_seen
          course_id
          progress
          certificate_cid
          certificate_image_cid,
          soul_bound_token_id,
          certificate_mint_op,
          course {
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
      }`,
      variables () {
        return {
          id: this.$auth.loggedIn ? this.$auth.user.id : ''
        }
      }
    }
  },

  data () {
    return {
      tabOptions: ['All', 'Certificates'],
      selectedTab: 'All'
    }
  },

  methods: {
    selectTab (tabOption) {
      this.selectedTab = tabOption
    }
  }
}
</script>
<template>
  <div class="tw-container tw-my-16">
    <h4>My courses</h4>
    <ul class="tw-flex tw-gap-6 tw-border-b tw-mb-4">
      <li v-for="tabOption in tabOptions" :key="tabOption" :class="selectedTab === tabOption ? 'tw-border-b tw-border-cyan-500  tw-p-4 tw-text-gray-900' : 'hover:tw-border-b hover:tw-border-cyan-500 hover:tw-text-gray-900 tw-ease-in-out tw-duration-200 tw-p-4 tw-cursor-pointer tw-text-gray-500'" @click="selectTab(tabOption)">
        {{ tabOption }}
      </li>
    </ul>

    <div v-if="selectedTab === 'All'">
      <div v-if="user_course.length > 0" class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
        <div v-for="item in user_course" :key="item.id">
          <NuxtLink v-if="!$apollo.loading" class="tw-text-inherit hover:tw-no-underline hover:tw-text-inherit" :to="'/courseNavigator/chapter/' + item.last_chapter_id_seen">
            <PxCardUserCourse
              :pfp="item.course.teacher.pfp"
              :instructor="item.course.teacher.name"
              :description="item.course.description"
              :title="item.course.name"
              :cover="item.course.thumbnail"
            />
          </NuxtLink>
          <div v-else class="tw-rounded tw-overflow-hidden tw-shadow hover:tw-shadow-md tw-duration-200 tw-ease-in-out">
            <div class="tw-w-full tw-h-[260px] tw-bg-gray-200 tw-animate-pulse" />
            <div class="tw-p-4">
              <div class="tw-p-2 tw-rounded tw-w-1/2 tw-animate-pulse tw-bg-gray-200 tw-mb-4" />
              <div class="tw-p-1 tw-rounded tw-w-full tw-animate-pulse tw-bg-gray-200 tw-mb-2" />
              <div class="tw-p-1 tw-rounded tw-w-1/2 tw-animate-pulse tw-bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="tw-text-sm tw-text-gray-500">
          Your purchased courses will appear here
        </p>
      </div>
    </div>

    <div v-if="selectedTab === 'Certificates'">
      <div v-if="user_course.length > 0" class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
        <div v-for="certificates in user_course" :key="certificates?.course_id">
          <certificate-base-card
            :title="certificates?.course?.name"
            :instructor="certificates?.course?.teacher?.name"
            :cover="certificates?.course?.thumbnail"
            :student="$auth.user.name"
            :course-id="certificates?.course_id"
            :op-hash="certificates?.certificate_mint_op"
            @certificate-received="handleCertificate"
          />
        </div>
      </div>
      <div v-else>
        <p class="tw-text-sm tw-text-gray-500">
          Your certificates will appear here
        </p>
      </div>
    </div>
  </div>
</template>
