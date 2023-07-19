<template>
  <div>
    <div class="d-flex align-items-center border rounded p-3">
      <div>
        <img
          src="https://cdn.discordapp.com/attachments/995431544019755070/1124596257181151243/Hardie_code_art_black_and_white_tile_texture_flat_graphic_Vecto_a0f35d65-195d-4352-a8e9-d6027bab4554.png"
          width="150px"
          class="mr-4 rounded"
        >
      </div>
      <div class="d-flex flex-column">
        <div class="d-flex align-items-center mb-2" style="gap:0.6rem">
          <h4 class="m-0">
            Digital Objects Advanced
          </h4><Icon v-b-tooltip.hover title="Course certified" color="#00b9cd" icon="material-symbols:verified-outline" width="1.25rem" />
        </div>
        <p class="small">
          Great job, you have successfully completed this course! You now have access to an exclusive Blind Gallery Academy certificate.
        </p>
        <button style="font-size: small;" class="primary-btn" @click="generateCertificate()">
          Download certificate
        </button>
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
          <div class="d-flex flex-column justify-content-between p-5 certificate-container" style="gap:4rem">
            <div class="w-100">
              <img
                src="~/assets/AcademyLogo.png"
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
            <div class="d-flex justify-content-between align-items-center">
              <p>Approved on 07/17/2023</p>
              <div class="d-flex flex-column align-items-center position-relative">
                <img class="position-absolute" style="top:-55px;  " src="https://cdn.discordapp.com/attachments/987378128106168403/1130868334494228551/pngwing.com.png" width="110px" alt="firma">
                <div style="width:100%; margin:0.2rem 0rem; border-bottom:1px solid #6c757d3b; z-index: 2;" />
                <p style="z-index: 2;" class="m-0 font-weight-bold text-dark">
                  Hugo Santana
                </p>
                <p style="z-index:2">
                  Course Instructor
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
<style>
.certificate-container{
  background-image: url("~/assets/certificate-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  background-color: #fff;
  height: 790px;
}
</style>
