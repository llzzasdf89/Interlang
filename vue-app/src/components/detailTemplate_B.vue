<template>
<div>
这个问题关于
<v-row>
<v-col cols='12'><v-select outlined :items="languages" label="语种" class='mt-6' @change="selectLanguage"  :rules="languageRules">></v-select></v-col>
    <v-col cols='12'><v-text-field single-line outlined label="单词或者句子 " @input='subscribe' :rules="inputRules"> </v-text-field></v-col>
    <v-col cols='12' class="mb-4">和</v-col>
  <v-col cols='12'><v-text-field single-line outlined label="单词或者句子 " @input='subscribeB' :rules="inputRules"> </v-text-field></v-col>
    <v-col cols='12' class="d-flex mb-2">{{endSentence}}</v-col>
  </v-row>
</div>
</template>
<script>
import { detailTemplateCommonData } from '@/common/detailTemplateCommonData'
export default {
  mixins: [detailTemplateCommonData],
  data: function () {
    return {
      inputB: ''
    }
  },
  methods: {
    subscribeB: function (e) {
      this.$data.inputB = e
      this.$emit('inputB', e)
    }
  }
}
</script>
