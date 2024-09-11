<script>
import ShareSocialMediaService from '@/services/share'
const shareSocialMediaService = new ShareSocialMediaService('testPassed')
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
    }
  },
  data () {
    return {
      msg: `I just claimed my certificate of completion to ${this.title} by ${this.instructor}`,
      urlToBuy: window.location.origin + '/buyCourse/' + this.courseId
    }
  },
  methods: {
    shareToTwitter () {
      shareSocialMediaService.shareToTwitter(this.msg, this.urlToBuy)
    },
    shareToInstagram () {
      shareSocialMediaService.shareToInstagram()
    },
    shareToWarpcast () {
      shareSocialMediaService.shareToWarpcast(this.msg, this.urlToBuy)
    }
  }
}

</script>
<template>
  <div>
    <h4 class="tw-text-cyan-500">
      Share your activity
    </h4>
    <div class="tw-flex tw-flex-col tw-gap-2">
      <div class="tw-rounded tw-p-4 tw-flex tw-justify-center tw-items-center tw-bg-cyan-300">
        <img class="tw-h-[200px]" src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmbvGpZbCYPxPJhRax5vosX646ZtUmmeLqTqxPqFad3kLP">
      </div>
      <div>
        <p class="tw-m-0">
          I just claimed my certificate of completion to <span class="tw-font-bold tw-text-cyan-500">{{ title }}</span> by {{ instructor }}
        </p>
      </div>
      <hr>
      <div>
        <span class="tw-font-bold tw-text-xs">Share this link via:</span>
        <div class="tw-flex tw-gap-2 tw-items-center">
          <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
            <Icon icon="simple-icons:farcaster" width="1rem" height="1rem" />
          </div>
          <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
            <Icon icon="ri:twitter-x-line" width="1rem" height="1rem" />
          </div>
          <div class="tw-flex tw-items-center tw-justify-center tw-border tw-p-2 tw-rounded tw-w-[40px] tw-h-[40px] hover:tw-bg-cyan-500 tw-duration-200 tw-ease-in-out tw-cursor-pointer hover:tw-text-white hover:tw-border-0">
            <Icon icon="mdi:instagram" width="1rem" height="1rem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
