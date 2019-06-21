<template>
    <div class="right-header">
        <el-row>
            <!-- 左 -->
            <el-col :span="12">
                <div class="grid-content bg-purple">
                   <h3 class="title">
                        <i class="el-icon-menu"></i>
                        叮当超市管理系统
                    </h3>
                </div>
            </el-col>
            <!-- 右 -->
            <el-col :span="12">
                    <!-- 再分成1：1 -->
                    <el-row>
                        <el-col :span="18">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{ account }}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                                &emsp;
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="b">退出系统</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            
                        </el-col>
                        <el-col :span="6">
                            <div class="avatar">
                                <img src="./Ameng.jpg" alt="">
                            </div>
                            
                        </el-col>
                    </el-row>
                    
                
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // 引入 local 文件
    import local from '@/utils/local'
    //引入ajax模块
    import { userinfo } from '@/api/Account'
    
    

export default {
   data() {
      return {
          account:"",
      }
   },
   created(){
       //生命周期，适合发送ajax
    //    this.req.get("http://127.0.0.1:5555/")
   },
   methods:{
       //跳转页面
       handleCommand(command) {
            if(command==="a"){
                this.$router.push('/home/personal')

            }else if(command==="b"){
                 
                 this.$confirm('此操作将注销登陆状态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                    .then(() => {
                        //退出系统
                        local.remove('wang_xx');
                        this.$router.push('/login')
                        //提示框
                        this.$message({
                            type: 'success',
                            message: '已退出系统'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        })          
                    })
            }
        }
   },
   created(){
       //获取当前登陆账户的用户名
       userinfo()
            .then(rep => {
                let { account } = rep;
                //赋值
                this.account=account;
            })
            .catch(err => {
                console.log(err);
                
            })
   }


}
</script>
<style lang='less'>
.right-header{
    .el-row {
    .grid-content{
        margin-top: 17px;
        .title{
            font-size:22px;
            color:#fff;
        }
    }
  }
  .el-col-18{
        margin-top: 17px;
        text-align: right;
  }
  .el-col-6{
        margin-top: 10px;
      .avatar{
          width:40px;
          height: 40px;
          background-color: pink;
          border-radius: 50%;
          img{
                width:40px;
                height: 40px;
                border-radius: 50%
                
          }
      }
  }
  
  
  
}



</style>
