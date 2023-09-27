<template>
  <NuxtLink class="course-route" style="text-decoration: none;" :to="'/courseNavigator/chapter/' + chapter.id">
    <div :class="$route.path === ('/courseNavigator/chapter/' + chapter.id) ? 'chapter-container_selected' : 'chapter-container'">
      <Icon
        class="progress-circle"
        icon="material-symbols:lens-outline"
        color="#00b9cd"
        width="1rem"
      />
      <div class="d-flex align-items-center">
        <p style="font-size: small;" class="m-0 text-secondary">
          {{ chapter.title }}<br>
        </p>
        <Icon
          v-b-tooltip.hover
          title="Video"
          icon="material-symbols:smart-display-outline"
          color="#00b9cd"
          width="1rem"
          class="ml-2"
        />
      </div>
      <p style="font-size: small" class="m-0 text-secondary">
        5min.<br>
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    chapter: {
      type: Object,
      required: true
    }
  }
}
</script>
