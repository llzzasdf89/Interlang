<template>
  <v-content >
    <v-container class="fill-height d-flex flex-column align-content-start">
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title >Set your gender</v-list-item-title>
      </v-list>
      <v-list width="100%" style="background:rgb(243,245,250)">
        <v-select :items="sex" rounded solo @change="selectSex" :rules='sexRules'></v-select>
      </v-list>
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title >Set your avartar</v-list-item-title>
      </v-list>
      <v-list width="100%" style="background:rgb(243,245,250)">
        <v-file-input solo rounded @change='submitAvatar' accept='.jpeg, .png, .jpg'></v-file-input>
      </v-list>
      <v-list class="text-left" width="100%" style="background:rgb(243,245,250)">
        <v-list-item-title >Select your tags</v-list-item-title>
      </v-list>
      <v-list width="100%" style="background:rgb(243,245,250)" >
          <v-select :items="tags" rounded solo  multiple v-model='selectedTags'></v-select>
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
          <v-btn block rounded x-large color="primary" @click="logOut">Log Out</v-btn>
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
      sex: ['male', 'female'],
      sexRules: [v => !!v || 'The sex can not be empty'],
      selectedSex: '',
      motherLanguageNum: 1,
      inLanguageNum: 1,
      Avartar: '',
      mothertongue: '' || this.$store.state.user.FirstLanguage,
      interstedLanguages: [],
      selectedTags: [],
      selectedLevels: []
    }
  },
  computed: {
    tags: function () {
      let tags = this.$store.state.tags
      tags = tags.map(v => v.Name)
      return tags
    },
    user: function () {
      return this.$store.state.user
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
    submitAvatar: function (e) {
      this.$data.Avartar = e
      if (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = () => {
          this.$data.Avartar = reader.result
        }
      }
    },
    submit: function () {
      const interstedLanguage = this.$data.interstedLanguages
      const isRepeat = this.checkInLanguagesRepeat(interstedLanguage)
      const avatar = this.$data.Avartar
      const selectedTags = this.$data.selectedTags
      const gender = this.$data.selectedSex
      const FirstLanguage = this.$data.mothertongue
      const level = this.$data.selectedLevels
      if (isRepeat) return alert('You can not choose same intersted languages !')
      if (!gender) return alert('Gender could not be empty!')
      if (!avatar) return alert('avatar could not be empty!')
      if (selectedTags.length === 0) return alert('you should choose some tags')
      if (!FirstLanguage) return alert('mother tongue could not be empty!')
      if (interstedLanguage.length === 0) return alert('interst language could not be empty! You must choose at least 1 intersted language')
      if (level.length === 0) return alert('level could not be empty!')
      const tags = this.findMatchedTagsID(selectedTags)
      const FirstLanguageID = this.findMatchedLanguageID(FirstLanguage)
      const params = {
        avatar,
        tags: tags.toString(),
        gender,
        firstLanguage: FirstLanguageID
      }
      this.http.post('/user/interestedlanguage', {
        interestedLanguage: interstedLanguage,
        level
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.http.post('/user/setting', params).then(res => {
        if (res.data.success) {
          this.http.fetchUserInfo().then(res => {
            this.$store.commit('updateUser', res.data)
            alert('edit setting success')
            this.$router.push({ name: 'Home' })
          })
        } else {
          alert('edit setting error ' + res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    checkInLanguagesRepeat: function (inArr) {
      for (let i = 0; i < inArr.length - 1; i++) {
        for (let j = i + 1; j < inArr.length; j++) {
          if (inArr[i] === inArr[j]) return true
        }
      }
      return false
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
    findMatchedLanguageID (selectedLanguage) {
      const allLanguages = this.$store.state.languages
      const matchID = allLanguages.map(v => {
        if (v.Name === selectedLanguage) return v.ID
      })[0] || -1
      return matchID
    }
  }
}
</script>
