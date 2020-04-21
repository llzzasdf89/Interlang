<template>
  <v-content >
    <v-container class="fill-height d-flex flex-column align-content-start">
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title>Set your name</v-list-item-title>
      </v-list>
      <v-list width="100%" style="background:rgb(243,245,250)">
        <v-text-field solo rounded v-model="name" :rules='nameRules'></v-text-field>
      </v-list>
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title >Set your gender</v-list-item-title>
      </v-list>
      <v-list width="100%" style="background:rgb(243,245,250)">
        <v-select :items="sex" rounded solo @change="selectSex" :rules='sexRules'></v-select>
      </v-list>
      <v-list two-line class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title>Mother tongue</v-list-item-title>
      </v-list>
      <settingItem class="mb-4" type="motherTogue" @selectmMotherTongue="selectmothertongue" ></settingItem>
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title>Intersted Language(s)</v-list-item-title>
        <v-list-item-subtitle class="mb-2">You can register at most 3 intersted languages</v-list-item-subtitle>
      </v-list>
      <settingItem
        v-for="i in inLanguageNum"
        :key="i"
        class="mb-4"
        @selectInterstedLanguage="selectInterstedLanguage"
        :id="i"
        @selectLevel="selectLevel"
      ></settingItem>
      <v-list width="100%" v-if="inLanguageNum<3" style="background:rgb(243,245,250)">
        <v-btn @click="addInterstedLanguage" rounded dark elevation="0">Add intersted language</v-btn>
      </v-list>
      <v-footer color="background:rgb(243,245,250)" width="100%">
        <v-col cols="12">
          <v-btn block rounded x-large color="primary" @click="submit">submit</v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block rounded x-large color="primary" @click="logOut">Login Out</v-btn>
        </v-col>
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
      name: '',
      nameRules: [v => !!v || 'The name can not be empty'],
      sex: ['male', 'female'],
      sexRules: [v => !!v || 'The sex can not be empty'],
      selectedSex: '',
      motherLanguageNum: 1,
      inLanguageNum: 1,
      mothertongue: '',
      interstedLanguages: [],
      selectedLevels: []
    }
  },
  methods: {
    addInterstedLanguage: function () {
      this.$data.inLanguageNum += 1
    },
    selectmothertongue: function (lan) {
      this.$data.mothertongue = lan
    },
    selectInterstedLanguage: function (lanObj) {
      const id = lanObj.id
      const lan = lanObj.lan
      this.$data.interstedLanguages[id - 1] = lan
    },
    selectLevel: function (levelObj) {
      const level = levelObj.level
      const id = levelObj.id
      this.$data.selectedLevels[id - 1] = level
    },
    selectSex: function (sex) {
      this.$data.selectedSex = sex
    },
    logOut: function () {
      this.$store.commit('updateToken', null)
      this.$store.commit('updateUser', null)
      this.$store.commit('updateUnread', 0)
      setTimeout(() => {
        alert('you have successfully logged out!')
      }, 100)
      this.$router.push('/begin')
    },
    submit: function () {
      const interstArr = this.$data.interstedLanguages
      const repeat = this.checkInLanguagesRepeat(interstArr)
      if (repeat) alert('You can not choose same intersted languages !')
      else {
        const sex = this.$data.selectedSex
        const name = this.$data.name
        const mothertongue = this.$data.mothertongue
        const levels = this.$data.selectedLevels
        if (!name) {
          alert('Name could not be empty!')
          return
        }
        if (!sex) {
          alert('Sex could not be empty!')
          return
        }
        if (!mothertongue) {
          alert('mother tongue could not be empty!')
          return
        }
        if (interstArr.length === 0) {
          alert('interst language could not be empty!You must choose at least 1 intersted language')
          return
        }
        if (levels.length === 0) {
          alert('level could not be empty!')
          return
        }
        this.$router.push('/index/user')
      }
    },
    checkInLanguagesRepeat: function (inArr) {
      for (let i = 0; i < inArr.length - 1; i++) {
        for (let j = i + 1; j < inArr.length; j++) {
          if (inArr[i] === inArr[j]) return true
        }
      }
      return false
    }
  }
}
</script>
