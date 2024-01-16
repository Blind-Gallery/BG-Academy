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
  methods: {
    async getCertificate () {
      const { cid } = await this.$axios.$post('/docs/certificate', {
        userId: this.$auth.user.id,
        courseId: this.courseId
      })
      console.info(cid)
    }
  }
}
</script>
