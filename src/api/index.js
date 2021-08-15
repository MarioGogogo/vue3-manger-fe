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
      mock:false
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
      url: '/menu/MenuList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  //用户列表
  getUserList(params) {
    return request({
      url: '/users/UserList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getAllUserList() {
    return request({
      url: '/users/all/AllUserList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  userDel(params) {
    return request({
      url: '/users/UserDelete',
      method: 'post',
      data: params,
      // mock:true
    });
  },
  getRoleAllList() {
    return request({
      url: '/roles/RoleAllList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  // 角色列表
  getRoleList() {
    return request({
      url: '/roles/RoleList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  //获取部门列表
  getDeptList() {
    return request({
      url: '/dept/DeptList',
      method: 'get',
      data: {},
      mock: true,
    });
  },
  // 部门操作
  deptDeptOperate(params) {
    return request({
      url: '/dept/DeptOperate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  userSubmit(params) {
    return request({
      url: '/users/UsersOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  menuSubmit(params) {
    return request({
      url: '/menu/MenuOperate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  roleOperate(params) {
    return request({
      url: '/roles/RolesOperate',
      method: 'post',
      data: params,
      mock: true,
    });
  },
  updatePermission(params) {
    return request({
      url: '/roles/update/UpdatePermission',
      method: 'post',
      data: params,
      mock: true,
    });
  },
};
