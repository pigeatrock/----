import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import Print from 'vue-print-nb'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import axios from 'axios'
import echarts from 'echarts' //引入echarts


if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:88/meitu/public'
} else {
  axios.defaults.baseURL = 'http://nami.zzlic.cn/meitu/public'
}
  // axios.defaults.baseURL = 'http://127.0.0.1:88/meitu/public/'
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts //引入组件

Vue.use(ElementUI, { locale })
Vue.use(Print)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
