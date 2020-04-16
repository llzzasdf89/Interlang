<template>
<v-content>
<v-container class="fill-height d-flex flex-column align-content-start">
    <v-list two-line class='text-left' width='100%'>
    <v-list-item-title>母语</v-list-item-title>
<v-list-item-subtitle class="mb-2">您最多可以注册2种语言</v-list-item-subtitle>
</v-list>
<settingItem v-for='n in motherLanguageNum' :key='n' class='mb-4 light-green'>

</settingItem>
<v-list width="100%"><v-btn @click='addMotherLanguage' rounded elevation='0' dark>添加母语</v-btn></v-list>
<v-list class='text-left' width='100%'>
    <v-list-item-title>感兴趣的语言</v-list-item-title>
</v-list>
<settingItem v-for='i in inLanguageNum' :key='(i*10)' class="mb-4 red">

</settingItem>
<v-list width="100%" ><v-btn @click='addInterstedLanguage' rounded dark elevation="0">添加感兴趣的语言</v-btn></v-list>
<v-list class='text-left mt-5' width="100%">你熟知的国家和地区</v-list>
<v-list width='100%'><v-select></v-select></v-list>
<v-list class='text-left mt-5' width="100%">你所感兴趣的国家和地区</v-list>
<v-list width='100%'><v-select></v-select></v-list>
<v-footer color="white" width="100%">
    <v-col cols='12'><v-btn block rounded x-large color="primary">提交</v-btn>
    </v-col>
    <v-col cols="12"><v-btn block rounded x-large color="primary" @click='logOut'>退出登陆</v-btn></v-col>
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
      console.log(this.$data.settingItemNum)
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
