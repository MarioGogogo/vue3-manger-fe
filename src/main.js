import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'
console.log('%c 🍍 环境变量: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', import.meta.env);





const app = createApp(App)

app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(router).use(store).use(ElementPlus,{size:"small"}).mount('#app')

