<template>
    <div class="vip-accountadd">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h2>Vip账号添加</h2>
            </div>
            
            <el-form
            :label-position="top"
            label-width="80px"
            :model="formLabelAlign"
            >
            <el-form-item label="真实名字：">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="会员卡卡号：">
                <el-input v-model="formLabelAlign.vipcard"></el-input>
            </el-form-item>
            <el-form-item label="会员组">
                <el-select v-model="formLabelAlign.region" placeholder="普通会员-%99">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            </el-form>

            
        </el-card>
    </div>
</template>

<script>

export default {
    data(){
        return {
            formLabelAlign:{
                name:"",
                vipcard:"",
                region:"",
                type:""
            },
            top:""
        }
    }
    
}

</script>

<style lang="less">
    .vip-accountadd{
        .el-card__header{
            background-color: #3793df;
            color: #fff;
        }
    }

</style>