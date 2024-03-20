<template>
  <div style="margin-top: 2rem; ">
    <b-container style="max-width: 1240px; height: 80vh;">
      <b-row>
        <b-col cols="12" lg="6">
          <!--COURSE DETAILS SECTION-->
          <div v-show="firstSection">
            <h4>Create course</h4>

            <FormulateForm
              v-slot="{ isLoading }"
              ref="courseDetailsForm"
              v-model="courseValues"
              class="login-form"
              @submit="saveCourseDetails"
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
                <div
                  :class="isDragging ? 'drop-zone_active':'drop-zone'"
                  @dragover.prevent="onDragOver"
                  @dragleave.prevent="onDrageLeave"
                  @drop.prevent="onDrop"
                  @click="$refs.thumbnailInput.click()"
                >
                  <Icon color="none" :class="isDragging? 'upload-icon_active':''" icon="material-symbols:upload-rounded" width="3rem" />
                  <span :class="isDragging ? 'drop-text_active small':'small'">Drag and drop and image file to upload them</span>
                </div>
                <span style="color:#960505; font-size: .8em; margin-bottom: 0.25em;">{{ thumbnailMsg }}</span>
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
                min="0"
                validation="required"
              />

              <div class="d-flex align-items-center justify-content-between w-100">
                <NuxtLink style="text-decoration: none;" to="/">
                  <button class="tertiary-btn d-flex align-items-center">
                    <Icon width="1.25rem" icon="material-symbols:arrow-back-rounded" style="color: #888888;" class="mr-2" />
                    <span>Go back</span>
                  </button>
                </NuxtLink>

                <FormulateInput
                  style="width: 120px;"
                  type="submit"
                  :disabled="isLoading"
                  :label="isLoading ? 'Loading...' : 'Next'"
                />
              </div>
            </FormulateForm>
          </div>
          <!--MODULES SECTION-->
          <div v-show="!firstSection">
            <div class="p-4 rounded shadow-sm w-100 mb-4">
              <h4>Add modules</h4>
              <p>You can add one or more modules and assign a title for each of them. Delete or edit whenever you want.</p>

              <div v-for="(courseModule, index) in savedCourses.modules" :key="index">
                <div class="d-flex align-items-center  mb-2">
                  <div v-if="courseModule.title" class="d-flex w-100 shadow-sm p-2 rounded justify-content-between w-100 module-btn" @click="$bvModal.show(`modal-${index}`)">
                    <span>
                      {{ courseModule.title }}
                    </span>
                    <Icon width="1.5rem" icon="material-symbols:edit-square-outline-rounded" />
                  </div>
                  <div class="w-auto p-2 rounded shadow-sm ml-2 d-flex justify-content-center align-items-center remove-btn" @click="removeModule(index)">
                    <Icon width="1.5rem" icon="material-symbols:delete-outline-rounded" />
                  </div>
                </div>

                <b-modal :id="`modal-${index}`" centered hide-footer>
                  <template #modal-header="{ close }">
                    <h2>{{ savedCourses.modules[index].title }}</h2>

                    <span style="cursor: pointer" @click="close()">
                      <Icon width="32" color="#888" icon="material-symbols:close" />
                    </span>
                  </template>

                  <div class="d-flex  align-items-center justify-content-center w-100 position-relative mb-4">
                    <div v-for="(step,indexStep) in moduleSteps" :key="indexStep" class="w-100 d-flex flex-column justify-content-center align-items-center" @click="selectStep(indexStep)">
                      <span class="small mb-1">{{ step.name }}</span>

                      <div class="module-checkpoint" />
                    </div>
                    <div class="position-absolute w-100" style="border-bottom: 3px solid gray; top:75%" />
                  </div>

                  <FormulateForm v-if="moduleSteps[0].isActive" v-slot="{ isLoading }" v-model="courseValues.modules" class="login-form" @submit="saveModule(index)">
                    <FormulateInput
                      :value="savedCourses.modules[index].title"
                      name="title"
                      type="text"
                      label="Title"
                      placeholder="Enter title"
                      validation="required"
                    />
                    <FormulateInput
                      :value="savedCourses.modules[index].description"
                      name="description"
                      type="textarea"
                      label="Description"
                      placeholder="Enter description"
                      validation="required"
                    />

                    <FormulateInput
                      style="width: 120px;"
                      type="submit"
                      :disabled="isLoading"
                      :label="isLoading ? 'Loading...' : 'Next'"
                    />
                  </FormulateForm>
                </b-modal>
              </div>

              <button class="add-item-btn mt-2" @click="createModule(index)">
                <span>
                  Add module
                </span>
                <Icon width="1.25rem" icon="material-symbols:add-rounded" class="ml-1" />
              </button>
            </div>
            <div class="d-flex align-items-center justify-content-between w-100">
              <button class="tertiary-btn d-flex align-items-center" @click="firstSection = true">
                <Icon width="1.25rem" icon="material-symbols:arrow-back-rounded" style="color: #888888;" class="mr-2" />
                <span>Go back</span>
              </button>
              <button class="primary-btn">
                Save module
              </button>
            </div>
          </div>
        </b-col>
        <!--COURSE PREVIEW-->
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
      count: 0,
      firstSection: false,
      isDragging: false,
      selectedFile: null,
      thumbnailMsg: null,
      courseFormErrors: null,
      courseModuleAdded: [],
      courseValues: {
        thumbnail: null,
        modules: [

        ]
      },

      savedCourses: {
        thumbnail: null,
        modules: [

        ]
      },

      moduleSteps: [
        {
          isActive: true,
          name: 'Module'
        },
        {
          isActive: false,
          name: 'Chapters'
        },
        {
          isActive: false,
          name: 'Test'
        }
      ]
    }
  },

  methods: {
    saveCourseDetails () {
      if (this.courseValues.thumbnail === null) {
        this.thumbnailMsg = 'Thumbnail is required'
      } else {
        this.firstSection = false
        this.savedCourses = {
          title: this.courseValues.title,
          description: this.courseValues.description,
          price: this.courseValues.price,
          thumbnail: this.courseValues.thumbnail,
          modules: [

          ]
        }
      }
    },

    createModule (index) {
      this.count++
      const newModule = {
        title: 'New module',
        description: ''
      }

      this.savedCourses.modules.push(newModule)

      this.$bvModal.show(`modal-${index}`)
      this.courseModuleAdded[index] = true
    },

    saveModule (index) {
      this.savedCourses.modules[index] = {
        title: this.courseValues.modules.title,
        description: this.courseValues.modules.description
      }
      console.info(this.savedCourses.modules)
    },

    removeModule (index) {
      this.savedCourses.modules.splice(index, 1)
    },
    uploadThumbnail (event) {
      this.selectedFile = event.target.files[0]
      if (this.selectedFile) {
        this.courseValues.thumbnail = URL.createObjectURL(this.selectedFile)
      }
    },

    removeFile () {
      this.selectedFile = null
      this.courseValues.thumbnail = null
    },
    selectStep (indexStep) {
      for (let i = 0; i < this.moduleSteps.length; i++) {
        this.moduleSteps[i].isActive = (i === indexStep)
      }
    },
    onDragOver (event) {
      event.preventDefault()
      this.isDragging = true
      event.dataTransfer.dropEffect = 'copy'
    },
    onDrageLeave (event) {
      event.preventDefault()
      this.isDragging = false
    },
    onDrop (event) {
      event.preventDefault()
      this.isDragging = false
      this.selectedFile = event.dataTransfer.files[0]
      if (this.selectedFile.type.includes('image')) {
        this.courseValues.thumbnail = URL.createObjectURL(this.selectedFile)
      } else {
        this.selectedFile = null
      }
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
  color:#cecece
}

.drop-zone:hover{
  border: 1px dashed #00b9cd;
  color: #00b9cd;
  cursor: pointer;
}

.upload-icon_active, .drop-text_active{
  color:#00b9cd
}

.drop-zone_active{
  border: 1px dashed #00b9cd;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

.add-item-btn{
  display:flex;
  align-items: center;
  border: none;
  padding: none;
  background-color: transparent;
  color:#00b9cd
}

.module-btn{
  transition: all 0.3s;
  color: #888888;

}

.module-btn:hover{
  color: #ffff;
  background-color: #00b9cd;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn{
  transition: all 0.3s;
  color: #888888;
}
.remove-btn:hover{
  transition: all 0.3s;
  color:#ffff;
  cursor: pointer;
  background-color: #ef4114;
}

.module-checkpoint{
  width: 18px;
  height:18px;
  border-radius: 50px;
  border: 3px solid #888888;
  background-color: #ffff;
  z-index:2
}
</style>
