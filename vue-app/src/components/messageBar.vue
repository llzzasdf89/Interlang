<template>
<v-footer app min-height='56px'>
<v-row align='center'>
<v-col cols='2'>
<v-btn icon >
      <v-icon>mdi-image</v-icon>
    </v-btn>
     <input
      type="file"
      id="upload"
      ref="upload"
      accept=".jpg, .jpeg, .png"
      style="display:none"
    />
</v-col>
<v-col cols='2'>
  <v-btn icon>
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
</v-col>
<v-col cols='6'>
  <v-textarea dense auto-grow hide-details rows='1' outlined ref='input' v-model='textareaInput'></v-textarea>
</v-col>
<v-col cols='2'>
<v-btn icon>
<v-icon @click='sendComment'>mdi-arrow-right</v-icon>
</v-btn>
</v-col>
  </v-row>
</v-footer>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { store } from '@/common/store'
export default {
  data: function () {
    return {
      textareaInput: ''
    }
  },
  mounted () {
    store.textarea = this.$refs.input.$refs.input // textarea的DOM绑定到全局共享变量store中
  },
  methods: {
    sendComment: function () {
      console.log(this.$data.textareaInput)
    }
  }
}
</script>
