import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import storage from '../utils/storage';
import API from '../api';
import utils from '../utils/utils'


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
      },
      {
        name: 'approval',
        path: '/audit/approval',
        meta: {
          title: '待我审批',
        },
        component: () => import('@/views/Approval.vue '),
      },
      {
        name: 'image',
        path: '/qiniu/image',
        meta: {
          title: '空间管理',
        },
        component: () => import('@/views/Image.vue'),
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

  console.log(userInfo, '==>>>userInfo')
  if (userInfo.token) {
    //是否超时
    const now = new Date().getTime();
    const diffTime = now - userInfo.createTime
    //bug:无法返回登录页
    if(diffTime > 1000 * 60 *60 *24){
       localStorage.removeItem('manager');
       router.push('/login');
       return
    }
    const { menuList } = await API.getPermissionList()
    console.log(menuList, '====>>>>menuList')
    // const menuList = storage.getItem('menuList') || []
    // let routes = utils.generateRoute(JSON.parse(JSON.stringify(menuList)))
    let routes = utils.generateRoute(JSON.parse(JSON.stringify(menuList)))
    vueRouters(routes)
    // await vueRouters(routes)
    // routes.map((route) => {
    //   let url = `../views/${route.component}.vue`
    //   route.component = () => import(url)
    //   router.addRoute('home', route)
    // })
  }
}

loadAsyncRoutes()
// await loadAsyncRoutes()
// ;(async () => {
//   try {
//     await loadAsyncRoutes()
//   } catch (error) {
//     console.log('err is ->', error)
//   }
// })()

// async function vueRouters(routes) {
function vueRouters(routes) {
  const modules = import.meta.glob('../views/**/*.vue')
  const components = import.meta.globEager('../views/**/*.vue')
  Object.keys(modules).forEach((key) => {
    const viewSrc = components[key]
    const file = viewSrc.default
    // const file = key.default
    // if (!file.isRouter) return exist
    // 首字母转小写 letterToLowerCase 首字母转大写 letterToUpperCase
    let isExistRoute = routes.find((item) => item.name === file.name)
    if (!isExistRoute) return
    router.addRoute('home', {
      path: isExistRoute.path,
      name: isExistRoute.name,
      meta: isExistRoute.meta,
      component: modules[key]
    })
  })
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  // 判断
  if (checkPermission(to.path)) {
    document.title = to.meta.title
    next()
  } else {
    next('/404')
  }
})

export default router
