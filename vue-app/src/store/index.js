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
    motherTogues: ['German', 'French', 'Japanese', 'Korean', 'Italian', 'Russian', 'Spanish', 'Portuguese'],
    interstedLanguages: ['German', 'French', 'Japanese', 'Korean', 'Italian', 'Russian', 'Spanish', 'Portuguese'],
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
    },
    removeLanguage (state, lan) {
      const motherTogues = state.motherTogues
      const lanIndex = motherTogues.indexOf(lan)
      state.motherTogues.splice(lanIndex, 1)
      state.motherTogues = motherTogues
    }
  },
  actions: {
  },
  modules: {
  }
})
