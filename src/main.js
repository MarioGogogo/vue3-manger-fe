/*
 * @Author: MarioGo
 * @Date: 2021-07-27 00:26:04
 * @LastEditTime: 2021-08-24 23:40:11
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import request from './utils/request';
import storage from './utils/storage';
import api from './api';
import store from './store';
console.log(
  '%c 🍍 环境变量: ',
  'font-size:20px;background-color: #3F7CFF;color:#fff;',
  import.meta.env
);

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
  rtl: false,
};
const app = createApp(App);

//定义全局指令
app.directive('has', {
  beforeMount: (el, binding) => {
    console.log(
      '%c 🍒 el,binding: ',
      'font-size:20px;background-color: #42b983;color:#fff;',
      el,
      binding
    );
    //获取权限
    let userAction = storage.getItem('actionList');
    let value = binding.value;
    //判断列表中是否有对应的按钮权限标识
    let hasPermission = userAction.includes(value);
    if (!hasPermission) {
      el.style = 'disply:none';
      setTimeout(() => {
        //执行到这里 vdom还没有被渲染到节点需要等一下
        el.parentNode.removeChild(el);
      },0);
    }
  },
});

app.use(Toast, options);
//全局toast
app.config.globalProperties.$toast = useToast();
app.config.globalProperties.$request = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;
app.use(router).use(store).use(ElementPlus, { size: 'small' }).mount('#app');
