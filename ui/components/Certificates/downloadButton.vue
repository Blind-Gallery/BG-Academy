<template>
  <a
    class="primary-btn"
    :href="url"
    download
  >Download certificate</a>
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
  created () {
    this.getCertificate()
  },
  methods: {
    async getCertificate () {
      if (this.loading) { return }
      this.loading = true
      const { cid } = await this.$axios.$post('/docs/certificate', {
        userId: this.$auth.user.id,
        courseId: this.courseId
      })

      const url = `https://blind-gallery.infura-ipfs.io/ipfs/${cid}`
      console.info(url)
      this.url = url
      this.$forceUpdate()
    }
  }
}
</script>
