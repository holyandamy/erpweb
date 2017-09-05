<template>
	<div>
		<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>系统设置</el-breadcrumb-item>
							<el-breadcrumb-item>对接平台设置</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>

				</el-row>
			</header>
			<section class="padding30">
				<div class="bg_white">
					<el-row>
						<el-col style="width: 60px;display: inline-block; line-height:35px; margin-right: 15px;">
							{{ cyform.name }}
						</el-col>
						<el-col :span="20">
							<el-form :inline="true" :model="cyform" class="demo-form-inline">
							  <el-form-item label="用户名">
							    <el-input v-model="cyform.username" placeholder="用户名"></el-input>
							  </el-form-item>
							  <el-form-item label="密码">
							    <el-input type="password" v-model="cyform.password" placeholder="密码"></el-input>
							  </el-form-item>
							  </el-form-item><el-form-item>
							    <el-button type="primary" @click="onSubmit(1)">编辑</el-button>
							  </el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<el-row>
						<el-col style="width: 60px;display: inline-block; line-height:35px; margin-right: 15px;">
              {{ htform.name }}
						</el-col>
						<el-col :span="20">
							<el-form :inline="true" :model="htform" class="demo-form-inline">
							  <el-form-item label="用户名">
							    <el-input v-model="htform.username" placeholder="用户名"></el-input>
							  </el-form-item>
							  <el-form-item label="密码">
							    <el-input type="password" v-model="htform.password" placeholder="密码"></el-input>
							  </el-form-item>
							  </el-form-item><el-form-item>
							    <el-button type="primary" @click="onSubmit(2)">编辑</el-button>
							  </el-form-item>
							</el-form>
						</el-col>
					</el-row>
				</div>
			</section>
	</div>
</template>

<script>
	import {openlist,opensave,token} from '../../../common/js/config';
  import md5 from 'js-md5';
	export default {
		data() {
			return {
        cyform:{
          name: '',
          token:token,
          username:'',
          password:'',
          platform:''
        },
        htform:{
          name: '',
          token:token,
          username:'',
          password:'',
          platform:''
        }
			}
		},
		created(){
			this.getlist()
		},
		methods: {
		    open(text, type){
		      this.$message({
            message: text,
            type: type
          })
        },
				getlist(){
					let para = {token:token}
					openlist(para).then((res) =>{
						res.data.obj.forEach((item)=>{
						    if(item.platform == 1)
                  this.cyform = item;
                else
                  this.htform = item;
            });
					})
				},
				onSubmit(str){
				    console.log(this.htform);
					let para = {}
					if(str == 1){
						para = Object.assign({},this.cyform);
						para.platform = 1
					}else{
            para = Object.assign({},this.htform);
						para.platform = 2
					}

          para.password = para.password ? md5(para.password) : '';
					opensave(para).then((res) => {
						if(res.data.error){
						  this.open(res.data.message, 'error')
              return;
            }
            this.open('同步成功！', 'success')
					})
				},
			}
	}
</script>

<style scoped lang="scss">
	header {
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
		.defaultbutton {
			border-color: #9ad4d6;
			color: #2cb1b6;
			float: right;
			margin-top: -10px;
		}
		.el-menu-item {
			height: 36px;
			line-height: 36px;
			border-top: 3px solid transparent;
			padding: 0;
			a {
				padding: 0 20px;
				display: block;
			}
		}
		.el-menu-item:hover {
			background: transparent;
			border-bottom: transparent;
			color: #3ec3c8;
			height: 36px;
			line-height: 36px;
		}
		.el-menu-item.is-active {
			background: #eef1f6;
			border-top: 3px solid #3ec3c8!important;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			color: #333;
		}
	}

	.padding30 {
		padding: 0 30px;
		.bg_white{
			background: #fff;
			text-align: left;
			padding: 10px 30px;
		}
	}
	.el-breadcrumb {
		font-size: 18px;
		margin-bottom: 20px;
	}
</style>
