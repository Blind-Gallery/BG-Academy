<template>
  <div>
    <b-container style="max-width: 1240px;">
      <b-row>
        <b-col cols="12" lg="6">
          <div>
            <h4>Create course</h4>

            <FormulateForm
              v-model="courseValues"
              class="login-form"
            >
              <FormulateInput
                name="title"
                type="text"
                label="Title"
                placeholder="Enter title"
                validation="required"
              />
              <FormulateInput
                name="description"
                type="textarea"
                label="Description"
                placeholder="Enter description"
                validation="required"
              />

              <input
                ref="thumbnailInput"
                class="d-none"
                type="file"
                accept=".jpg,.png"
                @change="uploadThumbnail"
              >
              <div v-if="selectedFile === null" class="d-flex flex-column" style="margin-bottom: 1.5em;">
                <label style="font-size: .9em;">Thumbnail</label>
                <div class="drop-zone" style="" @click="$refs.thumbnailInput.click()">
                  <Icon icon="material-symbols:upload-rounded" style="color:#cecece" width="3rem" />
                  <span style="color: #cecece;" class=" small">Drag and drop and image file to upload them</span>
                </div>
              </div>
              <div v-else style="border:1px solid #cecece; margin-bottom: 1.5em;" class="d-flex justify-content-between border rounded p-2 ">
                <div>
                  <Icon width="1.25rem" icon="material-symbols:file-copy-outline-rounded" style="color: black" class="mr-2" />
                  <span class="small">{{ selectedFile.name }}</span>
                </div>
                <div style="cursor: pointer;" @click="removeFile">
                  <Icon width="1.25rem" icon="material-symbols:close-rounded" style="color: black" class="mr-2" />
                </div>
              </div>
              <FormulateInput
                name="price"
                type="number"
                label="Price"
                placeholder="Enter price"
                validation="required"
              />

              <div class="d-flex align-items-center justify-content-between w-100">
                <div class="d-flex align-items-center">
                  <Icon width="1.25rem" icon="material-symbols:arrow-back-rounded" style="color: #888888;" class="mr-2" /> <span class="tertiary-btn">Go back</span>
                </div>
                <button class="primary-btn px-4">
                  Next
                </button>
              </div>
            </FormulateForm>
          </div>
        </b-col>
        <b-col cols="12" lg="6">
          <div v-if="courseValues.title || courseValues.description || courseValues.thumbnail || courseValues.price" class="p-4 shadow-sm rounded m-4">
            <div style="height: 340px; width: auto; overflow: hidden;">
              <img style="object-fit:contain;" class="rounded" :src="courseValues.thumbnail" width="100%">
            </div>
            <div class="mt-2">
              <h4>{{ courseValues.title }}</h4>
              <p class="text-secondary">
                {{ courseValues.description }}
              </p>
              <h4 v-if="courseValues.price" style="color:#00b9cd">
                Price: ${{ courseValues.price }}
              </h4>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: null,
      courseValues: {
        thumbnail: null
      }
    }
  },

  methods: {
    uploadThumbnail (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        this.courseValues.thumbnail = URL.createObjectURL(this.selectedFile)
      }
    },

    removeFile () {
      this.selectedFile = null
      this.courseValues.thumbnail = null
    }
  }
}
</script>

<style>
.drop-zone{
  border: 1px dashed #cecece;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.drop-zone:hover{
  border: 1px dashed #00b9cd;
  color: #00b9cd;
  cursor: pointer;
}

</style>
