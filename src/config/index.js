/*
*  环境配置：
*/
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    dev:{
       baseApi:"/",
       mockApi:'http://yapi.52react.cn/mock/13/hybrid'
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
    mock:true,
    ...EnvConfig[env]
}