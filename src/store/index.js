import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backgroundImage:'./assets/img/default-background.jpg'
  },
  getters: {
    getBackground(state){
      return state.backgroundImage;
    }
  },
  mutations: {
    setBackground(state,item){
      state.backgroundImage = item;
    }
  },
  actions: {
  },
  modules: {
  }
})
