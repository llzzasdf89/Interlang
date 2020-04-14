<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" class="ma-1" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-row justify="space-between" class="mx-auto" text-align="center">
                  <v-icon @click="goBack">mdi-arrow-left</v-icon>
                  <v-toolbar-title class="flex-grow-1">{{title}}</v-toolbar-title>
                </v-row>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                    prepend-icon="mdi-account-circle"
                    v-model="username"
                    clearable
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    clearable
                    required
                  />
                  <v-text-field
                    id="repassword"
                    label="confirm your password"
                    name="repassword"
                    v-model="repassword"
                    type="password"
                    clearable
                    prepend-icon="mdi-lock"
                    v-show="!$route.params.isLogin"
                    required
                  />
                  <v-text-field
                    id="email-address"
                    label="Email"
                    name="email"
                    type="email"
                    v-model="email"
                    clearable
                    prepend-icon="mdi-email"
                    v-show="!$route.params.isLogin"
                    required
                  >
                    <template v-slot:append>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on">mdi-send</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                  </v-text-field>
                  <v-text-field
                    id="verificationCode"
                    label="verificationCode"
                    name="verificationCode"
                    type="number"
                    clearable
                    v-model="verificationCode"
                    prepend-icon="mdi-ticket-confirmation-outline"
                    v-show="!$route.params.isLogin"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="goNext">{{title}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  computed: {
    title: function () {
      const title = this.$route.params.isLogin ? 'Login' : 'Register'
      return title
    }
  },
  data: function () {
    return {
      username: '',
      password: '',
      repassword: '',
      email: '',
      verificationCode: ''
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    goNext: function () {
      const isLogin = this.$route.params.isLogin
      if (isLogin) {
        this.$router.push('/index')
      } else {
      }
    },
    sendCodeMail: function () {}
  }
}
</script>
