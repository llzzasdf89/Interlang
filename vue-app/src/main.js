
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import http from './api/http'
Vue.prototype.http = http
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
