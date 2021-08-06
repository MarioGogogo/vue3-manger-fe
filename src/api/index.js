/**
 * api管理
 */
import request from './../utils/request';
export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      //mock:false
    });
  },
  noticeCount(params) {
    return request({
      url: '/leave/count',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  getMenuList() {
    return request({
      url: '/menu/list',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  getUserList(params) {
    return request({
      url: '/users/list',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getAllUserList() {
    return request({
      url: '/users/all/list',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  userDel(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
      // mock:true
    });
  },
  getRoleAllList() {
    return request({
      url: '/roles/allList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  getRoleList() {
    return request({
      url: '/roles/list',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  getDeptList() {
    return request({
      url: '/dept/List',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  deptDeptOperate(params) {
    return request({
      url: '/dept/operate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  userSubmit(params) {
    return request({
      url: '/users/operate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  menuSubmit(params) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  roleOperate(params) {
    return request({
      url: '/roles/operate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  updatePermission(params) {
    return request({
      url: '/roles/update/permission',
      method: 'post',
      data: params,
      mock: true,
    });
  },
};
