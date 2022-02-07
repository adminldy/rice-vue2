import Vue from 'vue'
import App from './App.vue'
import riceUI from './packages/index'
Vue.use(riceUI)
new Vue({
  el: '#app',
  render: h => h(App)
})
