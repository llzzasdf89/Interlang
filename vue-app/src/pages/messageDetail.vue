<template>

<v-container app fluid style="background:rgb(243,245,250)" class='fill-height'>
<Message :messageObj ='$route.params.messageObj'> </Message>
<Message v-for='item in comments' :key='item.ID' type='comment'  :messageObj="item" :Liked='item.Liked' :Disliked='item.Disliked'> </Message>
<v-alert :type="commentSuccess?'success':'error'" transition="scale-transition" :value='showAlert'>
{{commentSuccess?'reply success':'reply failed'}}
</v-alert>
<MessageBar @showAlert='msgAlert' :messageObj='$route.params.messageObj' ></MessageBar>
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
    this.fetchComment()
  },
  data: function () {
    return {
      showAlert: false,
      commentSuccess: false,
      comments: []
    }
  },
  computed: {
    msgID: function () {
      return this.$route.params.msgID
    }
  },
  methods: {
    msgAlert: function (e) {
      this.$data.showAlert = true
      if (e) {
        this.fetchComment()
        this.$data.commentSuccess = true
      } else this.$data.commentSuccess = false
      setTimeout(() => { this.$data.showAlert = false }, 1500)
    },
    fetchComment: function () {
      this.http.get(`/questions/answers?questionID=${this.$route.params.msgID}`).then(res => {
        if (res.success) {
          this.$data.comments = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
