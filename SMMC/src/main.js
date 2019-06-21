import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'; // 重置样式
import './assets/css/common.css'; // 公用样式

import ElementUI from 'element-ui'; // 引入JS组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入css样式

// 引入 local 文件
import local from '@/utils/local'
// 引入echarts
import echarts from 'echarts'  //引入echarts
// 挂载在原型上
Vue.prototype.echarts = echarts;

// 注册elemenUI
Vue.use(ElementUI);

// // 路由守卫 拦截所有路由
// router.beforeEach((to, from, next) => {
//   // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只有调用 才能进入下一步
//   // 获取浏览器中的token
//   const token = local.get('wang_xx'); // 此处需要打印！！！
//   // 如果有token 直接放行
//   if (token) {
//      // 放行
//     next()
//   } else { // 没有token
//     // 如果要去登录 放行
//     if (to.path === '/login') {
//       // 放行
//       next()
//     } else {
//       // 如果想去其他界面 直接跳转到登录
//       next('/login')
//     }
//   }
// })

Vue.config.productionTip = false

// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只有调用 才能进入下一步
  // 获取浏览器中的token
  const token = local.get('xx'); // 此处需要打印！！！
   
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    // 如果要去登录 放行
    if (to.path === '/login') {
      // 放行
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
