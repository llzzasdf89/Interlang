import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {
      username: null,
      name: null,
      sex: null,
      avatar: null,
      firstLanguage: null,
      intersts: null
    },
    Dom: null
  },
  mutations: {
    appendDom (state, Dom) {
      state.Dom = Dom
    },
    setToken (state, token) {
      state.token = token
    },
    clickOnDom () {
      const Dom = this.state.Dom
      if (Dom != null && Dom !== undefined && JSON.stringify(Dom) !== '{}') {
        Dom.click()
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
