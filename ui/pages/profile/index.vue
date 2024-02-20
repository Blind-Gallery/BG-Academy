<template>
  <!-- <div style="display: flex; justify-content: center; align-items: center; height: 80vh;">
    <div class="profile-container rounded shadow-sm">
      <h2 class="text-center" style="color: #00b9cd;">
        Edit profile
      </h2><div><img class="pfp-profile" src="https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg" alt="pfp"></div>
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
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          validation="required"
        />
        <FormulateInput
          name="password_confirm"
          type="password"
          label="Confirm your password"
          placeholder="Confirm password"
          validation="required|confirm"
          validation-name="Confirmation"
        />

        <FormulateInput
          type="submit"
          label="Save changes"
        />
      </FormulateForm>
    </div>
  </div> -->
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
            <span style="color: #00b9cd;">Update</span>
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
