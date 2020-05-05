<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" class="ma-1" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-row justify="space-between" class="mx-auto" text-align="center">
                  <v-icon @click="$router.go(-2)">mdi-arrow-left</v-icon>
                  <v-toolbar-title class="flex-grow-1">Forgot password</v-toolbar-title>
                </v-row>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="isDataValid" v-if="!codeMatchEmail">
                  <v-text-field
                    label="Username"
                    name="username"
                    type="text"
                    prepend-icon="mdi-account-circle"
                    clearable
                    required
                    :rules="usernameRules"
                  />
                  <v-text-field
                    id="email-address"
                    label="Email"
                    name="email"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    prepend-icon="mdi-email"
                    required
                  >
                    <template v-slot:append>
                      <v-tooltip bottom>
                        <template v-slot:activator = "{ on }">
                          <v-btn v-on='on' icon :loading='vCodeLoading'  :disabled='!email.match(/^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/)' @click='sendCodeMail'>
                             <v-icon>mdi-send</v-icon>
                             <template v-slot:loader>
                                    <span>
                                        {{seconds}}
                                    </span>
                                  </template>
                            </v-btn>
                        </template>
                        verification code has been sent to your email
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
                    required
                  />
                </v-form>
                <v-form v-else v-model='isDataValid'>
                     <v-text-field
                    id="password"
                    label="set your new password"
                    name="password"
                    type="password"
                    v-model="password"
                    :rules='passwordRules'
                    prepend-icon="mdi-lock"
                    clearable
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled='!isDataValid' @click='checkCodeMatchEmail'>Next</v-btn>
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
  data: function () {
    return {
      codeMatchEmail: false,
      vCodeLoading: false,
      isDataValid: false,
      seconds: 60,
      usernameRules: [
        v => !!v || 'username is required'],
      username: '',
      password: '',
      passwordRules: [
        v => !!v || 'password is required',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) || 'Each password must contain at least 8 characters including at least 1 uppercase letter(A-Z), 1 lowercase letter(a-z) and 1 number (0-9)'
      ],
      email: '',
      emailRules: [v => !!v || 'Email is required', v => /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(v) || 'Please type in a valid email'],
      verificationCode: '',
      verificationCodeRules: [v => !!v || 'Input the verification code received in your email which should be a 6-digit number', v => /^\d{6}$/.test(v) || 'verificationCode should be 6 digits number']
    }
  },
  methods: {
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
    checkCodeMatchEmail () {
      const codeMatchEmail = this.$data.codeMatchEmail
      if (codeMatchEmail) this.finishSetting()
      this.$data.isDataValid = false
      this.$data.codeMatchEmail = true
    },
    finishSetting () {
      alert('Find password success, you can log in now with your new password!')
      return this.$router.push({ name: 'Begin' })
    }
  }
}
</script>
