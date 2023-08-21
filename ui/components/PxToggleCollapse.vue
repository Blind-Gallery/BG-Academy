<template>
  <div>
    <div style="cursor:pointer" class="d-flex w-100 justify-content-between align-items-center p-3 " @click="doToggleCollapse()">
      <div class="d-flex flex-column mr-2">
        <h6 :style="smallFont ? 'font-size:0.875em':''" class="m-0">
          {{ toggleName }}
        </h6>
        <div>
          <p class="m-0 small text-secondary">
            {{ subtitleName }}
          </p>
        </div>
      </div>
      <div>
        <Icon :width="iconWidth" :icon="toggleCollapse ?'material-symbols:keyboard-arrow-up':'material-symbols:keyboard-arrow-down'" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    toggleName: {
      type: String,
      required: true,
      default: 'Toggle collapse'
    },

    subtitleName: {
      type: String,
      required: false,
      default: ''
    },
    iconWidth: {
      type: String,
      required: false,
      default: '16px'
    },

    smallFont: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      toggleCollapse: false
    }
  },
  methods: {
    doToggleCollapse () {
      this.toggleCollapse = !this.toggleCollapse
    }
  }
}
</script>
<style scoped>

button{
  background-color: transparent;
  border: none;
  padding:0;
  font-weight: 600;
}
</style>
