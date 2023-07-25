<template>
  <div>
    <b-container style="max-width: 1240px;margin-top: 2rem;">
      <h2 class="mb-3" style="font-weight: bold; color:#00B9CD">
        My courses
      </h2>
      <div class="mb-5">
        <b-tabs content-class="mt-3">
          <b-tab title="All" active>
            <div v-if="false" class="d-flex flex-column align-items-center justify-content-center" style="height: 65vh;">
              <h3>It looks like you don't have any courses yet</h3>
              <p>Explore our courses and push the limits of your creativity!</p>
              <button class="secondary-btn">
                Explore courses
              </button>
            </div>

            <b-row v-else style="height: 65vh">
              <b-col lg="4">
                <PxCard
                  :is-certificate="false"
                  :pfp="'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg'"
                  :instructor="'Hugo Santana'"
                  :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
                  :title="'Introduction to digital objects'"
                  :cover="'https://cdn.discordapp.com/attachments/995431544019755070/1124593093560254555/anomalyofapes_code_art_black_and_white_tile_texture_flat_graphi_f5d49018-e6de-4513-9679-fcaaef4f7b19.png'"
                />
              </b-col>
            </b-row>
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
              <b-col lg="4">
                <NuxtLink class="link" style="text-decoration: none;" to="/courseNavigator">
                  <PxCard
                    :is-progress="true"
                    :is-certificate="false"
                    :pfp="'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg'"
                    :instructor="'Hugo Santana'"
                    :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
                    :title="'Introduction to digital objects'"
                    :cover="'https://cdn.discordapp.com/attachments/995431544019755070/1124593093560254555/anomalyofapes_code_art_black_and_white_tile_texture_flat_graphi_f5d49018-e6de-4513-9679-fcaaef4f7b19.png'"
                  />
                </NuxtLink>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Certificates">
            <b-row>
              <b-col lg="4">
                <PxCard
                  :is-progress="false"
                  :is-certificate="true"
                  :pfp="'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg'"
                  :instructor="'Hugo Santana'"
                  :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
                  :title="'Introduction to digital objects'"
                  :cover="'https://cdn.discordapp.com/attachments/995431544019755070/1124593093560254555/anomalyofapes_code_art_black_and_white_tile_texture_flat_graphi_f5d49018-e6de-4513-9679-fcaaef4f7b19.png'"
                />
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
