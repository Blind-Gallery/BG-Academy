<script>
import ShareSocialMediaService from '@/services/share'
const shareSocialMediaService = new ShareSocialMediaService()
export default {
  props: {
    title: {
      type: String,
      default: '',
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

    }
  },

  computed: {
    parsedTitle () {
      if (this.title[this.title.length - 1] === '.') {
        return this.title
      }
      return this.title + '.'
    },
    msgForTwitter () {
      return `I just passed an exam in the "${this.parsedTitle}" Course by ${this.instructor} on @BlindGallery_!`
    },
    msgForFarcaster () {
      return `I just passed an exam in the "${this.parsedTitle}" Course by ${this.instructor} on @blind-gallery!`
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
    <h4 class="tw-text-cyan-500">
      Share your activity
    </h4>
    <div class="tw-flex tw-flex-col tw-gap-2">
      <div class="tw-rounded tw-p-4 tw-flex tw-justify-center tw-items-center tw-bg-cyan-300">
        <img class="tw-h-[250px]" src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmeyKKaS1NkDfmH1AaxGHG4rnRWdgmMsdfMu5ZMh36RhXy">
      </div>

      <div>
        <p class="tw-m-0">
          I just passed an exam in the <span class="tw-font-bold tw-text-cyan-500">{{ parsedTitle }}</span> Course by {{ instructor }}
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
  </div>
</template>
