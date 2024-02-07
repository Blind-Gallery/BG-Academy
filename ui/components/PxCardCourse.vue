<template>
  <div>
    <div class="card-container shadow-sm rounded border position-relative mb-4">
      <div v-if="comingSoon" class=" coming-soon">
        <span class="small " style="color: #00b9cd;"><b>Coming soon</b></span>
      </div>
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
        <div v-if="!comingSoon" class="d-flex align-items-center">
          <NuxtLink :to="url">
            <button class="mr-3 secondary-btn-black">
              View course
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="layer" />
      <div class="background-img">
        <img class="w-100" :src="cover" alt="cover">
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

    comingSoon: {
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

.coming-soon{
  z-index: 5;
  background-color: #fff;
  right: 0; padding: 0.5rem;
  border-radius: 0px 0px 0px 10px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

  </style>
