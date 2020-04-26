<template>
<v-app app>
<transition>
  <router-view></router-view>
</transition>
<v-content v-if="!$route.params.userID && $route.name!='Chat' && $route.name==='Friends'" style="background:rgb(243,245,250)">
<friendItem @click.native='toFriendDetail(i.ID)'  v-for='i in friends' :key='i.ID' :user='i'>

</friendItem>
</v-content>
</v-app>
</template>

<script>
import friendItem from '@/components/friendItem'
export default {
  async mounted () {
    const data = await this.http.fetchFriends()
    this.$data.friends = data.data
  },
  components: {
    friendItem
  },
  data: function () {
    return {
      friends: []
    }
  },
  methods: {
    toFriendDetail: function (userID) {
      this.http.get('/user/info/' + userID).then(res => {
        const user = res.data
        const params = {
          userID,
          user
        }
        this.$router.push({ name: 'friendDetail', params })
      }).catch(err => {
        return err
      })
    }
  }
}
</script>
