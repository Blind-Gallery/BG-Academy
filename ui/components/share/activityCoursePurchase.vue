<script>
import ShareSocialMediaService from '@/services/share'
const shareSocialMediaService = new ShareSocialMediaService()
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },

  computed: {
    parsedTitle () {
      // remove the last character if it is a period (. )
      if (this.title[this.title.length - 1] === '.') {
        return this.title.slice(0, -1)
      }
      return this.title
    },
    msgForFarcaster () {
      return `I just enrolled in "${this.parsedTitle}" by ${this.instructor}! Check it out below on @blind-gallery`
    },
    msgForTwitter () {
      return `I just enrolled in "${this.parsedTitle}" by ${this.instructor}! Check it out below on @BlindGallery_! `
    },
    getUrlToBuy () {
      return window.location.origin + '/buyCourse/' + this.courseId
    }
  },
  methods: {

    shareToTwitter () {
      shareSocialMediaService.shareToTwitter(this.msgForTwitter, this.getUrlToBuy)
    },
    shareToWarpcast () {
      shareSocialMediaService.shareToWarpcast(this.msgForFarcaster, this.getUrlToBuy)
    }

  }
}

</script>
<template>
  <div>
    <h4 class="tw-text-cyan-500 tw-mb-4">
      Share your activity
    </h4>
    <div class="tw-border tw-flex tw-flex-col tw-rounded tw-p-4 tw-gap-4">
      <img :src="thumbnail">
      <p class="tw-m-0">
        I just enrolled in <span class="tw-font-bold tw-text-cyan-500">{{ parsedTitle }}</span> by {{ instructor }}! Check it out below
      </p>
    </div>
    <hr>
    <div>
      <span class="tw-font-bold tw-text-xs">Share this link via:</span>
      <div class="tw-flex tw-gap-2 tw-items-center">
        <div
          class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0"
          @click="shareToWarpcast"
        >
          <Icon icon="simple-icons:farcaster" width="1rem" height="1rem" />
        </div>
        <div
          class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0"
          @click="shareToTwitter"
        >
          <Icon icon="ri:twitter-x-line" width="1rem" height="1rem" />
        </div>
      </div>
    </div>
  </div>
</template>
