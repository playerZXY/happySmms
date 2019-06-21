<template>
    <div class="goods-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>商品管理</h2>
            </div>
            <div class="textitem">
                
                <!-- 主题内容 -->
                <el-container>
                    <!-- 主体头部 -->
                <el-header style="background-color:#fff;border-bottom:2px solid #ccc">
                    
                    <!-- 关键字输入框 -->
                    <el-form :inline="true" :model="KeywordForm" style="margin-top:8px">
                        <!-- 分成28分 -->
                        <el-row>
                            <!-- 下拉框菜单 -->
                            <el-col :span="10" style="width: 11%">
                                <!-- 查询   分类查询 -->
                                <el-form-item prop="cateName">
                                    <el-select v-model="KeywordForm.cateName" placeholder="请选择分类">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="生活用品" value="生活用品"></el-option>
                                    <el-option label="干杂" value="干杂"></el-option>
                                    <el-option label="厨具" value="厨具"></el-option>
                                    <el-option label="箱包皮具" value="箱包皮具"></el-option>
                                    <el-option label="零食" value="零食"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- 条形码查询 -->
                            <el-col :span="14">
                                <el-form-item label="关键字：">
                                    <el-input v-model="KeywordForm.keyword" placeholder="商品名称  条形码"></el-input>
                                </el-form-item>
                                
                                <!-- 查询按钮 -->
                                <el-form-item>
                                    <el-button type="primary" @click="querykeyword">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                
                        
                </el-header>
                <!-- 身体部分 -->
                <el-main>
                    <!-- 商品列表 -->
                        <el-table
                            :data="GoodsList"
                            ref="GoodsList"
                            style="width: 100%"
                            @selection-change="checkboxChange"
                            >
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <!-- 条形码 -->
                            <el-table-column
                                prop="goodsCode"
                                label="条形码"
                               >
                            </el-table-column>

                            <!-- 商品名称 -->
                            <el-table-column
                                prop="goodsName"
                                label="商品名称"
                                >
                            </el-table-column>

                            <!-- 所属分类 -->
                            <el-table-column
                                prop="clcation"
                                label="所属分类"
                                >
                            </el-table-column>

                            <!-- 售价（元） -->
                            <el-table-column
                                prop="goodsPrice"
                                label="售价（元）"
                                >
                            </el-table-column>


                            <!-- 促销价（元） -->
                            <el-table-column
                                prop="CostPrice"
                                label="促销价（元）">
                            </el-table-column>


                            <!-- 市场价（元） -->
                            <el-table-column
                                prop="listprice"
                                label="市场价（元）">
                            </el-table-column>


                            <!-- 库存 -->
                            <el-table-column
                                prop="WareNum"
                                label="入库数量"
                                >
                            </el-table-column>


                            <!-- 库存总额（元） -->
                            <el-table-column
                                prop="goodsweight"
                                label="商品重量">
                            </el-table-column>

                            <!-- 销售总额（元） -->
                            <el-table-column
                                prop="goodsCompany"
                                label="商品单位">
                            </el-table-column>

                        <!-- 操作 -->
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <!-- 编辑按钮 -->
                                    <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleEdit(scope.row.id)"
                                        >
                                        <i class="el-icon-edit"></i>
                                        修改
                                    </el-button>
                                    <!-- 删除按钮 -->
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row.id)"
                                        >
                                            <i class="el-icon-delete"></i>
                                            删除
                                        </el-button>
                                </template>
                            </el-table-column>


                        </el-table>
                        <el-row>
                        <el-col :span="5">
                                <!-- 批量删除&取消选择 -->
                            <div style="margin-top: 20px">
                                <el-button type="danger" size='small' @click="batchDel">批量删除</el-button>
                                <el-button type="primary" size='small' @click="cancelSelect">取消选择</el-button>
                            </div>
                        
                        </el-col>
                        <el-col :span="19">
                            <!-- 分页 -->
                                <div style="margin-top: 20px;margin-left: 0px;" class="fenye">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[ 3, 5]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total"
                                        >
                                    </el-pagination>
                                </div>
                            </el-col>
                        </el-row>

                        <!-- 修改编辑的模态框 -->
                        <el-dialog title="修改商品内容" :visible.sync="Visible">
                            <el-form :model="editForm" style="width:300px">
                                <el-form-item label="商品名称：" :label-width="formLabelWidth">
                                <el-input v-model="editForm.goodsName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="选择分类：" :label-width="formLabelWidth">
                                <el-select v-model="editForm.clcation" placeholder="请选择分类">
                                    <el-option label="生活用品" value="生活用品"></el-option>
                                    <el-option label="干杂" value="干杂"></el-option>
                                    <el-option label="厨具" value="厨具"></el-option>
                                    <el-option label="箱包" value="箱包"></el-option>
                                    <el-option label="零食" value="零食"></el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item label="售价：" :label-width="formLabelWidth">
                                <el-input v-model="editForm.goodsPrice" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="促销价：" :label-width="formLabelWidth">
                                <el-input v-model="editForm.CostPrice" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="市场价：" :label-width="formLabelWidth">
                                <el-input v-model="editForm.listprice" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="入库数量：" :label-width="formLabelWidth">
                                <el-input v-model="editForm.WareNum" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="商品重量:" :label-width="formLabelWidth">
                                <el-input v-model="editForm.goodsweight" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="商品单位:" :label-width="formLabelWidth">
                                <el-input v-model="editForm.goodsCompany" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="editFormVisible">取 消</el-button>
                                <el-button type="primary" @click="editFormVisible">确 定</el-button>
                            </div>
                        </el-dialog>
                        
                         

                </el-main>
                </el-container>

            </div>
        </el-card>
    </div>
