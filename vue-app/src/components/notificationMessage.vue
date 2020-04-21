<template>
  <div style="width:100%">
    <v-row v-if='typeID === 1' class='noti-border '>
      <v-col cols="2" >
        <v-list style="background:rgb(243,245,250)">
          <v-list-item >
            <v-list-item-avatar class="message-avatar" size='50' >
              <v-img @click.native='toUserDetail(1)'></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10" class="d-flex text-left" @click='toMessageDetail(fromID)' v-ripple>
        <v-list style="background:rgb(243,245,250)" >
          <v-list-item-title >
            <span class="font-weight-bold">{{fromUser}}</span>&nbsp;{{title}}
          </v-list-item-title>
          <v-list-item-action-text>{{date}}</v-list-item-action-text>
        </v-list>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row v-if='typeID === 0' v-ripple class='noti-border'>
    <v-col cols='12'>
      <v-list two-line style="background:rgb(243,245,250)" >
        <v-list-item-title>
            System Notification
          </v-list-item-title >
          <v-list-item-title class='text-center'>{{title}}</v-list-item-title>
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
export default {
  props: ['title', 'fromUser', 'Avatar', 'fromID', 'createAt', 'typeID'],
  computed: {
    date: (e) => {
      const dt = new Date(e.createAt * 1000)
      const month = dt.getMonth() + 1
      const day = dt.getDate()
      const date = `${month}.${day}`
      return date
    }
  },
  methods: {
    toUserDetail (userID) {
      this.$router.push({ name: 'friendDetail', params: { userID } })
    },
    toMessageDetail (msgID) {
      this.$router.push({ name: 'Question', params: { msgID } })
    }
  }
}
</script>
