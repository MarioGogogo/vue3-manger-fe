import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve( __dirname, './src' )
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import '@/assets/style/base.scss';`
  //     }
  //   }
  // },
  server:{
    host:'localhost',
    port:8080,
    proxy:{
      "/api":{
        target:"http://127.0.0.1:4455"
      }
    }
  },
  plugins: [vue()]
})
