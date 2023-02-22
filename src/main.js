import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Loading from 'vue3-loading-overlay' // Import component 讀取跑圈功能

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.use(store)
app.use(ElementPlus)
app.component('Loading', Loading)
app.mount('#app')
