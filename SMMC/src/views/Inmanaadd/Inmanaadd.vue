<template>
    <div class="in-manaadd">
            <div class="account-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>商品入库</h2>
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
                    <el-form-item label="商品条形码" prop="goodsCode">
                        <el-input type="text" v-model="ruleForm.goodsCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="goodsNum">
                        <el-input type="text" v-model="ruleForm.goodsNum" placeholder="计重商品单位为千克" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" prop="goodsPrice">
                        <el-input type="text" v-model="ruleForm.goodsPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-card>
    </div>
    </div>
</template>

<script>
    export default {
        data(){
            
            return {
                ruleForm:{
                    goodsCode:"",goodsNum:"",goodsPrice:""
                },
                rules:{
                    goodsCode:[
                        {required: true, message: '请输入商品名称', trigger: 'blur' }, // 非空验证
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
                    ],
                    goodsNum:[
                        {required: true, message : '请输入商品数量',trigger: 'blur' }
                    ],
                    goodsPrice:[
                        {required: true, message : '请输入商品进价',trigger: 'blur' }
                    ],
                    
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
                            goodsCode: this.ruleForm.goodsCode,
                            goodsNum: this.ruleForm.goodsNum,
                            goodsPrice: this.ruleForm.goodsPrice
                        }
                    //发送给后端
                    
                        
                        
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
    .in-manaadd{
        .el-card__header{
            background-color: #3793df;
            color: #fff;
        }
    }
</style>