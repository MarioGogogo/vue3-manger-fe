/**
 * api管理
 */
import request from './../utils/request';

export default {
  login(params) {
    return request({
      url: '/login',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  //获取消息
  noticeCount() {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: false,
    });
  },
  //菜单列表
  getMenuList(params) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: params,
      mock: true,
    });
  },
  //用户管理
  getUserList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  //获取部门
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  // 新增用户
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  userDel(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
    });
  },
  getRoleList() {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
 
  // 菜单创建 编辑 删除 三合一
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
};
