<template>
<v-content style="background:rgb(243,245,250)">
<v-container app class='fill-height d-flex flex-column '>
<notificationMessage v-for='i in notifications' :key='i.ID' :title='i.Title' :fromUser='i.From.Name' :Avatar='i.From.Avatar' :fromID='i.Link' :createAt ='i.CreateAt' :typeID='i.From.id' @click.native='readMessage(i.ID)'>
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
      notifications: [{
        ID: 2,
        Title: 'invites you to answer question',
        CreateAt: 1587152337,
        Link: 1,
        From: {
          id: 1,
          Name: 'Issac',
          Avatar: '@/assets/IMG_3154.jpeg',
          Email: '1095313400@qq.com'
        }
      },
      {
        ID: 1,
        Title: '欢迎注册',
        CreateAt: 1587152327,
        Link: 0,
        From: {
          id: 0,
          Name: 'System information',
          Avatar: '',
          Email: ''
        }
      }]
    }
  },
  mounted () {
    const readedNotificationsID = JSON.parse(localStorage.getItem('readedNotificationID'))
    // 这里需要加入与 后端对接的逻辑，获取该用户的所有Notification，并与已经缓存过的做对比，计算出未读信息数量
    // setInterval(() => {
    //   this.fetchNotifications()
    // }, 180000)// 每隔三分钟请求一次新的Notificaiton
    this.$store.commit('updateUnread', 3)
    this.$data.readedNotificationsID = readedNotificationsID
  },
  methods: {
    readMessage: function (msgid) {
      let readedNotificationsID = this.$data.readedNotifications
      if (readedNotificationsID == null) readedNotificationsID = []
      if (!readedNotificationsID.includes(msgid)) {
        readedNotificationsID.push(msgid)
        this.$data.readedNotifications = readedNotificationsID
        localStorage.setItem('readedNotificationID', JSON.stringify(readedNotificationsID))
      }
    },
    fetchNotifications: function () {
      this.http.get('user/notifications?page=0').then(res => {
        if (res.success) {
          this.$data.notifications = res.data.notifications
          this.calUnreadMessageNum(res.data.notifications)
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
