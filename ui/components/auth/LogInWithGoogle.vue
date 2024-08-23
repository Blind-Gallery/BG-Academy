<script>
export default {
  methods: {
    doGoogleConnect () {
      this.$auth.loginWith('google')
    }
  }
}
</script>

<template>
  <div>
    Google
  </div>
</template>
