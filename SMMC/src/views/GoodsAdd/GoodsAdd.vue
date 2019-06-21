<template>
    <div class="goods-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>添加商品</h2>
            </div>
            <div class="main">
                <el-form
                :inline="true"
                :model="goodsAddform"
                size="small"
                ref="goodsAddform"
                :rules="rules"
                >
                    
                        <el-form-item label="所属分类：" class="fenlei1" prop="clcation">
                            <el-select v-model="goodsAddform.clcation" placeholder="---选择分类---">
                            <el-option label="生活用品" value="生活用品"></el-option>
                            <el-option label="干杂" value="干杂"></el-option>
                            <el-option label="厨具" value="厨具"></el-option>
                            <el-option label="箱包" value="箱包"></el-option>
                            <el-option label="皮具" value="皮具"></el-option>
                            <el-option label="零食" value="零食"></el-option>
                            
                            </el-select>
                        </el-form-item>
                    

                    <br/>

                    <el-form-item label="商品条形码：" class="fenlei4" prop="goodsCode">
                        <el-input v-model="goodsAddform.goodsCode" placeholder="商品条形码："></el-input>
                    </el-form-item>
                    
                    <el-form-item class="fenlei3">
                        <el-button type="primary" @click="proCode">生产条形码</el-button>
                    </el-form-item>

                    <el-form-item label="商品名称：" class="fenlei1" prop="goodsName">
                        <el-input v-model="goodsAddform.goodsName" placeholder=""></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="商品售价：" class="fenlei1" prop="goodsPrice">
                        <el-input v-model="goodsAddform.goodsPrice" placeholder="商品售价：   元"></el-input>
                    </el-form-item>
                    <!-- 6 -->
                    <br/>
                    <el-form-item label="市场价：" class="fenlei1" prop="listprice">
                        <el-input v-model="goodsAddform.listprice" placeholder="默认市场价为售价的1.2倍"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="促销价：" class="fenlei1" prop="CostPrice">
                        <el-input v-model="goodsAddform.CostPrice" placeholder="商品进价：   元"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="入库数量：" class="fenlei1" prop="WareNum">
                        <el-input v-model="goodsAddform.WareNum" placeholder="计重商品单位为千克"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="商品重量" class="fenlei1" prop="goodsweight">
                        <el-input v-model="goodsAddform.goodsweight" placeholder=""></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="商品单位：" class="fenlei1" prop="goodsCompany">
                        <el-input v-model="goodsAddform.goodsCompany" placeholder=""></el-input>
                    </el-form-item>
                    <br>

                    <div class="Radio" prop="radio">
                        <p>会员优惠：</p>
                        <el-radio v-model="goodsAddform.radio" label="享受">享受</el-radio>
                        <el-radio v-model="goodsAddform.radio" label="不享受">不享受</el-radio>
                    </div>


                    <el-form-item label="是否促销：" class="Radio" prop="Promotion">
                        
                        <el-radio v-model="goodsAddform.Promotion" label="启用">启用</el-radio>
                        <el-radio v-model="goodsAddform.Promotion" label="禁用">禁用</el-radio>
                    </el-form-item>

                    <!-- <div>
                        <p>商品简介：</p>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="不超过200个汉字"
                            v-model="goodsAddform.textarea">
                        </el-input>
                    </div> -->
                    <br>
                    <!-- 添加按钮 -->
                    <el-button type="primary" @click="goodsAdd">添加</el-button>

                    
                </el-form>

                
            </div>
        </el-card>
    </div>
</template>

<script>
import { goodsAdd } from '@/api/Goods'
    export default {
        data(){
            return {
                goodsAddform:{
                        clcation:"",goodsCode:"",goodsName:"",goodsPrice:"",listprice:"",CostPrice:"",WareNum:"",goodsweight:"",goodsCompany:"",radio:"",Promotion:""
                    },
                rules:{
                    //输入框的规则
                    clcation:[
                        {required: true, message: '请选择所属分类', trigger: 'blur'}
                    ],
                    goodsCode:[
                         {required: true, message: '请输入商品条形码', trigger: 'blur'}
                    ],
                    goodsName:[
                        {required: true, message: '请输入商品名称', trigger: 'blur'}
                    ],
                    goodsPrice:[
                        {required: true, message: '请输入商品售价', trigger: 'blur'}
                        
                    ],
                    listprice:[
                        {required: true, message: '请输入市场价', trigger: 'blur'}
                        
                    ],
                    CostPrice:[
                         {required: true, message: '请输入商品进价', trigger: 'blur'}
                    ],
                    WareNum:[
                         {required: true, message: '请输入入库数量', trigger: 'blur'}
                        
                    ],
                    goodsweight:[
                         {required: true, message: '请输入商品重量', trigger: 'blur'}
                        
                    ],
                    goodsCompany:[
                         {required: true, message: '请输入商品单位', trigger: 'blur'}
                        
                    ],
                    radio:[
                         {required: true, message: '请输入商品单位', trigger: 'blur'}
                        
                    ]
                }
                        
                
            }
        },
        methods:{
            proCode(){
            },
            goodsAdd(){
                 this.$refs.goodsAddform.validate((valid) => {
                     if(valid){
                         //前端验证通过发送所有的值给后台
                         let params = {
                            clcation:this.goodsAddform.clcation,
                            goodsCode:this.goodsAddform.goodsCode,

                            goodsName:this.goodsAddform.goodsName,
                            goodsPrice:this.goodsAddform.goodsPrice,

                            listprice:this.goodsAddform.listprice,
                            CostPrice:this.goodsAddform.CostPrice,

                            WareNum:this.goodsAddform.WareNum,
                            goodsweight:this.goodsAddform.goodsweight,

                            goodsCompany:this.goodsAddform.goodsCompany,
                            radio:this.goodsAddform.radio,

                            Promotion:this.goodsAddform.Promotion
                         }
                        //  console.log(params);
                        goodsAdd(params)
                                    .then(rep => {
                                        // 接受数据
                                        let { code,reason } = rep;
                                        if(code === 0){
                                            // 成功添加
                                            this.$message({
                                                type: 'success',
                                                message: reason
                                            })
                                            // 成功添加，将所有输入框的值清空
                                            //    获取el-form表单 调用内置重置方法
                                            this.$refs.goodsAddform.resetFields();
                                        }else if(code === 1){
                                            // 添加失败
                                            this.$message.error( reason )
                                        }
                                       
                                        

                                        
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        
                                    })

                         

                     }else{
                        this.$message.error("您还有没填的内容哦~")
                         return false;
                         
                     }
                 })


            }
        }
    }
</script>

<style lang="less">
    .goods-add{
        .el-card__header{
            background-color: #3793df;
            color:#fff;
        }
            .main{
                .fenlei1{
                    width:200px;
                }
                .fenlei2{
                    width: 200px;
                    margin-bottom: 5px;
                }
                .fenlei3{
                    width: 1400px;
                    margin-left:40px;
                }
                .fenlei4{
                    width: 200px;
                    margin-bottom: 20px;
                }
                .Radio{
                    margin-bottom: 30px;
                }
                p{
                    font-size:14px;
                    margin-bottom: 14px;
                }
                
            }
        
        
    }
</style>