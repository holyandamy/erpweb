<template>
  <el-form-item label="上传图片">
    <el-upload action="http://v0.api.upyun.com/xtimg"
               list-type="picture-card"
               accept="image/bmp,image/jpeg,image/png"
               :on-preview="handlePictureCardPreview"
               :file-list="imglist"
               :http-request="upload"
               :disabled="count < 10 ? false : true"
               :on-success="uploadsuccess"
               :on-remove="handleRemove" multiple>
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-form-item>
</template>

<script>
  import { imgupload } from '../../common/js/upload'
  export default {
    data() {
      return {
        count:0,
        dialogImageUrl: '',
        dialogVisible: false,
        imglist: [],
        imagelist:''
      }
    },
    methods: {
      //图片上传
      async upload(file) {
        const files = await imgupload(file)
        return files.file
      },
      uploadsuccess(response, file, fileList) {
        this.$message({
          message:'只能上传jpg,png,bmp格式的图片',
          type:'warning'
        })
        this.count++
        console.log(this.count)
        if(this.count > 9){
          this.$message({
            message:'只可上传10张图片',
            type:'warning'
          })
        }
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
        console.log(9999)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //限制图片的大小和数量
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        if(this.imglist.length > 10){
          this.$message.error('上传图片的数量不能超过10张');
        }
        return isLt1M;
      }
    }
  }
</script>

<style>

</style>
