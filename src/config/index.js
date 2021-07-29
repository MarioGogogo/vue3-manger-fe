/*
*  环境配置：
*/
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    dev:{
       baseApi:"/api",
       mockApi:'http://yapi.52react.cn/mock/97/api'
    },
    test:{
      baseApi:"//test.com/api",
       mockApi:'' 
    },
    prod:{
      baseApi:"/",
       mockApi:''
    }
}
export default {
    env,
    mock:true,   //全局是否开启mock
    namespace:'manager',
    ...EnvConfig[env]
}