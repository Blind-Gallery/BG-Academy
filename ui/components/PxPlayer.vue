<template>
  <div>
    <div :id="playerId" data-vimeo-autoplay="true" :data-vimeo-id="id" data-vimeo-width="900" />
  </div>
</template>
<script>
import Player from '@vimeo/player'

export default {
  props: {
    id: {
      type: String,
      required: true
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
<style></style>
