<script>
import { IPFS } from '@/constants'
export default {
  data () {
    return {
      gateway: IPFS.GATEWAY,
      upcomingCourses:
        [
          {
            pfp: 'https://pbs.twimg.com/profile_images/1510148081475629058/Q85gM-EI_400x400.jpg',
            instructor: 'Uncap Collective',
            title: 'A Collectors Journey',
            description: 'Uncap Collective shares advice for collectors, including the different genres and how to approach this dynamic art ecosystem.',
            thumbnail: `${IPFS.GATEWAY}QmW16LtcSVTnXjbuqwmQ84WLDomGbMKDRfhPcFWfBiiT9s`,
            categories: 'Collectors'
          },
          {
            pfp: 'https://pbs.twimg.com/profile_images/1807536749863706624/jUnxp26V_400x400.jpg',
            instructor: 'Dist',
            title: 'Designing Sounds for Beginners',
            description: 'Learn the fundamentals of digital sound-making for creatives.',
            thumbnail: `${IPFS.GATEWAY}QmannDKXVxP2sqg9hKcEUi9ytRDBxRVS4zAAyYttmmxsVn`,
            categories: 'Artists'
          },
          {
            pfp: 'https://pbs.twimg.com/profile_images/1525982570327990273/YJ8grBE8_400x400.jpg',
            instructor: 'Haiver',
            title: 'Mastering The Artist Statement',
            description: 'Learn how to create a simple and powerful artist statement.',
            thumbnail: `${IPFS.GATEWAY}QmTf43Zy5TEbBMb3gW3Vj9HcfNEjLqiiRCG8gBhLSZk6XK`,
            categories: 'Artists'
          }

        ]

    }
  }
}
</script>

<template>
  <div class="tw-container tw-my-16">
    <h4 class="tw-mb-8">
      Upcoming courses
    </h4>
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4">
      <PxCardCourse
        v-for="(course, courseIndex) in upcomingCourses"
        :key="courseIndex"
        :thumbnail="course.thumbnail"
        :description="course.description"
        :title="course.title"
        :instructor="course.instructor"
        :pfp="course.pfp"
        :categories="course.categories"
      />
    </div>
  </div>
</template>
