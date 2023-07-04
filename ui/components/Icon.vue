<template>
  <Icon :icon="icon" :width="width" :color="color" />
</template>

<script>
import { Icon } from '@iconify/vue2'

export default {
  name: 'IconItem',
  components: {

    Icon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '1em' // Tamaño por defecto
    },
    color: {
      type: String,
      default: 'currentColor' // Color por defecto
    }

  }
}
</script>
