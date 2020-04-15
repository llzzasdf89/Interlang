<template>
    <v-content>
      <router-view></router-view>
      <v-container v-if="!$route.params.msgID">
        <v-card elevation="0">
          <v-tabs v-model="tab" background-color="light-blue" center-active dark grow>
            <v-tab v-for="item in items" :key="item.content">{{item.tab}}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="mb-4" v-for="item in items" :key="item.id">
            <v-tab-item @click='toMsgDetail(item.id)'>
              <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                <v-card-title>
                  <v-icon left small>mdi-message-text-outline</v-icon>
                  <span class="subtitle-1 d-inline-block mr-2">母语</span>
                  <span class="title font-weight-black">中文</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">{{item.content}}</v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img class="elevation-6" src="@/assets/IMG_3154.jpeg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Richard Lee</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon class="mr-1">mdi-comment</v-icon>
                      <span class="subheading mr-2">256</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-content>
</template>

<script>
export default {
  data: function () {
    return {
      tab: null,
      items: [
        { tab: '德语', content: 'Tab 1 Content', id: 1 },
        { tab: '法语', content: 'Tab 2 Content', id: 2 },
        { tab: '日语', content: 'Tab 3 Content', id: 3 },
        { tab: '法语', content: 'Tab 4 Content', id: 4 },
        { tab: '意大利语', content: 'Tab 5 Content', id: 5 }
      ]
    }
  },
  methods: {
    toMsgDetail: function (msgID) {
      const params = {
        msgID
      }
      this.$router.push({ name: 'messageDetail', params })
    }
  }
}
</script>
