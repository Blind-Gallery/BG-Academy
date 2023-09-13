<template>
  <div>
    <div :id="playerId" data-vimeo-autoplay="true" :data-vimeo-id="id" data-vimeo-width="900" />
  </div>
</template>
<script>
import Player from '@vimeo/player'
import { gql } from 'graphql-tag'

export default {
  name: 'PxPlayer',
  apollo: {
    chapters: {
      query: gql`query($id: uuid = "") {
      chapters(where: {previous_chapter_id: {_eq: $id}}) {
        id
      }
    }
  `,
      variables () {
        return {
          id: this.chapterId
        }
      }
    }
  },
  props: {
    chapterId: {
      type: String,
      required: true
    },
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
