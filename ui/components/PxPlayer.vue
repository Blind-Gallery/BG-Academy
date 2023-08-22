<template>
  <div>
    <div id="player" data-vimeo-id="855016876" data-vimeo-width="900" />
  </div>
</template>
<script>
import Player from '@vimeo/player'
export default {
  data () {
    return {
      player: null
    }
  },
  mounted () {
    this.player = new Player('player', {
      badge: 0
    })

    this.player.setColors(['#000', '#00b9cd', '#fff', '#00b9cd'])
  },
  methods: {

  }
}
</script>
<style></style>
