<script>
import { IPFS } from '@/constants'

export default {
  data () {
    return {
      imageLoaded: true,
      selectedFile: null,
      profileData: {
        pfp: this.$auth.user.pfp
      },
      imageCID: null
    }
  },

  created () {
    this.profileData.pfp = this.$auth.user.pfp
  },

  methods: {
    onImageError () {
      this.imageLoaded = false
    },

    async updatePFP (event) {
      this.selectedFile = event.target.files[0]

      const formData = new FormData()
      formData.append('file', this.selectedFile)
      const { cid } = await this.$axios.$post('docs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.imageCID = cid
      this.profileData.pfp = `${IPFS.GATEWAY}${cid}`
    },
    async updateProfileData (data) {
      data.userId = this.$auth.user.id

      if (this.imageCID) {
        data.pfp = `${IPFS.GATEWAY}${this.imageCID}`
      }
      try {
        await this.$axios.$post('users/update', data)
        await this.$auth.fetchUser()
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }

  }
}
</script>

<template>
  <div v-if="$auth.user.tezos_info || $auth.user.email_info">
    <div class="tw-pb-2 tw-border-b-2">
      <h4 class="tw-text-cyan-500">
        Edit profile
      </h4>
      <span class="tw-text-gray-500 tw-text-sm">Manage your profile</span>
    </div>

    <div class="tw-my-4">
      <FormulateForm v-slot="{ isLoading }" v-model="profileData" class="tw-w-full" @submit="updateProfileData">
        <div class="tw-flex tw-items-center tw-mb-4 tw-gap-2">
          <img v-if="$auth.user.pfp && imageLoaded" :src="profileData.pfp" class="tw-overflow-hidden tw-rounded-full tw-w-[70px] tw-h-[70px] tw-cursor-pointer tw-object-cover" @error="onImageError">
          <div v-else class="tw-rounded-full tw-w-[70px] tw-h-[70px] tw-cursor-pointer tw-border tw-flex tw-items-center tw-justify-center">
            <Icon
              icon="material-symbols-light:person"
              width="3rem"
              class="tw-text-gray-500"
            />
          </div>
          <div>
            <p class="tw-m-0">
              <b>Profile picture</b>
            </p>
            <p class="tw-text-sm tw-text-gray-500 tw-mb-2">
              PNG or JPG
            </p>
            <input
              ref="fileInput"
              class="tw-hidden"
              type="file"
              accept=".jpg,.png"
              @change="updatePFP"
            >
            <span class="tw-cursor-pointer tw-text-cyan-500" @click="$refs.fileInput.click()">Update</span>
          </div>
        </div>
        <p><b>Details</b></p>
        <FormulateInput
          :value="$auth.user.name"
          name="name"
          type="text"
          label="Name"
          placeholder="Name"
          validation="required"
        />
        <FormulateInput
          :value="$auth.user.email_info ? $auth.user.email_info.email : $auth.user.email_info"
          name="email"
          type="email"
          label="Email address"
          placeholder="Email address"
          :validation="profileData.email ? 'email' : ''"
        />

        <button :disabled="isLoading" :class="isLoading ? 'tw-bg-cyan-400 hover:tw-bg-cyan-400': ''" type="submit" class="tw-bg-cyan-500 tw-rounded hover:tw-bg-cyan-600 tw-duration-200 tw-ease-in-out tw-text-white tw-text-sm tw-py-2 tw-px-6" @click="updateProfileData">
          <span v-if="!isLoading">Save changes</span>
          <div v-else class="tw-flex tw-gap-2 tw-items-center">
            <Icon icon="eos-icons:bubble-loading" width="1rem" />
            <span>Saving changes</span>
          </div>
        </button>
      </FormulateForm>
    </div>
  </div>
</template>
