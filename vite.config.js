import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve( __dirname, './src' )  //路径别名设置
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/style/base.scss';` //全局mix 样式引入
      }
    }
  },
  server:{
    host:'localhost',
    port:8080,
    proxy:{
      "/api":{   //凡是带了请求api的都会被转发
        target:"http://127.0.0.1:4455"  //需要请求的域名
      }
    }
  },
  plugins: [vue()]
})
