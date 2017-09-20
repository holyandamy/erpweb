<template>
	<el-form-item label="" label-width="120px">
		<el-upload action="http://v0.api.upyun.com/xtimg" accept="image/jpeg,image/gif,image/png"  list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="imglist" :http-request="upload" :on-success="uploadsuccess" :on-remove="handleRemove" multiple>
			<i class="el-icon-plus"></i>
		</el-upload>
		<!--<el-dialog v-model="dialogVisible" size="tiny">-->
			<!--<img width="100%" :src="dialogImageUrl" alt="">-->
		<!--</el-dialog>-->
	</el-form-item>
</template>

<script>
	import { imgupload } from '../../../common/js/upload'
	export default {
		props: ['idx','checktop','scope'],
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				imglist: []
			}
		},
		created(){
      console.log(111,this.scope);
			let botimg = this.route
      if(this.scope ) {
        if(this.scope.images == ""){

          this.imglist = []
        }else{

          if(this.scope.images.indexOf(',') == -1){
            this.imglist.push({
              url:this.scope.images,
              uid:''
            })
          }else{
            let lists = this.scope.images.split(',')
            for(let i=0;i<lists.length;i++){
              this.imglist.push({
                url:lists[i],
                uid:''
              })
            }
          }
        }
      }else {
        this.imglist = []
      }

		},
		methods: {

			//图片上传
			async upload(file) {
        const files = await imgupload(file)
				return files.file
			},
			uploadsuccess(response, file, fileList) {
        console.log(2222, fileList);
        this.imglist = fileList
				let titlename = []
				for(let i = 0; i < this.imglist.length; i++) {
					titlename.push(this.imglist[i].raw.url)
				}

				if(this.checktop){
          console.log(3333);
          let imageurl = titlename.join(',')
					this.$emit('geturl',imageurl);

				}else{
          console.log(444,this.idx);
          this.$emit('getRouteImages',titlename.join(','),this.idx);

//          this.route.titleimages = titlename.join(',')
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
//          this.route.titleimages = titlename.join(',')
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
