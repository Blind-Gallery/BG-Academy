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
import { gql } from 'graphql-tag'
const GET_CHAPTER_QUERY = gql`
query($id: uuid!) {
  chapters(where: {previous_chapter_id: {_eq: $id}}) {
    id
  }
}`

export default {
  name: 'PxPlayer',
  props: {
    chapterId: {
      type: String,
      required: true
    },
    videoId: {
      type: String,
      default: '862461136',
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
      this.updateUserInfo()
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
      this.updateUserInfo()
    },
    updatePlayer (newVideoId) {
      if (!this.player) {
        this.initPlayer()
        return
      }
      this.player.loadVideo(newVideoId).then(() => {
        this.player.play()
      })
    },
    async updateUserInfo () {
      if (!this.chapterId) { return }
      console.info(this.chapterId)
      try {
        const { data } = await this.$apollo.query({
          query: GET_CHAPTER_QUERY,
          variables: {
            id: this.chapterId
          }
        })
        console.info(data)
        console.info(this.$auth.user.id)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style>

</style>
