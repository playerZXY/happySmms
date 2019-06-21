<template>
    <div class="account-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>添加管理员账号</h2>
            </div>
            <div class="accountForm" style="width:300px">
                <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                size="small"
                >
                    <el-form-item label="账号" prop="account">
                        <el-input type="account" v-model="ruleForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="选择用户组" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-card>
    </div>
</template>

<script>
        // 引入工具函数
        import { pwdReg } from "@/utils/reg";
        import { log } from 'util';

        //引入
        import { accountAdd } from '@/api/Account'
        
    export default {
        data(){
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
                if(this.ruleForm.checkPass !==""){
                    //当再次输入密码框不为空时，再触发密码一致性的内置验证
                    this.$refs.ruleForm.validateField('checkPass')
                }
                callback()  //成功的回调 
                }

            }
            const confirmPwd = (rule,value,callback) =>{
                //非空验证
                if (value === ''){
                    callback(new Error('请再次输入密码'))
                }else if(value !== this.ruleForm.password){
                    callback(new Error('两次输入密码不一致'))
                }else{
                    //成功
                    callback()
                }
            }
            return {
                ruleForm:{
                    account:"",password:"",checkPass:"",region:""
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
                    region:[
                         {required: true, message: '请选择', trigger: 'blur' }, // 非空验证
                    ]
                }
            }
        },
        methods:{
            submitForm(){
                //获取整个表单
                this.$refs.ruleForm.validate((valid)=>{ //所有前端都已通过
                    if(valid){
                        
                        // 收集参数
                        let params = {
                            account: this.ruleForm.account,
                            password: this.ruleForm.password,
                            region: this.ruleForm.region
                        }
                    //发送给后端
                    accountAdd(params)
                            .then(res => {
                                    // console.log(res.data);
                                    // 接收后端响应数据
                                    let {code,reason} = res;

                                    //判断
                                    if (code === 0){
                                        this.$message({ // 弹成功提示
                                            message: reason,
                                            type: 'success'
                                        })
                                        this.$router.push('/accountmanage')  //跳转到账号管理
                                    }else if( code === 1 ){
                                        this.$message.error(reason); // 弹失败提示
                                    }
                                })
                            .catch(err =>{
                                console.log(err);
                                    
                        })
                        
                        
                    }
                      
                })
                
            },
            resetForm(){
                //    获取el-form表单 调用内置重置方法
                    this.$refs.ruleForm.resetFields();

            }
        }
        
    }
</script>

<style lang="less">
    .account-add{
        .el-card__header{
            background-color: #3793df;
            color: #fff;
        }
    }
</style>