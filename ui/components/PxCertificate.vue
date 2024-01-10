<template>
  <div>
    <div class="shadow-sm mb-4">
      <div class="card-body d-flex align-items-center">
        <div class="mr-4 w-25">
          <img width="100%" class="rounded" :src="cover">
        </div>
        <div class="d-flex flex-column w-75">
          <div class="d-flex" style="gap:0.5rem">
            <h6 style="font-weight: 600;" class="card-title m-0">
              {{ title }}
            </h6>
            <Icon
              v-b-tooltip.hover
              title="Course certificate"
              color="#00b9cd"
              icon="material-symbols:verified-outline"
              width="1.25rem"
            />
          </div>
          <p class="text-secondary small">
            Instructed by {{ instructor }}
          </p>
          <PxToggleCollapse v-b-toggle.collapse-2 class="mb-2" icon-width="24px" toggle-name="Properties" :padding="false" />
          <b-collapse id="collapse-2" style="font-size: small;">
            <p class="m-0   text-secondary">
              Minted: {{ mintedDate }}
            </p>

            <p class="m-0   text-secondary">
              Chain: Tezos
            </p>

            <p class="m-0 text-secondary">
              Transaction: <a :href="transactionURL" target="_blank">
                {{ transaction }}
              </a>
            </p>
          </b-collapse>

          <button class="primary-btn mt-2" style="font-size: small;">
            Download certificate
          </button>
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
    instructor: {
      type: String,
      required: true
    },
    student: {
      type: String,
      required: true
    },
    mintedDate: {
      type: String,
      required: true
    },
    transaction: {
      type: String,
      required: true
    },
    transactionURL: {
      type: String,
      required: true
    }

  },
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>
<style></style>
