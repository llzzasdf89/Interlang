<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid class="fill-height align-end justify-center">
        <v-col cols="12">
        <v-card flat>
          <v-card-title class="d-block display-1 font-weight-bold blue--text text--darken-1">InterLang</v-card-title>
          <v-card-subtitle class="subtitle-1 font-weight-medium">A global Q&A community</v-card-subtitle>
        </v-card>
        </v-col>
        <v-row align="end" justify="center"  class="mx-12" height='500px'>
          <v-col cols="12" sm="12" md="12">
            <div>
              <v-btn x-large color="primary" block rounded @click="register">Register</v-btn>
            </div>
          <div class='my-8'>
              <v-btn x-large color="primary" block outlined rounded @click="logIn">Login</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Begin',
  props: {
    source: String
  },
  methods: {
    register: function () {
      this.$router.push({ name: 'Register', params: { isLogin: false } })
    },
    logIn: function () {
      this.$router.push({ name: 'Register', params: { isLogin: true } })
    }
  }
}
</script>
