<template>
  <div>
    This question is about
    <v-row>
      <v-col cols="12">
        <v-select
          outlined
          :items="languages"
          label="language"
          class="mt-6"
          @change="selectLanguage"
          :rules="languageRules"
        >></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea auto-grow :label="hint" outlined @input="subscribe" :rules="inputRules"></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { detailTemplateCommonData } from '@/common/detailTemplateCommonData'
export default {
  mixins: [detailTemplateCommonData]
}
</script>
