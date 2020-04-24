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
<v-btn icon :loading="loading" :disabled="!hasUserInput">
<v-icon @click='sendComment'>mdi-arrow-right</v-icon>
</v-btn>
</v-col>
  </v-row>
</v-footer>
</template>
<script>
// eslint-disable-next-line no-unused-vars
export default {
  props: ['messageObj'],
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
    const store = this.$store
    const textAreaDom = this.$refs.input.$refs.input
    store.commit('appendDom', textAreaDom)// textarea的DOM绑定到Vuex的全局变量store中)
  },
  methods: {
    sendComment: function () {
      const questionID = this.messageObj.ID
      const content = this.$data.textareaInput
      this.$data.loading = !this.$data.loading
      this.http.post('/question/answer', {
        questionID,
        content
      }).then(res => {
        console.log(res)
        if (res.data.success) {
          this.$emit('showAlert', true)
        } else {
          this.$emit('showAlert', false)
        }
        this.$data.loading = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
