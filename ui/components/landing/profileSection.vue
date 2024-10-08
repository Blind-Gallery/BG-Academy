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

    }
  },
  computed: {
    formattedWallet () {
      if (!this.$auth.user.tezos_info) { return null }
      const wallet = this.$auth.user.tezos_info.wallet
      if (wallet && wallet.length > 10) {
        return `${wallet.substring(0, 7)}...${wallet.substring(wallet.length - 5)}`
      }
      return wallet
    },
    user () {
      return this.$auth.user
    }

  }
}
</script>

<template>
  <div class="tw-container  tw-mt-8 tw-mb-16 ">
    <div class="tw-flex tw-gap-4 tw-grid tw-grid-cols-12 gap-4 ">
      <div v-if="!$apollo.loading" class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-3 ">
        <div class="tw-flex tw-flex-col tw-rounded tw-shadow-sm tw-py-8 tw-px-4 tw-items-center tw-overflow-hidden tw-truncate tw-h-full tw-justify-center">
          <img v-if="$auth.user.pfp" class="tw-overflow-hidden tw-rounded-full tw-w-[60px] tw-h-[60px]  tw-object-cover" :src="$auth.user.pfp">
          <div v-else class="tw-rounded-full tw-w-[35px] tw-h-[35px] tw-cursor-pointer tw-border tw-flex tw-items-center tw-justify-center">
            <Icon
              icon="material-symbols-light:person"
              width="1.5rem"
              class="tw-text-gray-500"
            />
          </div>
          <div class="tw-flex tw-flex-col tw-items-center">
            <h6 class="tw-mb-0 tw-font-bold">
              {{ $auth.user.name }}
            </h6>
            <span v-if="$auth.user.email_info" class="tw-text-xs tw-text-gray-500">{{ $auth.user.email_info.email }}</span>
            <span v-else class="tw-text-xs tw-text-gray-500">{{ formattedWallet }}</span>
          </div>

          <div class="tw-mt-4 tw-flex tw-gap-4">
            <div class="tw-flex tw-flex-col tw-items-center">
              <span class="tw-text-cyan-500 tw-font-bold">{{ user_course.length }}</span>
              <span class="tw-text-xs tw-text-gray-500">Courses</span>
            </div>
            <div class="tw-flex tw-flex-col tw-items-center">
              <span class="tw-text-cyan-500 tw-font-bold"> {{ user_course.filter(item => item.certificate_cid === null).length }}</span>
              <span class="tw-text-xs tw-text-gray-500">Certificates</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-3 ">
        <div class="tw-flex tw-flex-col tw-rounded tw-shadow-sm tw-py-8 tw-px-4 tw-items-center tw-overflow-hidden tw-truncate tw-h-full tw-justify-center">
          <div class="tw-overflow-hidden tw-rounded-full tw-w-[60px] tw-h-[60px] tw-bg-gray-100 tw-animate-pulse" />
          <div class="tw-p-2 tw-bg-gray-100 tw-animate-pulse tw-rounded-full tw-w-1/2 tw-mt-2" />
          <div class="tw-p-1 tw-bg-gray-100 tw-animate-pulse tw-rounded-full tw-w-1/2 tw-mt-2" />
        </div>
      </div>

      <div class="tw-relative tw-overflow-hidden tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-9">
        <div class="tw-h-[350px] tw-rounded  tw-w-full tw-shadow tw-p-8 tw-flex tw-flex-col tw-justify-center tw-bg-gradient-to-b tw-from-white tw-to-cyan-50">
          <h3 class="tw-font-normal">
            Hello, <span class="tw-text-cyan-500 tw-font-bold">{{ $auth.user.name }}</span> Good to see you!
          </h3>
          <p>Everything ready to start learning</p>
        </div>
      </div>
    </div>
  </div>
</template>
