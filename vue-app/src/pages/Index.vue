<template>
<v-app id="index">
<v-system-bar app light></v-system-bar>
        <router-view></router-view>

<v-bottom-navigation app  grow color='blue text--lighten-3'>
    <v-btn to="/index/home" >
    <v-icon>mdi-home-outline</v-icon>
    </v-btn>
<v-btn to="/index/search">
    <v-icon>mdi-magnify</v-icon>
</v-btn>
<v-btn to="/index/post">
    <v-icon>mdi-plus-circle-outline</v-icon>
</v-btn >
<v-btn to="/index/notification">
    <v-icon>mdi-bell-outline</v-icon>
</v-btn>
<v-btn to="/index/user">
    <v-icon>mdi-account</v-icon>
</v-btn>
</v-bottom-navigation>
</v-app>
</template>
<script>
export default {
  data: function () {
    return {
    }
  },
  mounted () {

  }
}
</script>
