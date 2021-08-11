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
  //消息数量
  noticeCount(params) {
    return request({
      url: '/leave/noticeCount',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  //侧边栏菜单
  getMenuList() {
    return request({
      url: '/menu/getMenuList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  //用户列表
  getUserList(params) {
    return request({
      url: '/users/getUserList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getAllUserList() {
    return request({
      url: '/users/all/getAllUserList',
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
  // 角色列表
  getRoleList() {
    return request({
      url: '/roles/getRoleList',
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
