<template>
  <div>
    <b-container class="main-container pt-5 pb-5" fluid>
      <b-container style="max-width: 1240px;">
        <b-row class="align-items-center py-4">
          <b-col class="d-flex flex-column intro-left-col" style="gap:1rem">
            <h1>
              Your starting point to
              <span style="color:#00B9CD"> learn blockchain art</span>
            </h1>
            <p>
              Explore interactive courses led by industry experts, paving your way in the digital art revolution.
            </p>
            <div class="d-flex gap-2">
              <a style="text-decoration: none;" href="#explore-courses" class="secondary-btn-black">
                Explore courses
              </a>
            </div>
          </b-col>
          <b-col class="d-lg-flex justify-content-end d-none">
            <div class="w-100" style="border-radius: 5px;overflow: hidden;">
              <PxPlayer
                video-id="898151728"
                chapter-id=""
                width="100%"
              />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
