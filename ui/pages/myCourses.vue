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
            <div v-if="false" class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>
            <b-row v-else style="height: 65vh">
              <b-col lg="6">
                <NuxtLink style="text-decoration: none;" to="/courseNavigator">
                  <div class="d-flex align-items-center border rounded p-3">
                    <div>
                      <img class="mr-4 rounded" width="150px" src="https://cdn.discordapp.com/attachments/995431473828077618/1126451747213291600/taylankoca_imagine_a_modern_art_gallery_with_the_curator_in_it._799e1c51-2808-4a56-b4ab-31ca85854b9c.png">
                    </div>
                    <div class="d-flex flex-column">
                      <h4>Gallery business</h4>
                      <p class="small">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.
                      </p>

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
                </NuxtLink>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Certificates">
            <b-row style="height: 65vh">
              <b-col lg="6">
                <PxCertificate />
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 50
    }
  },
  mounted () {

  }

}
</script>
<style>
.nav-tabs .nav-link.active{
    color: #495057;
    font-weight: 600;
    background-color: #fff;
    border-color: #ffffff #ffffff rgb(0, 185, 205);;
}

.progress-bar{
  background-color: #00B9CD;
}
</style>
