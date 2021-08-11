/*
*  环境配置：
*/
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    dev:{
       baseApi:"/api",
       mockApi:'https://mock.apipost.cn/app/mock/project/b36c9a92-209b-49ef-854e-c08018df8ddc/api'
    },
    test:{
      baseApi:"//test.com/api",
      mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    },
    prod:{
      baseApi:"//prod.com/api",
      mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    }
}
export default {
    env,
    mock:true,   //全局是否开启mock
    namespace:'manager',
    ...EnvConfig[env]
}