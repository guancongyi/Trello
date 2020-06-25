import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from'./user'
import board from'./board'
import list from './list'


export default new Vuex.Store({
  
  state: {

  },
  mutations: {
    // test:()=>{
    //   console.log('test')
    // }
  },
  actions: {
  },
  modules: {
    user,
    board,
    list
  }
})
