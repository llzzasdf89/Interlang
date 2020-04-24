<template>
  <div style="width:100%">
    <v-row v-if='messageObj.From.ID === 1' class='noti-border '>
      <v-col cols="2" >
        <v-list style="background:rgb(243,245,250)">
          <v-list-item >
            <v-list-item-avatar class="message-avatar" size='50' >
              <v-img @click.native='toUserDetail(1)'></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10" class="d-flex text-left" @click='toMessageDetail(messageObj.Link)' v-ripple>
        <v-list style="background:rgb(243,245,250)" >
          <v-list-item-title >
            <span class="font-weight-bold">{{messageObj.From.Name}}</span>&nbsp;{{messageObj.Title}}
          </v-list-item-title>
          <v-list-item-action-text>{{date}}</v-list-item-action-text>
        </v-list>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row v-if='messageObj.From.ID === 0' v-ripple class='noti-border'>
    <v-col cols='12'>
      <v-list two-line style="background:rgb(243,245,250)" >
        <v-list-item-title>
            System Notification
          </v-list-item-title >
          <v-list-item-title class='text-center'>{{messageObj.title}}</v-list-item-title>
      </v-list>
    </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.noti-border{
  border-bottom:10px solid white;
  border-top:10px solid white;
}
.message-avatar {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<script>
import { dateFilter } from '@/common/dateFilter'
export default {
  mixins: [dateFilter],
  props: ['messageObj'],
  methods: {
    toUserDetail (userID) {
      this.$router.push({ name: 'friendDetail', params: { userID } })
    },
    toMessageDetail (msgID) {
      this.http.get(`question/${msgID}`).then(res => {
        if (res.success) {
          const messageObj = res.data
          this.$router.push({
            name: 'Question',
            params: {
              msgID,
              messageObj
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
