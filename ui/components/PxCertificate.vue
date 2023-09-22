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

          <button class="primary-btn mt-2" style="font-size: small;" @click="generateCertificate()">
            Download certificate
          </button>
        </div>
      </div>
    </div>

    <client-only>
      <vue-html2pdf
        ref="html2Pdf"
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1200"
        filename="certificate"
        :pdf-quality="5"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
      >
        <section slot="pdf-content">
          <div ref="certificateContainer" class="d-flex flex-column justify-content-between p-5 certificate-container" style="gap:4rem">
            <div class="w-100">
              <img
                src="~/assets/academy-logo.png"
                alt="logo"
                width="250px"
              >
            </div>
            <div class="w-100">
              <p class="m-0">
                Course certificate
              </p>
              <h1 class="mb-3 font-weight-bold" style="color:#00B9CD">
                {{ title }}
              </h1>
              <p class="m-0">
                Awarded to
              </p>
              <h1 class="mb-3">
                {{ student }}
              </h1>
              <p>
                For having successfully completed the Introduction to digital objects<br>course in our platform.
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex flex-column align-items-center ">
                <img src="https://cdn.discordapp.com/attachments/987378128106168403/1130868334494228551/pngwing.com.png" width="110px" alt="firma">
                <div style="width:100%; margin:0.2rem 0rem; border-bottom:1px solid #6c757d3b; z-index: 2;" />
                <p class="m-0" style="font-size: small;">
                  Course instructor
                </p>
                <p class="m-0 ">
                  {{ instructor }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </client-only>
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

    generateCertificate () {
      this.$refs.html2Pdf.generatePdf()
    }
  }

}
</script>
<style></style>
