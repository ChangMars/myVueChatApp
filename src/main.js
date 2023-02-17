import { createApp } from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';

import App from './App.vue'
import router from './router'

const app = createApp(App).use(router);
app.use(VueAxios,axios);
app.mount('#app');
