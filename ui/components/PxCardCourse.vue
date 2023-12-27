<template>
  <div>
    <div class="card-container shadow-sm rounded border">
      <div class="card-data p-4">
        <div class="d-flex align-items-center mb-2">
          <b-avatar style="border: 1px solid #fff;" :src="pfp" size="2rem" class="mr-2" /><span class="small">{{ instructor }}</span>
        </div>
        <div>
          <h5>{{ title }}</h5>
          <p class="small formatted-card-description" style="max-width: 100%;">
            {{ description }}
          </p>
        </div>
        <div class="d-flex align-items-center">
          <NuxtLink :to="url">
            <button class="mr-3 secondary-btn-black">
              View course
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="layer" />
      <div class="background-img">
        <img :src="cover" alt="cover">
      </div>
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
    },
    url: {
      type: String,
      required: true
    },

    isProgress: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
  <style>
  .card-container{
     height: 340px;
     position: relative;
     overflow: hidden;
  }

  .card-data{
      color:#fff;
      z-index: 3;
      position: absolute;
      bottom: 0;
  }
  .layer{
      background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      height: 100%;
      opacity: 0.8;
      z-index: 2;
      position: absolute;
  }

  .background-img{
      height: 100%;
      width: 100%;
      position: absolute;
      z-index:1;
  }

  .formatted-card-description{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

}

  </style>
