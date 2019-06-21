<template>
    <div class="home">
        <el-container>
        <el-aside width="200px">
            <!-- 子组件，左侧导航栏 -->
            <LeftNav/>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 右边的头部 -->
                <RightHeader/>
            </el-header>
            <el-main>
                <!-- main的路由出口 -->
                <router-view></router-view>
            </el-main>
            <el-footer>
                <!-- 右边的尾部 -->
                <RightFooter/>
            </el-footer>
        </el-container>
        </el-container>
    </div>
</template>
<script>
import LeftNav from '@/components/LeftNav/leftNav.vue'
import RightHeader from '@/components/RightHeader/RightHeader.vue'
import RightFooter from '@/components/RightFooter/RightFooter.vue'


export default {
   data() {
      return {
      }
   },
   components:{
       LeftNav,
       RightHeader,
       RightFooter
   }
  


}
</script>
<style lang='less'>

.home{
    height: 100%;
    .el-container{
        height: 100%;
        // 左侧导航栏
          .el-aside {
                background-color: #3793df;;
            }
            //右侧主体
            .el-main {
                background-color: #E9EEF3;
            }
            //上下的
           .el-footer {
            background-color: #B3C0D1;
        }
        .el-header{
            background-color: #B3C0D1
        }
    }

  

}
  



</style>

