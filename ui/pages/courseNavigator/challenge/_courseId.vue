<script>
import { gql } from 'graphql-tag'

const COURSE_CERTIFICATE = gql`
  query ($courseId: String!, $userId: String!) {
    user_course_by_pk(course_id: $courseId, user_id: $userId) {
      certificate_mint_op
      course {
        name
        teacher {
          name
        }
        thumbnail
      }
    }
  }
`
export default {
  data () {
    return {
      courseId: null,
      certificateInfo: null
    }
  },
  async mounted () {
    this.courseId = this.$route.params.courseId
    await this.getCertificateData()
  },
  methods: {
    openModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
    },
    async getCertificateData () {
      try {
        const { data } = await this.$apollo.query({
          query: COURSE_CERTIFICATE,
          variables: {
            userId: this.$auth.loggedIn ? this.$auth.user.id : '',
            courseId: this.courseId
          }
        })
        this.certificateInfo = Object.assign({}, data.user_course_by_pk)
      } catch (err) {
        this.loading = false
        console.error('error fetching course', err)
      }
    }
  }
}
</script>

<template>
  <div class="tw-container tw-py-6">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4">
      <div class="lg:tw-col-span-9 tw-col-span-12">
        <div class="tw-flex tw-items-center  tw-flex-col tw-justify-center lg:tw-my-12">
          <div class="tw-w-full">
            <h4>Mint your project on objkt.com</h4>
          </div>
          <div class="tw-columns-1 lg:tw-columns-4 tw-my-4">
            <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
              <div class="tw-flex tw-border tw-flex-col tw-gap-2  tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
                <Icon style="color:#00B9CD" icon="material-symbols-light:account-balance-wallet-outline" width="2.5rem" />
                <h6 class="tw-font-bold ">
                  Go to <a href="https://objkt.com/" target="_blank">objkt.com</a>
                </h6>
                <p class="tw-text-xs tw-text-gray-500">
                  Connect your wallet to the site, if you don't have one, you can create one <a href="https://www.templewallet.com/" target="_blank">here.</a>
                </p>
              </div>
            </div>
            <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
              <div class=" tw-w-full tw-flex tw-border tw-flex-col tw-gap-2  tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
                <Icon style="color:#00B9CD" icon="material-symbols-light:add-circle-outline" width="2.5rem" />
                <h6 class="tw-font-bold ">
                  Create a new token
                </h6>
                <p class="tw-text-xs tw-text-gray-500">
                  At the top of the menu, click on your profile picture and select the “Create” option.
                </p>
              </div>
            </div>
            <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
              <div class=" tw-w-full tw-flex tw-border tw-flex-col tw-gap-2 tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
                <Icon style="color:#00B9CD" icon="material-symbols-light:file-copy-outline-rounded" width="2.5rem" />
                <h6 class="tw-font-bold ">
                  Fill the form
                </h6>
                <p class="tw-text-xs tw-text-gray-500">
                  Fill in the required fields and upload your project file.
                </p>
              </div>
            </div>
            <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
              <div class=" tw-w-full tw-flex  tw-border tw-flex-col tw-gap-2 tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
                <div><Icon style="color:#00B9CD" icon="material-symbols-light:checkbook-outline-rounded" width="2.5rem" /></div>
                <h6 class="tw-font-bold ">
                  Mint your shader
                </h6>
                <p class="tw-text-xs tw-text-gray-500">
                  Sign in the transactions using your wallet to mint (upload) your shader to the blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.params.courseId" class="lg:tw-col-span-3 tw-col-span-12 tw-max-h-[600px] tw-overflow-y-auto">
        <certificate-open-modal-button :course-id="courseId" @click="openModal()" />
        <PxModal ref="modalInstance">
          <template #body>
            <div>
              <certificate-base-card
                v-if="courseId"
                :title="certificateInfo?.course?.name"
                :instructor="certificateInfo?.course?.teacher?.name"
                :cover="certificateInfo?.course?.thumbnail"
                :student="$auth.user.name"
                :course-id="courseId"
                :op-hash="certificateInfo?.certificate_mint_op"
              />
            </div>
          </template>
        </PxModal>
        <PxNavigatorCourseSchema :course-id="courseId" />
      </div>
    </div>
  </div>
</template>
