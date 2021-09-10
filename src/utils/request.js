/*
 * @Author: MarioGo
 * @Date: 2021-07-27 22:13:17
 * @LastEditTime: 2021-09-10 18:30:49
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/utils/request.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/*
 * axios二次封装
 */

import axios from 'axios';
import config from '../config/index.js';
import { ElMessage } from 'element-plus';
import router from './../router';
import storage from './../utils/storage'
import {useToast} from "vue-toastification";
const toast = useToast()
const TOKEN_INVALID = 'Token认证失败，请重新登录';
const NETWORK_ERROR = '网络请求异常，请稍后重试';
const TIME_OUT  = "请求超时，请稍后重试"

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
});

//请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  // 请求带上token
  if(req.url != '/login'){
    const { token } = storage.getItem('userInfo');
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
  }
  return req;
});

// 响应拦截
service.interceptors.response.use(
  (res) => {
    console.log('响应拦截 :>> ', res);
    const { code, data, msg } = res.data;
    if (code === 200) {
      return data;
    } else if (code === 500001) {
      toast.error(TOKEN_INVALID)
      // ElMessage.error(TOKEN_INVALID);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return Promise.reject(TOKEN_INVALID);
    } else {
      toast.error(msg || NETWORK_ERROR)

      // ElMessage.error(msg || NETWORK_ERROR);
      return Promise.reject(msg || NETWORK_ERROR);
    }
  },
  (error) => {
    toast.error(TIME_OUT)
    // ElMessage.error(TIME_OUT);
    console.log('%c 🍱 error: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', error);
    // return Promise.reject(TIME_OUT);
  }
);

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  //note:小技巧 学习局部请求mock
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
    isMock = options.mock;
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi;
  } else {
    //全局设置mock
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, fn, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    });
  };
});

export default request;
