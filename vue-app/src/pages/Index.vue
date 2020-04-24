<template>
  <v-app id="index" style="background:rgb(243,245,250)">
    <v-system-bar app window color="white"></v-system-bar>
    <v-app-bar app dense dark class="text-center" v-if='$route.name !== "Home"' >
      <v-row>
        <v-col cols="1" v-show="iconShow" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-col>
        <v-col :cols="iconShow?10:12">{{title}}</v-col>
      </v-row>
    </v-app-bar>
   <transition>
  <router-view></router-view>
</transition>
    <v-bottom-navigation app grow color="blue text--lighten-3" bottom v-model="bottomNav" v-if="$route.name!=='Chat' && $route.name!=='Setting'">
      <v-btn to="/index/home" value='home'>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn to="/index/friends" value='friends'>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn to="/index/post" value='post' >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
      <v-btn to="/index/notification" value='notification' @click='badgeShow = false'>
        <v-badge
        color="blue lighten-2"
        overlap
        bordered
        :content='unreadNotificationNum'
        :value='badgeShow'
      >
      <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
      </v-btn>
      <v-btn to="/index/user" value='user'>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  mounted () {
    const token = this.$store.state.token || localStorage.getItem('token')
    if (token) {
      this.$store.commit('updateToken', token)
      this.autoLogin()
    } else {
      alert('Please log in first')
      this.$router.push({ name: 'Begin' })
    }
  },
  data: function () {
    return {
      bottomNav: undefined,
      badgeShow: false,
      unreadNotificationNum: 0
    }
  },
  watch: {
    $route: function (n, o) {
      if (n.name !== 'Notification') {
        const unread = this.$store.state.unreadNotificationNum
        if (unread > 0) {
          this.$data.badgeShow = true
          this.unreadNotificationNum = unread
        } else this.$data.badgeShow = false
      }
    }
  },
  computed: {
    title: function () {
      let name = this.$route.name || 'Home'
      if (name === 'Focus') {
        const title = this.$route.params.title
        return title
      }
      if (name === 'User') name = 'Me'
      if (name === 'Notification') name = 'Notifications'
      if (name === 'Friends') name = 'Language Partners'
      if (name === 'friendDetail') name = ''
      return name
    },
    iconShow: function () {
      const name = this.$route.name
      const iconShowPath = ['New Question', 'Question', 'friendDetail', 'Chat', 'Focus']
      if (iconShowPath.includes(name)) return true
      return false
    }
  },
  methods: {
    goBack: function () {
      if (this.$route.name === 'Chat' || this.$route.params.from === 'Focus') {
        return this.$router.go(-2)
      }
      this.$router.back()
    },
    autoLogin () {
      this.http.get('/user/newcomer').then(res => {
        if (res.success) {
          this.$router.push('/index/user/setting')
        } else {
          this.http.get('/user/info').then(res => {
            if (res.success) {
              this.$store.commit('updateUser', res.data)
              this.http.fetchTags()
              this.http.fetchLanguages()
              this.http.getUserInLans()
            } else {
              alert('get User info error, please try again later')
            }
          }).catch(err => {
            return err
          })
          if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' })
        }
      }).catch(err => {
        return err
      })
    }
  }

}
</script>
