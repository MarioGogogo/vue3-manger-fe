<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <tree-menu :userMenu="userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <i class="el-icon-s-fold"></i>
          </div>
          <!-- 面包屑 -->
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>
        <div class="user-info">
          🌈
          <el-badge
            :value="noticeCount === 0 ? null : noticeCount"
            class="notice"
            type="danger"
            @click='noticeCount !== 0 && $router.push("/audit/approval")'
          >
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from "./TreeMenu.vue";
import BreadCrumb from "./BreadCrumb.vue";
export default {
  name: "Home",
  components: { TreeMenu, BreadCrumb },
  data () {
    return {
      isCollapse: false,
      userInfo: this.$store.state.userInfo,
      noticeCount: 0,
      userMenu: [],
      activeMenu: location.hash.slice(1), //激活菜单 高亮
    };
  },
  mounted () {
    this.getNoticeCount();
    this.getMenuList();
  },
  computed: {
    noticeCount() {
      console.log('%c 🍝 noticeCount: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;');
      return this.$store.state.noticeCount; 
    }
  },
  methods: {
    toggle () {
      this.isCollapse = !this.isCollapse;
    },
    handleLogout (key) {
      if (key == "email") return;
      this.$store.commit("saveUserInfo", "");
      this.userInfo = null;
      this.$router.push("/login");
    },
    async getNoticeCount () {
      try {
        const count = await this.$api.noticeCount();
        //保存提醒条数
        console.log('%c 🍪 保存提醒条数: ', 'font-size:20px;background-color: #E41A6A;color:#fff;');
        this.$store.commit('saveNoticeCount', count)
      } catch (error) {
        console.error(error);
      }
    },
    async getMenuList () {
      try {
        const { menuList, actionList } = await this.$api.getPermissionList();
        this.userMenu = menuList;
        this.$store.commit("saveMenuList", menuList);
        this.$store.commit("saveActionList", actionList);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
      .el-submenu {
        .el-submenu__title {
          &:hover {
            background-color: #ee4340 !important;
            i {
              color: #fff;
            }
          }
        }
        .el-menu {
          .el-menu-item {
            &:hover {
              background-color: #ee4340 !important;
              i {
                color: #fff;
              }
            }
          }
        }
      }
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          cursor: pointer;
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>