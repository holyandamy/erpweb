<template>
	<el-form-item label="公司logo" style="text-align: left;">
		<el-upload action="http://v0.api.upyun.com/xtimg"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :file-list="imglist"
               :http-request="upload"
               :before-upload="beforeAvatarUpload"
               :on-success="uploadsuccess"
               :on-remove="handleRemove">
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog v-model="dialogVisible" size="tiny">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</el-form-item>
</template>

<script>
	import { imgupload } from '../../../common/js/upload'
	export default {
		props:['logo'],
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				imglist: [],
				imagelist:''

			}
		},
		methods: {
			loading(logo){
				this.imglist.push({
					url:logo,
					uid:'',
					status:'success'
				})
				console.log(this.imglist,logo)

			},
			//图片上传
			async upload(file) {
				const files = await imgupload(file)
				return files.file
			},
			uploadsuccess(response, file, fileList) {
				if(fileList.length>1){
					this.$message({
			          message: '最多只能上传一张图片',
			          type: 'warning'
			        });
          this.imglist.splice(1,1)
				}else{
					this.imglist = fileList
					let list = []
					for(let i = 0 ; i <this.imglist.length;i++){
						list.push(this.imglist[i].raw.url)
						this.imagelist = list.join(',')
            console.log(typeof this.imagelist)
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

			//限制图片上传格式
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        if(!isBMP && !isPNG && !isJPG){
          this.$message.error('只能上传jpg,png,bmp格式的图片');
          return false
        }
      }
		}
	}
</script>

<style>

</style>
