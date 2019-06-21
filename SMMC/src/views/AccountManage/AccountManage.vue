<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>账号管理</h2>
            </div>
            <!-- 主体 -->
            <div class="textitem">
                <el-table
                    ref="userList"
                    :data="userList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="checkboxChange"
                    >
                    <el-table-column type="selection">
                        <!-- checkbox -->
                    </el-table-column>
                    <!-- 用户名称 -->
                    <el-table-column
                        prop="account"
                        label="用户名称"
                        width="300">
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                        prop="region"
                        label="用户组">
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                        prop="ctime"
                        label="日期">
                        <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
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
                                编辑
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
                    <el-col :span="8">
                        <!-- 批量删除&取消选择按钮 -->
                        <div style="margin-top: 20px">
                            <el-button @click="batchDel" size='small' type="danger">批量删除</el-button>
                            <el-button @click="deselect" size='small' type="primary">取消选择</el-button>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <!-- 分页 -->
                        <div style="margin-top: 20px" class="fenye">
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
            </div>
            <!-- 修改表单模态框 -->
                <el-dialog title="修改账号" width="420px" :visible.sync="visible">
                    <!-- 修改表单 -->
                    <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="account" label-width="120px">
                            <el-input v-model="editForm.account" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 用户组 -->
                        <el-form-item label="用户组" label-width="120px">
                            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                                <el-option label="普通用户" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <!-- 修改表单按钮 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="visible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </div>
                </el-dialog>
            
        </el-card>
    </div>
</template>

<script>
    // 引入moment
    import moment from 'moment';
    import { log } from 'util';

    // 引入账号ajax模块
    import { accountAllDelet,accountAllGet,accountDlete,accountBedit,editSave } from '@/api/Account'

    export default {
        data(){
            return {
                userList:[
                ],
                pageSize:3, //3条每页
                total:0,   //总共有多少条数据
                currentPage:1,  //默认在第一页
                editForm:{  //修改表单数据
                    account:"",
                    userGroup:""
                },
                visible:false,  //编辑模态框默认不出现
                editid:"", //修改数据表单框是否出现
                rules:{
                    //修改数据表单验证
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'change' },
                        { min: 3, max: 6, message:'长度3 ~ 6位', trigger: 'change' }
                    ]
                },
                idArr:[]
            }
        },
        methods:{
            // 循环出选中框里的id信息
            checkboxChange(checkbox){
                //map  ES6写法，循环出所有选择框，v就是当前的选择框为对象.id  取到每个选择框的id号
                this.idArr = checkbox.map(v => v.id);
            },
            // 取消删除
            deselect(){
                this.$refs.userList.clearSelection();
            },
            // 批量删除
            batchDel(){
                //判断循环出的id数组不为空
                if(this.idArr.length){
                    //选了
                    // 优化体验
                    this.$confirm('确认执行批量删除吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(() => {
                            let params = {
                                idArr:this.idArr
                            }
                            // 发送ajax
                            accountAllDelet(params)
                            .then(rep => {
                                let { code,reason } = rep;
                                if( code === 0 ){
                                    this.$message({
                                        type: 'success',
                                        message: reason
                                    })
                                    //重新刷新
                                    this.getAccountsAll()
                                }else if( code === 1 ){
                                    this.$message.error(reason)
                                }
                                
                            })
                            .catch(err => {
                                console.log(err);

                            })

                        })
                        .catch((err) => {
                            //取消提示
                            this.$message({
                                    type: 'success',
                                    message: "您已取消"
                                })
                            
                        })

                }else{
                    //数组为空，提示信息
                    this.$message.error("兄弟你都没选，删什么")
                }

            },
            //每页条数
            handleSizeChange(i){
                //每页条数通过i传回赋值给pageSize
                this.pageSize=i;
                this.getAccountsAll()

            },
            //当前页
            handleCurrentChange(i){
                //默认页通过i传回赋值给pageSize
                this.currentPage=i;
                this.getAccountsAll()
            },
            //单条删除
            handleDelete(id){
                 this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        let params ={
                            idArr:this.idArr
                        }

                        // 点击确定执行ajax请求删除当前账号
                            accountDlete(params)
                                .then(rep=>{
                                   // 刷新列表（重新请求一次数据）
                                     this.getAccountsAll()  
                                    
                                })
                                .catch(err=>{
                                    console.log(err);
                                    
                                })



                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })        
                    })

            },
            handleEdit(id){
                // 编辑模态框出现
                this.visible=true;
                // 留住id号
                this.editid=id;
                // 发送ajax
                accountBedit({id})
                .then(rep => {
                    // 获取的值
                    let { data } = rep;
                    //回填表单
                    this.editForm.account = data[0].account;
                    this.editForm.userGroup = data[0].region;

                    this.getAccountsAll()

                    
                })
                .catch(err => {
                    console.log(err);
                    
                })


            },
            // 最初的请求所有数据
            /* getAccounts(){
                // 在created生命周期内，发送ajax请求，请求所有的账号信息
                this.req.get("http://127.0.0.1:5555/account/accountList")
                        .then(res => {
                            // 获取数据
                            let { data } = res.data;
                            
                            // 渲染表格
                            this.userList = data
                        })
                        .catch(err=>{
                            console.log(err);
                            
                })
            }, */
            getAccountsAll(){
                let params = {
                    pagesize:this.pageSize,
                    currentpage:this.currentPage
                }

                // 将当前页和每页条数发送到后台
                accountAllGet(params)
                    .then(rep => {
                        //接受数据
                        let {total, data} = rep;
                        
                        // 将返回的数据渲染
                        this.total = total;
                        this.userList = data;

                        if(!data.length &&  this.currentPage!==1){
                            this.currentPage-=1;
                            this.getAccountsAll();
                            // console.log("当前页面：",this.currentpage);
                            // console.log("调用的刷新函数：",this.getAccountsAll());
                        }
                        
                        
                    })
                    .catch(err => {
                        console.log(err);
                        
                    })
            },
            saveEdit(){
                // 点击确定保存修改的数据
                //调用表单的前端验证
                this.$refs.editForm.validate((valid) => {
                    if(valid){
                        this.visible=false;
                        //收集参数
                        let params ={
                            account:this.editForm.account,
                            userGroup:this.editForm.userGroup,
                            id:this.editid
                        }
                        // 发送数据给后端
                        editSave(params)
                            .then(res =>{
                                let {code,reason} = res;
                                // 判断
                                if(code === 0){
                                    this.$message({
                                        type: 'success',
                                        message: reason
                                    })
                                   this. getAccountsAll(); // 重新请求一次数据 刷新列表
                                    
                                }else if(code===1){
                                    this.$message.error( reason )
                                }
                                
                            })
                            .catch(err => {
                                console.log(err);
                                
                            })
                    } else {
                        return false
                    }
                })
            }


        },
        created(){
            //封装函数，封装的是获取数据库所有账号信息的ajax
            this. getAccountsAll()
            
        },
        filters: {
            // 过滤器，使用moment组件，将原生时间改为规定的格式
            filterCtime(ctime) {
                return moment(ctime).format('YYYY-MM-DD hh:mm:ss')
            }
    }
    }
</script>

<style lang="less">
.account-manage{
    .box-card{
        .el-card__header{
            background-color: #3793df;
            color:#fff;
        }
        ;
        .textitem{
            border-radius: 10px;
            .fenye{
                margin-left:0px;
            }
        }
    }
}

</style>