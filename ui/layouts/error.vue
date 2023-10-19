<template>
  <div>
    <b-container class="d-flex justify-content-center" style="height: 83vh;">
      <div class="d-flex align-items-center justify-content-center flex-column">
        <div v-if="error.statusCode === 404" class="d-flex align-items-center justify-content-center flex-column">
          <img
            src="https://cdn.discordapp.com/attachments/987378128106168403/1143653976018010252/Error_404_1.png"
            width="400px"
          >
          <h2 class="text-center mt-4">
            We can't find <br> the page you're looking for.
          </h2>
        </div>
        <div v-else>
          <h1>
            An error occurred
          </h1>
        </div>
        <NuxtLink to="/">
          <button class="primary-btn mt-4" @click="reloadPage">
            Home page
          </button>
        </NuxtLink>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  methods: {
    reloadPage () {
      if (this.$route.path === '/') {
        window.location.reload()
      }
    }
  }
}
</script>
