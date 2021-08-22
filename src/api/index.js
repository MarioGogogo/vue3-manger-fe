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
      url: '/users/userList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getAllUserList() {
    return request({
      url: '/users/allUserList',
      method: 'get',
      data: {},
      mock: false,
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
      url: '/roles/roleAllList',
      method: 'get',
      data: {},
      mock: false,
    });
  },
  // 角色列表
  getRoleList(params) {
    return request({
      url: '/roles/roleList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  //获取部门列表
  getDeptList(params) {
    return request({
      url: '/dept/deptList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  // 部门操作
  deptDeptOperate(params) {
    return request({
      url: '/dept/deptOperate',
      method: 'post',
      data: params,
      mock: false,
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
      url: '/roles/roleOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  updatePermission(params) {
    return request({
      url: '/roles/updatePermission',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  //休假列表
  getApplyList(params){
    return request({
      url: '/leave/leaveList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  leaveOperate(params){
    return request({
      url: '/leave/leaveOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  }
};
