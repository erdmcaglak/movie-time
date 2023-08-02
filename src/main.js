import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$apiKey = process.env.VUE_APP_API_KEY;
Vue.prototype.$accessKey = process.env.VUE_APP_ACCESS_KEY;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
