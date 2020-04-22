<template>
<v-content style="background:rgb(243,245,250)">
<v-container app class='fill-height d-flex flex-column '>
<notificationMessage v-for='i in notifications' :key='i.ID' :messageObj='i' @click.native='readMessage(i.ID)'>
</notificationMessage>
</v-container>
</v-content>
</template>
<script>
import notificationMessage from '@/components/notificationMessage'
export default {
  components: {
    notificationMessage
  },
  data: function () {
    return {
      readedNotificationsID: [],
      notifications: []
    }
  },
  mounted () {
    this.fetchNotifications()
    // 这里需要加入与 后端对接的逻辑，获取该用户的所有Notification，并与已经缓存过的做对比，计算出未读信息数量
    if (this.$store.state.notificationTimer === null) {
      const NotificationTimer = setInterval(() => {
        this.fetchNotifications()
      }, 180000)// 每隔三分钟请求一次新的Notificaiton
      this.$store.commit('updateTimer', NotificationTimer)
    }
  },
  methods: {
    readMessage: function (msgid) {
      const readedNotificationsID = this.$store.state.readedNotificationsID
      if (!readedNotificationsID.includes(msgid)) {
        this.$store.commit('updateReaded', msgid)
        localStorage.setItem('readedNotificationID', JSON.stringify(readedNotificationsID))
      }
    },
    fetchNotifications: function (page = 0) {
      this.http.get('user/notifications?page=' + page).then(res => {
        if (res.success) {
          this.$data.notifications = res.data
          this.calUnreadMessageNum(this.$data.notifications)
        } else console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    calUnreadMessageNum (allNotifications) {
      const readedID = JSON.parse(localStorage.getItem('readedNotificationID'))
      const unreadId = allNotifications.filter((item) => !readedID.includes(item.ID))
      this.$store.commit('updateUnread', unreadId.length)
      return unreadId.length
    }
  }
}
</script>
