<script>
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        image: null
      },
      previewUrl: null
    }
  },

  methods: {
    doMint () {
      // TODO ADD ERROR NOTIFICATIONS
      try {
        this.$router.push('/courseNavigator/challenge/success')
      } catch (e) {
        console.error(e)
      }
    },
    fileUpload () {
      const file = this.form.image.files[0].file
      if (file) {
        this.previewUrl = URL.createObjectURL(file)
      }
    },

    fileRemove () {
      this.previewUrl = null
    }

  }
}
</script>

<template>
  <div class="tw-container tw-px-4 tw-mx-auto  lg:tw-container">
    <div class="tw-grid tw-grid-cols-12 tw-gap-4 lg:tw-my-12 tw-flex tw-justify-center">
      <div class="tw-col-span-12 lg:tw-col-span-6 lg:tw-p-4 tw-shadow-md tw-rounded">
        <h4>Mint your project on objkt.com</h4>
        <FormulateForm
          v-slot="{ isLoading }"
          v-model="form"
          class="login-form"
          @submit="doMint"
        >
          <FormulateInput
            name="title"
            type="text"
            label="Title"
            validation="required"
          />
          <FormulateInput
            name="description"
            type="textarea"
            label="Description"
            validation="required"
          />
          <FormulateInput
            type="image"
            name="image"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif"
            @file-removed="fileRemove"
            @file-upload-complete="fileUpload"
          />
          <FormulateInput
            type="submit"
            :disabled="isLoading"
            :label="isLoading ? 'Loading...' : 'Mint Project'"
          />
        </FormulateForm>
      </div>
      <div class="tw-col-span-12 lg:tw-col-span-6 lg:tw-p-4 tw-shadow-md tw-rounded">
        <div>
          <div v-if="previewUrl" class="tw-relative tw-w-full ">
            <div class="tw-w-full tw-h-full tw-overflow-hidden tw-relative" style="padding-bottom: 100%;">
              <img :src="previewUrl" alt="Image Preview" class="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-object-contain">
            </div>
          </div>
          <h4>{{ form.title }}</h4>
          <p>{{ form.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
