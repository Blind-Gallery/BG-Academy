<template>
  <b-container class="bv-example-row">
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
              :validation=" $auth.user.email_info ? $auth.user.email_info.email : $auth.user.email_info"
            />

            <button type="submit" class="primary-btn">
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
              name="new_password"
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
              <button class="secondary-btn">
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
</template>
<script>
export default {
  data () {
    return {
      selectedFile: null,

      profileData: {
        pfp: null
      },
      passwordData: {}

    }
  },

  methods: {
    updatePFP (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        this.profileData.pfp = URL.createObjectURL(this.selectedFile)
      }
    },

    updateProfileData (data) {
      setTimeout(() => {
        console.info(data)
      }, 2000)
    },

    changePassword (data) {
      setTimeout(() => {
        console.info(data)
      }, 2000)
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
