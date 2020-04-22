
<template>
  <v-row>
    <v-col cols="2"  :order="type==='comment'?'3':''">
      <v-avatar>
        <img src="@/assets/IMG_3154.jpeg" />
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
  props: ['type', 'messageObj'],
  data: function () {
    return {
      liked: false,
      likeLoading: false,
      unliked: false,
      unlikeLoading: false
    }
  },
  methods: {
    changeState: function () {
      const store = this.$store
      store.commit('clickOnDom')
    },
    like: function () {
      this.$data.likeLoading = true
      const answerID = this.messageObj.ID
      this.http.post(`like?answerID=${answerID}`).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() => {
        this.$data.likeLoading = false
        this.$data.liked = !this.$data.liked
      }, 1000)
    },
    unlike: function () {
      this.$data.unlikeLoading = true
      setTimeout(() => {
        this.$data.unlikeLoading = false
        this.$data.unliked = !this.$data.unliked
      }, 1000)
    }
  }
}
</script>
