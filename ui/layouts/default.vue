<template>
  <div>
    <b-container fluid>
      <header>
        <div class="header-container">
          <img
            src="https://cdn.discordapp.com/attachments/987378128106168403/1124375028356616262/Recurso_20-8.png"
            width="180px"
          />
          <div class="d-flex" style="gap: 1rem">
            <button class="tertiary-btn">Sign In</button
            ><button class="primary-btn" v-b-modal.signup>Sign Up</button>
          </div>
          <!--MODAL-->
          <b-modal id="signup" centered hidden-header>
            <template #modal-header="{ close }"
              >Welcome Back!
              <span style="cursor: pointer" @click="close()"
                ><Icon width="32" color="#888" icon="material-symbols:close"
              /></span>
            </template>
          </b-modal>
        </div>
      </header>
      <Nuxt />
      <div></div>
    </b-container>
  </div>
</template>

<script></script>

<style>
body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
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
  padding: 0.25rem 1rem;
  transition: all 0.3s;
}

.primary-btn:hover {
  background-color: #009cad;
}

.tertiary-btn {
  background-color: transparent;
  border: none;
  color: #888888;
}
</style>
