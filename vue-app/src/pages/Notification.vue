<template>
<v-content style="background:rgb(243,245,250)">
  <scroller
          ref="my_scroller"
          :on-refresh="refresh"
          refreshText= 'pull to refresh'
          >
<v-container app class='fill-height d-flex flex-column '>
<notificationMessage v-for='i in notifications' :key='i.ID' :messageObj='i' @click.native='readMessage(i.ID)'>
</notificationMessage>
</v-container>
</scroller>
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
      notifications: [],
      page: 0
    }
  },
  mounted () {
    this.fetchNotifications()
    if (this.$store.state.notificationTimer === null) {
      const NotificationTimer = setInterval(() => {
        this.fetchNotifications()
      }, 180000)// 每隔三分钟请求一次新的Notificaiton
      this.$store.commit('updateTimer', NotificationTimer)
    }
  },
  methods: {
    refresh: function (e) {
      setTimeout(() => {
        this.fetchNotifications(this.page++)
        this.$refs.my_scroller.finishPullToRefresh()
      }, 1000)
    },
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
          const newNotifications = res.data
          const nonRepetitiveNotifications = this.calNonRepetitiveNotifications(newNotifications)
          this.$data.notifications = this.$data.notifications.concat(nonRepetitiveNotifications)
          this.calUnreadMessage(newNotifications)
        } else console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    calUnreadMessage (notifications) {
      const readedID = JSON.parse(localStorage.getItem('readedNotificationID'))
      const unreadId = notifications.filter((item) => !readedID.includes(item.ID))
      this.$store.commit('updateUnread', unreadId.length)
    },
    calNonRepetitiveNotifications (newNotifications) {
      const allNotifications = this.$data.notifications
      let nonRepetitiveNotifications = []
      if (allNotifications.length === 0) {
        nonRepetitiveNotifications = allNotifications.concat(newNotifications)
      } else {
        for (let i = 0; i < newNotifications.length; i++) {
          let flag = true
          for (let j = 0; j < allNotifications.length; j++) {
            if (allNotifications[j].ID === newNotifications[i].ID) flag = false
          }
          if (flag) {
            nonRepetitiveNotifications.push(newNotifications[i])
          }
        }
      }
      return nonRepetitiveNotifications
    }
  }
}
</script>
