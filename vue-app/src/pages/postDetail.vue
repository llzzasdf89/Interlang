
<template>
  <v-container app class="text-left fill-height">
    <v-row>
      <v-col cols="12">
        <v-form v-model="valid">
          <detailTemplate
            :is="detailTemplate"
            @input="getVal"
            @select="getSelection"
            @inputB="getValB"
          ></detailTemplate>
          <v-divider></v-divider>
          <v-row v-if="fileObj !== null" class="my-2">
            <v-col cols="12" class="img-container-pos">
              <v-img :src="fileObj.fileType==='Image'?fileObj.fileData:alt " alt='document' height="150px" width="150px" class="border"></v-img>
              <v-icon class="img-icon-delete-pos" @click="deleteFile">mdi-close-box</v-icon>
            </v-col>
          </v-row>
          <tags :tags='tags' @selectTags= 'selectTags'></tags>
        </v-form>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <detailBars @getFileData="getFileData"></detailBars>
    <v-btn block rounded x-large color="primary" @click="submit">post</v-btn>
  </v-container>
</template>
<style scoped>
.border {
  border-radius: 1rem;
}
.img-container-pos {
  position: relative;
}
.img-icon-delete-pos {
  position: absolute;
  left: 150px;
  top: 0;
}
</style>
<script>
import detailBars from '@/components/detailBars'
import detailTemplateA from '@/components/detailTemplate_A'
import detailTemplateB from '@/components/detailTemplate_B'
import detailTemplateC from '@/components/detailTemplate_C'
import detailTemplateD from '@/components/detailTemplate_D'
import tags from '@/components/tags'
export default {
  components: {
    tags,
    detailBars,
    detailTemplateA,
    detailTemplateB,
    detailTemplateC,
    detailTemplateD
  },
  computed: {
    tags: function () {
      return this.$store.state.tags
    },
    detailTemplate: function () {
      let detailTemplate
      const templateType = this.$route.params.type
      if (templateType === 'A') detailTemplate = 'detailTemplateA'
      else if (templateType === 'B') detailTemplate = 'detailTemplateB'
      else if (templateType === 'C') detailTemplate = 'detailTemplateC'
      else detailTemplate = 'detailTemplateD'
      return detailTemplate
    }
  },
  data: function () {
    return {
      alt: '../assets/file.jpg',
      input: '',
      inputB: '',
      selectedTags: [],
      selectedLanguage: '',
      valid: false,
      fileObj: null
    }
  },
  methods: {
    getVal: function (e) {
      this.$data.input = e
    },
    getValB: function (e) {
      this.$data.inputB = e
    },
    getSelection: function (e) {
      this.$data.selectedLanguage = e
    },
    getFileData: function (fileObj) {
      this.$data.fileObj = fileObj
    },
    deleteFile: function () {
      this.$data.fileObj = null
    },
    selectTags (e) {
      this.$data.selectedTags = e
    },
    findMatchedLanguageID (selectedLanguage) {
      const allLanguages = this.$store.state.languages
      const matchID = allLanguages.map(v => {
        if (v.Name === selectedLanguage) return v.ID
      })[0] || -1
      return matchID
    },
    submit: function () {
      const input = this.$data.input
      const inputB = this.$data.inputB || ''
      const selectedLanguage = this.$data.selectedLanguage
      const selectedLanguageID = this.findMatchedLanguageID(selectedLanguage)
      if (selectedLanguageID < 0) return alert('choose language error!')
      const tags = this.findMatchedTagsID(this.$data.selectedTags)
      console.log(tags)
      const type = this.$route.params.type
      const hint = this.$children[3].$route.params.hint
      const endSentence = this.$children[3].$route.params.endSentence
      const content = this.embedContent(type, input, inputB, selectedLanguage, hint, endSentence)
      const params = {
        content,
        languageID: selectedLanguageID,
        tags
      }
      this.http.post('/question/add', params).then(res => {
        if (res.data.success) alert('Post question Success!')
        this.$router.push({ name: 'Home' })
      }).catch(err => {
        alert(err)
      })
    },
    goBack: function () {
      this.$router.back()
    },
    findMatchedTagsID (selectedTags) {
      const allTags = this.$store.state.tags
      const matchedTagID = []
      for (let i = 0; i < allTags.length; i++) {
        for (let j = 0; j < selectedTags.length; j++) {
          if (selectedTags[j] === allTags[i].Name) matchedTagID.push(allTags[i].ID)
        }
      }
      return matchedTagID
    },
    embedContent (type, input, inputB, selectedLanguage, hint = '', endSentence = '') {
      switch (type) {
        case 'A':return `
        ${input} 
        in 
        ${selectedLanguage} 
        How to express `
        case 'B':return `
        ${input}
        and
        ${inputB}
        What's the difference?If it's hard to explain, please list out some example
        `

        case 'C': return input
        case 'D':
          return `
        ${hint || 'Could you tell me'}
        ${input}
        ${endSentence || 'The meaning'}
        `
      }
    }
  }
}
</script>
