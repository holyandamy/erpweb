<template>
	<div>
		<div>
			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>系统设置</el-breadcrumb-item>
							<el-breadcrumb-item>操作日历</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>

				</el-row>
			</header>
			<el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left; padding-left: 30px;">
				<el-form-item label="操作模块">
					<el-input v-model="formInline.user" placeholder="操作模块"></el-input>
				</el-form-item>
				<el-form-item label="操作时间">
					<el-date-picker v-model="search" type="daterange" placeholder="选择日期范围">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="操作内容">
					<el-input v-model="formInline.user" placeholder="操作内容"></el-input>
				</el-form-item>
				<el-form-item label="操作人">
					<el-input v-model="formInline.user" placeholder="操作人"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
			<section class="padding30">
				<el-table :data="roleList" style="width: 100%">
					<el-table-column prop="date" label="操作人">
					</el-table-column>
					<el-table-column prop="name" label="操作模块" width="180">
					</el-table-column>
					<el-table-column prop="address" label="操作内容">
					</el-table-column>
					<el-table-column prop="address" label="操作日期">
					</el-table-column>
				</el-table>

				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>

			</section>
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				roleList: [],
				total: 0,
				currentPage: 1,
				pagesize: 15,
				pageset: {
					pageIndex: '',
					pageSize: ''
				},
				search: ''

			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.pageset.pageIndex = this.currentPage - length;
				this.pageset.pageSize = this.pagesize;
				let page = this.pageset;
				axios.post("https://172.17.9.13:3001/api/sys/log/list", page).then((res) => {
					this.roleList = res.data.obj.datas;
					this.total = Number(res.data.obj.total);

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.getList(1)
			},
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped lang="scss">
	.not:hover {
		color: red;
	}
	
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
	}
	
	.page {
		padding: 15px 30px;
		background: white;
		text-align: right;
	}
	
	.el-table .cell {
		text-align: left;
	}
	
	.el-breadcrumb {
		margin-bottom: 20px;
	}
</style>