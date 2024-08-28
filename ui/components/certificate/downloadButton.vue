<template>
  <a
    class="tw-flex tw-border tw-gap-1 tw-border-cyan-500 tw-items-center tw-justify-center tw-text-sm tw-text-white tw-bg-cyan-500 tw-rounded tw-py-2 tw-px-6 hover:tw-bg-cyan-600 hover:tw-border-cyan-600 tw-ease-in-out tw-duration-200"
    style="text-decoration: none; color: #fff; text-align: center;"
    :href="url"
    target="_blank"
    download
  >
    Download certificate
  </a>
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
      this.url = url
      this.$forceUpdate()
    }
  }
}
</script>
