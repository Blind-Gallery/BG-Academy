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
        <div class="d-flex align-items-center">
          <div class="pfp-profile mr-4">
            <img width="100%" src="https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg" alt="pfp">
          </div>
          <div>
            <p class="m-0">
              <b>Profile picture</b>
            </p>
            <p class="small text-secondary">
              PNG or JPG
            </p>
            <input
              ref="fileInput"
              class="d-none"
              type="file"
              @change="onFileSelect"
            >
            <span style="color: #00b9cd; cursor: pointer;" @click="$refs.fileInput.click()">Update</span>
          </div>
        </div>

        <div class="my-4">
          <p><b>Details</b></p>

          <FormulateForm class="w-100">
            <FormulateInput
              :value="user.name"
              name="Name"
              type="text"
              label="Name"
              placeholder="Name"
            />
            <FormulateInput
              :value="user.email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Email address"
              validation="required|email"
            />

            <FormulateInput
              class="w-25"
              type="submit"
              label="Save changes"
            />
          </FormulateForm>
        </div>

        <div class="my-4">
          <p><b>Change password</b></p>

          <FormulateForm class="w-100">
            <FormulateInput
              name="password"
              type="password"
              label="Current password"
              placeholder="Enter password"
              validation="required"
            />
            <FormulateInput
              name="new_password"
              type="password"
              label="New password"
              placeholder="Enter password"
              validation="required"
              validation-name="Confirmation"
            />

            <FormulateInput
              class="w-25"
              type="submit"
              label="Save changes"
            />
          </FormulateForm>
        </div>

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
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      user: {
        name: 'Datzel',
        email: 'datzeldave@gmail.com',
        password: 'datzel'
      },
      selectedFile: null
    }
  },

  methods: {
    onFileSelect (event) {
      this.selectedFile = event.target.files[0]
    },

    onUpload () {
      console.info('hola')
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
