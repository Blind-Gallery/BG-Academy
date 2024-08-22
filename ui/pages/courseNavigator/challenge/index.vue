<script>
export default {
  data () {
    return {
      isUserAllowed: false
    }
  },

  methods: {
    checkUserAccess () {
      this.isUserAllowed = true
    }
  }
}
</script>
<template>
  <div class="tw-container tw-px-4 tw-mx-auto  lg:tw-container">
    <div v-if="!isUserAllowed">
      <challenge-PxInstructions />
      <div class="tw-flex tw-w-full tw-justify-between tw-items-center tw-flex-wrap">
        <button-PxSecondary text="Go back" prefix-icon="navigate-before" />
        <button-PxPrimary text="Continue" suffix-icon="navigate-next" @click="checkUserAccess" />
      </div>
    </div>
    <challenge-PxMint v-else />
  </div>
</template>
