<template>
<v-content>
<friendItem v-for='user in $route.params.users' :key='user.ID' :user='user' @click.native='toFriendDetail(user)'></friendItem>
</v-content>

</template>
<script>
import friendItem from '@/components/friendItem'
export default {
  components: {
    friendItem
  },
  methods: {
    toFriendDetail: function (user) {
      const params = {
        from: 'Focus',
        user
      }
      this.$router.push({ name: 'friendDetail', params })
    }
  }
}
</script>
