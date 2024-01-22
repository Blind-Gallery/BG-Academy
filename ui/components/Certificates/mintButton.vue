<template>
  <div>
    <button
      v-show="$auth?.user?.tezos_info"
      class="secondary-btn"
      @click="getCertificate"
    >
      <div v-if="loading" class="d-flex align-items-center">
        <span>Claiming</span> <Icon class="ml-2" icon="eos-icons:bubble-loading" width="1rem" />
      </div>
      <div v-else>
        Claim certificate
      </div>
    </button>
    <PxAlert ref="alert" />
  </div>
</template>

<script>

import PxAlert from '../PxAlert.vue'
export default {
  components: {
    PxAlert
  },
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
      this.$refs.alert.showAlert('Success', 'You have successfully acquired your certificate')
      this.loading = false
      console.info(status, opHash)
    }
  }
}
</script>
