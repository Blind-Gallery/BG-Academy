<script>
export default {
  data () {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    openMobileMenu () {
      const responsiveMenu = this.$refs.responsiveMenu
      this.mobileMenuOpen = true
      responsiveMenu.classList.add('tw-left-[0]')
      responsiveMenu.classList.remove('tw-left-[-110%]')
    },

    closeMobileMenu () {
      const responsiveMenu = this.$refs.responsiveMenu
      this.mobileMenuOpen = false
      responsiveMenu.classList.remove('tw-left-[0]')
      responsiveMenu.classList.add('tw-left-[-110%]')
    },
    openModal (component) {
      const modalInstance = this.$refs.modalInstance
      modalInstance.showModal(component)
    },

    handleSignUp () {
      this.openModal('auth-sign-up-form')
      this.closeMobileMenu()
    },

    handleSignIn () {
      this.openModal('auth-log-in-form')
      this.closeMobileMenu()
    },
    handleEducators () {
      this.openModal('support-become-an-educator-form')
      this.closeMobileMenu()
    }
  }
}
</script>

<template>
  <div>
    <PxModal ref="modalInstance" />
    <!-- DESKTOP MENU -->
    <div class="tw-container lg:tw-flex tw-items-center tw-justify-between tw-hidden">
      <NuxtLink to="/">
        <img src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmdttBPgdS8ERmJQgacHire1y2F8uHJLEm6oNmSx9yisbV" width="150px">
      </NuxtLink>
      <div class="tw-flex tw-items-center tw-gap-2">
        <button-PxTertiary text="Become an Educator" @click="openModal('support-become-an-educator-form');closeMobileMenu " />
        <button-PxSecondary text="Sign Up" @click="openModal('auth-sign-up-form')" />
        <button-PxPrimary text="Sign In" @click="openModal('auth-log-in-form')" />
      </div>
    </div>
    <!-- RESPONSIVE MENU BTNS -->
    <div class="tw-flex tw-items-center tw-justify-between lg:tw-hidden">
      <NuxtLink to="/">
        <img src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmdttBPgdS8ERmJQgacHire1y2F8uHJLEm6oNmSx9yisbV" width="150px">
      </NuxtLink>

      <button v-if="!mobileMenuOpen" class="tw-block lg:tw-hidden tw-p-2 tw-rounded-md tw-focus:outline-none" @click="openMobileMenu">
        <Icon width="32" icon="material-symbols-light:menu" />
      </button>

      <button v-else class="tw-block lg:tw-hidden tw-p-2 tw-rounded-md tw-focus:outline-none" @click="closeMobileMenu">
        <Icon width="32" icon="material-symbols-light:close" />
      </button>
    </div>
    <!-- RESPONSIVE MENU -->
    <div class="tw-relative">
      <div ref="responsiveMenu" class="tw-mt-4 tw-py-4 tw-flex tw-flex-col tw-gap-4 lg:tw-hidden tw-left-[-110%] tw-absolute tw-bg-white tw-w-full tw-ease-in-out tw-duration-200">
        <button-PxSecondary width="tw-w-full" text="Sign Up" @click="handleSignUp" />
        <button-PxPrimary width="tw-w-full" text="Sign In" @click="handleSignIn" />
        <button-PxTertiary width="tw-w-full" text="Become an Educator" @click="handleEducators" />
      </div>
    </div>
  </div>
</template>
