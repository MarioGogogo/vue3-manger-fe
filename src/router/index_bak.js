/*
 * @Author: MarioGo
 * @Date: 2021-07-27 21:19:57
 * @LastEditTime: 2021-09-22 19:39:47
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/router/index_bak.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '@/utils/storage'
import API from '@/api/index'
import utils from '@/utils/utils'

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: () => import('@/components/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: {
          title: '欢迎页'
        },
        component: () => import('@/views/Welcome.vue'),
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '页面不存在'
    },
    component: () => import('@/views/404.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 判断当前地址是否可以访问
function checkPermission(path) {
  let hasPermission = router
    .getRoutes()
    .filter((route) => route.path === path).length
  if (hasPermission) {
    return true
  }
  return false
}

async function loadAsyncRoutes() {
  let userInfo = storage.getItem('userInfo') || {}
  //第一次登录观察是否有token
  if (userInfo.token) {
    const { menuList } = await API.getPermissionList()
    let routes = utils.generateRoute(JSON.parse(JSON.stringify(menuList)))
    console.log('%c 🍺 routes: ', 'font-size:20px;background-color: #465975;color:#fff;', routes);
    routes.map((route) => {
      // ${route.component}
      let url = `../views/User.vue`
      route.component = () => import(url)
      console.log('%c 🍝 route: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', route);
      router.addRoute('home', route)
    })
  }
}
await loadAsyncRoutes()
// 动态路由
// router.addRoute('home', {
//   name: 'menus',
//   path: '/system/menus',
//   meta: {
//     title: '菜单管理'
//   },
//   component: () => import('@/views/menu.vue')
// })

// 导航守卫
router.beforeEach((to, from, next) => {
  if (checkPermission(to.path)) {
    document.title = to.meta.title
    next()
  } else {
    next('/404')
  }
})

export default router
