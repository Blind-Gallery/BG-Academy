<template>
  <div>
    <b-container style="max-width: 1240px;">
      <b-row>
        <b-col lg="8">
          a
        </b-col>
        <b-col lg="4" class="shadow rounded">
          <div class="d-flex flex-column p-3" style="gap:0.5rem">
            <iframe
              class="rounded"
              width="100%"
              height="200px"
              src="https://www.youtube.com/embed/JQbjS0_ZfJ0"
              title="YouTube video player"
              frameborder="0"
            />

            <div v-b-toggle.collapse-2 class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center" style="gap:0.5rem">
                <b-avatar size="2rem" />
                <div>
                  <p class="m-0 small">
                    Instructor
                  </p>
                  <p class="m-0 text-dark">
                    Hugo Santana
                  </p>
                </div>
              </div>
              <Icon icon="material-symbols:keyboard-arrow-down" width="24" />
            </div>
            <b-collapse id="collapse-2">
              <p class="small">
                With over a decade of experience, he has taught at prestigious educational institutions and inspired countless students to delve into the fascinating world of creative coding.
                His unique approach combines traditional art with cutting-edge technology, earning him recognition for pushing the boundaries of artistic expression.
              </p>
            </b-collapse>
            <div class="border rounded p-3">
              <h2 class="m-0 font-weight-bold" style="color:#00b9cd">
                $200
              </h2>
              <p class="m-0">
                Access this course
              </p>
            </div>
            <button class="primary-btn w-100 ">
              Credit card
            </button>
            <button class="secondary-btn w-100">
              Crypto
            </button>
            <hr>
            <div class="d-flex-column">
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <Icon icon="material-symbols:alarm-outline" color="#888" class="mr-2" /><p class="small m-0">
                  Aprox. duration 12 hours
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
