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
<v-btn icon :loading="loading" @click="load" :disabled="!hasUserInput">
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
  watch: {
    textareaInput: function (n, o) {
      if (n !== '') {
        this.hasUserInput = true
      } else {
        this.hasUserInput = false
      }
    }
  },
  data: function () {
    return {
      textareaInput: '',
      hasUserInput: false,
      loading: false
    }
  },
  mounted () {
    store.textarea = this.$refs.input.$refs.input // textarea的DOM绑定到全局共享变量store中
  },
  methods: {
    load: function () {
      this.$data.loading = !this.$data.loading
      setTimeout(() => (this.$data.loading = false), 3000)
    },
    sendComment: function () {
      console.log(this.$data.textareaInput)
    }
  }
}
</script>
