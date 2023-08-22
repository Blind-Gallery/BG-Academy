<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div>
    <PxAlert ref="alert" />
    <!--HEADER-->
    <header class="sticky-top">
      <b-container style="max-width: 1240px">
        <div>
          <b-navbar class="px-0" toggleable="lg">
            <b-navbar-brand to="/">
              <img src="../assets/academy-logo.png" alt="logo" width="160px">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" />

            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-navbar-nav
                  v-if="!$auth.loggedIn"
                  class="d-flex align-items-center"
                  style="gap: 1rem"
                >
                  <b-nav-item v-b-modal.signup>
                    Sign Up
                  </b-nav-item>
                  <button v-b-modal.signin class="primary-btn">
                    Sign In
                  </button>
                </b-navbar-nav>
                <b-navbar-nav v-else>
                  <b-nav-item to="/myCourses">
                    My courses
                  </b-nav-item>
                  <b-nav-item @click="doLogout">
                    Log out
                  </b-nav-item>
                </b-navbar-nav>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </b-container>

      <!--MODAL SIGN IN-->
      <b-modal id="signin" centered hidden-header hide-footer>
        <template #modal-header="{ close }">
          <h2>Welcome Back!</h2>

          <span
            style="cursor: pointer"
            @click="close()"
          ><Icon
            width="32"
            color="#888"
            icon="material-symbols:close"
          /></span>
        </template>
        <FormulateForm
          v-slot="{ isLoading }"
          v-model="signInForm"
          class="login-form"
          @submit="doSignIn"
        >
          <FormulateInput
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
            validation="required|matches:/[0-9]/|min:8,length"
            :validation-messages="{
              matches: 'Passwords must include a number.',
            }"
          />
          <a v-b-modal.recoverPassword class="m-0" style="font-size: small;" @click="$bvModal.hide('signin')">
            Did you forget your password?
          </a>
          <p class="small" style="font-size: small; color: #960505">
            {{ invalidMessage }}
          </p>
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Sign In'"
          />
        </FormulateForm>

        <div class="divider">
          <hr>
          <span>OR </span>
          <hr>
        </div>
        <button
          class="secondary-btn"
          style="width: 100%; position: relative; margin-bottom: 1rem"
          @click="walletConnect"
        >
          <Icon
            icon="material-symbols:account-balance-wallet-outline"
            color="#00b9cd"
            width="21"
            style="position: absolute; left: 24px; top: 9px"
          />
          Connect Wallet
        </button>
        <button
          class="secondary-btn"
          style="width: 100%; position: relative; margin-bottom: 1rem"
          @click="doGoogleConnect"
        >
          <Icon
            icon="flat-color-icons:google"
            width="21"
            style="position: absolute; left: 24px; top: 9px"
          />
          Continue with Google
        </button>

        <p style="text-align: center; font-size: small">
          Don't have an account yet?
          <a
            v-b-modal.signup
            class="nuxt-link-exact-active nuxt-link-active"
            @click="$bvModal.hide('signin')"
          >
            Sign Up
          </a>
        </p>
      </b-modal>

      <!--RECOVER PASSWORD-->
      <b-modal id="recoverPassword" centered hidden-header hide-footer>
        <template #modal-header="{ close }">
          <h2>Recover password</h2>

          <span
            style="cursor: pointer"
            @click="close()"
          ><Icon
            width="32"
            color="#888"
            icon="material-symbols:close"
          /></span>
        </template>
        <p style="font-size: small">
          Enter the email address you use on the platform. We will send you a
          link to reset your password.
        </p>
        <FormulateForm
          v-slot="{ isLoading }"
          v-model="signInForm"
          class="login-form"
          @submit="doRecover"
        >
          <FormulateInput
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="required|email"
          />
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Recover password'"
          />
        </formulateform>
      </b-modal>

      <!--MODAL SIGN UP-->
      <b-modal id="signup" centered hidden-header hide-footer>
        <template #modal-header="{ close }">
          <h2>Create new account</h2>
          <span
            style="cursor: pointer"
            @click="close()"
          ><Icon
            width="32"
            color="#888"
            icon="material-symbols:close"
          /></span>
        </template>

        <FormulateForm
          v-slot="{ isLoading }"
          v-model="signUpForm"
          class="login-form"
          @submit="doSignUp"
        >
          <FormulateInput
            name="name"
            type="text"
            label="Your name"
            placeholder="Your name"
            validation="required"
          />
          <FormulateInput
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            validation="required|email"
          />
          <FormulateInput
            label="Password"
            type="password"
            name="password"
            validation="required|matches:/[0-9]/|min:8,length"
            :validation-messages="{
              matches: 'Passwords must include a number.',
            }"
          />
          <FormulateInput
            label="Confirm password"
            type="password"
            name="password_confirm"
            validation="required|confirm"
            validation-name="Password confirmation"
          />
          <p class="small" style="font-size: small; color: #960505">
            {{ invalidMessage }}
          </p>
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Sign up'"
          />
        </FormulateForm>

        <div class="divider">
          <hr>
          <span>OR </span>
          <hr>
        </div>
        <button
          class="secondary-btn"
          style="width: 100%; position: relative; margin-bottom: 1rem"
          @click="doSignUpWallet"
        >
          <Icon
            icon="material-symbols:account-balance-wallet-outline"
            color="#00b9cd"
            width="21"
            style="position: absolute; left: 24px; top: 9px"
            @click="doSignUpWallet"
          />
          Connect Wallet
        </button>
        <button
          class="secondary-btn"
          style="width: 100%; position: relative; margin-bottom: 1rem"
          @click="doGoogleConnect"
        >
          <Icon
            icon="flat-color-icons:google"
            width="21"
            style="position: absolute; left: 24px; top: 9px"
          />
          Continue with Google
        </button>

        <p style="text-align: center; font-size: small">
          Already have an account?
          <a
            v-b-modal.signin
            class="nuxt-link-exact-active nuxt-link-active"
            @click="$bvModal.hide('signup')"
          >
            Sign In
          </a>
        </p>
      </b-modal>
    </header>

    <Nuxt />
    <footer class="m-4">
      <b-container style="max-width: 1240px">
        <div class="d-flex flex-column">
          <div class="d-flex gap-2 align-items-end">
            <a target="_blank" href="https://nuxtjs.org">
              <Icon
                class="mr-2"
                icon="entypo-social:twitter-with-circle"
                color="#888"
                width="18"
              />
            </a>
            <a target="blank" href="https://nuxtjs.org">
              <Icon
                class="mr-2"
                icon="entypo-social:linkedin-with-circle"
                color="#888"
                width="18"
              />
            </a>
            <a target="blank" href="https://nuxtjs.org">
              <Icon
                class="mr-2"
                icon="bxl:discord-alt"
                style="background: #888; border-radius: 50%; padding: 0.2rem"
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
      invalidMessage: '',
      signInForm: {},

      signUpForm: {}
    }
  },

  computed: {
    ...mapGetters('tezosWallet', [
      'publicKey',
      'tezosAddress',
      'isWalletConnected',
      'payload',
      'signedMessage'
    ])
  },
  mounted () {
    this.$root.$on('bv::modal::show', (bvEvent, signup) => {
      this.onReset(bvEvent, signup)
    })
  },
  methods: {
    async doSignIn () {
      await this.emailConnect()
    },

    async doSignUp () {
      try {
        const signUpForm = this.signUpForm
        await this.$axios.$post('users', signUpForm)
        this.$auth.loginWith('local', {
          data: {
            ...signUpForm
          }
        })
        this.$bvModal.hide('signup')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.invalidMessage =
            'There is already an existing account with the email address'
        } else {
          this.invalidMessage = 'Sing Up error'
        }
      }
    },

    async doSignUpWallet () {
      await this.$store.dispatch('tezosWallet/connect')
      const data = {
        publicKey: this.publicKey,
        wallet: this.tezosAddress,
        signedMessage: this.signedMessage,
        payload: this.payload
      }
      await this.$axios.$post('users', data)
      this.$auth.loginWith('local', {
        data
      })
      if (this.isWalletConnected && !this.$auth.loggedIn) {
        this.$store.dispatch('tezosWallet/disconnect')
      }

      this.$bvModal.hide('signup')
    },

    doGoogleConnect () {
      this.$auth.loginWith('google')
    },

    doLogout () {
      if (this.isWalletConnected) {
        this.$store.dispatch('tezosWallet/disconnect')
      }
      this.$auth.logout()
    },

    async emailConnect () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            ...this.signInForm
          }
        })
        this.$bvModal.hide('signin')
        this.$refs.alert.showAlert('Successful login')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.invalidMessage = 'Invalid email or password'
        } else {
          this.invalidMessage = 'Sign In error'
        }
      }
    },

    async walletConnect () {
      await this.$store.dispatch('tezosWallet/connect')
      const data = {
        publicKey: this.publicKey,
        wallet: this.tezosAddress,
        signedMessage: this.signedMessage,
        payload: this.payload
      }
      this.$auth.loginWith('local', {
        data
      })
      if (this.isWalletConnected && !this.$auth.loggedIn) {
        this.$store.dispatch('tezosWallet/disconnect')
      }

      this.$bvModal.hide('signin')
    },

    onReset () {
      this.signInForm = {}

      this.signUpForm = {}

      this.invalidMessage = ''
    }
  }
}
</script>

