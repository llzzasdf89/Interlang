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
              <v-img src="@/assets/IMG_3154.jpeg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="10" class="text-start">
            <v-list two-line>
              <v-list-item-title class="font-weight-bold">{{name}}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium">♂</v-list-item-subtitle>
            </v-list>
          </v-col>
        </v-card>
        <v-card outlined class="mt-6">
          <v-row no-gutters>
            <v-col cols="5" @click='toFocus("Your Follows")'>
              <v-list-item two-line>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="capition">Follow</v-list-item-title>
                  <v-list-item-subtitle class="display-1">
                     2
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols='2'><v-divider vertical></v-divider></v-col>
            <v-col cols="5" @click='toFocus("Your Follower")'>
              <v-list-item two-line>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="capition">Follower</v-list-item-title>
                  <v-list-item-subtitle class="display-1">
                        2
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
                  <v-icon class="ml-1">{{n.icon}}</v-icon>
                  <span>{{n.text}}</span>
                  <span>{{n.value}}</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
        <userReport></userReport>
        <v-footer app>
          <v-col cols='12'> <v-btn block rounded x-large color="primary" @click="toSetting">Settings</v-btn></v-col>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import userReport from '@/components/userReport'
export default {
  components: {
    userReport
  },
  computed: {
    name: function () {
      return this.$store.state.user.Name
    }
  },
  data: function () {
    return {
      items: [{ icon: 'mdi-thumb-up', text: 'Number of like you got', value: 20 }],
      motherLanguage: { language: '中文', value: 'native' },
      interstingLanguageItems: [
        { language: '英语', value: 'beginner' },
        { language: '德语', value: 'advanced' }
      ]
    }
  },
  methods: {
    toSetting: function () {
      this.$router.push({ name: 'Setting' })
    },
    toFocus: function (title) {
      this.$router.push({
        name: 'Focus',
        params: {
          title
        }
      })
    }
  }
}
</script>
