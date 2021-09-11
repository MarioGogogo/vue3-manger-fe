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
  //消息数量
  noticeCount(params) {
    return request({
      url: '/leave/noticeCount',
      method: 'get',
      data: {},
      mock: false,
    });
  },
  //侧边栏菜单
  getMenuList() {
    return request({
      url: '/menu/menuList',
      method: 'get',
      data: {},
      mock: false,
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
      url: '/users/userDelete',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  //根据角色获取权限列表
  getPermissionList(params) {
    return request({
      url: '/users/permissionList',
      method: 'get',
      data: params,
      mock: false,
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
      url: '/users/usersOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  //菜单管理操作
  menuSubmit(params) {
    return request({
      url: '/menu/menuOperate',
      method: 'post',
      data: params,
      mock: false,
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
  getApplyList(params) {
    return request({
      url: '/leave/leaveList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  //审批操作
  leaveOperate(params) {
    return request({
      url: '/leave/leaveOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  //文件上传
  uploadFile(formData) {
    return request({
      url: '/file/uploadFile',
      method: 'post',
      data: formData,
      mock: false,
    });
  },
  // 文件操作
  fileOperate(params) {
    return request({
      url: '/file/fileOperate',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  getAppList() {
    return request({
      url: '/file/appList',
      method: 'get',
      data: '',
      mock: false,
    });
  },
  getImageList(params){
    return request({
      url: '/qiniu/getImageList',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  deleteImage(params){
    return request({
      url: '/qiniu/deleteImage',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  uploadImages(formData) {
    return request({
      url: '/file/uploadImages',
      method: 'post',
      data: formData,
      mock: false,
    });
  },
};
