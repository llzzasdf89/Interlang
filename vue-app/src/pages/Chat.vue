<template>

<v-container app class='d-flex flex-column'>
<v-list class='ma-0'><v-alert dense outlined elevation='4' class='overflow-hidden'>You are talking to <span class="blue--text text--darken-2 font-weight-bold font-italic">Richard</span></v-alert></v-list>
<chatMessage :To='true'></chatMessage>
<chatMessage></chatMessage>
<v-footer app min-height='56px'>
    <v-row>
<v-col cols='10'>
    <v-textarea dense auto-grow hide-details rows='1' outlined ref='input' v-model='textareaInput' ></v-textarea>
</v-col>
<v-col cols='2'>
    <v-btn icon :disabled='!textareaInput'>
<v-icon @click='websocketsend'>mdi-arrow-right</v-icon>
</v-btn>
</v-col>
    </v-row>
</v-footer>
</v-container>
</template>
<style scoped>
</style>
<script>
import chatMessage from '@/components/chatMessage'
export default {
  components: {
    chatMessage
  },
  data () {
    return {
      websock: null,
      textareaInput: ''
    }
  },
  created () {
    this.initWebSocket()
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket () { // 初始化weosocket(必须)
      const wsuri = '后台给你的请求地址' // 请根据实际项目需要进行修改
      this.websock = new WebSocket(wsuri) // 新建一个webstock对象
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // websocket连接后发送数据(send发送)
      const actions = { undefined } // 请根据实际项目需要进行修改
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      this.redata = JSON.parse(e.data).data
      console.log(this.redata)
    },
    websocketsend () { // 数据发送
      const Data = this.data.textareaInput
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>
