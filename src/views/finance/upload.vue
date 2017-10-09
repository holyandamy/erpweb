<template>
  <el-form-item label="上传图片">
    <el-upload action="http://v0.api.upyun.com/xtimg"
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
          this.imglist = fileList
          let list = []
          const isLt1M = file.size / 1024 / 1024 < 1;
          for(let i = 0 ; i <this.imglist.length;i++){
            if(fileList.length > 10) {
              this.$message({
                message:'最多只能上传十张图片',
                type:'warning'
              })
              this.imglist.pop()
            }
            if (!isLt1M) {
              this.$message.error('上传图片大小不能超过 1MB!');
              this.imglist.pop()
            }
            list.push(this.imglist[i].raw.url)
            this.imagelist = list.join(',')
            this.$emit("imagelistchange",this.imagelist)
          }
      },
      handleRemove(file, fileList) {
        this.imglist = fileList
        let list = []
        let index
        for(let i = 0 ; i <this.imglist.length;i++){
          index = i
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
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        if(!isJPG && !isPNG && !isBMP){
          this.$message.error('只能上传jpg,png,bmp格式的图片');
        }
      }
    }
  }
</script>

<style>

</style>
