<template>
    <div class="password-modify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>修改账号密码</h2>
            </div>
            <div class="textitem">
                <el-form
                :model="modifyPassword"
                status-icon
                :rules="rules"
                ref="modifyPassword"
                size="small"
                >

                    <!-- 原密码 -->
                    <el-form-item label="原密码" prop="formPass">
                        <el-input type="text" v-model="modifyPassword.formPass" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 新密码 -->
                    <el-form-item label="新密码" prop="newpassword">
                        <el-input type="password" v-model="modifyPassword.newpassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkpass">
                        <el-input type="password" v-model="modifyPassword.checkpass" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="modify">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>

            
        </el-card>
    </div>
</template>

<script>
        // 引入工具函数
    import { pwdReg } from "@/utils/reg";
    //引入ajax
    import { oldPassword,passModify } from '@/api/Account'
    // 引入local
    import local from "@/utils/local"
    export default {
        
        data(){
            var formPass =(rule,value,callback) => {
                
                // 规则验证
                if(value === ""){
                    callback(new Error("这里不能为空"))
                }else{
                    oldPassword({value})
                        .then(rep => {
                            let { code,reason } = rep;
                            if(code===0){
                                callback()
                            }else if(code === 1){
                                callback(new Error(reason))
                            }
                           
                        })
                        .catch(err => {
                            console.log(err);
                            
                        })
                    
                   
                }
            

            }

            //新密码验证
            const newPassword = (rule,value,callback)=>{
                //    获取值的长度
                const len = value.length;

                // 规则验证
                if(value === ""){
                    callback(new Error("这里不能为空"))
                }else if(len<3 || len>6){
                    callback(new Error("密码长度为3~6位"))
                }else if(!pwdReg(value)){
                    callback(new Error('只可以输入字母和数字'))
                } else {
                    if(this.modifyPassword.checkpass !== ""){
                        // 当再次输入的密码框不为空时，再次触发密码一致性验证
                        this.$refs.modifyPassword.validateField('checkpass')
                    }
                    callback()
                }
            }
            const checkPass = (rule,value,callback) => {
                // 非空验证
                if(value === ''){
                    callback(new Error('请确认输入新的密码'))
                }else if(value !== this.modifyPassword.newpassword){
                    callback(new Error('两次输入的密码不一致'))
                }else{
                    // 成功
                    callback()
                }
            }
            return {
                modifyPassword:{
                    formPass:'',
                    newpassword:'',
                    checkpass:''
                },
                rules:{
                    formPass:[
                        {required: true,  validator : formPass, trigger : 'blur'}
                    ],
                    newpassword:[
                        {required: true,  validator : newPassword, trigger : 'blur'}
                    ],
                    checkpass:[
                        {required: true,  validator : checkPass, trigger : 'blur'}
                    ]
                }
            }
        },
        methods:{
            //确认修改按钮
            modify(){

                this.$refs.modifyPassword.validate((valid) => {
                    if(valid){
                        let params = {
                            newpassword:this.modifyPassword.newpassword
                        }
                        passModify(params)
                            .then(rep => {
                                let { code,reason } =rep;
                                if(code===0){
                                this.$message({ // 弹成功提示
                                        message: reason,
                                        type: 'success'
                                    })
                                    local.remove('xx')
                                    this.$router.push('/login')
                                }else if(code===1){
                                    this.$message.error(reason)
                                }
                            })
                            .catch(res => {

                            })

                    }else{
                            console.log('前端验证不通过!');
                            return false
                    }
                })

            }
        }
    }
</script>

<style lang="less">
    .password-modify{
        .box-card{
            .el-card__header{
                background-color: #3793df;
                color: #fff
            }
            .textitem{
                width:300px
            }
        }
    }
</style>