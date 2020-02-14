import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import store from './store'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
