<template>
<v-app app>
<transition>
  <router-view></router-view>
</transition>
<v-content v-if="!$route.params.userID && $route.name!='Chat'" style="background:rgb(243,245,250)">
<friendItem @click.native='toFriendDetail(1)' >

</friendItem>
</v-content>
</v-app>
</template>

<script>
import friendItem from '@/components/friendItem'
export default {
  components: {
    friendItem
  },
  methods: {
    toFriendDetail: function (userID) {
      const params = {
        userID
      }
      this.$router.push({ name: 'friendDetail', params })
    }
  }
}
</script>
