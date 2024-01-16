<template>
  <button
    v-show="$auth?.user?.tezos_info"
    class="secondary-btn"
    @click="getCertificate"
  >
    Claim certificate
  </button>
</template>

<script>
export default {
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      url: null
    }
  },
  methods: {
    async getCertificate () {
      if (this.loading) { return }
      this.loading = true
      const { status, opHash } = await this.$axios.$post('/docs/mint', {
        userId: this.$auth.user.id,
        courseId: this.courseId
      })
      console.info(status, opHash)
    }
  }
}
</script>
