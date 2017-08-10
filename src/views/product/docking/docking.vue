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
							馨·驰誉
						</el-col>
						<el-col :span="20">
							<el-form :inline="true" :model="cyform" class="demo-form-inline">
							  <el-form-item label="用户名">
							    <el-input v-model="cyform.username" placeholder="用户名"></el-input>
							  </el-form-item>
							  <el-form-item label="密码">
							    <el-input v-model="cyform.password" placeholder="密码"></el-input>
							  </el-form-item>
							  </el-form-item><el-form-item>
							    <el-button type="primary" @click="onSubmit(1)">编辑</el-button>
							  </el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<el-row>
						<el-col style="width: 60px;display: inline-block; line-height:35px; margin-right: 15px;">
							馨·欢途
						</el-col>
						<el-col :span="20">
							<el-form :inline="true" :model="htform" class="demo-form-inline">
							  <el-form-item label="用户名">
							    <el-input v-model="htform.username" placeholder="用户名"></el-input>
							  </el-form-item>
							  <el-form-item label="密码">
							    <el-input v-model="htform.password" placeholder="密码"></el-input>
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
	import {openlist,opensave} from '../../../common/js/config';
	export default {
		data() {
			return {
				cyform:{
					token:'',
					username:'',
					password:'',
					platform:''
				},
				htform:{
					token:'',
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
				getlist(){
					let para = {token:''}
					openlist(para).then((res) =>{
						console.log(res)
					})
				},
				onSubmit(str){
					let para = {}
					if(str == 1){
						para = this.cyform
						para.platform = 1
					}else{
						para = this.htform
						para.platform = 2
					}
					opensave(para).then((res) => {
						console.log(res)
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