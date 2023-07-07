<template>
  <div class="card mb-4">
    <div class="card-body">
      <img
        :src="cover"
        class="card-img-top mb-3"
        alt="Preview"
      >
      <div class="d-flex align-items-center" style="gap:0.5rem">
        <b-avatar size="2rem" :src="pfp" />
        <div class="d-flex flex-column">
          <p class="m-0 small">
            Instructor
          </p><p class="m-0 small" style="margin: 0; color:black">
            {{ instructor }}
          </p>
        </div>
      </div>
      <hr>
      <h6 class="card-title">
        {{ title }}
      </h6>
      <p class="card-text" style="font-size: small;">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    cover: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    pfp: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    }
  }
}
</script>
<style>
.card-img-top{
  max-height: 280px;
  object-fit: cover;
}
</style>
