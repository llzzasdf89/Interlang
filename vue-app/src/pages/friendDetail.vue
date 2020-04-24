<template>
  <v-content style="background: rgb(243, 245, 250);">
    <transition>
  <router-view></router-view>
</transition>
    <v-container app class="fill-height d-flex align-content-start fluid align-center overflow-hidden" style="background:rgb(243,245,250)">
      <friendItem :user='$route.params.user'></friendItem>
      <tags :isDisabled="true" :textColor="'white'" :tags='$route.params.user.Tags'></tags>
      <userReport class='mx-5' :user='$route.params.user'></userReport>
      <v-footer app>
        <v-row dense>
          <v-col cols="6" class="d-flex flex-column align-center">
            <v-btn icon>
              <v-icon>mdi-message</v-icon>
            </v-btn>
            <span class="subtitle-2">chat</span>
          </v-col>
          <v-col cols="6" class="d-flex flex-column align-center">
            <v-btn icon @click='focus' :loading='loading'>
              <v-icon v-if='!isFocus'>mdi-plus-box-outline</v-icon>
              <v-icon v-else>mdi-check</v-icon>
            </v-btn>
            <span class="subtitle-2">{{focusText}}</span>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-content>
</template>
<script>
import friendItem from '@/components/friendItem'
import tags from '@/components/tags'
import userReport from '@/components/userReport'
export default {
  data: function () {
    return {
      isFocus: false,
      focusText: 'follow',
      loading: false
    }
  },
  methods: {
    focus: function () {
      const isFocus = this.$data.isFocus
      this.$data.isFocus = !isFocus
      if (isFocus) this.$data.focusText = 'follow'
      else this.$data.focusText = 'followed'
    },
    toChat: function () {
      this.$router.push({ name: 'Chat' })
    }
  },
  components: {
    friendItem,
    tags,
    userReport
  }
}
</script>
