<template>
  <div>
    <div v-if="$auth.loggedIn">
      <landing-profile-section />
      <landing-user-courses />
      <landing-our-latest-courses />
      <landing-upcoming-courses />
    </div>

    <div v-else>
      <landing-course-carrousel />
      <landing-upcoming-courses />
      <landing-product-section />
      <landing-community-feedback />
      <landing-frequently-questions />
    </div>
  </div>
</template>

<script>

</script>
