<template>
<v-app app style="background:rgb(243,245,250)">
<v-container fluid >
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
