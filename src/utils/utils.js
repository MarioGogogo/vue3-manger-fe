/*
 * @Author: MarioGo
 * @Date: 2021-07-27 23:08:10
 * @LastEditTime: 2021-09-09 20:20:47
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/utils/utils.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/**
 * 工具函数封装
 */
 export default {
  formateDate(date, rule) {
      let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, date.getFullYear())
      }
      const o = {
          // 'y+': date.getFullYear(),
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
      }
      for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
              const val = o[k] + '';
              fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
          }
      }
      return fmt;
  },
  generateRoute(menuList) {
    let routes = []
    const deepList = (list) => {
      while (list.length) {
        let item = list.pop()
        if (item.action) {
          routes.push({
            name: item.component,
            path: item.path,
            meta: {
              title: item.menuName
            },
            component: item.component
          })
        }
        if (item.children && !item.action) {
          deepList(item.children)
        }
      }
    }
    deepList(menuList)
    return routes
  }
}