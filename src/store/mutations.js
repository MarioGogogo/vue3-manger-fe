/**
 * Mutations业务层数据提交
 */
import storage from './../utils/storage';

export default {
  saveUserInfo(state, userInfo) {
    console.log(
      '%c 🥚 保存信息: ',
      'font-size:20px;background-color: #F5CE50;color:#fff;',
      userInfo
    );
    state.userInfo = userInfo;
    storage.setItem('userInfo', userInfo);
  },
};
