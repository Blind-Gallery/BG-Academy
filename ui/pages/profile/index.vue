<template>
  <b-container v-if="$auth.user.tezos_info || $auth.user.email_info" class="bv-example-row">
    <b-row align-h="center">
      <b-col cols="8">
        <div>
          <h4 style="color: #00b9cd;">
            Edit profile
          </h4>
          <p>Manage your profile</p>
          <hr>
        </div>

        <div class="my-4">
          <FormulateForm v-slot="{ isLoading }" v-model="profileData" class="w-100" @submit="updateProfileData">
            <div class="d-flex align-items-center mb-4">
              <b-avatar class="mr-4" :src="profileData.pfp" size="5rem" />

              <div>
                <p class="m-0">
                  <b>Profile picture</b>
                </p>
                <p class="small text-secondary mb-2">
                  PNG or JPG
                </p>
                <input
                  ref="fileInput"
                  class="d-none"
                  type="file"
                  accept=".jpg,.png"
                  @change="updatePFP"
                >
                <span style="color: #00b9cd; cursor: pointer;" @click="$refs.fileInput.click()">Update</span>
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
              :validation="profileData.email ? 'email|required' : ''"
            />

            <button type="submit" class="primary-btn" @click="updateProfileData">
              {{ isLoading ? 'Saving changes':'Save changes' }}
            </button>
          </FormulateForm>
        </div>

        <div class="my-4">
          <p><b>Change password</b></p>

          <FormulateForm v-slot="{ isLoading }" v-model="passwordData" class="w-100" @submit="changePassword">
            <FormulateInput
              name="password"
              type="password"
              label="Current password"
              placeholder="Enter password"
              validation="required|matches:/[0-9]/|min:8,length"
              :validation-messages="{
                matches: 'Passwords must include a number.',
              }"
            />
            <FormulateInput
              name="newPassword"
              type="password"
              label="New password"
              placeholder="Enter password"
              validation="required"
              validation-name="Confirmation"
            />

            <button :disabled="isLoading" type="submit" class="primary-btn">
              {{ isLoading ? 'Saving changes':'Save changes' }}
            </button>
          </FormulateForm>
        </div>

        <div v-if="!$auth.user.tezos_info">
          <hr>
          <div class="d-flex flex-column my-4">
            <p class="m-0">
              <b>Add a wallet</b>
            </p>
            <p class="small">
              Add a Tezos wallet to your profile
            </p>
            <div>
              <button class="secondary-btn" @click="connectWallet">
                Connect wallet
              </button>
            </div>
          </div>
        </div>

        <div v-else>
          <hr>
          <div class="d-flex ">
            <p style="color:#3ed082">
              Connected with wallet
            </p>
            <Icon
              class="ml-2"
              icon="material-symbols:check-circle-rounded"
              color="#3ed082"
              width="21"
            />
          </div>
          <div class="p-2 border rounded">
            <span class="small text-secondary"> {{ $auth.user.tezos_info.wallet }}</span>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <div v-else class="d-flex align-items-center justify-content-center w-100" style="height: 80vh;">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <Icon class="mb-5" icon="eos-icons:bubble-loading" width="4rem" />
      <h5>Loading, please wait...</h5>
    </div>
  </div>
</template>
<script>
import { dappClient } from '~/services/tezos'
export default {
  data () {
    return {
      selectedFile: null,
      profileData: {
        pfp: this.$auth.user.pfp
      },
      passwordData: {},
      imageCID: null
    }
  },

  created () {
    this.redirectionHome()
    this.profileData.pfp = this.$auth.user.pfp
  },

  methods: {
    async updatePFP (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        this.profileData.pfp = URL.createObjectURL(this.selectedFile)
      }

      const formData = new FormData()
      formData.append('file', this.selectedFile)
      const { cid } = await this.$axios.$post('docs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.imageCID = cid
    },

    async updateProfileData (data) {
      data.userId = this.$auth.user.id
      if (this.imageCID) {
        data.pfp = `https://blind-gallery.infura-ipfs.io/ipfs/${this.imageCID}`
      }
      await this.$axios.$post('users/update', data)
      await this.$auth.fetchUser()
    },

    async getWalletAccessData () {
      const { connectAccount, requestLoginSignPayload, checkIfWalletIsConnected } = dappClient()

      const { connected: isWalletConnected } = await checkIfWalletIsConnected()

      if (!isWalletConnected) {
        const wallet = await connectAccount()
        if (!wallet.success) {
          console.error('Wallet not connected')
        }
      }
      const {
        publicKey,
        wallet: tezosAddress,
        signedPayload: signedMessage,
        payload
      } = await requestLoginSignPayload()
      const data = {
        ...this.walletForm,
        publicKey,
        wallet: tezosAddress,
        signedMessage,
        payload
      }
      return data
    },

    async connectWallet () {
      const data = await this.getWalletAccessData()
      data.userId = this.$auth.user.id
      const response = await this.$axios.$post('users/register-wallet', data)
      console.info(response)
    },

    async changePassword (data) {
      data.userId = this.$auth.user.id
      const response = await this.$axios.$post('users/change-password', data)
      console.info(response)
    },

    redirectionHome () {
      if (!this.$auth.loggedIn) {
        this.$router.push('/')
      }
    }

  }
}
</script>
<style>

.pfp-profile{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
}
</style>
