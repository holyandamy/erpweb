<template>
	<el-form-item label="" label-width="120px">
		<el-upload action="http://v0.api.upyun.com/xtimg"
               accept="image/jpeg,image/gif,image/png"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :file-list="imglist"
               :before-upload="beforeAvatarUpload"
               :http-request="upload"
               :on-success="uploadsuccess"
               :on-remove="handleRemove" multiple>
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
        this.imglist = fileList
				let titlename = []
				for(let i = 0; i < this.imglist.length; i++) {
					titlename.push(this.imglist[i].raw.url)
				}

				if(this.checktop){
          let imageurl = titlename.join(',')
					this.$emit('geturl',imageurl);

				}else{
          this.$emit('getRouteImages',titlename.join(','),this.idx);
//          this.route.titleimages = titlename.join(',')
				}


				},
			handleRemove(file, fileList) {
        this.imglist=fileList;
        // let temArr = []
        // this.imglist.forEach(function (item,idx) {
        //   if(file.url!=item.url) {
        //     temArr.push(item)
        //   }
        // })
				let titlename = []
				for(let i = 0; i < this.imglist.length; i++) {
					titlename.push(this.imglist[i].raw.url)
				}
				if(this.checktop){
					let imageurl = titlename.join(',')
					this.$emit('geturl',imageurl);
				}else{
//          this.route.titleimages = titlename.join(',')
	        console.log("满意")
					this.$emit('getRouteImages',titlename.join(','),this.idx);
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
      //限制图片的大小和数量(上传之前)
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1;
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
//        const isBMP = file.type === 'image/bmp';
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          //bug1:给大小超过1MB的图片加个索引，然后把它删除
        }
        //上传的图片格式不对时，也应该把它删除
        if(!isJPG && !isPNG){  /*  && !isBMP */
          this.$message.error('只能上传jpg,png格式的图片');
          return false
        }
        return isLt1M
      }
		}
	}
</script>

<style>

</style>
