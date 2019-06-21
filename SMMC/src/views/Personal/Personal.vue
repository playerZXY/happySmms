<template>
    <div class="personal">
        <h1>个人中心</h1>
        <h2>账户名： {{ account }} </h2>
        <h2>密码： {{ password }} </h2>
        <h2>管理权限： {{ region }} </h2>
        <h2>创建时间： {{ ctime | filster }} </h2>
        <hr>
        <div style="margin-top:30px">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

    </div>
</template>

<script>
import { getAccountp } from '@/api/Account'
    // 引入moment
    import moment from 'moment';
export default {
    data(){
        return {
            account:"",
            password:"",
            region:"",
            ctime:"",
            imageUrl:"",

        }
    },
    methods:{
        //头上上传之前限制
        beforeAvatarUpload(file){
             const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //头像上传成功
        handleAvatarSuccess(res, file){

        },        //获取当前账号信息
        getAccountp(){
            getAccountp()
                .then(rep => {
                    this.account=rep[0].account;
                    this.password=rep[0].password
                    this.region=rep[0].region
                    this.ctime=rep[0].ctime
                })
                .catch(err => {
                    console.log(err);
                    
                })
        }
    },
    created(){
        this.getAccountp()
    },
    filters:{
        filster(i){
            return moment(i).format('YYYY-MM-DD hh:mm:ss')
        }
    }
}
</script>

<style lang="less">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
