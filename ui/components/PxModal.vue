<script>
export default {
  data () {
    return {
      currentComponent: null
    }
  },

  methods: {
    showModal (componentName) {
      this.currentComponent = componentName
      const modal = this.$refs.modal
      const modalContent = this.$refs.modalContent
      modal.classList.remove('tw-opacity-0', 'tw-pointer-events-none')
      modal.classList.add('tw-opacity-100', 'tw-pointer-events-auto')

      modalContent.classList.remove('tw-scale-50')
      modalContent.classList.add('tw-scale-100')
    },
    closeModal () {
      const modal = this.$refs.modal
      const modalContent = this.$refs.modalContent
      modal.classList.remove('tw-opacity-100', 'tw-pointer-events-auto')
      modal.classList.add('tw-opacity-0', 'tw-pointer-events-none')

      modalContent.classList.remove('tw-scale-100')
      modalContent.classList.add('tw-scale-50')
      this.currentComponent = null
    },
    closeModalOnBackgroundClick (event) {
      if (event.target === this.$refs.modal) {
        this.closeModal()
      }
    },
    switchComponent (newComponent) {
      this.currentComponent = newComponent
    }
  }
}
</script>

<template>
  <!-- Modal Background -->
  <div
    ref="modal"
    class="tw-fixed tw-z-[1021] tw-inset-0 tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50 tw-transition-opacity tw-duration-200 tw-opacity-0 tw-pointer-events-none"
    @click="closeModalOnBackgroundClick"
  >
    <!-- Modal Content -->
    <div
      ref="modalContent"
      :class="{'tw-max-w-lg': true, 'tw-max-h-screen': true, 'tw-overflow-y-auto': true}"
      class="tw-m-2 tw-bg-white tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full tw-p-6 tw-transform tw-scale-50 tw-transition-transform tw-duration-200 tw-relative"
      @click.stop
    >
      <div
        class="tw-absolute tw-top-4 tw-right-2 tw-cursor-pointer"
        @click="closeModal"
      >
        <Icon
          icon="material-symbols-light:close"
          width="2rem"
        />
      </div>

      <!-- Modal Body -->
      <div class="tw-my-4">
        <component
          :is="currentComponent"
          @switchComponent="switchComponent"
          @closeModal="closeModal"
        />
      </div>
    </div>
  </div>
</template>
