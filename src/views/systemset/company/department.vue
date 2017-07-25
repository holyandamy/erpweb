<template>
	<div>
		<header>
			<el-row>
			<el-col :span="12">
			<el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal" style="background: #fff;">
				<el-menu-item index="1">
					<router-link :to="'/cmanagement/department'">部门管理</router-link>
				</el-menu-item>
				<el-menu-item index="2">
					<router-link :to="'/cmanagement/bankaccount'">银行账号设置</router-link>
				</el-menu-item>
				<el-menu-item index="3">
					<router-link :to="'/cmanagement/companyset'">公司信息设置</router-link>
				</el-menu-item>
			</el-menu>
			</el-col>
		<el-col :span="12">
		<el-button class="defaultbutton" >新增部门</el-button>
		</el-col>
		</el-row>
		</header>
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
						<li>张若昀</li>
						<li>2</li>
						<li>+</li>
						<li>编辑删除</li>
					</ul>
				</div>
				<div class="secondlist">
					<ul>
						<li>张若昀</li>
						<li>2</li>
						<li>+</li>
						<li>编辑删除</li>
					</ul>
				</div>
				<div class="threelist">
					<ul>
						<li>张若昀</li>
						<li>2</li>
						<li>+</li>
						<li>编辑删除</li>
					</ul>
				</div>
				<div class="fourlist">
					<ul>
						<li>张若昀</li>
						<li>2</li>
						<li>+</li>
						<li>编辑删除</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
let id = 1000;
	export default {
		data() {
			return {
				activeIndex: "1",
				data2: [{
					id: 1,
					label: '一级 1',
					children: [{
						id: 4,
						label: '二级 1-1',
						children: [{
							id: 9,
							label: '三级 1-1-1'
						}, {
							id: 10,
							label: '三级 1-1-2'
						}]
					}]
				}, {
					id: 2,
					label: '一级 2',
					children: [{
						id: 5,
						label: '二级 2-1'
					}, {
						id: 6,
						label: '二级 2-2'
					}]
				}, {
					id: 3,
					label: '一级 3',
					children: [{
						id: 7,
						label: '二级 3-1'
					}, {
						id: 8,
						label: '二级 3-2'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
			},
			methods:{
				 append(store,data) {
			        store.append({ id: id++, label: 'testtest', children: [] }, data);
			      },
				 remove(store,data) {
			        store.remove(data);
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
	.list{padding: 0 20px; background: #fff;height: 40px;
		ul{
			width: 100%; height: 40px;
				li{float: left;
				font-size: 12px;
				border-bottom: 1px solid #dee5ec;
				line-height: 40px;
				}
				:first-child{width: 50%;}
				:nth-child(2){width: 20%;}
				:nth-child(3){width: 20%;}
				:last-child{width: 10%;}
			}
		
	}
	
</style>