<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p class="m-0">
        {{ successMsg }}
      </p>
    </b-alert>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      successMsg: ''
    }
  },

  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert (successMsg) {
      this.dismissCountDown = this.dismissSecs
      this.successMsg = successMsg
    }
  }
}
</script>
<style>
.alert{
    position:fixed;
    bottom: 0;
    right:0;
    z-index: 2;
}
</style>
