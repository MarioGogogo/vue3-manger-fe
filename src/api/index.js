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
    },
    //获取消息
    noticeCount(){
      return request({
         url:"/leave/count",
         method:"get",
         data:{},
         mock:false
      })
   },
   //菜单列表
   getMenuList(params) {
    return request({
        url: '/menu/list',
        method: 'get',
        data: params,
        mock: true
    })
},
 }