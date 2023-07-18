<template>
  <div>
    <b-container style="max-width: 1240px;margin-top: 2rem;">
      <h2 class="mb-3" style="font-weight: bold; color:#00B9CD">
        My courses
      </h2>
      <div class="mb-5">
        <b-tabs content-class="mt-3">
          <b-tab title="All" active>
            <div class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>
          </b-tab>
          <b-tab title="In progress">
            <div class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>
          </b-tab>
          <b-tab title="Completed">
            <div class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>
          </b-tab>
          <b-tab title="Certificates">
            <b-row>
              <b-col lg="12">
                <PxCertificate />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>
<style>
.nav-tabs .nav-link.active{
    color: #495057;
    font-weight: 600;
    background-color: #fff;
    border-color: #ffffff #ffffff rgb(0, 185, 205);;
}
</style>
