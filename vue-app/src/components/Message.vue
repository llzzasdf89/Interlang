
<template>
  <v-row>
    <v-col cols="2" class="overflowControl">
      <v-avatar>
        <img src="@/assets/IMG_3154.jpeg" />
      </v-avatar>
      <span class="text--primary subtitle-2">Richard</span>
    </v-col>
    <v-col cols="10">
      <v-card class="mx-auto text-left" max-width="344" shaped>
        <v-card-text>
          <div>
            <v-icon left small>mdi-message-text-outline</v-icon>
            <span class="subtitle-2 d-inline-block mr-2">Mother Tongue</span>
            <span class="subtitle-2 font-weight-black pb-4">Chinese</span>
          </div>
          <div :class="type==='comment'?'hiddenInput':''">
            <v-icon left small>mdi-message-text-outline</v-icon>
            <span class="subtitle-2 font-weight-black">Chinese</span>
          </div>
          <p :class="type==='comment'?'hiddenInput':''">Question about Chinese</p>
          <div
            class="text--primary"
          >I don't like that.and I don't like it when you say things like that.<br/>How to express it in Chinese?</div>
          <div class="text-center">
          </div>
          <div class="mt-2">
         <v-row dense>
              <v-col cols="2">
                <v-btn @click='changeState' icon>
                  <v-icon size="20px">mdi-message-reply</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click='like' :loading='likeLoading' >
                  <v-icon size="22px">{{liked?'mdi-thumb-up':'mdi-thumb-up-outline'}}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
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
export default {
  props: ['type'],
  data: function () {
    return {
      liked: false,
      likeLoading: false
    }
  },
  methods: {
    changeState: function () {
      const store = this.$store
      store.commit('clickOnDom')
    },
    like: function () {
      this.$data.likeLoading = true
      setTimeout(() => {
        this.$data.likeLoading = false
        this.$data.liked = !this.$data.liked
      }, 1000)
    }
  }
}
</script>
