<template>
    <div class="stystem-info">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>系统信息</h2>
            </div>

            <!-- 身体部分 -->
            <div class="item">
                <!-- 提示 -->
                <el-alert
                    title="商品总数：5。已经销售的总金额：890.00。库存商品总价：1235.82"
                    type="warning"
                    show-icon>
                </el-alert>
                <el-alert
                    title="导入数据"
                    type="warning"
                    show-icon>
                </el-alert>

                <!-- 左右的面板 -->
                <el-row>
                    <!-- 左面板 -->
                    <el-col :span="12">
                        <el-card class="right-card">
                            <div slot="header" class="clearfix">
                                <h2>销售排行</h2>
                            </div>
                                <div class="text item">
                                    <!-- 左表格 -->
                                    <el-table
                                        :data="saleRank"
                                        style="width: 100%"
                                        >
                                        <!-- 商品名称 -->
                                        <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            width="300">
                                        </el-table-column>

                                        <!-- 销量 -->
                                        <el-table-column
                                            prop="salesNum"
                                            label="销量">
                                        </el-table-column>

                                    </el-table>
                                </div>
                               
                            
                        </el-card>
                    </el-col>

                    <el-col :span="1">
                        &emsp;
                    </el-col>

                    <!-- 右面板 -->
                    <el-col :span="11">
                        <el-card class="left-card">
                            <div slot="header" class="clearfix">
                                <h2>缺货的商品</h2>
                            </div>
                                <div class="text item">
                                    <!-- 右表格 -->
                                    <el-table
                                        :data="stockoutTable"
                                        style="width: 100%"
                                        >
                                        <!-- 商品名称 -->
                                        <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            width="300">
                                        </el-table-column>

                                        <!-- 库存 -->
                                        <el-table-column
                                            prop="inventory"
                                            label="库存">
                                        </el-table-column>

                                    </el-table>
                                </div>
                               
                            
                        </el-card>
                    </el-col>
                </el-row>

            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // 销售排行
                saleRank: [
                    {
                       goodsName: '竹蜻蜓',
                       salesNum: 100000
                    },
                    {
                       goodsName: '竹蜻蜓',
                       salesNum: 100000
                    },
                    {
                       goodsName: '竹蜻蜓',
                       salesNum: 100000
                    }
                ],
                // 缺货的商品
                stockoutTable:[
                    {goodsName: '哆啦A梦的口袋', inventory: "~"},
                    {goodsName: '哆啦A梦的口袋', inventory: "~"},
                    {goodsName: '哆啦A梦的口袋', inventory: "~"}
                ]
            }
        }
    }
</script>

<style lang="less">
    .stystem-info{
        .el-card__header{
            color: #fff;
            background-color: #3793df;
        }
        .box-card{
            .item{
                .el-alert{
                    margin-top:10px;
                    border-radius: 10px;
                }
                .el-row{
                    margin-top:10px;
                    .right-card{
                        border-radius: 10px;
                    }
                    .left-card{
                        border-radius: 10px;
                    }
                }
            }
        }
    }

</style>