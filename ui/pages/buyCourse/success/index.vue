<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 90vh;">
    <div
      class="
      d-flex
      flex-column
      align-items-center
      justify-content-center
      p-5
      rounded
      shadow-sm
      "
    >
      <Icon
        class="mb-2"
        color="#4ECB71"
        width="8rem"
        icon="material-symbols:check-circle-rounded"
      />
      <h1>Done!</h1>
      <p class="text-center">
        Your payment has been successfully
        processed,<br> you will receive an email shortly.
      </p>
      <NuxtLink to="/">
        <button class="primary-btn">
          Home page
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
