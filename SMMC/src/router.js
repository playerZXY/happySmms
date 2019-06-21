import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: () => import('./views/login/login.vue')},
    {
      path:'/home',component:()=>import('./views/Home/Home.vue'), 
      redirect: '/home/systeminfo',
      children:[
        {path:'/home/accountadd',component:()=>import('./views/AccountAdd/AccountAdd.vue')},
        {path:'/home/accountmanage',component:()=>import('./views/AccountManage/AccountManage.vue')},
        {path:'/home/goodsadd',component:()=>import('./views/GoodsAdd/GoodsAdd.vue')},
        {path:'/home/goodsmanage',component:()=>import('./views/GoodsManage/GoodsManage.vue')},
        {path:'/home/passwordmodify',component:()=>import('./views/PasswordModify/PasswordModify.vue')},
        {path:'/home/selltotal',component:()=>import('./views/SellTotal/SellTotal.vue')},
        {path:'/home/stocktotal',component:()=>import('./views/StockTotal/StockTotal.vue')},
        {path:'/home/systeminfo',component:()=>import('./views/SystemInfo/SystemInfo.vue')},
        {path:'/home/vipaccount',component:()=>import('./views/Vipaccount/Vipaccount.vue')},
        {path:'/home/vipaccountadd',component:()=>import('./views/Vipaccountadd/Vipaccountadd.vue')},
        {path:'/home/Inmana',component:()=>import('./views/Inmana/Inmana.vue')},
        {path:'/home/Inmanaadd',component:()=>import('./views/Inmanaadd/Inmanaadd.vue')},
        {path:'/home/personal',component:()=>import('./views/Personal/Personal.vue')},
      ]
    }
  ]
})
