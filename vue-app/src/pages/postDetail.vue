<template>
<v-container app class='text-left fill-height'>
<v-row>
<v-col cols="12">
<v-form v-model="valid">
<detailTemplate :is='detailTemplate' @input='getVal' @select="getSelection" @inputB='getValB'></detailTemplate>
<v-divider></v-divider>
 <v-row>
    <v-col cols="12">
       <span>Tags: </span>
        <v-chip-group
          multiple
          active-class="primary--text"
          column
          v-model="selectedTags"
        >
          <v-chip v-for="tag in tags" :key="tag" :value='tag'>
            {{ tag }}
          </v-chip>
        </v-chip-group>
    </v-col>
  </v-row>
</v-form>
</v-col>
</v-row>
<v-btn block rounded x-large color='primary' @click='submit'>submit</v-btn>
</v-container>
</template>
<script>
import detailTemplateA from '@/components/detailTemplate_A'
import detailTemplateB from '@/components/detailTemplate_B'
import detailTemplateC from '@/components/detailTemplate_C'
import detailTemplateD from '@/components/detailTemplate_D'
export default {
  components: {
    detailTemplateA,
    detailTemplateB,
    detailTemplateC,
    detailTemplateD
  },
  computed: {
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
      input: '',
      inputB: '',
      selectedLanguage: '',
      tags: ['cuisine', 'travel', 'movie', 'music', 'medical', 'treatment', 'education', 'job hunting', 'shopping', 'sports', 'entertainment'],
      selectedTags: [],
      valid: false
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
    submit: function () {
      const input = this.$data.input
      const inputB = this.$data.inputB || ''
      const selectedLanguage = this.$data.selectedLanguage
      const tags = this.$data.selectedTags
      const params = {
        input,
        selectedLanguage,
        tags
      }
      if (inputB) {
        params.inputB = inputB
      }
      console.log(params)
    },
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>
