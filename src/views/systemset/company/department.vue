<template>
	<div>
		
		<section class="bg-white margin30 ">
			<!--<el-tree :data="data2" :props="defaultProps" show-checkbox="" node-key="id" default-expand-all :expand-on-click-node="false">
			</el-tree>-->
			<div class="title">
				<ul>
					<li>部门名称</li>
					<li>人数</li>
					<li>添加下级</li>
					<li>操作</li>
				</ul>
			</div>
			<div class="list">
				<div class="firstlist">
					<ul>
						<li>
							<div class="name">张若昀</div>
							<div class="presonnum">4</div>
							<div>+</div>
							<div><el-button type="text">编辑</el-button><el-button type="text">删除</el-button></div>
						</li>
						
					</ul>
					<div class="secondlist">
					<ul>
						
					</ul>
					</div>
				</div>
				
			</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios';
	export default {
		data() {
			return {
				activeIndex: "1",
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
			},
			created(){
				this.getuser()
			},
			methods:{
				getuser(){
					let para = {token:''}
					axios.post("https://172.17.9.13:3001/api/sys/dept/list",para).then((res) => {
						console.log(res)
					}).catch((res)=>{
						console.log(res)
					})
				}
			}
		
	}
</script>
<style scoped lang="scss">
	.clearfix {
		clear: both;
	}
	
	.bg-white {
		background: white;
		text-align: left;
	}
	
	.padding30 {
		padding: 20px;
	}
	
	.margin30 {
		margin: 30px;
	}
	
	header {
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
		.defaultbutton{
			border-color:#9ad4d6 ;
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
	.title{padding: 0 20px; height: 40px; line-height: 40px;border-bottom: 1px solid #bfcbda; background: #f5f7f9;
		ul{
			width: 100%;
			li{float: left;
			font-size: 12px;
			
				}
			:first-child{width: 50%; }
			:nth-child(2){width: 20%;}
			:nth-child(3){width: 20%;}
			:last-child{width: 10%;}
		}
		
	}
	.list{ background: #fff;height: 40px;
		ul{background: #fff;
			li{height: 40px;
				display: block;
				font-size: 12px;
				border-bottom: 1px solid #dee5ec;
				line-height: 40px;
				div{
					float: left;
				}
				:first-child{width: 49%; padding-left: 1%;}
				:nth-child(2){width: 20%;}
				:nth-child(3){width: 20%;}
				:last-child{width: 10%;}
				}
				
			}
		
	}
	
</style>