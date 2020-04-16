<template>
<v-app app>
<router-view></router-view>
<v-content v-if="!$route.params.userID">
<friendItem @click.native='toFriendDetail(1)'>

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
