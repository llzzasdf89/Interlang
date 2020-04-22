import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    unreadNotificationNum: 0,
    readedNotificationsID: [],
    notificationTimer: null,
    user: {
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
    updateTimer (state, timer) {
      state.notificationTimer = timer
    },
    updateReaded (state, msgID) {
      state.readedNotificationsID.push(msgID)
    },
    updateUser (state, user) {
      state.user = user
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
