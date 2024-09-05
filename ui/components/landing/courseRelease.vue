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
  <div class="tw-container">
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-shadow-sm tw-rounded tw-my-8 hover:tw-shadow tw-duration-200 tw-ease-in-out  tw-border-l-4 tw-border-l-cyan-500">
      <div class="tw-flex tw-flex-col tw-justify-center tw-gap-2 tw-w-full tw-order-2 lg:tw-order-1  tw-p-8">
        <div class="tw-border tw-border-cyan-500 tw-px-2 tw-rounded-full tw-w-fit">
          <span class="tw-text-sm tw-text-cyan-500">New course</span>
        </div>
        <div>
          <h1 class="tw-m-0">
            A History of <span class="tw-text-cyan-500"><br>Generative Art</span>
          </h1>
          <div class="tw-flex tw-gap-2 tw-items-center">
            <span>Instructed by Heeey</span>
          </div>
        </div>
        <p class="tw-text-gray-500 tw-text-sm">
          In this course we will dive deep into the rich tapestry of generative art, with the goal to obtain a comprehensive exploration of its historical context, examining pivotal moments, key figures, and groundbreaking movements that shaped its trajectory.
        </p>

        <NuxtLink class="hover:tw-no-underline" to="buyCourse/9df7cd5f-d9b3-4f37-9693-15ed1be65cf5">
          <button-PxPrimary text="View course" />
        </NuxtLink>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-center lg:tw-justify-start  tw-order-1 lg:tw-order-2 tw-relative">
        <img :src="`${gateway}QmPP99ZU4TRai5zVeUPyLnscDM4QxGgEByJiTwa155rwmB`" class="tw-w-full tw-h-auto" alt="Course Cover Image">
        <div class="tw-absolute  tw-inset-0 tw-bg-gradient-to-l tw-from-transparent tw-to-white tw-opacity-100" />
        <div class="tw-absolute tw-overflow-hidden tw-rounded-full md:tw-w-[170px] md:tw-h-[170px] tw-w-[150px] tw-h-[150px]">
          <img :src="`${gateway}QmVcpQcNSNhmYdLuTZzgTxmkMtr7qyNQKRnDpwLCiVTTDL`">
        </div>
      </div>
    </div>
  </div>
</template>
