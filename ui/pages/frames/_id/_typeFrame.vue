<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="htmlContent" />
</template>

<script>
export default {
  layout: 'empty',
  // eslint-disable-next-line space-before-function-paren
  async asyncData({ params }) {
    const typeFrame = params?.typeFrame ?? 'academy-quiz'
    const res = await fetch(
      `https://frame-academy-dot-curious-domain-369714.uc.r.appspot.com/${typeFrame}/${params.id}`
    ).then(res => res.text())
    return { htmlContent: res }
  },
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      htmlContent: ''
    }
  }

}
</script>
