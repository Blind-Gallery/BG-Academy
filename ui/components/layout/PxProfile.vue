<template>
  <div>
    <div class="tw-relative">
      <div @click.stop="toggleDropdown">
        <img v-if="$auth.user.pfp && imageLoaded" class="tw-overflow-hidden tw-rounded-full tw-w-[35px] tw-h-[35px] tw-cursor-pointer tw-object-cover" :src="$auth.user.pfp" @error="onImageError">

        <div v-else class="tw-rounded-full tw-w-[35px] tw-h-[35px] tw-cursor-pointer tw-border tw-flex tw-items-center tw-justify-center">
          <Icon
            icon="material-symbols-light:person"
            width="1.5rem"
            class="tw-text-gray-500"
          />
        </div>
      </div>

      <transition name="dropdown">
        <div v-if="isDropdownVisible" ref="dropdown" class="tw-bg-white tw-absolute tw-w-auto tw-border tw-rounded tw-p-2 tw-right-[30%] tw-mt-2" @click.stop>
          <ul>
            <li class="hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer tw-rounded tw-flex tw-items-center tw-gap-2 tw-p-2 tw-whitespace-nowrap">
              <NuxtLink
                to="/settings/profile"
                class="hover:tw-no-underline tw-text-black hover:tw-text-black tw-flex tw-items-center tw-gap-2"
                @click.native="closeDropdown"
              >
                <Icon
                  icon="material-symbols-light:settings-outline"
                  width="1.25rem"
                  class="tw-text-gray-500"
                />
                <span class="tw-text-sm">Settings</span>
              </NuxtLink>
            </li>
            <li
              class="hover:tw-bg-gray-100 tw-ease-in-out tw-duration-200 tw-cursor-pointer tw-rounded tw-flex tw-items-center tw-gap-2 tw-p-2 tw-whitespace-nowrap"

              @click="doLogout; closeDropdown"
            >
              <Icon
                icon="material-symbols-light:logout-rounded"
                width="1.25rem"
                class="tw-text-gray-500"
              />
              <span class="tw-text-sm">Log out</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { dappClient } from '~/services/tezos'

export default {
  data () {
    return {
      isDropdownVisible: false,
      imageLoaded: true
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    onImageError () {
      this.imageLoaded = false
    },
    async doLogout () {
      const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
      const { connected: isWalletConnected } = await checkIfWalletIsConnected()
      if (isWalletConnected) {
        await disconnectWallet()
      }
      this.$auth.logout()
    },
    toggleDropdown () {
      this.isDropdownVisible = !this.isDropdownVisible
    },
    closeDropdown () {
      this.isDropdownVisible = false
    },
    handleClickOutside (event) {
      const dropdown = this.$refs.dropdown
      if (dropdown && !dropdown.contains(event.target)) {
        this.isDropdownVisible = false
      }
    }
  }
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
