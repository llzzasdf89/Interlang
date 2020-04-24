<template>
  <div id="app" style="background:rgb(243,245,250)">
    <transition>
  <router-view></router-view>
</transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
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
  methods: {
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
            console.log(err)
          })
          if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
