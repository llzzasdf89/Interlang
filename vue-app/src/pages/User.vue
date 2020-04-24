<template>
  <v-app style="background:rgb(243,245,250)">
    <transition>
  <router-view></router-view>
</transition>
    <v-content v-show="$route.name==='User'">
      <v-container fluid>
        <v-card class="d-flex align-center mt-6" outlined>
          <v-col cols="2">
            <v-avatar left>
              <v-img :src="user.Avatar || ''"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" class="text-start">
            <v-list two-line>
              <v-list-item-title class="font-weight-bold">{{user.Name}}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium">{{user.Gender==='male'?'♂':'♀'}}</v-list-item-subtitle>
            </v-list>
          </v-col>
        </v-card>
        <v-card outlined class="mt-6">
          <v-row no-gutters>
            <v-col cols="5" @click='toFocus("Focus")'>
              <v-list-item two-line>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="capition">Followed</v-list-item-title>
                  <v-list-item-subtitle class="display-1">
                     {{user.Focus}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols='2'><v-divider vertical></v-divider></v-col>
            <v-col cols="5" @click='toFocus("Fans")'>
              <v-list-item two-line>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="capition">Follower</v-list-item-title>
                  <v-list-item-subtitle class="display-1">
                        {{user.Fans}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row v-for="n in items" :key="n.value">
            <v-col cols="12" class="d-flex justify-space-around">
              <v-list-item>
                <v-list-item-subtitle class="d-flex justify-space-between align-baseline">
                  <v-icon class="ml-1">mdi-thumb-up</v-icon>
                  <span>Number of like you got</span>
                  <span>{{user.Likes}}</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
        <tags :isDisabled=true :tags='user.Interests'></tags>
        <userReport :user='user'></userReport>
        <v-footer app>
          <v-col cols='12'> <v-btn block rounded x-large color="primary" @click="toSetting">Settings</v-btn></v-col>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import userReport from '@/components/userReport'
import tags from '@/components/tags'
export default {
  components: {
    userReport,
    tags
  },
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  data: function () {
    return {
      items: [{ icon: 'mdi-thumb-up', text: 'Number of like you got', value: 20 }]
    }
  },
  methods: {
    toSetting: function () {
      this.$router.push({ name: 'Setting' })
    },
    toFocus: async function (title) {
      if (title === 'Focus') {
        const data = await this.http.fetchFocus()
        const params = {
          title: 'You followed',
          users: data.data
        }
        this.$router.push({
          name: 'Focus',
          params
        })
      } else {
        const data = await this.http.fetchFans()
        const params = {
          title: 'Your follower',
          users: data.data
        }
        this.$router.push({
          name: 'Focus',
          params
        })
      }
    }
  }
}
</script>
