
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import http from './api/http'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.prototype.http = http
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
