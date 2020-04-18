<template>
  <div>
    <v-text-field single-line outlined label="word or sentence " @input="subscribe" :rules="inputRules"></v-text-field>
    <v-row>
      <v-col cols="12">in</v-col>
    </v-row>
    <v-select
      outlined
      :items="languages"
      label="language"
      class="mt-6"
      @change="selectLanguage"
      :rules="languageRules"
    ></v-select>
    <v-row>
      <v-col cols="12">How to express</v-col>
    </v-row>
  </div>
</template>
<script>
import { detailTemplateCommonData } from '@/common/detailTemplateCommonData'
export default {
  mixins: [detailTemplateCommonData]
}
</script>
