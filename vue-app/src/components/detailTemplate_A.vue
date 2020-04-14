<template>
  <div>
    <v-text-field single-line outlined label="单词或者句子 " @input="subscribe" :rules="inputRules"></v-text-field>
    <v-row>
      <v-col cols="12">用</v-col>
    </v-row>
    <v-select
      outlined
      :items="languages"
      label="语种"
      class="mt-6"
      @change="selectLanguage"
      :rules="languageRules"
    ></v-select>
    <v-row>
      <v-col cols="12">怎么说</v-col>
    </v-row>
  </div>
</template>
<script>
import { detailTemplateCommonData } from '@/common/detailTemplateCommonData'
export default {
  mixins: [detailTemplateCommonData]
}
</script>
