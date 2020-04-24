<template>
<div>
<v-list style="background:rgb(243,245,250)">{{now}}</v-list>
 <v-row dense align="center" class='mb-5'>
      <v-col class='pr-0 mr-0'  :order='To?3:2' cols='2'>
        <v-avatar><v-img :src="messageObj.self.Avatar"></v-img></v-avatar>
      </v-col>
      <v-col :class="To?'messageTo':'messageFrom'" cols='10' order='2'>
        <v-alert :color="To?'blue lighten-3':'blue-grey lighten-4'"  class='ma-0 d-flex' >{{messageObj.content}}</v-alert>
      </v-col>
    </v-row>
    </div>
</template>
<style scoped>
.messageTo{
  word-break: break-all;
    display:flex;
    justify-content: flex-end;
    line-break: anywhere;
    text-align: left;
    overflow:hidden
}
.messageFrom{
  word-break: break-all;
  display:flex;
  line-break: anywhere;
    overflow:hidden;
    text-align:left
}
</style>
<script>
export default {
  props: ['To', 'messageObj'],
  computed: {
    now: function () {
      const dt = new Date()
      const hours = dt.getHours()
      const minutes = dt.getMinutes()
      const seconds = dt.getSeconds()
      const now = `${hours}:${minutes}:${seconds}`
      return now
    }
  }
}
</script>
