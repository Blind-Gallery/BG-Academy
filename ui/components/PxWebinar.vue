<template>
  <div>
    <b-container style="max-width: 1240px;">
      <b-row class="justify-content-md-center">
        <b-col col lg="6">
          <div class="w-100 rounded overflow-hidden shadow-sm">
            <div class="overflow-hidden position-relative d-flex justify-content-center align-items-center" style="height:200px">
              <img width="100%" src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmQ6xcW8YcPdCVxM82mAjc9qSTmyks3buzaxsynjQZndby">
              <div class="position-absolute">
                <b-avatar style="border:5px solid white" class="rounded" size="8rem" variant="info" src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmV2PBdksQNvsyMfwxcXVvq4Y22BA8rXWSVmTFnMkhB9FG" />
              </div>
            </div>
            <div class="p-4">
              <div class="border px-2 mb-2" style="border-radius:50px; width:fit-content">
                <span class="text-secondary small">Webinar | D/M | TBD AM CST</span>
              </div>

              <h4 class="m-0">
                Introduction to Pixel Shaders
              </h4>
              <span>With ilithya</span>
              <p class="text-secondary small mt-2">
                Learn the basics of pixel aka fragment shaders in this webinar with the help of ilithya, a multidisciplinary artist and technologist with a background in creative development and design
              </p>
              <!-- TODO: HACER CONEXIÓN DE RUTA AL CURSO DE ILITHYA -->
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <button class="primary-btn ">
                  Buy course
                </button>
              </div>
              <hr class="w-100">
              <div class="w-100 d-flex align-items-center justify-content-center flex-column">
                <iframe
                  src="https://blindgallery.substack.com/embed"
                  height="150"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                />
                <span class="small text-secondary">Subscribe to join the webinar</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
