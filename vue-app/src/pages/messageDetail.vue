<template>

<v-container app fluid style="background:rgb(243,245,250)" class='fill-height d-flex flex-column'>
<Message > </Message>
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
  data: function () {
    return {
      showAlert: false
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
