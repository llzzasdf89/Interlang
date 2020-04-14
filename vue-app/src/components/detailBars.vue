<template>
  <v-toolbar dense bottom elevation="0" class="mt-n2 mb-2">
    <v-btn icon @click="submitImage">
      <v-icon>mdi-image</v-icon>
    </v-btn>
    <input
      type="file"
      id="upload"
      ref="upload"
      @change="changeImg"
      accept=".jpg, .jpeg, .png"
      class="hiddenInput"
    />

    <v-btn icon @click='recordAudio'>
      <v-icon>mdi-microphone</v-icon>
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
    submitImage: function () {
      const upload = this.$refs.upload
      upload.click()
    },
    changeImg: function (e) {
      const img = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = () => {
        const imgData = reader.result
        this.$emit('getImagePath', imgData)
      }
    },
    recordAudio: function () {
      const recorder = new Recorder()
      recorder.start()
    }
  }
}
</script>
