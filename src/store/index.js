/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import submitData from './module/submitdata'
Vue.use(Vuex)


export default new Vuex.Store({
  modules:{
    submitData,
  },

 
})
