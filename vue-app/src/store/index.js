import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Dom: null
  },
  getters: {
  },
  mutations: {
    appendDom (state, Dom) {
      state.Dom = Dom
    },
    clickOnDom () {
      const Dom = this.state.Dom
      if (Dom != null && Dom !== undefined) {
        Dom.click()
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
