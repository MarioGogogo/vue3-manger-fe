import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
import Toast,{useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
import store from './store'
console.log('%c 🍍 环境变量: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', import.meta.env);

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true,
  position: 'top-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
};



const app = createApp(App)
app.use(Toast, options)
//全局toast
app.config.globalProperties.$toast  = useToast();
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(router).use(store).use(ElementPlus,{size:"small"}).mount('#app')

