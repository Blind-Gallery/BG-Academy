<script>
import { IPFS } from '@/constants'

export default {
  data () {
    return {
      gateway: IPFS.GATEWAY,
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
        <img :src="`${gateway}QmdttBPgdS8ERmJQgacHire1y2F8uHJLEm6oNmSx9yisbV`" width="150px">
      </NuxtLink>
    </div>
    <!-- RESPONSIVE MENU BTNS -->
    <div class="tw-flex tw-items-center tw-justify-between lg:tw-hidden">
      <NuxtLink to="/">
        <img :src="`${gateway}QmdttBPgdS8ERmJQgacHire1y2F8uHJLEm6oNmSx9yisbV`" width="150px">
      </NuxtLink>

      <div v-if="!$auth.loggedIn">
        <button v-if="!mobileMenuOpen" class="tw-block lg:tw-hidden tw-p-2 tw-rounded-md tw-focus:outline-none" @click="openMobileMenu">
          <Icon width="32" icon="material-symbols-light:menu" />
        </button>

        <button v-else class="tw-block lg:tw-hidden tw-p-2 tw-rounded-md tw-focus:outline-none" @click="closeMobileMenu">
          <Icon width="32" icon="material-symbols-light:close" />
        </button>
      </div>
      <layout-PxProfile v-else />
    </div>
  </div>
</template>
