<template>
<v-content>
<v-container class="fill-height d-flex flex-column align-content-start">
    <v-list two-line class='text-left' width='100%'>
    <v-list-item-title>Mother togue</v-list-item-title>
<v-list-item-subtitle class="mb-2">You can register at most 2 mother-togues</v-list-item-subtitle>
</v-list>
<settingItem v-for='n in motherLanguageNum' :key='n' class='mb-4'>

</settingItem>
<v-list width="100%" v-if='motherLanguageNum<2'><v-btn @click='addMotherLanguage' rounded elevation='0' dark>ADD mother togue</v-btn></v-list>
<v-list class='text-left' width='100%'>
    <v-list-item-title>Intersted Language</v-list-item-title>
</v-list>
<settingItem v-for='i in inLanguageNum' :key='(i*10)' class="mb-4">

</settingItem>
<v-list width="100%" ><v-btn @click='addInterstedLanguage' rounded dark elevation="0">Add intersted language</v-btn></v-list>
<v-list class='text-left mt-5' width="100%">The country or region you are familiared with</v-list>
<v-list width='100%'><v-select></v-select></v-list>
<v-list class='text-left mt-5' width="100%">The country or region you are intersted with</v-list>
<v-list width='100%'><v-select></v-select></v-list>
<v-footer color="white" width="100%">
    <v-col cols='12'><v-btn block rounded x-large color="primary">submit</v-btn>
    </v-col>
    <v-col cols="12"><v-btn block rounded x-large color="primary" @click='logOut'>Login Out</v-btn></v-col>
    </v-footer>
</v-container>
</v-content>
</template>
<script>
import settingItem from '@/components/settingItem'
export default {
  components: {
    settingItem
  },
  data: function () {
    return {
      motherLanguageNum: 1,
      inLanguageNum: 1
    }
  },
  methods: {
    addMotherLanguage: function () {
      this.$data.motherLanguageNum += 1
    },
    addInterstedLanguage: function () {
      console.log(this.$data.settingItemNum)
      this.$data.inLanguageNum += 1
    },
    logOut: function () {
      this.$router.push('/begin')
    }
  }
}
</script>
