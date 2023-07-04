<template>
  <div>
    <b-container fluid>
      <header>
        <div class="header-container">
          <img
            src="~/assets/AcademyLogo.png"
            alt="Mi imagen"
            width="180px"
          >
          <div class="d-flex" style="gap: 1rem">
            <button v-b-modal.signin class="tertiary-btn">
              Sign Up
            </button><button v-b-modal.signup class="primary-btn">
              Sign In
            </button>
          </div>
          <!--MODAL SIGN UP-->
          <b-modal id="signup" centered hidden-header hide-footer>
            <template #modal-header="{ close }">
              <h2>
                Welcome Back!
              </h2>

              <span
                style="cursor: pointer"
                @click="close()"
              ><Icon
                width="32"
                color="#888"
                icon="material-symbols:close"
              /></span>
            </template>
            <!--SIGN UP FORM-->
            <b-form v-if="show" @submit="signIn" @reset="onReset">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="signInForm.email"
                  type="email"
                  placeholder="Enter email"
                  required
                  :state="validation"
                />
                <b-form-invalid-feedback :state="validation">
                  Please enter a valid email address
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                  Looks good!
                </b-form-valid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your Password:"
                label-for="input-2"
              >
                <div
                  class="d-flex"
                  style="    border: 1px solid #ced4da;
    border-radius: 0.25rem; align-items: center;"
                >
                  <b-form-input
                    id="input-2"
                    v-model="signInForm.password"
                    placeholder="Enter password"
                    :type="showPassword === false ? 'password' : 'text'"
                    required
                    style="border:0"
                  />
                  <span @click="toggleShowPassword">
                    <Icon
                      width="32"
                      color="#888"
                      :icon="showPassword === false ? 'mdi:eye-outline' : 'mdi:eye-off-outline'"
                      style="padding:0.25rem; cursor: pointer;"
                    />
                  </span>
                </div>
                <NuxtLink style="font-size: small;" to="">
                  Did you forget the password?
                </NuxtLink>
              </b-form-group>

              <button class="primary-btn" style="width: 100%;" @click="signIn">
                Sign In
              </button>
              <div class="divider">
                <hr><span>OR </span> <hr>
              </div>
              <button class="secondary-btn" style="width: 100%; position: relative;">
                <Icon icon="material-symbols:account-balance-wallet-outline" color="#00b9cd" width="21" style="position:absolute; left: 24px; top:9px" />
                Connect Wallet
              </button>
              <button class="secondary-btn" style="width: 100%; position: relative;">
                <Icon icon="flat-color-icons:google" width="21" style="position:absolute; left: 24px; top:9px" /> Continue with Google
              </button>

              <p style="text-align: center; font-size: small;">
                Don't have an account yet? <NuxtLink to="">
                  Sign Up
                </NuxtLink>
              </p>
            </b-form>
          </b-modal>

          <!--MODAL SIGN IN-->
          <!-- <b-modal id="signin" centered hidden-header hide-footer>
            <template #modal-header="{ close }">
              <h2>
                Create new account
              </h2>
              <span
                style="cursor: pointer"
                @click="close()"
              ><Icon
                width="32"
                color="#888"
                icon="material-symbols:close"
              /></span>
            </template>
            <b-form v-if="show" @submit="onSubmit" @reset="onReset">
              <b-form-group
                id="input-group-1"
                label="Your name"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  placeholder="Enter your full name"
                  required
                />
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password"
                type="password"
                label-for="input-2"
                aria-describedby="password-help-block"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.name"
                  placeholder="Create password"
                  required
                />
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Confirm password"

                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.name"
                  type="password"
                  aria-describedby="password-help-block"
                  placeholder="Confirm your password"
                  required
                />
              </b-form-group>

              <button class="primary-btn" style="width: 100%;">
                Sign Up
              </button>
              <div class="divider">
                <hr><span>OR </span> <hr>
              </div>
              <button class="secondary-btn" style="width: 100%; position: relative;">
                <Icon icon="material-symbols:account-balance-wallet-outline" color="#00b9cd" width="21" style="position:absolute; left: 24px; top:9px" />
                Connect Wallet
              </button>
              <button class="secondary-btn" style="width: 100%; position: relative;">
                <Icon icon="flat-color-icons:google" width="21" style="position:absolute; left: 24px; top:9px" /> Continue with Google
              </button>

              <p style="text-align: center; font-size: small;">
                Already have an account? <NuxtLink to="">
                  Sign In
                </NuxtLink>
              </p>
            </b-form>
          </b-modal> -->
        </div>
      </header>
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPassword: false,
      validMail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      signInForm: {
        email: '',
        password: ''
      },
      show: true
    }
  },

  computed: {
    validation () {
      if (this.signInForm.email.length === 0) {
        return null
      } else if (this.signInForm.email.match(this.validMail)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    toggleShowPassword () {
      this.showPassword = !this.showPassword
    },

    signIn (event) {
      if (this.validation === true) {
        event.preventDefault()
        alert(JSON.stringify(this.signInForm))
      }
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.signInForm.email = ''
      this.signInForm.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>
body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
}

a{
  color:#00b9cd;
}

a:hover{
  color:#009cad;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
}

.primary-btn {
  background-color: #00b9cd;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  color: #fff;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
}

.primary-btn:hover {
  background-color: #009cad;
}

.secondary-btn{
  border: 1px solid #00b9cd;
  border-radius: 5px;
  color: #00b9cd;
  font-weight: 600;
  background-color: #fff;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background-color: #eeeeee;
}

.tertiary-btn {
  background-color: transparent;
  border: none;
  color: #888888;
}

.modal-content{
  padding:1rem;
}

.modal-header > h2{
  font-size: 32px;
  font-weight: bold;
  color:#00B9CD;
}

.divider{
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0rem;
}

.divider>hr{
  margin: 0px;
  height: 1px;
  border: none;
  flex: 1 1 0%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.divider>span{
  font-size: small;
  color:#888888;
  padding:0.3rem;
}

</style>
