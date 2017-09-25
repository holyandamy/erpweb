<template>
  <el-form-item label="上传图片">
    <el-upload action="http://v0.api.upyun.com/xtimg"
               :headers="obj"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :file-list="imglist"
               :http-request="upload"
               :before-upload="beforeAvatarUpload"
               :on-success="uploadsuccess"
               :on-remove="handleRemove" multiple>
      <i class="el-icon-plus"></i>
      <!--
          accept="image/bmp,image/jpeg,image/png"
          :disabled="count < 10 ? false : true"
      -->
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-form-item>
</template>

<script>
  import { imgupload } from '../../common/js/upload'
  import paramm from '../../common/js/getParam'

  export default {
    data() {
      return {
        count:0,
        dialogImageUrl: '',
        dialogVisible: false,
        imglist: [],
        imagelist:'',
        obj:{
          "Authorization":"Basic"
        }
      }
    },
    methods: {
      //图片上传
      async upload(file) {

        const files = await imgupload(file)
        return files.file
      },
      uploadsuccess(response, file, fileList) {
        if(fileList.length > 10) {
          this.imglist.splice(1,1)
          this.$message({
            message:'最多只能上传十张图片',
            type:'warning'
          })
        }else{
          this.imglist = fileList
          let list = []
          for(let i = 0 ; i <this.imglist.length;i++){
            //限制图片的数量
            /*if(this.imglist.length > 10){
              break;
            }*/
            list.push(this.imglist[i].raw.url)
            this.imagelist = list.join(',')
            this.$emit("imagelistchange",this.imagelist)
          }
        }
      },
      handleRemove(file, fileList) {
        let index
        for(let i = 0; i < this.imglist.length; i++) {
          index = i
        }
        this.imglist.splice(index, 1)
        let list = []
        for(let i = 0 ; i <this.imglist.length;i++){
          list.push(this.imglist[i].raw.url)
          this.imagelist = list.join(',')
          this.$emit("imagelistchange",this.imagelist)
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //限制图片的大小和数量
      beforeAvatarUpload(file) {
        this.count++
        const isLt1M = file.size / 1024 / 1024 < 1;
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        if(!isBMP && !isPNG && !isJPG){
          this.$message.error('只能上传jpg,png,bmp格式的图片');
          return false
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isLt1M;
      }
    }
  }
</script>

<style>

</style>
