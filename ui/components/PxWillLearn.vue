<template>
  <div class="d-flex flex-column shadow-sm rounded p-3">
    <Icon icon="material-symbols:check-small" color="#00c851" width="32" />
    <p class="m-0" style="font-weight: 600;">
      {{ title }}
    </p>
    <p class="small">
      {{ description }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: 'Description'
    }

  }

}
</script>
