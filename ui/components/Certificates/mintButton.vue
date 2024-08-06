<template>
  <button
    v-show="$auth?.user?.tezos_info"
    class="secondary-btn"
    :disabled="loading"
    @click="getCertificate"
  >
    <span v-if="loading">Claiming Certificate...</span>
    <span v-else>Claim certificate</span>
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
      try {
        this.loading = true
        const { status, opHash } = await this.$axios.$post('/docs/mint', {
          userId: this.$auth.user.id,
          courseId: this.courseId
        })
        console.info(status, opHash)
      } catch (e) {
        console.error(e)
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
