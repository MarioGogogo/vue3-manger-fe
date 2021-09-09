import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import storage from '../utils/storage';
import api from '../api';

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎体验Vue3全栈课程',
        },
        component: () => import('@/views/Welcome.vue'),
      },
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理',
        },
        component: () => import('@/views/User.vue'),
      },
      {
        name: 'menu',
        path: '/system/menu',
        meta: {
          title: '菜单管理',
        },
        component: () => import('@/views/Menu.vue'),
      },
      {
        name: 'role',
        path: '/system/role',
        meta: {
          title: '角色管理',
        },
        component: () => import('@/views/Role.vue'),
      },
      {
        name: 'dept',
        path: '/system/dept',
        meta: {
          title: '部门管理',
        },
        component: () => import('@/views/Dept.vue'),
      },
      {
        name: 'appconfig',
        path: '/system/appconfig',
        meta: {
          title: 'App设置',
        },
        component: () => import('@/views/AppConfig.vue'),
      },
      {
        name: 'leave',
        path: '/audit/leave',
        meta: {
          title: '休假申请',
        },
        component: () => import('@/views/Leave.vue'),
      }
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在',
    },
    component: () => import('@/views/404.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function loadAsyncRoutes() {
  return;
  let userInfo = storage.getItem('userInfo') || {};
  if (userInfo.token) {
    try {
      const { menuList } = await API.getPermissionList();
      let routes = utils.generateRoute(menuList);
      routes.map((route) => {
        let url = `./../views/${route.component}.vue`;
        route.component = () => import(url);
        router.addRoutes('home', route);
      });
    } catch (error) {
      console.log(
        '%c 🍎 动态路径: ',
        'font-size:20px;background-color: #4b4b4b;color:#fff;',
        error
      );
    }
  }
}
// await loadAsyncRoutes()
// 导航守卫
router.beforeEach((to, from, next) => {
  //判断当前路由是否存在
  if (router.hasRoute(to.name)) {
    document.title = to.meta.title;
    next();
  } else {
    next('/404');
  }
});

export default router;

// TODO 权限需要导航守卫
