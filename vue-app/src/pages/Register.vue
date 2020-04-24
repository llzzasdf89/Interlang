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
                    <!-- <template v-slot:append>
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
                    </template> -->
                  </v-text-field>
                  <!-- <v-text-field
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
                  /> -->
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
        v => /^[a-zA-Z0-9_-]{4,16}$/.test(v) || 'Each username must be at least 4, but no more than 16 characters and must begins with a letter. It can only contain letters(A-Z,a-z),numbers(0-9),underscores(-) and hyphens(_)'],
      username: '',
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Each password must contain at least 8 characters including at least 1 uppercase letter(A-Z), 1 lowercase letter(a-z) and 1 number (0-9)'
      ],
      repassword: '',
      confirmRules: [v => !!v || 'Re-enter your password to confirm', v => v === this.$data.password || 'The two passwords should be exactly the same'],
      email: '',
      emailRules: [v => !!v || 'Email is required', v => /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v) || 'Type in your valid email address and tap the plane'],
      verificationCode: '',
      verificationCodeRules: [v => !!v || 'Input the verification code received in your email which should be a 6-digit number', v => /^\d{6}$/.test(v) || 'verificationCode should be 6 digits number']
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    setToken (token) {
      this.$store.commit('updateToken', token)
      localStorage.setItem('token', token)
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
        params.email = this.$data.email
      }
      this.register_login(params)
    },
    register_login: function (paramsObj) {
      const isLogin = this.$route.params.isLogin
      const url = isLogin ? '/user/login' : '/user/register'
      this.http.post(url, paramsObj).then(res => {
        const isSuccess = res.data.success
        if (isSuccess && isLogin) {
          alert('Login Success!')
          const token = res.data.data.token
          this.fetchUserData(token)
        } else if (isSuccess && !isLogin) {
          alert('Register success!')
          this.$router.back()
        } else if (!isSuccess && isLogin) alert('Username or password error, please check again')
        else if (!isSuccess && !isLogin) alert('Register failed ' + res.data.msg)
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
    },
    fetchTags () {
      this.http.get('tags/list').then(res => {
        if (res.success) {
          this.$store.commit('updateTags', res.data)
        } else console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    fetchUserData: function (token) {
      this.setToken(token)
      this.http.get('/user/info').then(res => {
        if (res.success) {
          this.fetchSetting()
          this.fetchTags()
          this.fetchLanguages()
          this.$store.commit('updateUser', res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchLanguages: function () {
      this.http.get('/language/list').then(res => {
        if (res.success) {
          const languages = res.data
          this.$store.commit('updateLanguage', languages)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchSetting: function () {
      this.http.get('user/newcomer').then(res => {
        if (res.success) {
          this.$router.push('/index/user/setting')
        } else {
          this.$router.push('/index/Home')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
