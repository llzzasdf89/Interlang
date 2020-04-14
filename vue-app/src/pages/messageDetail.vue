<template>

<v-container>
    {{msgID}}
<Message>

</Message>
</v-container>

</template>

<script>
import Message from '@/components/Message'
export default {
  components: {
    Message
  },
  computed: {
    msgID: function () {
      return this.$route.params.msgID
    }
  }
}
</script>
