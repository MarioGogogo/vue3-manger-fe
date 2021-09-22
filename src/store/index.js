/*
 * @Author: MarioGo
 * @Date: 2021-07-28 23:01:24
 * @LastEditTime: 2021-09-22 22:29:29
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/store/index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * Vuex状态管理
 */
import { createStore } from 'vuex';
import mutations from './mutations';
import storage from './../utils/storage';

const state = {
  userInfo:  storage.getItem('userInfo') || {}, // 获取用户信息
  menuList:  storage.getItem('menuList') || [], // 获取菜单列表
  actionList:  storage.getItem('actionList') || [], // 获取菜单按钮
  noticeCount:0
};

export default createStore({
  state,
  mutations,
});
