/*
 * @Author: MarioGo
 * @Date: 2021-07-28 23:06:47
 * @LastEditTime: 2021-08-24 23:08:19
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/store/mutations.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * Mutations业务层数据提交
 */
import storage from './../utils/storage';

export default {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    storage.setItem('userInfo', userInfo);
  },
  saveMenuList(state, menuList) {
    state.menuList = menuList;
    storage.setItem('menuList', menuList);
  },
  saveActionList(state, actionList) {
    state.actionList = actionList;
    storage.setItem('actionList', actionList);
  },
  
};
