<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      class="alert"
      :class="statusColor"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <div class="w-100 d-flex">
        <div>
          <Icon
            :icon="statusIcon"
            width="22"
            class="mr-2"
          />
        </div>
        <div class="d-flex flex-column">
          <p style="font-weight: 600;" class="m-0">
            {{ status }}
          </p>
          <span class="m-0 small">
            {{ message }}
          </span>
        </div>
      </div>
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
      message: '',
      status: '',
      statusColor: '',
      statusIcon: ''
    }
  },

  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert (status, message) {
      this.dismissCountDown = this.dismissSecs
      this.message = message
      this.status = status

      const statusColors = {
        Error: 'error-alert',
        Warning: 'warning-alert',
        Info: 'info-alert',
        Success: 'success-alert'
      }

      const statusIcon = {
        Error: 'material-symbols:info-outline-rounded',
        Warning: 'material-symbols:warning-outline-rounded',
        Info: 'material-symbols:info-outline-rounded',
        Success: 'material-symbols:check-circle-outline-rounded'
      }

      this.statusColor = statusColors[status] || 'info-alert'
      this.statusIcon = statusIcon[status] || 'info-alert'
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
    color: #ffff;
    border: none;
    margin: 1rem;

}

.info-alert{
  background-color:#0282cd;
}

.success-alert{
  background-color:#3ed082;
}

.warning-alert{
  background-color:#f5b501;
}

.error-alert{
  background-color:#ef4114;
}
</style>
