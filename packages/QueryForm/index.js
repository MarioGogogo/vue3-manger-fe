/*
 * @Author: MarioGo
 * @Date: 2021-10-01 15:51:00
 * @LastEditTime: 2021-10-01 19:10:08
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/packages/QueryForm/index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

import QueryForm from './QueryForm.vue';

QueryForm.install = (app) => {
  // app.component('自定义组件名,最好与组件内的name一致', 组件名)
  app.component(QueryForm.name, QueryForm);
};

export default QueryForm;
