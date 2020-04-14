<template>
  <v-app id="index">
    <v-system-bar app window color="white"></v-system-bar>
    <v-app-bar app dense dark class="text-center">
      <v-row>
        <v-col cols="1" v-show="iconShow" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-col>
        <v-col :cols="iconShow?10:12">{{title}}</v-col>
      </v-row>
    </v-app-bar>
    <router-view></router-view>
    <v-bottom-navigation app grow color="blue text--lighten-3" bottom v-model="bottomNav">
      <v-btn to="/index/home" value='home'>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn to="/index/search" value='search'>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn to="/index/post" value='post' >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <v-btn to="/index/notification" value='notification'>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn to="/index/user" value='user'>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  data: function () {
    return {
      bottomNav: 'home'
    }
  },
  computed: {
    title: function () {
      const name = this.$route.name || 'Home'
      return name
    },
    iconShow: function () {
      const name = this.$route.name
      if (name === 'postDetail') return true
      return false
    }
  },
  methods: {
    goBack: function () {
      this.$router.back()
    }
  }
}
</script>
