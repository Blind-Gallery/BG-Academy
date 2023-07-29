<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div>
    <!--HEADER-->
    <header class="sticky-top">
      <b-container style="max-width: 1240px;">
        <div class="header-container">
          <NuxtLink to="/">
            <img
              src="~/assets/AcademyLogo.png"
              alt="logo"
              width="160px"
            >
          </NuxtLink>
          <div v-if="!$auth.loggedIn" class="d-lg-flex d-none" style="gap: 1rem">
            <button v-b-modal.signup class="tertiary-btn">
              Sign Up
            </button><button v-b-modal.signin class="primary-btn">
              Sign In
            </button>
          </div>

          <div v-else>
            <NuxtLink to="/myCourses">
              <button class="tertiary-btn">
                My courses
              </button>
            </NuxtLink>
            <b-avatar size="1.5rem" />
          </div>

          <Icon icon="material-symbols:menu" width="30px" class="d-lg-none d-md-block" />
          <!--MODAL SIGN IN-->
          <b-modal id="signin" centered hidden-header hide-footer>
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
            <!--SIGN IN FORM-->
            <b-form @submit="onSignIn">
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
                  :state="validationEmail"
                />
                <b-form-invalid-feedback :state="validationEmail">
                  Please enter a valid email address
                </b-form-invalid-feedback>
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
                <b-form-invalid-feedback :state="validationPassword">
                  {{ signInForm.password.length < 8 ? 'Your password must be at least 8 characters long' : '' }}
                </b-form-invalid-feedback>
                <a v-b-modal.recoverPassword style="font-size: small;" class="nuxt-link-exact-active nuxt-link-active" @click="$bvModal.hide('signin')">
                  Did you forget the password?
                </a>
              </b-form-group>
              <p v-show="validationPassword === null && validationEmail === null" style="font-size: small; color:#dc3545">
                {{ invalidFormMsg }}
              </p>
              <button class="primary-btn" style="width: 100%;" @click="emailConnect">
                Sign In
              </button>
              <div class="divider">
                <hr><span>OR </span> <hr>
              </div>
              <button class="secondary-btn" style="width: 100%; position: relative; margin-bottom: 1rem;" @click="walletConnect">
                <Icon icon="material-symbols:account-balance-wallet-outline" color="#00b9cd" width="21" style="position:absolute; left: 24px; top:9px" />
                Connect Wallet
              </button>
              <button class="secondary-btn" style="width: 100%; position: relative; margin-bottom: 1rem;">
                <Icon icon="flat-color-icons:google" width="21" style="position:absolute; left: 24px; top:9px" /> Continue with Google
              </button>

              <p style="text-align: center; font-size: small;">
                Don't have an account yet? <a v-b-modal.signup class="nuxt-link-exact-active nuxt-link-active" @click="$bvModal.hide('signin')">
                  Sign Up
                </a>
              </p>
            </b-form>
          </b-modal>

          <!--RECOVER PASSWORD-->
          <b-modal id="recoverPassword" centered hidden-header hide-footer>
            <template #modal-header="{ close }">
              <h2>
                Recover password
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
            <p style="font-size: small;">
              Enter the email address you use on the platform. We will send you a link to reset your password.
            </p>
            <b-form>
              <b-form-group
                id="input-group-1"
                label="Your email"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  placeholder="Enter your email"
                  required
                />
              </b-form-group>
              <button class="primary-btn" style="width: 100%; margin-bottom: 1rem;">
                Recover Password
              </button>

              <p style="text-align: center; font-size: small;">
                Back to <a v-b-modal.signin class="nuxt-link-exact-active nuxt-link-active" @click="$bvModal.hide('recoverPassword')">Sign In</a>
              </p>
            </b-form>
          </b-modal>

          <!--MODAL SIGN UP-->
          <b-modal id="signup" centered hidden-header hide-footer>
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
            <b-form @submit="onSignUp">
              <b-form-group
                id="input-group-1"
                label="Your name"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="signUpForm.name"
                  placeholder="Enter your full name"
                  required
                />
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Your email"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="signUpForm.email"
                  placeholder="Enter your email"
                  required
                  :state="validationEmail"
                />
                <b-form-invalid-feedback :state="validationEmail">
                  Please enter a valid email address
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Password"
                label-for="input-3"
                aria-describedby="password-help-block"
              >
                <div
                  class="d-flex"
                  style="    border: 1px solid #ced4da;
    border-radius: 0.25rem; align-items: center;"
                >
                  <b-form-input
                    id="input-3"
                    v-model="signUpForm.password"
                    placeholder="Create password"
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

                <b-form-invalid-feedback :state="validationPassword">
                  The password should have at least 8 characters, one uppercase letter, one lowercase letter, and one number.
                </b-form-invalid-feedback>
              </b-form-group>
              <p v-show="validationPassword === null && validationEmail === null" style="font-size: small; color:#dc3545">
                {{ invalidFormMsg }}
              </p>
              <button class="primary-btn" style="width: 100%;" @click="onSignUp">
                Sign Up
              </button>
              <div class="divider">
                <hr><span>OR </span> <hr>
              </div>
              <button class="secondary-btn" style="width: 100%; position: relative; margin-bottom: 1rem;">
                <Icon icon="material-symbols:account-balance-wallet-outline" color="#00b9cd" width="21" style="position:absolute; left: 24px; top:9px" />
                Connect Wallet
              </button>
              <button class="secondary-btn" style="width: 100%; position: relative; margin-bottom: 1rem;">
                <Icon icon="flat-color-icons:google" width="21" style="position:absolute; left: 24px; top:9px" /> Continue with Google
              </button>

              <p style="text-align: center; font-size: small;">
                Already have an account? <a v-b-modal.signin class="nuxt-link-exact-active nuxt-link-active" @click="$bvModal.hide('signup')">
                  Sign In
                </a>
              </p>
            </b-form>
          </b-modal>
        </div>
      </b-container>
    </header>
    <Nuxt />
    <footer class="m-4 ">
      <b-container style="max-width: 1240px;">
        <div class="d-flex flex-column">
          <div class="d-flex gap-2 align-items-end">
            <a target="_blank" href="https://nuxtjs.org">
              <Icon class="mr-2" icon="entypo-social:twitter-with-circle" color="#888" width="18" />
            </a>
            <a target="blank" href="https://nuxtjs.org">

              <Icon class="mr-2" icon="entypo-social:linkedin-with-circle" color="#888" width="18" />
            </a>
            <a target="blank" href="https://nuxtjs.org">
              <Icon
                class="mr-2"
                icon="bxl:discord-alt"
                style="background: #888;
              border-radius: 50%;
              padding: 0.2rem;"
                color="#fff"
                width="18"
              />
            </a>
          </div>
          <p class="small m-0">
            © 2023 Blind Gallery Academy. All rights reserved.
          </p>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      show: true,
      showPassword: false,
      validMail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      invalidFormMsg: '',
      signInForm: {
        email: '',
        password: ''
      },

      signUpForm: {
        name: '',
        email: '',
        password: ''
      }

    }
  },

  computed: {
    ...mapGetters('tezosWallet', [
      'tezosAddress',
      'isWalletConnected',
      'isAllowed',
      'addedWallets'
    ]),
    validationEmail () {
      if (this.signInForm.email.length === 0 && this.signUpForm.email.length === 0) {
        return null
      } else if (this.signInForm.email.match(this.validMail) || this.signUpForm.email.match(this.validMail)) {
        return true
      } else {
        return false
      }
    },

    validationPassword () {
      if (this.signInForm.password.length === 0 && this.signUpForm.password.length === 0) {
        return null
      } else if (this.signInForm.password.match(this.validPassword) || this.signUpForm.password.match(this.validPassword)) {
        return true
      } else {
        return false
      }
    }

  },
  mounted () {
    this.$root.$on('bv::modal::show', (bvEvent, signup) => {
      this.onReset(bvEvent, signup)
    })
  },
  methods: {

    toggleShowPassword () {
      this.showPassword = !this.showPassword
    },

    onSignIn (event) {
      if (this.validationEmail && this.validationPassword) {
        this.$bvModal.hide('signin')
        event.preventDefault()
        this.onReset()
      } else {
        this.invalidFormMsg = 'Incorrect email and/or password'
      }
    },

    onSignUp (event) {
      if (this.validationEmail && this.validationPassword) {
        this.$bvModal.hide('signup')
        event.preventDefault()
        this.onReset()
      } else {
        this.onReset()
        this.invalidFormMsg = 'Incorrect email and/or password'
      }
    },

    emailConnect () {
      alert('do login')
    },

    async walletConnect () {
      await this.$store.dispatch('tezosWallet/connect')
      this.$auth.loginWith('local', {
        wallet: this.tezosAddress
      })
    },

    onReset () {
      this.signInForm = {
        email: '',
        password: ''
      }

      this.signUpForm = {
        name: '',
        email: '',
        password: ''
      }

      this.invalidFormMsg = ''
    }

  }
}
</script>

<style>
body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
}

.course-route{
  text-decoration: none;
  color:inherit
}

.course-route:hover{
  text-decoration: none;
  color:inherit;
}

::-webkit-scrollbar {
  width: 6px; /* Ancho de la barra de scroll */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del pulgar del scroll */
  border-radius: 3px; /* Bordes redondeados del pulgar */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color del pulgar del scroll al hacer hover */
}

header{
  background-color: #fff;
}
a{
  color:#00b9cd;
}

a:hover{
  color:#009cad;
}

h1{
  font-weight: bold;
}

h2, h3,h4,h5{
  font-weight: 600;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
}

.primary-btn {
  background-color: #00b9cd;
  border-radius: 5px;
  border: none;
  font-weight: 600;
  color: #fff;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
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
  transition: all 0.3s;
  min-width: 120px;
}

.secondary-btn:hover {
  background-color: #f7f7f7;
}

.secondary-btn-black{
  background-color: transparent;
  border:1px solid #fff;
  border-radius: 5px;
  color:#fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
}

.secondary-btn-black:hover {
  background-color: #ffffff;
  color:#1A374B;
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

.invalid-feedback{
  font-size: small;
}

</style>
