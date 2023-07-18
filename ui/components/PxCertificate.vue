<template>
  <div>
    <div class="d-flex flex-column justify-content-between border rounded p-5 certificate-container" style="gap:4rem" @click="generateReport()">
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
        <p>Awarded on 07/17/2023</p>
        <div class="d-flex flex-column align-items-center position-relative">
          <img class="position-absolute" style="top:-55px" src="https://cdn.discordapp.com/attachments/987378128106168403/1130868334494228551/pngwing.com.png" width="110px" alt="firma">
          <div style="width:100%; margin:0.2rem 0rem; border-bottom:1px solid #6c757d3b; z-index: 2;" />
          <p class="m-0 font-weight-bold text-dark">
            Hugo Santana
          </p>
          <p>
            Course Instructor
          </p>
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
              <p>Awarded on 07/17/2023</p>
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

    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>
<style>
.certificate-container{
  background-image: url("~/assets/certificate-bg.png"); /* Ruta de la imagen de fondo */
  background-size: cover; /* Ajustar el tamaño de la imagen para cubrir todo el contenedor */
  background-repeat: no-repeat; /* Evitar que se repita la imagen */
  background-position: center center; /* Posición de la imagen en el contenedor */
  position: relative; /* Para posicionar correctamente el texto sobre la imagen */
  background-color: #fff;
  height: 790px;
}
</style>
