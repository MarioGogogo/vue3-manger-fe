import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
console.log('%c 🍍 环境变量: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', import.meta.env);

createApp(App).use(router).use(ElementPlus).mount('#app')
