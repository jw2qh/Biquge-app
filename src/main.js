import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from  'axios'
import '../public/css/reset.css'
import '../public/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