<style>
body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
}

.course-route {
  text-decoration: none;
  color: inherit;
}

.course-route:hover {
  text-decoration: none;
  color: inherit;
}

::-webkit-scrollbar {
  width: 10px; /* Ancho de la barra de scroll */
}

::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del pulgar del scroll */
  border-radius: 3px; /* Bordes redondeados del pulgar */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color del pulgar del scroll al hacer hover */
}

header {
  background-color: #fff;
  padding: 0.25rem 0rem;
}
a {
  color: #00b9cd;
}

a:hover {
  color: #009cad;
}

h1 {
  font-weight: bold;
}

h2,
h3,
h4,
h5 {
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

.secondary-btn {
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

.secondary-btn-black {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
  min-width: 120px;
}

.secondary-btn-black:hover {
  background-color: #ffffff;
  color: #1a374b;
}

.tertiary-btn {
  background-color: transparent;
  border: none;
  color: #888888;
}

.modal-content {
  padding: 1rem;
}

.modal-header > h2 {
  font-size: 32px;
  font-weight: bold;
  color: #00b9cd;
}

.divider {
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0rem;
}

.divider > hr {
  margin: 0px;
  height: 1px;
  border: none;
  flex: 1 1 0%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.divider > span {
  font-size: small;
  color: #888888;
  padding: 0.3rem;
}

.invalid-feedback {
  font-size: small;
}
</style>
