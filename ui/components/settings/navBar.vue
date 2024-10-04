<script>
export default {
  data () {
    return {
      showMenu: false
    }
  },
  created () {
    this.redirectionHome()
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
      if (this.showMenu) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    redirectionHome () {
      if (!this.$auth.loggedIn) {
        this.$router.push('/')
      }
    },
    handleClickOutside (event) {
      const menu = this.$refs.dropdownMenu
      if (menu && !menu.contains(event.target)) {
        this.showMenu = false
        document.removeEventListener('click', this.handleClickOutside)
      }
    }
  }
}
</script>

<template>
  <div class="tw-relative">
    <div class="tw-flex tw-flex-col tw-gap-2 tw-hidden md:tw-flex">
      <h4>Settings</h4>
      <NuxtLink to="/settings/profile" class="hover:tw-no-underline">
        <div :class="$route.path === '/settings/profile' ? 'tw-bg-white tw-border-l-4 tw-border-cyan-500 tw-shadow-sm': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-white hover:tw-shadow-sm tw-rounded tw-ease-in-out tw-duration-200">
          <div>
            <Icon icon="material-symbols-light:edit-square-outline-rounded" width="1.25rem" />
          </div>
          <span class="tw-text-sm">Edit profile</span>
        </div>
      </NuxtLink>
      <NuxtLink v-if="$auth.user.email_info" to="/settings/password" class="hover:tw-no-underline">
        <div :class="$route.path === '/settings/password' ? 'tw-bg-white tw-border-l-4 tw-border-cyan-500 tw-shadow-sm': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-white hover:tw-shadow-sm tw-rounded tw-ease-in-out tw-duration-200">
          <div>
            <Icon icon="material-symbols-light:password" width="1.25rem" />
          </div>
          <span class="tw-text-sm">Password</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/settings/wallet" class="hover:tw-no-underline">
        <div :class="$route.path === '/settings/wallet' ? 'tw-bg-white tw-border-l-4 tw-border-cyan-500 tw-shadow-sm': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-white hover:tw-shadow-sm tw-rounded tw-ease-in-out tw-duration-200">
          <div>
            <Icon icon="material-symbols-light:account-balance-wallet-outline" width="1.25rem" />
          </div>
          <span class="tw-text-sm">Wallet</span>
        </div>
      </NuxtLink>
    </div>

    <div class="tw-visible md:tw-hidden">
      <button ref="dropdownMenu" type="button" class="tw-rounded-full tw-bg-white tw-shadow tw-w-[50px] tw-h-[50px]" @click="toggleMenu">
        <div v-if="!showMenu">
          <Icon icon="material-symbols-light:menu" width="2rem" />
        </div>
        <div v-else>
          <Icon icon="material-symbols-light:close" width="2rem" />
        </div>
      </button>

      <transition name="fade">
        <div v-if="showMenu" class="tw-absolute tw-top-14 tw-left-0 tw-w-full tw-bg-white  tw-rounded tw-shadow-lg tw-z-50">
          <NuxtLink to="/settings/profile" class="hover:tw-no-underline">
            <div :class="$route.path === '/settings/profile' ? 'tw-border-l-4 tw-border-cyan-500': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-gray-100  tw-ease-in-out tw-duration-200">
              <div>
                <Icon icon="material-symbols-light:edit-square-outline-rounded" width="1.25rem" />
              </div>
              <span class="tw-text-sm">Edit profile</span>
            </div>
          </NuxtLink>
          <NuxtLink v-if="$auth.user.email_info" to="/settings/password" class="hover:tw-no-underline">
            <div :class="$route.path === '/settings/password' ? ' tw-border-l-4 tw-border-cyan-500': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-gray-100  tw-ease-in-out tw-duration-200">
              <div>
                <Icon icon="material-symbols-light:password" width="1.25rem" />
              </div>
              <span class="tw-text-sm">Password</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/settings/wallet" class="hover:tw-no-underline">
            <div :class="$route.path === '/settings/wallet' ? 'tw-border-l-4 tw-border-cyan-500': ''" class="tw-flex tw-items-center tw-gap-2 tw-text-gray-500 tw-cursor-pointer tw-p-2 hover:tw-bg-gray-100  tw-ease-in-out tw-duration-200">
              <div>
                <Icon icon="material-symbols-light:account-balance-wallet-outline" width="1.25rem" />
              </div>
              <span class="tw-text-sm">Wallet</span>
            </div>
          </NuxtLink>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
