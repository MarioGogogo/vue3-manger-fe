/**
 * api管理
 */
 import request from './../utils/request'

 export default{
    login(params){
       return request({
          url:"/login",
          method:"post",
          data:params,
          mock:false
       })
    }
 }