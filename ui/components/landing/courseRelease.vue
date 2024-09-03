<template>
  <div class="tw-container">
    <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-shadow-sm tw-rounded tw-my-8 hover:tw-shadow tw-duration-200 tw-ease-in-out  tw-border-l-4 tw-border-l-cyan-500">
      <div class="tw-flex tw-flex-col tw-justify-center tw-gap-2 tw-w-full tw-order-2 lg:tw-order-1  tw-p-8">
        <div class="tw-border tw-border-cyan-500 tw-px-2 tw-rounded-full tw-w-fit">
          <span class="tw-text-sm tw-text-cyan-500">New course</span>
        </div>
        <div>
          <h1 class="tw-m-0">
            Introduction to <span class="tw-text-cyan-500">Pixel Shaders</span>
          </h1>
          <div class="tw-flex tw-gap-2 tw-items-center">
            <span>Instructed by ilithya</span>
          </div>
        </div>
        <p class="tw-text-gray-500 tw-text-sm">
          This course is designed for beginners eager to dive into the world of computational thinking and creative coding with pixel shaders, commonly known as fragment shaders, in GLSL.
        </p>

        <NuxtLink class="hover:tw-no-underline" to="buyCourse/5f1f6044-21ba-4409-880e-02cd36568697">
          <button-PxPrimary text="View course" />
        </NuxtLink>
      </div>
      <div class="tw-w-full tw-flex tw-items-center tw-justify-center lg:tw-justify-start  tw-order-1 lg:tw-order-2 tw-relative">
        <img src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmQ6xcW8YcPdCVxM82mAjc9qSTmyks3buzaxsynjQZndby" class="tw-w-full tw-h-auto" alt="Imagen">
        <div class="tw-absolute  tw-inset-0 tw-bg-gradient-to-l tw-from-transparent tw-to-white tw-opacity-100" />
        <div class="tw-absolute tw-overflow-hidden tw-rounded-full md:tw-w-[170px] md:tw-h-[170px] tw-w-[150px] tw-h-[150px]">
          <img src="https://moccasin-perfect-trout-941.mypinata.cloud/ipfs/QmV2PBdksQNvsyMfwxcXVvq4Y22BA8rXWSVmTFnMkhB9FG">
        </div>
      </div>
    </div>
  </div>
</template>
