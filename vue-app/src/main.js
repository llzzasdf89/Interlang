import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
// eslint-disable-next-line no-unused-vars
import cordova from '../../node_modules/cordova-common/cordova-common'
Vue.config.productionTip = false
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
