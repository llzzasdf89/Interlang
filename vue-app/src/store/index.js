import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    unreadNotificationNum: 0,
    readedNotificationsID: [],
    notificationTimer: null,
    user: null,
    languages: ['German', 'French', 'Japanese', 'Korean', 'Italian', 'Russian', 'Spanish', 'Portuguese', 'Chinese', 'English'],
    levels: ['beginner', 'elementary', 'intermediate', 'advanced', 'proficient'],
    Dom: null,
    tags: [
      'cuisine',
      'travel',
      'movie',
      'music',
      'medical',
      'treatment',
      'education',
      'job hunting',
      'shopping',
      'sports',
      'entertainment'
    ],
    history: []
  },
  mutations: {
    appendDom (state, Dom) {
      state.Dom = Dom
    },
    updateLanguage (state, languages) {
      state.languages = languages
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
    updateTags (state, tags) {
      state.tags = tags
    },
    updateChatHistory (state, historyObj) {
      const idx = historyObj.oppositeID
      state.history[idx] = historyObj.history
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
