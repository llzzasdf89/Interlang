<template>
  <v-app id="inspire">
    <v-content>
      <transition>
  <router-view></router-view>
</transition>
      <v-container fluid class="fill-height align-end justify-center">
        <v-col cols="12">
          <v-card flat>
            <div><img src='@/assets/Logo.png' class='logo'></div>
            <v-card-title
              class="d-block display-1 font-weight-bold blue--text text--darken-1"
            >InterLang</v-card-title>
            <v-card-subtitle class="subtitle-1 font-weight-medium">A Multi-lingual Learning and Culture Exchange Comminuty</v-card-subtitle>
          </v-card>
        </v-col>
        <v-row align="end" justify="center" class="mx-12" height="500px">
          <v-col cols="12" sm="12" md="12">
            <div>
              <v-btn
                x-large
                color="primary"
                block
                rounded
                :to="{name: 'Register', params: {isLogin:false}}"
              >Register</v-btn>
            </div>
            <div class="my-8">
              <v-btn
                x-large
                color="primary"
                block
                outlined
                rounded
                :to="{name:'logIn', params: {isLogin:true}}"
              >Login</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<style scoped>
.logo {
      height:150px;
      border-radius:50%;
}
</style>
<script>
export default {
  name: 'Begin',
  props: {
    source: String
  }
}
</script>
