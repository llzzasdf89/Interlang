<template>

<v-container app class='d-flex flex-column'>
<v-list class='ma-0' style="background:rgb(243,245,250)"><v-alert dense outlined elevation='4' class='overflow-hidden'>You are talking to <span class="blue--text text--darken-2 font-weight-bold font-italic">{{$route.params.user.Name}}</span></v-alert></v-list>
<chatMessage :To='true' v-for='msg in Messages' :key='msg.id' :messageObj='msg'></chatMessage>
<v-footer app min-height='56px'>
    <v-row>
<v-col cols='10'>
    <v-textarea dense auto-grow hide-details rows='1' outlined ref='input' v-model='textareaInput' ></v-textarea>
</v-col>
<v-col cols='2'>
    <v-btn icon :disabled='!textareaInput' @click=sendMessage>
<v-icon>mdi-arrow-right</v-icon>
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
  mounted () {
    const self = this.$store.state.user
    const opposite = this.$route.params.user
    if (self.ID === opposite.ID) {
      alert('You can not chat with yourself!')
      this.$router.go(-2)
    }
    this.$data.self = self
    this.$data.opposite = opposite
    const oppositeID = opposite.ID
    const history = this.$store.state.history[oppositeID]
    this.$data.Messages = history
  },
  data () {
    return {
      textareaInput: '',
      Messages: [],
      self: '',
      opposite: ''
    }
  },
  beforeDestroy (to, from, next) {
    const oppositeID = this.$data.opposite.ID
    const chatHistoryObj = {
      oppositeID,
      history: this.$data.Messages || []
    }
    this.$store.commit('updateChatHistory', chatHistoryObj)
  },
  methods: {
    sendMessage () {
      const self = this.$store.state.user
      const opposite = this.$route.params.user
      const content = this.$data.textareaInput
      this.$data.textareaInput = ''
      const MessageObj = {
        self,
        opposite,
        content
      }
      if (Array.isArray(this.$data.Messages)) this.$data.Messages.push(MessageObj)
      else {
        this.$data.Messages = []
        this.$data.Messages.push(MessageObj)
      }
    }
  }
}
</script>