</template>

<script>
    import { log } from 'util';

    import { gobatchDel,getgoodsAll,handleEdit,handleDelete,editFormVisible,querykeyword } from '@/api/Goods'

    export default {
        //初始阶段
        created(){
             this. getgoodsAll()
        },
        data(){
            return {
                KeywordForm:{
                    keyword:"",
                    cateName:""
                },
                GoodsList:[  ],  //商品列表
                currentPage:1,   //默认当前页
                pageSize:3,    //每页条数
                total:0,    //共多少条数据
                editForm:{    //修改框表单数据
                    goodsName:"",
                    clcation:"",
                    goodsPrice:"",
                    CostPrice:"",
                    listprice:"",
                    WareNum:"",
                    goodsweight:"",
                    goodsCompany:""
                },
                Visible:false,
                formLabelWidth:"",
                currenID:"",
                idArr:[],

            }
        },
        methods:{
            // 循环选中的所有checkbox框中的id
            checkboxChange(aaa){
                this.idArr = aaa.map(v => v.id);
            },
            // 批量删除
            batchDel(){
                // 判断idArr里是否有数据
                if(this.idArr.length){
                    
                    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                        .then(() => {
                                    let params ={
                                        idArr:this.idArr,
                                    }
                                gobatchDel(params)
                                    .then(rep => {
                                        let { code,reason } = rep;
                                        if(code === 0 ){
                                            this.$message({
                                                    type: 'success',
                                                    message: reason
                                                })
                                            this.getgoodsAll();
                                        }else if(code === 1){
                                            this.$message.error(reason)
                                        }
                                        
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        
                                    })
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });         
                        })

                   

                }else{
                    this.$message.error("你倒是选两个来给我删啊")
                }
                
            },
            // 取消所有选择
            cancelSelect(){
                this.$refs.GoodsList.clearSelection();
            },
            //封装一个获取所有商品的函数
            //再次封装，发送出当前页面信息，及当前页面有几条信息的数据给后台
            getgoodsAll(){
                //收集数据
                let params ={
                    currentPage:this.currentPage,
                    pageSize:this.pageSize,
                    keyword:this.KeywordForm.keyword,
                    cateName:this.KeywordForm.cateName,
                }
                 getgoodsAll(params)
                    .then(rep => {
                        let { total,data } = rep;
                        // 赋值
                        this.total = total;
                        this.GoodsList = data;
                        // 当删除最后一页时，不会跳转到上一页，在这判断跳转
                        if(!data.length && this.currentPage !==1){
                            this.currentPage-=1;
                            this.getgoodsAll();
                        }
                        
                    })
                    .catch(err => {
                        console.log(err);
                        
                    })

            },
            /* getgoodsAll(){
                this.req.get("http://127.0.0.1:5555/goods/goodslist")
                    .then(rep => {
                        let { data } = rep.data;
                        this.GoodsList = data;
                        
                    })
                    .catch(err => {
                        console.log(err);
                        
                    })
            }, */
            handleClick(){

            },
            //搜索按钮
            querykeyword(){
                 this. getgoodsAll()
            },
            //修改编辑
            handleEdit(id){
                // 用户优化体验，弹出修改框，且当前点击的列回填到输入框中
                this.Visible=true;
                // 将当前id保留
                this.currenID = id;

                // 发送ajax，将当前点击数据回填至修改框
                handleEdit({ id })
                .then(rep => {
                   
                    let { data } = rep;
                    this.editForm.goodsName = data[0].goodsName;
                    this.editForm.clcation = data[0].clcation;
                    this.editForm.goodsPrice = data[0].goodsPrice;
                    this.editForm.CostPrice = data[0].CostPrice;
                    this.editForm.listprice = data[0].listprice;
                    this.editForm.WareNum = data[0].WareNum;
                    this.editForm.goodsweight = data[0].goodsweight;
                    this.editForm.goodsCompany = data[0].goodsCompany;
                })
                .catch(err => {
                    console.log(err);
                    
                })
                

            },
            // 单条删除
            handleDelete(id){
                this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                        .then(() => {
                            // 执行删除ajax,
                            handleDelete({ id })
                            .then(rep => {
                                let { code,reason } = rep;
                                if(code === 0){
                                    this.$message({
                                        type: 'success',
                                        message: reason
                                    })
                                    // 重新获取列表
                                    this.getgoodsAll()
                                }else if( code ===1 ){
                                    this.$message.error(reason);
                                    
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                
                            })
                            
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });         
                    })

            },
            //每页数量
            handleSizeChange(i){
                this.pageSize = i;
                this.getgoodsAll();
            },
            //当前页面
            handleCurrentChange(i){
                this.currentPage = i;
                this.getgoodsAll();
            },
            // 修改模态框取消按钮
            editFormVisible(){
                // 用户优化体验，弹出修改框，且当前点击的列回填到输入框中
                this.Visible=false;

            },
            //修改模态框确认按钮
            editFormVisible(){
                // 确认修改按钮
                this.Visible=false;

                // 因为是商品修改，这就不做表单前端验证
                //获取参数，发送到后台修改
                let params = {
                    goodsName:this.editForm.goodsName,
                    clcation:this.editForm.clcation,
                    goodsPrice:this.editForm.goodsPrice,
                    CostPrice:this.editForm.CostPrice,
                    listprice:this.editForm.listprice,
                    WareNum:this.editForm.WareNum,
                    goodsweight:this.editForm.goodsweight,
                    goodsCompany:this.editForm.goodsCompany,
                    currenID:this.currenID
                }

                editFormVisible(params)
                    .then(rep => {
                        let { code,reason } = rep;
                        if(code === 0){
                            this.$message({
                                type: 'success',
                                message: reason
                            })
                            this.getgoodsAll()
                        }else if(code === 1){
                            this.$message.error(reason)
                        }
                        
                    })
                    .catch(err => {
                        console.log(err);
                        
                    })
            }

        }
    }
</script>

<style lang="less">
    .goods-manage{
        .box-card{
            .el-card__header{
                background-color: #3793df;
                color:#fff;
            }
            .el-container{
                .el-row{
                    margin-top:0px;
                    &>.el-col-6{
                        padding: 10px;
                        border:1px solid #000;
                        border-radius: 5px;
                    }
                    .el-input__inner{
                        border:1px solid #000;
                    }
                }
                .el-main{
                    background-color:#fff;
                    .el-button+.el-button{
                        margin-left:0px;
                    }
                    
                }
                
            }
        }
    }
</style>