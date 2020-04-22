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
                <v-form v-model='isDataValid' v-if='!$route.params.isLogin'>
                  <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                    prepend-icon="mdi-account-circle"
                    v-model="username"
                    clearable
                    :rules='usernameRules'
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                    :rules='passwordRules'
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
                    :rules='confirmRules'
                    prepend-icon="mdi-lock"
                    v-if="!$route.params.isLogin"
                    required
                  />
                  <v-text-field
                    id="email-address"
                    label="Email"
                    name="email"
                    type="email"
                    v-model="email"
                    :rules='emailRules'
                    prepend-icon="mdi-email"
                    v-show="!$route.params.isLogin"
                    required
                  >
                    <template v-slot:append>
                      <v-tooltip bottom>
                        <template v-slot:activator = "{ on }">
                          <v-btn v-on='on' icon :loading='vCodeLoading'  :disabled='!email' @click='sendCodeMail'>
                             <v-icon>mdi-send</v-icon>
                             <template v-slot:loader>
                                    <span>
                                        {{seconds}}
                                    </span>
                                  </template>
                            </v-btn>
                        </template>
                        click to send verification code
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
                    :rules='verificationCodeRules'
                    v-if="!$route.params.isLogin"
                    required
                  />
                </v-form>
                <v-form v-else v-model='isDataValid'>
                   <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                    prepend-icon="mdi-account-circle"
                    v-model="username"
                    clearable
                    :rules='[usernameRules[0]]'
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model="password"
                    :rules='[passwordRules[0]]'
                    prepend-icon="mdi-lock"
                    clearable
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="submitData" :disabled='!isDataValid' :loading='loginLoading'>{{title}}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<style scoped>

</style>
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
      isDataValid: false,
      vCodeLoading: false,
      loginLoading: false,
      seconds: 60,
      usernameRules: [
        v => !!v || 'username is required',
        v => /^[a-zA-Z0-9_-]{4,16}$/.test(v) || 'The user name consists of 4-16 letters, numbers, underscores, and subtractions, and must begin with a letter'],
      username: '',
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Password should contain least 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 digit:'
      ],
      repassword: '',
      confirmRules: [v => v === this.$data.password || 'The password is not equal', v => v === this.$data.password || 'The password is not equal'],
      email: '',
      emailRules: [v => !!v || 'Email is required', v => /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v) || 'email is invalid'],
      verificationCode: '',
      verificationCodeRules: [v => !!v || 'verification code is required', v => /^\d{6}$/.test(v) || 'verificationCode should be 6 digits number']
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    fetchUserData: function (token) {
      this.setToken(token)
      this.http.get('/user/info').then(res => {
        if (res.success) {
          console.log(res.data)
          this.$store.commit('updateUser', res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setToken (token) {
      this.$store.commit('updateToken', token)
    },
    submitData: function () {
      this.$data.loginLoading = true
      const isLogin = this.$route.params.isLogin
      const params = {
        username: this.$data.username,
        password: this.$data.password
      }
      if (!isLogin) {
        params.repassword = this.$data.repassword
        params.verificationCode = this.$data.verificationCode
        params.email = this.$data.email
      }
      this.register_login(params)
    },
    register_login: function (paramsObj) {
      const isLogin = this.$route.params.isLogin
      this.http.post('/user/login', paramsObj).then(res => {
        const isSuccess = res.data.success
        if (isSuccess && isLogin) {
          alert('Login Success!')
          const token = res.data.data.token
          this.fetchUserData(token)
          this.$router.push('/index/user/setting', { from: 'login' })
        } else if (isSuccess && !isLogin) {
          alert('Register success!')
          this.$router.goBack()
        } else if (!isSuccess && isLogin) alert('Username or password error, please check again')
        else if (!isSuccess && !isLogin) alert('Register failed, please check your information')
        this.$data.loginLoading = false
      }).catch(err => {
        console.log(err)
        alert('Sorry,an error occured during the process, please try again')
        this.$data.loginLoading = false
      })
    },
    sendCodeMail: function () {
      this.$data.vCodeLoading = true
      const It = setInterval(() => {
        if (this.$data.seconds === 0) {
          this.$data.vCodeLoading = false
          clearInterval(It)
          this.$seconds = 60
        } else this.$data.seconds--
      }, 1000)
    }
  }
}
</script>
