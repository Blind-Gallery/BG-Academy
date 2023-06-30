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
              >Welcome Back! <Icon name="uil:github" color="black" />
            </template>
          </b-modal>
        </div>
      </header>
      <Nuxt />
      <div></div>
    </b-container>
  </div>
</template>

<script>
export default {
  head: {
    title: "Blind Gallery Academy",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "my website description",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
        rel: "stylesheet",
      },
    ],
  },
};
</script>

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
