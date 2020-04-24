
<template>
  <v-row>
    <v-col cols="2"  :order="type==='comment'?'3':''" class='overflowControl'>
      <v-avatar>
        <v-img :src="messageObj.User.Avatar" />
      </v-avatar>
      <span class="text--primary subtitle-2">{{messageObj.User.Name}}</span>
    </v-col>
    <v-col cols="10">
      <v-card class="mx-auto text-left"  >
        <v-card-text>
          <div>
            <v-icon left small>mdi-message-text-outline</v-icon>
            <span class="subtitle-2 d-inline-block mr-2">Mother Tongue</span>
            <span class="subtitle-2 font-weight-black pb-4">{{messageObj.User.FirstLanguage}}</span>
          </div>
          <div :class="type==='comment'?'hiddenInput':''">
            <v-icon left small>mdi-pen</v-icon>
            <span class="subtitle-2 font-weight-black">Chinese advanced</span>
          </div>
          <p :class="type==='comment'?'hiddenInput':''">Question about {{messageObj.Language}}</p>
          <div
            class="text--primary"
            style='white-space:pre'
          >{{messageObj.Content}}</div>
          <div class="text-center">
          </div>
          <div class="mt-2">
         <v-row dense>
              <v-col cols="2" v-if="type!=='comment'">
                <v-btn @click='changeState' icon>
                  <v-icon size="20px">mdi-message-reply</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2" v-if="type === 'comment'">
                <v-btn icon @click='like' :loading='likeLoading' >
                  <v-icon size="22px">{{liked?'mdi-thumb-up':'mdi-thumb-up-outline'}}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2" v-if="type === 'comment'">
                <v-btn icon @click='unlike' :loading='unlikeLoading' >
                  <v-icon size="22px">{{unliked?'mdi-thumb-down':'mdi-thumb-down-outline'}}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-list-item-subtitle>{{type==='comment'?'comment':'post'}} on {{date}}</v-list-item-subtitle>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<style  scoped>
.overflowControl {
  overflow: hidden;
  text-overflow: ellipsis;
}
.hiddenInput{
  display:none
}
</style>
<script>
import { dateFilter } from '@/common/dateFilter'
export default {
  mixins: [dateFilter],
  props: ['type', 'messageObj', 'Liked', 'Disliked'],
  data: function () {
    return {
      liked: false,
      unliked: false,
      likeLoading: false,
      unlikeLoading: false
    }
  },
  mounted () {
    this.$data.liked = this.Liked
    this.$data.unliked = this.Unliked
  },
  methods: {
    changeState: function () {
      const store = this.$store
      store.commit('clickOnDom')
    },
    postlike: function (method, answerID) {
      this.http.post(`like/${method}`, {
        answerID
      }).then(res => {
        if (res.data.success) this.$data.liked = !this.$data.liked
        setTimeout(() => {
          this.$data.likeLoading = false
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    },
    like: function () {
      this.$data.likeLoading = true
      const answerID = this.messageObj.ID
      if (this.$data.liked) this.postlike('delete', answerID)
      else this.postlike('add', answerID)
    },
    unlike: function () {
      this.$data.unlikeLoading = true
      const answerID = this.messageObj.ID
      if (this.$data.unliked) this.postunlike('delete', answerID)
      else this.postunlike('add', answerID)
    },
    postunlike: function (method, answerID) {
      this.http.post(`dislike/${method}`, {
        answerID
      }).then(res => {
        if (res.data.success) this.$data.unliked = !this.$data.unliked
        setTimeout(() => {
          this.$data.unlikeLoading = false
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
