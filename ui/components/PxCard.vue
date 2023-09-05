<template>
  <div>
    <div class="card  shadow-sm mb-4">
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
        <div class="d-flex mb-2 align-items-center" style="gap:0.6rem">
          <h6 class="card-title m-0">
            {{ title }}
          </h6>
        </div>
        <p class="card-text small text-secondary">
          {{ description }}
        </p>
        <div v-if="isProgress">
          <b-progress class="mb-2" height="5px" :value="value" />
          <div class="d-flex justify-content-between">
            <p style="font-weight: 600;" class="small m-0">
              Progress
            </p><p class="small m-0">
              {{ value }}%
            </p>
          </div>
        </div>
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

    isProgress: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      value: 45,
      max: 100
    }
  },
  methods: {

  }

}
</script>
<style>
.card{
  border: none;
  transition: ease all 0.3s;
}

.card:hover{
  cursor: pointer;
  transform: scale(1.01);
}

.card-img-top{
  max-height: 280px;
  object-fit: cover;
}

.certificate-container{
  background-color: #fff;
  height: 790px;
}
.certificate-container p{
  font-size: 18px;
}

</style>
