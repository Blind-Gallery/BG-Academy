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
      certificateInfo: null,
      collections: [
        {
          title: 'Dragons',
          description: 'A grid of many lines forming a dragon crafted on paper. They all have their own personality... Be sure to name and take care of them.',
          creator: 'William Mapan',
          route: 'https://objkt.com/collections/fxhash/projects/2613',
          published: 'December, 2021',
          cover: 'https://gateway.fxhash.xyz/ipfs/QmTABGFp1GQY5VE8vqCGj5ydoHH7ebMffgB93PNjLSE1fZ'
        },
        {
          title: 'Garden, Monoliths',
          description: '"Garden, Monoliths" is the result of an algorithm that started in April 2021. It was called "Grass.js".',
          creator: 'Zancan',
          route: 'https://objkt.com/collections/fxhash/projects/2969',
          published: 'December, 2021',
          cover: 'https://gateway.fxhash.xyz/ipfs/QmVRQKaFoMUybxmUefj5TExktFWqTVMXBduKcaZgUHYctD'
        },
        {
          title: 'Blind Gallery: Seed Edition',
          description: 'Four generative collections created by Thomas Noya, DistCollective, Olivier Bodini and NIINOMI.',
          creator: 'Blind Gallery in collaboration with multiple artists',
          route: 'https://www.blindgallery.xyz/third-edition',
          published: 'February, 2023',
          cover: 'https://gateway.fxhash.xyz/ipfs/QmTi1rWh8aFZDACFYpiEqmdGwXtPbTTw5rCpjbqxN4N6pJ'
        },
        {
          title: 'Blind Gallery: Vistas Edition',
          description: 'In collaboration with Feral File and a group of talented artists, the Vistas Edition has been minted on fxhash.',
          creator: 'Blind Gallery in collaboration with multiple artists',
          route: 'https://www.blindgallery.xyz/fourth-edition',
          published: 'September, 2023',
          cover: 'https://gateway.fxhash.xyz/ipfs/QmQXmrvnjRAtV4qdbZ83yZybziiHpnwKEwYc3bgDE1PCyn'
        }

      ]
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
        <div class="tw-flex tw-items-center  tw-flex-col tw-justify-center">
          <div class="tw-w-full">
            <h4>Explore Generative Art</h4>
          </div>
          <div class="tw-columns-1 ">
            <div v-for="(collection, index) in collections" :key="index" class="tw-w-full tw-mb-4 lg:tw-mb-0">
              <explore-art-card :collection-data="collection" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="$route.params.courseId" class="lg:tw-col-span-3 tw-col-span-12 tw-max-h-[600px] tw-overflow-y-auto tw-sticky tw-top-0">
        <certificate-open-modal-button :approved-course="true" @click="openModal()" />
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
        <PxNavigatorChallengeCard :class="$route.path.includes('challenge') ? 'tw-text-cyan-500':''" :route="`/courseNavigator/challenge/${courseId}`" />
        <PxNavigatorExploreCard :class="$route.path.includes('explore') ? 'tw-text-cyan-500':''" :route="`/courseNavigator/explore/${courseId}`" />
      </div>
    </div>
  </div>
</template>
