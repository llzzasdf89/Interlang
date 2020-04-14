<template>
  <div>
    <v-row dense>
      <v-col cols="2">
        <v-list>
          <v-list-item>
            <v-list-item-avatar class="message-avatar">
              <v-img src="@/assets/IMG_3154.jpeg"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10" class="d-flex text-left">
        <v-list>
          <v-list-item-title>
            <span class="font-weight-bold">Richard</span>&nbsp;回答了你的问题
          </v-list-item-title>
          <v-list-item-subtitle>meistens einfach</v-list-item-subtitle>
          <v-list-item-content class="message-content py-0">
            "Hallo"
            ("guten Tag")
          </v-list-item-content>
          <v-list-item-action-text>{{date}}</v-list-item-action-text>
        </v-list>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>
<style scoped>
.message-avatar {
  position: absolute;
  left: 0;
  top: 0;
}
.message-content {
  display: -webkit-box;
  word-break: keep-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
<script>
export default {
  computed: {
    date: () => {
      const dt = new Date()
      const month = dt.getMonth() + 1
      const day = dt.getDate()
      const date = `${month}月${day}日`
      return date
    }
  }
}
</script>
