<template>
  <div>
    <div id="player" :data-vimeo-id="id" data-vimeo-width="900" />
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
      ended: false
    }
  },
  watch: {
    ended: {
      handler (newVal, oldVal) {
        console.info('ended', newVal)
        console.info('chapters', this.chapters)
        console.info('chapterId', this.chapterId)
        console.info('user', this.$auth.user.id)
        this.doUpdateUserInfo()
      }
    },
    chapters: {
      handler (newVal, oldVal) {
        console.info('chapters', newVal)
        console.info('chapterId', this.chapterId)
        console.info('user', this.$auth.user.id)
        this.doUpdateUserInfo()
      },
      deep: true
    }
  },
  mounted () {
    this.doUpdateUserInfo()
    this.player = new Player('player', {
      badge: 0
    })

    this.player.setColors(['#000', '#00b9cd', '#fff', '#00b9cd'])

    this.player.on('ended', function (_event) {
      this.ended = true
      console.info(_event)
      console.info('ended')
      console.info('chapters', this.chapters)
      console.info('chapterId', this.chapterId)
      console.info('user', this.$auth.user.id)
      this.doUpdateUserInfo()
    })
  },
  methods: {
    doUpdateUserInfo () {
      console.info(this.chapterId)
      console.info(this.$auth.user.id)
    }

  }
}
</script>
<style></style>
