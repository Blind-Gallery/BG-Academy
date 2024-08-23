<template>
  <div class="tw-container tw-px-4 tw-mx-auto  lg:tw-container">
    <div class="tw-flex tw-items-center  tw-flex-col tw-justify-center lg:tw-my-12">
      <div class="tw-w-full">
        <h4>Instructions</h4>
      </div>
      <div class="tw-columns-1 md:tw-columns-2 lg:tw-columns-4 tw-my-4">
        <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
          <div class="tw-flex tw-border tw-flex-col tw-gap-2 tw-justify-center tw-items-center tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
            <Icon style="color:#00B9CD" icon="material-symbols-light:account-balance-wallet-outline" width="3.5rem" />
            <span class=" tw-w-full tw-text-sm tw-text-gray-500 tw-text-center">Connect your wallet here
              (Don’t have a wallet? download it <a href="https://www.templewallet.com/" target="_blank">here</a>) </span>
          </div>
        </div>
        <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
          <div class=" tw-w-full tw-flex tw-border tw-flex-col tw-gap-2 tw-justify-center tw-items-center tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
            <Icon style="color:#00B9CD" icon="material-symbols-light:circle-notifications-outline-rounded" width="3.5rem" />
            <span class="tw-text-sm tw-text-gray-500 tw-text-center">Accept the collection invitation on <a href="https://objkt.com/" target="_blank">objkt.com</a></span>
          </div>
        </div>
        <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
          <div class=" tw-w-full tw-flex tw-border tw-flex-col tw-gap-2 tw-justify-center tw-items-center tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
            <Icon style="color:#00B9CD" icon="material-symbols-light:file-copy-outline-rounded" width="3.5rem" />
            <span class="tw-text-sm tw-text-gray-500 tw-text-center"> Upload your assets and fill the form</span>
          </div>
        </div>
        <div class="tw-w-full tw-mb-4 lg:tw-mb-0">
          <div class=" tw-w-full tw-flex  tw-border tw-flex-col tw-gap-2 tw-justify-center tw-items-center tw-rounded tw-shadow-sm tw-border-l-4 tw-border-l-cyan-500 tw-p-4 tw-h-[200px]">
            <Icon style="color:#00B9CD" icon="material-symbols-light:checkbook-outline-rounded" width="3.5rem" />
            <span class="tw-text-sm tw-text-gray-500 tw-text-center">Sign the transaction in your wallet and mint your project!</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-flex tw-w-full tw-justify-between tw-items-center tw-flex-wrap">
      <button-PxSecondary text="Go back" prefix-icon="navigate-before" />
      <NuxtLink to="challenge/mint">
        <button-PxPrimary text="Continue" suffix-icon="navigate-next" />
      </NuxtLink>
    </div>
  </div>
</template>
