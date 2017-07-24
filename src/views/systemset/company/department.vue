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
		<el-button class="defaultbutton" >新增银行账户</el-button>
		</el-col>
		</el-row>
		</header>
		<section class="bg-white margin30 padding30">
			<el-tree :data="data2" :props="defaultProps" show-checkbox="" node-key="id" default-expand-all :expand-on-click-node="false">
			</el-tree>

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
</style>