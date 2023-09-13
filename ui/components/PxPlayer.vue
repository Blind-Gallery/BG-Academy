<template>
  <div
    :id="playerId"
    data-vimeo-autoplay="true"
    :data-vimeo-id="videoId"
    :data-vimeo-width="width"
    data-vimeo-responsive="1"
  />
</template>
<script>
import Player from '@vimeo/player'
// import { gql } from 'graphql-tag'

export default {
  name: 'PxPlayer',
  // apollo: {
  //   chapters: {
  //     query: gql`query($id: uuid!) {
  //     chapters(where: {previous_chapter_id: {_eq: $id}}) {
  //       id
  //     }
  //   }
  // `,
  //     variables () {
  //       return {
  //         id: this.chapterId
  //       }
  //     }
  //   }
  // },
  props: {
    chapterId: {
      type: String,
      required: true
    },
    videoId: {
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
    videoId: function (newVal) {
      console.warn('newVal', newVal)
      this.updatePlayer(newVal)
    }
  },
  mounted () {
    if (this.videoId) {
      this.initPlayer()
    }
  },
  methods: {
    initPlayer () {
      this.player = new Player(this.playerId)
      this.player.setColors(['#000', '#00b9cd', '#fff', '#00b9cd'])
    },
    updatePlayer (newVideoId) {
      if (!this.player) {
        this.initPlayer()
        return
      }
      this.player.loadVideo(newVideoId).then(() => {
        this.player.play()
      })
    }
  }
}
</script>
<style>

</style>
