<template>
  <div>
    <!--INTRODUCTION CONTAINER-->
    <b-container class="main-container pt-5 pb-5 mb-4" fluid>
      <b-container style="max-width: 1240px;">
        <b-row class="align-items-center">
          <b-col class="d-flex flex-column intro-left-col" style="gap:1rem">
            <h1>
              Your starting point into
              <span style="color:#00B9CD"> Digital Arts  & Culture</span>
            </h1>
            <p>Explore interactive courses led by industry experts, unleashing your artistic potential.</p>
            <div class="d-flex gap-2">
              <button class="secondary-btn-black">
                Explore courses
              </button>
            </div>
          </b-col>
          <b-col class="d-lg-flex justify-content-end d-none">
            <img style="border-radius: 10px;" src="https://cdn.discordapp.com/attachments/984632520471633920/1125691815249576016/expertacademy.ai_illustration_of_a_young_male_professional_poin_e0a06885-d02b-4ec2-ac6f-ccfa59844d75.png" width="80%">
          </b-col>
        </b-row>
      </b-container>
    </b-container>
    <!--INFO CONTAINER-->
    <b-container style="max-width: 1240px;">
      <!--PARTNERS ROW-->
      <p class="mt-4">
        Meet our parterns
      </p>
      <b-row class="mb-5">
        <div class="partners-container d-flex align-items-center" style="gap:2rem">
          <img alt="fxhash" src="https://fxhash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F84947e48-fba3-4cbb-b203-aaad507b315b%2Ffxhash_tbg_bt_01.png?table=block&id=b34cff0e-7784-40ec-9020-cea678fe9d41&spaceId=f9d1e984-50ed-4650-a543-95d2b6c0ba90&width=1860&userId=&cache=v2">
          <div style="height: 100%; border: 1px solid #cccccc;" />
          <img
            style="width: 85px;"
            alt="tezos"
            src="https://imgs.search.brave.com/Ni4B87Cq07txaSZWBtEEf8YjF5llOTY-L8WPXow5tZs/rs:fit:1200:778:1/g:ce/aHR0cHM6Ly9icmFu/ZHBhbGV0dGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wNS90ZXpvcy0w/Mi5wbmc"
          ><div style="height: 100%; border: 1px solid #cccccc;" />
          <img
            alt="joyn"
            src="https://app.joyn.xyz/_next/static/media/logo-dark.1d2f9f52.svg"
            style="width: 90px;"
          >
          <div style="height: 100%; border: 1px solid #cccccc;" />
          <img
            alt="autonomy"
            style="width: 140px;"
            src="https://autonomy.io/Logo.svg"
          >
        </div>
      </b-row>
      <!--COURSES ROW-->

      <h3 class="mb-4">
        Increase your potential with the best courses
      </h3>

      <b-row>
        <b-col cols="12" lg="4">
          <NuxtLink style="text-decoration: none;" to="/buyCourse">
            <PxCard
              :pfp="'https://pbs.twimg.com/profile_images/1562353277647339521/UAZlyXN2_400x400.jpg'"
              :instructor="'Hugo Santana'"
              :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
              :title="'Introduction to digital objects'"
              :cover="'https://cdn.discordapp.com/attachments/995431544019755070/1124593093560254555/anomalyofapes_code_art_black_and_white_tile_texture_flat_graphi_f5d49018-e6de-4513-9679-fcaaef4f7b19.png'"
            />
          </NuxtLink>
        </b-col>
        <b-col cols="12" lg="4">
          <PxCard
            :pfp="'https://pbs.twimg.com/profile_images/1581225184127815682/8OvEWkSY_400x400.jpg'"
            :instructor="'Kate Vass'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
            :title="'Gallery business'"
            :cover="'https://cdn.discordapp.com/attachments/995431473828077618/1126451747213291600/taylankoca_imagine_a_modern_art_gallery_with_the_curator_in_it._799e1c51-2808-4a56-b4ab-31ca85854b9c.png'"
          />
        </b-col>
        <b-col cols="12" lg="4">
          <PxCard
            :pfp="'https://pbs.twimg.com/profile_images/1665442400590856195/rZQEm-Vh_400x400.jpg'"
            :instructor="'Aleksandra Art'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
            :title="'Getting involved in web 3'"
            :cover="'https://cdn.discordapp.com/attachments/933565701162168371/1126481090173997137/aapertureka_a_minimalist_clean_and_sleek_abstract_illustration__db72e08a-dfb4-4df8-ab0a-89ad77bc24f2.png'"
          />
        </b-col>

        <b-col cols="12" lg="4">
          <PxCard
            :pfp="'https://pbs.twimg.com/profile_images/1603791594762604549/RmkcXqLF_400x400.jpg'"
            :instructor="'Hugo Santana'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
            :title="'Digital objects advanced'"
            :cover="'https://cdn.discordapp.com/attachments/995431544019755070/1124596257181151243/Hardie_code_art_black_and_white_tile_texture_flat_graphic_Vecto_a0f35d65-195d-4352-a8e9-d6027bab4554.png'"
          />
        </b-col>
        <b-col cols="12" lg="4">
          <PxCard
            :pfp="'https://pbs.twimg.com/profile_images/1355778841101299713/FUQe7j45_400x400.jpg'"
            :instructor="'Sean Moss Pultz'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
            :title="'What is a crypto wallet?'"
            :cover="'https://cdn.discordapp.com/attachments/933565701162168371/1124863799766302800/DariaSuvorova_Wallet_crypto._Ultra_realistic._728e36ec-35cf-4722-9673-b41849919361.png'"
          />
        </b-col>
        <b-col cols="12" lg="4">
          <PxCard
            :pfp="'https://pbs.twimg.com/profile_images/1506308937687224324/8hR0LB5I_400x400.jpg'"
            :instructor="'Anika Meier'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis.'"
            :title="'Introduction to digital art curation'"
            :cover="'https://cdn.discordapp.com/attachments/1008571223543922809/1108278018687893514/Ondrej_Bacina_Ultra_photorealistic_canon_DSLR_image_of_an_art_c_87e87c4d-d3eb-4a6c-88e1-5c2ab67bb96e.png'"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid style="background-color: #F6F6F6;">
      <b-container style="max-width: 1240px;">
        <b-row class="align-items-center pt-5 pb-5">
          <b-col>
            <h1>Community feedback</h1>
          </b-col>
          <div class="mr-4" style="border:1px solid rgba(0, 0, 0, 0.1); height: 330px;" />
          <b-col>
            <div class="d-flex flex-column" style="gap:0.25rem">
              <b-avatar
                class="mb-2"
                size="8rem"
                src="https://i.seadn.io/gae/565o1Aat2hZV3TQgHJncsd6IDmjszQqQIPrj9s0snHMjD651EaaYpRGnffhMDgXzLL07je83xHlqO-hvmzyk7XAcbjgVze6ADLRzBqE?auto=format&dpr=1&w=1000"
              />
              <h4 class="m-0">
                Jose Gutierrez
              </h4>
              <h6>Graphic Designer</h6>
              <p class="small">
                The artistic courses offered by this academy are truly exceptional, providing individuals with a platform to explore their creativity and develop their artistic skills.
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="d-flex flex-column" style="gap:0.25rem">
              <b-avatar
                class="mb-2"
                size="8rem"
                src="https://i.seadn.io/gcs/files/358f48bac320504b14dc2217ec15af7f.png?auto=format&dpr=1&w=1000"
              />
              <h4 class="m-0">
                Jose Gutierrez
              </h4>
              <h6>Graphic Designer</h6>
              <p class="small">
                The artistic courses offered by this academy are truly exceptional, providing individuals with a platform to explore their creativity and develop their artistic skills.
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="d-flex flex-column" style="gap:0.25rem">
              <b-avatar
                class="mb-2"
                size="8rem"
                src="https://i.seadn.io/gae/565o1Aat2hZV3TQgHJncsd6IDmjszQqQIPrj9s0snHMjD651EaaYpRGnffhMDgXzLL07je83xHlqO-hvmzyk7XAcbjgVze6ADLRzBqE?auto=format&dpr=1&w=1000"
              />
              <h4 class="m-0">
                Jose Gutierrez
              </h4>
              <h6>Graphic Designer</h6>
              <p class="small">
                The artistic courses offered by this academy are truly exceptional, providing individuals with a platform to explore their creativity and develop their artistic skills.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<style>
.main-container{
  background: rgb(26,55,75);
  background: linear-gradient(83deg, rgba(26,55,75,1) 0%, rgba(25,91,136,1) 100%);
}

.main-container  h1, .main-container p{
  color:#fff
}

.partners-container img{
  width: 10%;
  object-fit: contain;
  filter: brightness(-100%);
}

@media (max-width: 425px){
  .intro-left-col{
    align-items: center;
  }
  .intro-left-col h1, .intro-left-col p{
    text-align: center;
  }
}
</style>
