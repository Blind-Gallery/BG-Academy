<script>
export default {
  data () {
    return {
      objktProject: {
        title: '',
        description: '',
        file: null
      }
    }
  },

  methods: {
    doMint () {
      console.info(this.objktProject)
    }
  }
}
</script>

<template>
  <div class="tw-grid tw-grid-cols-12 tw-gap-4 lg:tw-my-12 tw-flex tw-justify-center">
    <div class="tw-col-span-12 lg:tw-col-span-6 lg:tw-p-4 tw-border tw-rounded">
      <h4>Mint your project on objkt.com</h4>
      <FormulateForm
        v-slot="{ isLoading }"
        v-model="objktProject"
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
          type="file"
          name="file"
          label="Select your images to upload"
          help="(JPG, PNG, GIF)"
          validation="required|mime:image/jpeg,image/png,image/gif"
        />
        <FormulateInput
          type="submit"
          :disabled="isLoading"
          :label="isLoading ? 'Loading...' : 'Mint Project'"
        />
      </FormulateForm>
    </div>
  </div>
</template>
