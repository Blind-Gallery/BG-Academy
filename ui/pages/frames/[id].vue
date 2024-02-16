<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="htmlContent" />
</template>
<script setup>
definePageMeta({
  layout: false,
});
const route = useRoute();

const asyncData = async () => {
  const data = await fetch(
    `https://frame-academy-dot-curious-domain-369714.uc.r.appspot.com/academy-quiz/${route.params.id}`
  ).then((res) => res.text());
  return data;
};
const htmlContent = ref("");
const data = await asyncData();
htmlContent.value = data;
</script>
