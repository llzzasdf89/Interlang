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
            <v-btn icon @click='focus($route.params.user.ID)' :loading='loading'>
              <v-icon v-if='!isFocus'>mdi-plus-box-outline</v-icon>
              <v-icon v-else>mdi-check</v-icon>
            </v-btn>
            <span class="subtitle-2">{{isFocus?'followed':'follow'}}</span>
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
  mounted () {
    this.getUserFocused()
  },
  methods: {
    focus: async function (userID) {
      const isHisFans = this.$data.isFocus
      this.$data.loading = true
      const res = isHisFans ? await this.http.post('/user/fans/delete' + userID) : await this.http.post('/user/focus/add', { to: userID })
      console.log(res)
      if (res.data.success) {
        this.$data.loading = false
        this.$data.isFocus = !isHisFans
      } else alert('Follow partner error, please try again !')
    },
    getUserFocused: async function () {
      const userID = this.$store.state.user.ID
      const hisID = this.$route.params.user.ID
      const data = await this.http.get('/user/fans/' + hisID)
      const hisFans = data.data
      let isHisFans = false
      hisFans.forEach((v) => {
        console.log(v)
        if (v.ID === userID) isHisFans = true
      })
      this.$data.isFocus = isHisFans
    }
  },
  components: {
    friendItem,
    tags,
    userReport
  }
}
</script>
