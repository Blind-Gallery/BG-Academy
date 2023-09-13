<template>
  <div
    :id="playerId"
    data-vimeo-autoplay="true"
    :data-vimeo-id="id"
    :data-vimeo-width="width"
    data-vimeo-responsive="1"
  />
</template>
<script>
import Player from '@vimeo/player'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true,
      default: '100%'
    }
  },
  data () {
    return {
      player: null,
      playerId: 'vimeo-player'
    }
  },
  watch: {
    id: function (newVal) {
      this.updatePlayer(newVal)
    }
  },
  mounted () {
    this.initPlayer()
  },
  methods: {
    initPlayer () {
      this.player = new Player(this.playerId)

      this.player.setColors(['#000', '#00b9cd', '#fff', '#00b9cd'])
    },
    updatePlayer (newVideoId) {
      this.player.loadVideo(newVideoId).then(() => {
        this.player.play()
      })
    }
  }
}
</script>
<style>

</style>
