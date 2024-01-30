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

            <b-navbar-toggle v-if="!$auth.loggedIn" target="nav-collapse" />

            <b-collapse v-if="!$auth.loggedIn" id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-navbar-nav
                  class="d-flex align-items-center main-menu"
                >
                  <b-nav-item v-b-modal.educatorsForm>
                    <span v-b-modal.educatorsForm class="small">
                      Become an educator
                    </span>
                  </b-nav-item>
                  <b-nav-item v-b-modal.signup>
                    <button class="secondary-btn small">
                      Sign Up
                    </button>
                  </b-nav-item>
                  <b-nav-item v-b-modal.signin>
                    <button v-b-modal.signin class="primary-btn small">
                      Sign In
                    </button>
                  </b-nav-item>
                </b-navbar-nav>
              </b-navbar-nav>
            </b-collapse>

            <button v-else class="tertiary-btn  ml-auto" @click="doLogout">
              <Icon
                icon="material-symbols:logout-rounded"
                width="24"
                color="#888"
              />
              Log out
            </button>
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
          @submit="emailConnect"
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
          v-model="recoverPasswordForm"
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
          <p style="color: green; font-size: .8em;">
            {{ successMessage }}
          </p>
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Recover password'"
          />
        </Formulateform>
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
          v-if="!isWalletFlow"
          v-slot="{ isLoading }"
          v-model="signUpForm"
          class="login-form"
          @submit="doEmailSignUp"
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

        <FormulateForm v-else v-slot="{ isLoading }" v-model="walletForm" @submit="doSignUpWallet">
          <FormulateInput
            name="name"
            type="text"
            label="Your name"
            placeholder="Your name"
            validation="required"
          />
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Connect wallet'"
          />
        </FormulateForm>

        <div v-if="!isWalletFlow">
          <div class="divider">
            <hr>
            <span>OR </span>
            <hr>
          </div>
          <button
            class="secondary-btn"
            style="width: 100%; position: relative; margin-bottom: 1rem"
            @click="isWalletFlow = true"
          >
            <Icon
              icon="material-symbols:account-balance-wallet-outline"
              color="#00b9cd"
              width="21"
              style="position: absolute; left: 24px; top: 9px"
            />
            Continue with wallet
          </button>
          <button

            class="secondary-btn"
            style="width: 100%; position: relative; "
            @click="doGoogleConnect"
          >
            <Icon
              icon="flat-color-icons:google"
              width="21"
              style="position: absolute; left: 24px; top: 9px"
            />
            Continue with Google
          </button>
        </div>

        <p class="mt-4" style="text-align: center; font-size: small">
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

      <!--EDUCATORS FORM-->
      <b-modal id="educatorsForm" centered hidden-header hide-footer>
        <template #modal-header="{ close }">
          <h2>Become an educator</h2>

          <span
            style="cursor: pointer"
            @click="close()"
          ><Icon
            width="32"
            color="#888"
            icon="material-symbols:close"
          /></span>
        </template>
        <div class="mb-4 ">
          <p class="m-0 small">
            <span style="font-weight: 600;">Join Our Educator Community:</span><br>
            Are you a experienced in the field of digital art?
          </p>
          <span class="text-secondary small ">We welcome trailblazers to join our educator team. Share your expertise and shape the future of digital art education. Interested?</span>
        </div>
        <FormulateForm
          v-slot="{ isLoading }"
          v-model="educatorsForm"
          class="login-form"
          @submit="sendEducatorForm"
        >
          <FormulateInput
            name="name"
            type="text"
            label="Your name"
            placeholder="Name"
            validation="required"
          />
          <FormulateInput
            name="email"
            type="email"
            label="Email address"
            placeholder="educator@academy.co"
            validation="required|email"
          />
          <FormulateInput
            name="description"
            type="textarea"
            label="What kind of educational course would you like to create?"
            placeholder=""
            validation="required"
          />
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Apply'"
          />
        </Formulateform>
      </b-modal>
    </header>

    <Nuxt />
    <footer class="py-5 mt-5" fluid style="background-color:rgb(246, 246, 246); ">
      <b-container style="max-width: 1240px;  ">
        <b-row class="align-items-center justify-content-center">
          <b-col cols="12" lg="4">
            <svg width="160px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1465.09 333.79"><defs><style>.cls-1{fill:#00b9cd;}.cls-2{fill:#242230;}.cls-3{fill:#6c757d;}</style></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><g id="Academy_Logo" data-name="Academy Logo"><path class="cls-1" d="M201.16,76.46A116.1,116.1,0,1,0,317.25,192.55,116.1,116.1,0,0,0,201.16,76.46Zm-1.84,180.6L184.56,242.3,171.7,229.43l-11-11L135,244.18l-16.65-16.64,25.72-25.72L118.36,176.1,135,159.46l25.73,25.72,11-11,14.75-14.75L203.1,176.1l-25.72,25.72,23.83,23.84L216,240.4ZM274,231.38,259.2,216.63l-12.86-12.88-11-11-25.72,25.73L193,201.86l25.73-25.72L193,150.42l16.64-16.64,25.72,25.72,11-11,14.75-14.75,16.65,16.64L252,176.14,275.85,200l14.75,14.74Z" /><path class="cls-1" d="M201.13,54.13a132.86,132.86,0,0,1,83.4,29.37l43.9-40.84a2.84,2.84,0,0,0-1.38-4.86L137.88.05a2.84,2.84,0,0,0-2.54.77L3.48,130.9a2.84,2.84,0,0,0,1.39,4.79l68.07,14.75C89.09,94.87,140.43,54.13,201.13,54.13Z" /><path class="cls-1" d="M17.48,198.69a22.64,22.64,0,0,1,6.86,1.17L4,151.19l-1.33.28.68,52.29A22.58,22.58,0,0,1,17.48,198.69Z" /><circle class="cls-1" cx="18.19" cy="227.66" r="18.19" /><path class="cls-2" d="M491.77,159H435.2l-9.06,26.78H387.49L442.33,34.18h42.75l54.84,151.57H500.84Zm-9.5-28.5L463.49,75l-18.57,55.49Z" /><path class="cls-2" d="M556.87,92.69A53.24,53.24,0,0,1,578.25,71.1q13.71-7.56,31.41-7.56,22.67,0,37.89,11.88t20,33.46h-39.3q-5-13.81-19.22-13.81A19.35,19.35,0,0,0,592.82,103q-6,7.88-6.05,22.56t6.05,22.56A19.35,19.35,0,0,0,609,156q14.25,0,19.22-13.82h39.3q-4.75,21.17-20.08,33.25t-37.79,12.09q-17.7,0-31.41-7.55a53.18,53.18,0,0,1-21.38-21.59q-7.67-14-7.66-32.82T556.87,92.69Z" /><path class="cls-2" d="M686.85,92.69A52.27,52.27,0,0,1,706,71.1a49.85,49.85,0,0,1,27-7.56q12.74,0,22.34,5.18a38.19,38.19,0,0,1,14.79,13.61V65.27H807V185.75H770.08V168.69a39.89,39.89,0,0,1-15,13.6q-9.62,5.19-22.35,5.18A49,49,0,0,1,706,179.81,52.84,52.84,0,0,1,686.85,158q-7-14.13-7-32.71T686.85,92.69Zm75.57,11a26,26,0,0,0-37.36-.11q-7.66,7.89-7.66,21.7t7.66,21.92a25.73,25.73,0,0,0,37.36.11q7.65-8,7.66-21.81T762.42,103.7Z" /><path class="cls-2" d="M833.45,92.69A52.27,52.27,0,0,1,852.56,71.1a49.85,49.85,0,0,1,27-7.56,47.4,47.4,0,0,1,21.69,5,39.53,39.53,0,0,1,15.44,13.38V26H953.6V185.75H916.68V168.47a37.5,37.5,0,0,1-14.79,13.82q-9.6,5.19-22.34,5.18a49.34,49.34,0,0,1-27-7.66A52.84,52.84,0,0,1,833.45,158q-7-14.13-7-32.71T833.45,92.69Zm75.57,11a25.94,25.94,0,0,0-37.35-.11q-7.68,7.89-7.67,21.7t7.67,21.92a25.72,25.72,0,0,0,37.35.11q7.66-8,7.66-21.81T909,103.7Z" /><path class="cls-2" d="M1093.29,134.36h-83.55q.85,11.23,7.23,17.17a22.06,22.06,0,0,0,15.65,5.93q13.82,0,19.22-11.66h39.3a54,54,0,0,1-10.91,21.38,54.65,54.65,0,0,1-19.75,14.9,63.45,63.45,0,0,1-26.56,5.39q-17.72,0-31.52-7.55a53.76,53.76,0,0,1-21.6-21.59q-7.77-14-7.77-32.82t7.67-32.82a53,53,0,0,1,21.48-21.59q13.82-7.56,31.74-7.56,17.49,0,31.09,7.34a52.75,52.75,0,0,1,21.27,21q7.67,13.59,7.66,31.74A92.38,92.38,0,0,1,1093.29,134.36Zm-37.13-20.51q0-9.5-6.48-15.11t-16.19-5.62a23.4,23.4,0,0,0-15.66,5.4q-6.36,5.4-7.88,15.33Z" /><path class="cls-2" d="M1302.84,77.58q13.28,13.59,13.27,37.78v70.39h-36.7V120.33q0-11.67-6.15-18t-17-6.37q-10.8,0-17,6.37t-6.16,18v65.42h-36.7V120.33q0-11.67-6.15-18t-16.95-6.37q-10.8,0-17,6.37t-6.15,18v65.42h-36.93V65.27h36.93V80.38a39.52,39.52,0,0,1,14.68-12A46.14,46.14,0,0,1,1185.49,64a50,50,0,0,1,24.29,5.83,41.83,41.83,0,0,1,16.73,16.63,48.56,48.56,0,0,1,17.06-16.2A46.1,46.1,0,0,1,1267.1,64Q1289.55,64,1302.84,77.58Z" /><path class="cls-2" d="M1465.09,65.27,1389.52,243h-39.73l27.64-61.31-49-116.38h41.24l27.85,75.35,27.64-75.35Z" /><path class="cls-3" d="M438,280a16.55,16.55,0,0,1,3.65,10.56A17,17,0,0,1,439,300a17.52,17.52,0,0,1-7.63,6.38,27.88,27.88,0,0,1-11.8,2.3H390.65v-67h27.64a28.73,28.73,0,0,1,11.76,2.21,16.73,16.73,0,0,1,7.48,6.14,16.07,16.07,0,0,1,2.54,8.93,15.29,15.29,0,0,1-3.11,9.78,16.68,16.68,0,0,1-8.3,5.57A15,15,0,0,1,438,280ZM404.09,269.3h12.28q4.8,0,7.39-2.16a7.59,7.59,0,0,0,2.59-6.19,7.75,7.75,0,0,0-2.59-6.24q-2.6-2.21-7.39-2.2H404.09Zm21.16,26.1a8.05,8.05,0,0,0,2.73-6.52,8.41,8.41,0,0,0-2.88-6.77,11.6,11.6,0,0,0-7.77-2.45H404.09v18h13.53C420.88,297.7,423.43,296.94,425.25,295.4Z" /><path class="cls-3" d="M503.22,255.48,470.3,333.79H456l11.52-26.49-21.3-51.82h15.06L475,292.62l13.92-37.14Z" /><path class="cls-3" d="M580.56,280a16.54,16.54,0,0,1,3.64,10.56,17.08,17.08,0,0,1-2.63,9.45,17.63,17.63,0,0,1-7.63,6.38,27.9,27.9,0,0,1-11.81,2.3H533.25v-67h27.64a28.65,28.65,0,0,1,11.75,2.21,16.76,16.76,0,0,1,7.49,6.14,16.15,16.15,0,0,1,2.54,8.93,15.24,15.24,0,0,1-3.12,9.78,16.68,16.68,0,0,1-8.3,5.57A15.05,15.05,0,0,1,580.56,280ZM546.68,269.3H559q4.8,0,7.39-2.16A7.62,7.62,0,0,0,569,261a7.78,7.78,0,0,0-2.59-6.24q-2.6-2.21-7.39-2.2H546.68Zm21.16,26.1a8,8,0,0,0,2.74-6.52,8.41,8.41,0,0,0-2.88-6.77,11.61,11.61,0,0,0-7.77-2.45H546.68v18h13.53C563.48,297.7,566,296.94,567.84,295.4Z" /><path class="cls-3" d="M608.39,237.63v71H595v-71Z" /><path class="cls-3" d="M622.54,246.89a7.87,7.87,0,0,1,0-11.22,8.83,8.83,0,0,1,11.8,0,7.87,7.87,0,0,1,0,11.22,8.83,8.83,0,0,1-11.8,0Zm12.52,8.59v53.16H621.63V255.48Z" /><path class="cls-3" d="M693.12,260.71q5.85,6,5.85,16.75v31.18H685.54V279.28q0-6.33-3.17-9.74a11.22,11.22,0,0,0-8.63-3.41,11.48,11.48,0,0,0-8.78,3.41q-3.23,3.4-3.22,9.74v29.36H648.31V255.48h13.43v6.62a18.58,18.58,0,0,1,6.86-5.42,21.29,21.29,0,0,1,9.17-2Q687.27,254.71,693.12,260.71Z" /><path class="cls-3" d="M711.5,267.57a23.19,23.19,0,0,1,21.15-12.95,22.65,22.65,0,0,1,9.89,2.25,19.86,19.86,0,0,1,7.48,6V237.63h13.63v71H750v-7.86a18.24,18.24,0,0,1-7,6.33,22,22,0,0,1-10.46,2.4,22.74,22.74,0,0,1-12.28-3.46,24,24,0,0,1-8.78-9.74,31.18,31.18,0,0,1-3.22-14.44A30.71,30.71,0,0,1,711.5,267.57Zm36.7,6.1a13.57,13.57,0,0,0-5.18-5.38,13.94,13.94,0,0,0-7-1.87,13.46,13.46,0,0,0-12,7.15,16.71,16.71,0,0,0-2,8.3,17.26,17.26,0,0,0,2,8.4,14.17,14.17,0,0,0,5.18,5.52A13.14,13.14,0,0,0,736,297.7a13.84,13.84,0,0,0,7-1.87,13.47,13.47,0,0,0,5.18-5.37,19.31,19.31,0,0,0,0-16.79Z" /><path class="cls-3" d="M846.27,261.82a15.75,15.75,0,0,0-6.33-6.43,19.33,19.33,0,0,0-9.41-2.21A20.54,20.54,0,0,0,820,255.87a18.6,18.6,0,0,0-7.2,7.67,27.1,27.1,0,0,0,.05,23.23,18.67,18.67,0,0,0,7.34,7.67,21.66,21.66,0,0,0,10.94,2.69q7.68,0,12.57-4.08a19.52,19.52,0,0,0,6.43-11.37h-23V271.41h36.27v11.71a31.38,31.38,0,0,1-5.76,12.95,32.44,32.44,0,0,1-11.37,9.55,33.41,33.41,0,0,1-15.59,3.6,35.19,35.19,0,0,1-17.51-4.37,31.72,31.72,0,0,1-12.29-12.14,37.27,37.27,0,0,1,0-35.36,31.69,31.69,0,0,1,12.29-12.18,37.36,37.36,0,0,1,37.08,1.15,28.15,28.15,0,0,1,11.52,15.5Z" /><path class="cls-3" d="M873.09,267.57a23.57,23.57,0,0,1,8.73-9.59,23.25,23.25,0,0,1,12.33-3.36,21.69,21.69,0,0,1,10.42,2.4,21.27,21.27,0,0,1,7.15,6v-7.58h13.53v53.16H911.72v-7.77a20,20,0,0,1-7.15,6.19,21.92,21.92,0,0,1-10.51,2.45,22.55,22.55,0,0,1-12.24-3.46,24.12,24.12,0,0,1-8.73-9.74,31.3,31.3,0,0,1-3.21-14.44A30.83,30.83,0,0,1,873.09,267.57Zm36.71,6.1a13.59,13.59,0,0,0-5.19-5.38,13.9,13.9,0,0,0-7-1.87,13.65,13.65,0,0,0-6.91,1.82,13.8,13.8,0,0,0-5.13,5.33,16.6,16.6,0,0,0-2,8.3,17.15,17.15,0,0,0,2,8.4,14.1,14.1,0,0,0,5.18,5.52,13.14,13.14,0,0,0,6.86,1.91,13.8,13.8,0,0,0,7-1.87,13.5,13.5,0,0,0,5.19-5.37,19.31,19.31,0,0,0,0-16.79Z" /><path class="cls-3" d="M951.83,237.63v71H938.39v-71Z" /><path class="cls-3" d="M978.5,237.63v71H965.07v-71Z" /><path class="cls-3" d="M1040.78,286.09h-38.86a13.19,13.19,0,0,0,4,9,12.4,12.4,0,0,0,8.73,3.27q7.49,0,10.65-6.43h14.49a24.21,24.21,0,0,1-8.83,12.62q-6.52,4.94-16,4.94a27.73,27.73,0,0,1-13.77-3.41,23.9,23.9,0,0,1-9.5-9.64,29.58,29.58,0,0,1-3.41-14.4,30.1,30.1,0,0,1,3.36-14.49,23.47,23.47,0,0,1,9.4-9.59,30.22,30.22,0,0,1,27.5-.1,23,23,0,0,1,9.3,9.26,28,28,0,0,1,3.32,13.77A31.14,31.14,0,0,1,1040.78,286.09Zm-13.53-9a10.65,10.65,0,0,0-3.74-8.3,13.27,13.27,0,0,0-8.93-3.12,12.17,12.17,0,0,0-8.39,3,13.27,13.27,0,0,0-4.18,8.39Z" /><path class="cls-3" d="M1071.15,257.11a18.82,18.82,0,0,1,9.55-2.4v14.11h-3.55q-6.33,0-9.55,3t-3.21,10.36v26.48H1051V255.48h13.44v8.25A18.88,18.88,0,0,1,1071.15,257.11Z" /><path class="cls-3" d="M1140.58,255.48l-32.92,78.31h-14.29l11.51-26.49-21.3-51.82h15.06l13.73,37.14,13.91-37.14Z" /></g></g></g></svg>
            <p class="text-secondary mt-2 mb-0" style="font-size: small;">
              © 2023 Blind Gallery Academy. All rights reserved.
            </p>
            <div class="d-flex align-items-center">
              <p class="text-secondary m-0" style="font-size: small;">
                Powered by
              </p>
              <img class="ml-2" src="/logos/tezos.png" width="55px" alt="tezos">
            </div>
          </b-col>
          <b-col lg="auto" class=" d-none d-lg-block" style="border-left: 1px solid rgb(0 0 0 / 10%); height: 150px;" />
          <b-col cols="12" lg="4">
            <p class="m-0" style="font-weight: 600; font-size: 18px;">
              Do you need help?
            </p>
            <p class="small">
              We are here to answer your questions, join our discord and ask anything!
            </p>
            <div>
              <button class="primary-btn small">
                <a style="color:#ffff; text-decoration: none;" href="https://discord.gg/zxxZv6HUfr" target="_blank">
                  Join our Discord
                </a>
              </button>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
import { dappClient } from '~/services/tezos'

export default {
  data () {
    return {
      isWalletFlow: false,
      show: true,
      invalidMessage: '',
      successMessage: '',
      signInForm: {},
      recoverPasswordForm: {},
      signUpForm: {},
      walletForm: {},
      educatorsForm: {}
    }
  },
  mounted () {
    this.$root.$on('bv::modal::show', (bvEvent, signup) => {
      this.onReset(bvEvent, signup)
    })
  },
  methods: {

    sendEducatorForm () {
      try {
        this.$axios.$post('/emails/become-an-instructor', this.educatorsForm)
        this.$bvModal.hide('educators')
        this.$refs.alert.showAlert('Successful application')
      } catch (error) {
        console.error(error)
      }
      console.info(`Send this form ${this.educatorsForm}`)
    },
    async doEmailSignUp () {
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

    doRecover () {
      this.successMessage = 'We have send you an email to recover your password!'
    },

    async getWalletAccessData () {
      const { connectAccount, requestLoginSignPayload } = dappClient()
      const wallet = await connectAccount()
      if (!wallet.success) {
        console.error('Wallet not connected')
      }
      const { publicKey, wallet: tezosAddress, signedPayload: signedMessage, payload } = await requestLoginSignPayload()
      const data = {
        ...this.walletForm,
        publicKey,
        wallet: tezosAddress,
        signedMessage,
        payload
      }
      return data
    },
    async doSignUpWallet () {
      const data = await this.getWalletAccessData()
      await this.$axios.$post('users', data)
      await this.$auth.loginWith('local', {
        data
      })

      const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
      const { connected: isWalletConnected } = await checkIfWalletIsConnected()

      if (isWalletConnected && !this.$auth.loggedIn) {
        await disconnectWallet()
      }

      this.$bvModal.hide('signup')
    },

    doGoogleConnect () {
      this.$auth.loginWith('google')
    },

    async doLogout () {
      const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
      const { connected: isWalletConnected } = await checkIfWalletIsConnected()
      if (isWalletConnected) {
        await disconnectWallet()
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
      try {
        const data = await this.getWalletAccessData()
        await this.$auth.loginWith('local', {
          data
        })
        const { disconnectWallet, checkIfWalletIsConnected } = dappClient()
        const { connected: isWalletConnected } = await checkIfWalletIsConnected()
        if (isWalletConnected && !this.$auth.loggedIn) {
          await disconnectWallet()
        }

        this.$bvModal.hide('signin')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.invalidMessage = "This user doesn't exist. Please sign up and create an account first."
        }
      }
    },

    onReset () {
      this.signInForm = {}
      this.signUpForm = {}

      this.invalidMessage = ''
      this.successMessage = ''

      this.isWalletFlow = false
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
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
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
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
  border: 1px solid #00b9cd;
  color: #fff;
  padding: 0.5rem 1.25rem;
  transition: all 0.3s;

}

.primary-btn:hover {
  background-color: #009cad;
  border: 1px solid #009cad;
}

.secondary-btn {
  border: 1px solid #00b9cd;
  border-radius: 5px;
  color: #00b9cd;

  background-color: #fff;
  padding: 0.5rem 1.25rem;
  transition: all 0.3s;

}

.secondary-btn:hover {
  background-color: #f7f7f7;
}

.secondary-btn-black {
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
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

@media (max-width:425px){
 .main-menu .nav-item, .main-menu .nav-item .primary-btn, .nav-item .secondary-btn{
    width: 100%;
  }
  }
</style>
