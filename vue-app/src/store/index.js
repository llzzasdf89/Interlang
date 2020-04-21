import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    unreadNotificationNum: 0,
    user: {
      username: null,
      name: null,
      sex: null,
      avatar: null,
      firstLanguage: null,
      intersts: null
    },
    languages: ['German', 'French', 'Japanese', 'Korean', 'Italian', 'Russian', 'Spanish', 'Portuguese', 'Chinese'],
    levels: ['beginner', 'elementary', 'intermediate', 'advanced', 'proficient'],
    Dom: null
  },
  mutations: {
    appendDom (state, Dom) {
      state.Dom = Dom
    },
    updateToken (state, token) {
      state.token = token
    },
    updateUnread (state, unreadNum) {
      state.unreadNotificationNum = unreadNum
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
