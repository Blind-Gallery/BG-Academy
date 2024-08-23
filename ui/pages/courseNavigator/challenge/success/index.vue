<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen">
    <div class="tw-w-full tw-max-w-lg tw-bg-white tw-shadow-md tw-rounded-lg tw-p-8 tw-text-center">
      <div class="tw-mb-4">
        <Icon
          color="#4ECB71"
          width="4rem"
          icon="material-symbols:check-circle-rounded"
        />
      </div>
      <h2 class="tw-text-xl tw-font-semibold tw-mb-4">
        Congratulations, you have minted your project!
      </h2>
      <div class="tw-flex tw-justify-center tw-space-x-4">
        <NuxtLink to="/" class="tw-no-underline hover:tw-no-underline">
          <button-PxSecondary text="Go Home" />
        </NuxtLink>
        <a href="https://objkt.com/" target="_blank" class="tw-no-underline hover:tw-no-underline">
          <button-PxPrimary text="See on objkt.com" />
        </a>
      </div>
    </div>
  </div>
</template>
