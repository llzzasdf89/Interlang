
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
            <span class="subtitle-2 d-inline-block mr-2">母语</span>
            <span class="subtitle-2 font-weight-black pb-4">中文</span>
          </div>
          <div :class="type==='comment'?'hiddenInput':''">
            <v-icon left small>mdi-message-text-outline</v-icon>
            <span class="subtitle-2 font-weight-black">中文(简体)</span>
          </div>
          <p :class="type==='comment'?'hiddenInput':''">关于中文的问题</p>
          <div
            class="text--primary"
          >I don't like that.and I don't like it when you say things like that.用 中文 怎么说?</div>
          <div class="text-center">
          </div>
          <div class="mt-2">
         <v-row dense>
              <v-col cols="2">
                <v-icon size="20px" @click='changeState'>mdi-message-reply</v-icon>
              </v-col>
              <v-col cols="2">
                <v-icon size="22px">mdi-bookmark</v-icon>
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
import { store } from '@/common/store'
export default {
  props: ['type'],
  methods: {
    changeState: function () {
      store.textarea.click()
    }
  }
}
</script>
