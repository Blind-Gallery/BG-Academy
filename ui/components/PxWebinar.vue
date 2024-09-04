<script>
import { IPFS } from '@/constants'
export default {
  data () {
    return {
      gateway: IPFS.GATEWAY
    }
  }
}
</script>
<template>
  <div>
    <b-container style="max-width: 1240px;">
      <b-row class="justify-content-md-center">
        <b-col col lg="6">
          <div class="w-100 rounded overflow-hidden shadow-sm">
            <div class="overflow-hidden position-relative d-flex justify-content-center align-items-center" style="height:200px">
              <img width="100%" :src="`${gateway}QmQ6xcW8YcPdCVxM82mAjc9qSTmyks3buzaxsynjQZndby`">
              <div class="position-absolute">
                <b-avatar style="border:5px solid white" class="rounded" size="8rem" variant="info" :src="`${gateway}QmV2PBdksQNvsyMfwxcXVvq4Y22BA8rXWSVmTFnMkhB9FG`" />
              </div>
            </div>
            <div class="p-4">
              <div class="tw-border tw-rounded-full tw-px-2 tw-mb-2 tw-w-fit">
                <span class="text-secondary small">Webinar | September 3rd, 6 pm CET / 12 pm EST

                </span>
              </div>

              <h4 class="tw-m-0">
                Introduction to Pixel Shaders
              </h4>
              <span class="tw-text-sm">With ilithya</span>
              <p class="tw-text-gray-500 tw-text-sm tw-mt-2">
                Learn the basics of pixel aka fragment shaders in this webinar with the help of ilithya, a multidisciplinary artist and technologist with a background in creative development and design
              </p>

              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <NuxtLink class="hover:tw-no-underline" to="buyCourse/5f1f6044-21ba-4409-880e-02cd36568697">
                  <button-PxSecondary
                    text="View course"
                    suffix-icon="navigate-next"
                  />
                </NuxtLink>
                <span class="tw-text-gray-500 tw-text-sm">Subscribe to join the webinar</span>
              </div>
              <hr class="w-100">
              <div class="w-100 d-flex align-items-center justify-content-center flex-column">
                <iframe
                  src="https://blindgallery.substack.com/embed"
                  height="150"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                />
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
