<template>
  <v-toolbar dense bottom elevation="0" class="mt-n2 mb-2" style="background:rgb(243,245,250)">
    <!-- <v-btn icon @click="submitImage">
      <v-icon>mdi-image</v-icon>
    </v-btn> -->
    <v-btn icon >
      <v-icon>mdi-image</v-icon>
    </v-btn>
    <input
      type="file"
      id="upload"
      ref="upload"
      @change="changeFile"
      accept=".jpg, .jpeg, .png"
      class="hiddenInput"
    />
 <input
      type="file"
      id="upload"
      ref="file"
      @change="changeFile"
      accept=".txt, .pdf, .word"
      class="hiddenInput"
    />
    <!-- <v-btn icon @click='recordAudio'>
      <v-icon>mdi-microphone</v-icon>
    </v-btn> -->
    <v-btn icon >
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
    <!-- <v-btn icon @click='submitFile'>
      <v-icon>mdi-file</v-icon>
    </v-btn> -->
    <v-btn icon >
      <v-icon>mdi-file</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<style scoped>
.hiddenInput {
  display: none;
}
</style>
<script>
import Recorder from 'js-audio-recorder'
export default {
  methods: {
    submitFile: function () {
      const upload = this.$refs.file
      upload.click()
    },
    changeFile: function (event) {
      const file = event.target.files[0]
      const filename = file.name
      const filenameArr = filename.split('.')
      const fileSuffix = filenameArr.pop()
      let fileType = 'Document'
      if (['jpg', 'jpeg', 'png'].includes(fileSuffix)) fileType = 'Image'
      const reader = new FileReader()
      if (fileType === 'Image') reader.readAsDataURL(file)
      else reader.readAsBinaryString(file)
      reader.onload = () => {
        const fileData = reader.result
        const fileObj = {
          fileType,
          fileData
        }
        this.$emit('getFileData', fileObj)
      }
    },
    submitImage: function () {
      const upload = this.$refs.upload
      upload.click()
    },
    recordAudio: function () {
      const recorder = new Recorder()
      recorder.start()
    }
  }
}
</script>
