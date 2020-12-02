import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined:0
  },
  mutations: {
    zhuxiao1(state){
      state.isLogined = 0
       
    },
    login_mutations(state){
      state.isLogined = 1
    }
  },
  actions: {
  },
  modules: {
  }
})
