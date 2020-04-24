<template>

    <v-content class='d-flex flex-column'>
      <transition>
  <router-view></router-view>
</transition>
<scroller v-if="$route.name === 'Home'"
          ref="my_scroller"
          :on-infinite="infinite"
          noDataText="no more questions"
          >
      <v-container v-if="!$route.params.msgID" style="background:rgb(243,245,250)">
        <v-card elevation="0">
          <v-tabs v-model="tab" background-color="light-blue" center-active dark grow @change='changeTab'>
            <v-tab v-for="item in tabs" :key="item">{{item}}</v-tab>
          </v-tabs>
          <div  v-for="item in tabItems" :key="item.ID">
              <v-card class="mx-auto cardBorder" max-width="400" elevation="0" >
                <v-card-title>
                  <v-icon left small>mdi-message-text-outline</v-icon>
                  <span class="subtitle-1 d-inline-block mr-2">Mother tongue</span>
                  <span class="title font-weight-black">{{item.User.FirstLanguage}}</span>
                </v-card-title>

                <v-card-text @click='toMsgDetail(item.ID)' class="headline font-weight-bold">{{item.Content}}</v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img class="elevation-6" :src="item.User.Avatar" @click='toUserDetail(item.User.ID)'></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{item.User.Name}}</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon class="mr-1">mdi-comment</v-icon>
                      <span class="subheading mr-2">{{item.AnswerCount}}</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </div>
        </v-card>
      </v-container>
      </scroller>
    </v-content>
</template>
<style scoped>
.cardBorder{
  border-top:10px solid rgb(243,245,250);
  border-bottom:10px solid rgb(243,245,250);
}
</style>
<script>

export default {
  mounted () {
    this.fetchQuestions(this.$data.page++)
  },
  data: function () {
    return {
      tab: null,
      questions: [],
      tabs: [],
      tabItems: [],
      page: 0
    }
  },
  methods: {
    infinite: function (e) {
      setTimeout(() => {
        this.fetchQuestions(this.$data.page++, true)
      }, 1000)
    },
    scroll: function (e) {
      console.log(e)
    },
    toUserDetail (userID) {
      this.http.get(`/user/info/${userID}`).then(res => {
        if (res.success) {
          const user = res.data
          this.$router.push({
            name: 'friendDetail',
            params: {
              user
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchQuestions: function (page = 0, loadmore = false) {
      const that = this
      this.http.get(`/questions/list?page=${page}`).then(res => {
        if (res.success) {
          const questions = res.data
          that.$refs.my_scroller.finishInfinite(true)
          if (loadmore && JSON.stringify(res.data) === '[]') {
            return
          }
          const tabs = [...new Set(questions.map((v) => v.Language))]
          this.$data.tabs = [...new Set(this.$data.tabs.concat(tabs))]
          this.$data.questions = this.$data.questions.concat(questions)
          this.changeTab(0)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toMsgDetail: function (msgID) {
      const messageObj = this.findMatchedMsg(msgID)
      const params = {
        msgID,
        messageObj
      }
      this.$router.push({ name: 'Question', params })
    },
    findMatchedMsg: function (msgID) {
      const tabItems = this.$data.tabItems
      for (let i = 0; i < this.$data.tabItems.length; i++) {
        if (tabItems[i].ID === msgID) return tabItems[i]
      }
      return undefined
    },
    changeTab: function (tabIdx) {
      let questions = this.$data.questions
      const tab = this.$data.tabs[tabIdx]
      questions = questions.filter(v => v.Language === tab)
      this.$data.tabItems = questions
      // this.$data.tabItems.splice(0, tabItems.length, ...questions)
    }
  }
}
</script>
