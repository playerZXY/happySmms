<template>

    <div class="login">
        <div class="login-wrap">
            <!-- 登陆标题 -->
            <div class="title">
            <h3><i class="el-icon-key"></i>&emsp;猛龙超市后台系统登陆</h3>
            </div>
            <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
                </el-form>

        </div>

    </div>
</template>
<script>
    // 引入工具函数
    import { pwdReg } from "@/utils/reg";
    //引入登陆模块
    import { checkLogin } from "@/api/Login"
    //引入本地存储语句封装文件
    import local from "@/utils/local"
export default {
    
   data() {
       const checkpwd = (rule,value,callback)=>{
        //    获取值的长度
        const len = value.length;

        if(value === ""){
            //不成功则传参callback（new Error（））
            callback(new Error('密码不能为空'))  //非空验证
        }else if(len<3 || len>6){
            callback(new Error('长度为3~6位'))
        }else if(!pwdReg(value)){
            callback(new Error('只可以输入字母和数字'))
        } else {
           if(this.loginForm.checkPass !==""){
               //当再次输入密码框不为空时，再触发密码一致性的内置验证
               this.$refs.loginForm.validateField('checkPass')
           }
           callback()  //成功的回调 
        }

       }
       const confirmPwd = (rule,value,callback) =>{
           //非空验证
           if (value === ''){
               callback(new Error('请再次输入密码'))
           }else if(value !== this.loginForm.password){
               callback(new Error('两次输入密码不一致'))
           }else{
               //成功
               callback()
           }
       }
      return {
          loginForm:{
              account:'',
              password:'',
              checkPass:''
          },
          rules:{
              account:[
                {required: true, message: '请输入账号', trigger: 'blur' }, // 非空验证
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
              ],
              password:[
                {required: true, validator : checkpwd,trigger: 'blur' }
              ],
              checkPass:[
                {required: true, validator : confirmPwd,trigger: 'blur' }
              ],


          }
      }
   },
   methods:{
       submitForm() {
           this.$refs.loginForm.validate((valid)=>{
               if(valid){
                   let params = {
                       account:this.loginForm.account,
                       password:this.loginForm.password
                   }

                // ajax请求，查询数据库是否有这个密码账号
                  checkLogin(params)
                    .then(rep => {
                        // 接收参数
                        let { code,reason,token } = rep;
                        // 判断
                        if( code === 0 ){
                                // 成功添加
                                this.$message({
                                    type: 'success',
                                    message: reason
                                })
                                // 将token放到本地存储
                               local.set('xx',token);

                                this.$router.push('/home')
                        }else if( code === 1 ){
                            this.$message.error(reason);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                   
               }else{
                   console.log('前端验证不通过!');
                   return false
               }
           })
       },
       resetForm(){
        //    获取el-form表单 调用内置重置方法
            this.$refs.loginForm.resetFields();
       }
   }


}
</script>
<style lang="less">
    // 引入样式
    @import './login.less';
</style>
