import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './../components/Home.vue';
import Welcome from './../views/Welcome.vue';
import Login from './../views/Login.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
    redirect: Welcome,
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页',
        },
        component: Welcome,
      },
      {
        name: 'user',
        path: '/system/user',
        meta: {
          title: '用户管理',
        },
        component: () => import('./../views/User.vue')
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
