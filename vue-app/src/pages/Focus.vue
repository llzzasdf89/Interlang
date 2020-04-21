<template>
<v-content>
<friendItem @click.native='toFriendDetail(1)'></friendItem>
</v-content>

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
        from: 'Focus',
        userID
      }
      this.$router.push({ name: 'friendDetail', params })
    }
  }
}
</script>
