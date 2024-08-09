<template>
  <a
    class="primary-btn"
    style="text-decoration: none; color: #fff; text-align: center;"
    :href="url"
    target="_blank"
    download
  >Download certificate</a>
</template>

<script>
export default {
  props: {
    courseId: {
      type: String,
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
