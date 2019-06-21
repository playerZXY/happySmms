<template>
    <div class="leftNav">
             <!-- 标题 -->
            <h3 class="title">
                <i class="el-icon-menu"></i>
                叮当超市管理系统
            </h3>
            <el-menu 
            default-active="$route.path"
            unique-opened
            active-text-color="red"
            background-color="#3793df"
            router
            >

                <!-- 系统信息 -->
                <el-submenu :index="(i+1)+''" v-for="(nav,i) in leftNav" :key="i">
                    <template slot="title">
                    <i :class="nav.iconCls"></i>
                    <span> {{ nav.navTitle }} </span>
                    </template>
                    <el-menu-item
                    :index="subNav.path"
                    v-for="(subNav, i) in nav.children"
                    :key="i"> {{ subNav.navsubTitle }}</el-menu-item>
                
                </el-submenu>
            </el-menu>
    </div>
</template>
<script>
export default {
   data() {
      return {
          leftNav:[
              {   //导航一
                  iconCls:'el-icon-s-tools',
                  navTitle:'系统信息',
                  children:[
                      { path:'/home/systeminfo', 'navsubTitle':'系统信息' }
                  ]
                
              },
              {    //导航二
                 iconCls:'el-icon-s-order',
                  navTitle:'账号管理',
                  children:[
                        { path: '/home/accountmanage', 'navsubTitle': '账号管理' },
                        { path: '/home/accountadd', 'navsubTitle': '账号添加' },
                        { path: '/home/passwordmodify', 'navsubTitle': '密码修改' },
                  ] 
              },
              // 导航3
                {
                    iconCls: 'el-icon-s-goods',
                    navTitle: '商品管理',
                    children: [
                        { path: '/home/goodsmanage', 'navsubTitle': '商品管理' },
                        { path: '/home/goodsadd', 'navsubTitle': '商品添加' }
                    ] 
                },
                    // 导航4
                {
                    iconCls: 'el-icon-tickets',
                    navTitle: '统计管理',
                    children: [
                        { path: '/home/selltotal', 'navsubTitle': '销售统计' },
                        { path: '/home/stocktotal', 'navsubTitle': '进货统计' }
                    ]   
                },
                    // 导航5
                {
                    iconCls: 'el-icon-s-custom',
                    navTitle: '会员管理',
                    children: [
                        { path: '/home/vipaccount', 'navsubTitle': '账号管理' },
                        { path: '/home/vipaccountadd', 'navsubTitle': '添加账号' }
                    ]   
                }
                ,    // 导航6
                {
                    iconCls: 'el-icon-s-custom',
                    navTitle: '进货管理',
                    children: [
                        { path: '/home/inmana', 'navsubTitle': '库存管理' },
                        { path: '/home/inmanaadd', 'navsubTitle': '添加库存' }
                    ]   
                }
          ]
          
      }
   }


}
</script>
<style lang='less'>

.leftNav{
    
    .title {
            color: #fff;
            margin: 20px auto;
            text-align: center;
            font-size: 16px;
        }
        .el-menu {
           border-right: none;
           .el-submenu {
               color: #fff;
               .el-submenu__title {
                 color: #fff;
                & > i {
                    color: #fff;
                }
               }
           }
           .el-menu-item {
               color: #fff;
           } 
        }
}


</style>
