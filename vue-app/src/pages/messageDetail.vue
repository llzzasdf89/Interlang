<template>

<v-container>
<Message> </Message>
<MessageBar></MessageBar>
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
  computed: {
    msgID: function () {
      return this.$route.params.msgID
    }
  }
}
</script>
