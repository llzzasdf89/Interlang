<template>
<v-app>
<v-container fluid>
<v-content>
<notificationMessage>
</notificationMessage>
</v-content>
</v-container>
</v-app>
</template>
<script>
import notificationMessage from '@/components/notificationMessage'
export default {
  components: {
    notificationMessage
  }
}
</script>
