<template>
  <div>
    <div class="card shadow-sm mb-4">
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
          <Icon
            v-if="isCertificate"
            v-b-tooltip.hover
            title="Course certificate"
            color="#00b9cd"
            icon="material-symbols:verified-outline"
            width="1.25rem"
          />
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

        <div v-if="isCertificate">
          <div class="mb-2">
            <PxToggleCollapse v-b-toggle.collapse-2 icon-width="24px" toggle-name="Properties" :padding="false" />
            <b-collapse id="collapse-2">
              <p class="m-0 small text-secondary">
                Minted: 24/07/2023
              </p>

              <p class="m-0 small text-secondary">
                Chain: Tezos
              </p>

              <p class="m-0 small text-secondary">
                Transaction: <a href="https://tzkt.io/ooRhdcXTPCoYcAp33sRA3R1d5YFbbWXQDSVczTKjL3a8NJVYDAM/64307659/1" target="_blank">
                  ooRhd...VYDAM
                </a>
              </p>
            </b-collapse>
          </div>

          <button style="font-size: small;" class="primary-btn w-100" @click="generateCertificate()">
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
                Digital Objects Advanced
              </h1>
              <p class="m-0">
                Awarded to
              </p>
              <h1 class="mb-3">
                David Muñoz Guzmán
              </h1>
              <p>
                For having successfully completed the 12-hour <br>course in our online course platform.
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex flex-column">
                <p class="m-0">
                  Properties:
                </p>
                <p class="m-0 text-secondary" style="font-size: small;">
                  Minted: Jul 19, 2023<br>
                  Chain: Tezos<br>
                  Transaction: ooRhd...VYDAM
                </p>
              </div>

              <div class="d-flex flex-column align-items-center ">
                <img src="https://cdn.discordapp.com/attachments/987378128106168403/1130868334494228551/pngwing.com.png" width="110px" alt="firma">
                <div style="width:100%; margin:0.2rem 0rem; border-bottom:1px solid #6c757d3b; z-index: 2;" />
                <p class="m-0" style="font-size: small;">
                  Course instructor
                </p>
                <p class="m-0 ">
                  Hugo Santana
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
    isCertificate: {
      type: Boolean,
      required: false,
      default: false
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

    generateCertificate () {
      this.$refs.html2Pdf.generatePdf()
    }
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
  transform: scale(1.02);
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
