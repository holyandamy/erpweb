<template>
	<el-form-item label="上传图片" label-width="120px">
		<el-upload action="http://v0.api.upyun.com/xtimg"  list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="imglist" :http-request="upload" :on-success="uploadsuccess" :on-remove="handleRemove" multiple>
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
		props: ['route','editimg','checktop','paras','topimglist'],
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				imglist: [],
				topimglists:[]
			}
		},
		mounted(){
			this.loading()
			
			
		},
		methods: {
			loading(){
			if(this.editimg){
				let imgurl = this.scope.route.titleimages.split(',')
				
				let list=[]
				for(let i = 0;i<imgurl.length;i++){
					let oldimglist = {}
					oldimglist.url = imgurl[i]
					list.push(oldimglist)
				}
				this.imglist = list
				
				//let topimgurl = this.route.images.split(',')
				
				//this.topimglist = topimgurl
				
			}
			},
			//图片上传
			async upload(file) {
				const files = await imgupload(file)
				return files.file
			},
			uploadsuccess(response, file, fileList) {
				this.imglist = fileList
				let titlename = []
				for(let i = 0; i < this.imglist.length; i++) {
					titlename.push(this.imglist[i].raw.url)
				}
				
				if(this.checktop){
					let imageurl = titlename.join(',')
					this.$emit('geturl',imageurl); 
				
				}else{
					this.route.titleimages = titlename.join(',')
				}
				
				
				},
			handleRemove(file, fileList) {
				let index
				for(let i = 0; i < this.imglist.length; i++) {
					index = i
				}
				this.imglist.splice(index, 1)
				let titlename = []
				for(let i = 0; i < this.imglist.length; i++) {
					titlename.push(this.imglist[i].raw.url)
				}
				if(this.checktop){
					let imageurl = titlename.join(',')
					this.$emit('geturl',imageurl); 
				}else{
					this.route.titleimages = titlename.join(',')
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