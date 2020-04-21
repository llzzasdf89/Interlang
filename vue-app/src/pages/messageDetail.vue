<template>

<v-container app fluid style="background:rgb(243,245,250)" class='fill-height'>
<Message :content="$route.params.messageObj.Content" :user="$route.params.messageObj.User" :language="$route.params.messageObj.Language"  :createdAt='$route.params.messageObj.CreateAt'> </Message>
<Message v-for='item in comments' :key='item.ID' type='comment'  :content='item.Content' :user="item.User" :createdAt='item.Date'> </Message>
<v-alert type='success' transition="scale-transition" :value='showAlert'>
reply success
</v-alert>
<MessageBar @showAlert='msgAlert' ></MessageBar>
</v-container>
</template>

<script>
import Message from '@/components/message'
import MessageBar from '@/components/messageBar'
export default {
  components: {
    MessageBar,
    Message
  },
  mounted () {
    if (this.$route.params.messageObj.AnswerCount <= 0) return
    this.http.get(`/questions/answers?questionID=${this.$route.params.msgID}`).then(res => {
      if (res.success) {
        console.log(res.data)
        this.$data.comments = res.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  data: function () {
    return {
      showAlert: false,
      comments: []
    }
  },
  computed: {
    msgID: function () {
      return this.$route.params.msgID
    }
  },
  methods: {
    msgAlert: function () {
      this.$data.showAlert = true
      setTimeout(() => { this.$data.showAlert = false }, 1500)
    }
  }
}
</script>
