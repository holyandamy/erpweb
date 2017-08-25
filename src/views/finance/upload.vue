<template>
	<el-form-item label="上传图片">
		<el-upload action="http://v0.api.upyun.com/xtimg"  list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="imglist" :http-request="upload" :on-success="uploadsuccess" :on-remove="handleRemove" multiple>
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
				for(let i = 0 ; i <this.imglist.length;i++){
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
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}
		}
	}
</script>

<style>

</style>