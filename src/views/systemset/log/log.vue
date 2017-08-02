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
					<el-input v-model="formInline.moudle" placeholder="操作模块"></el-input>
				</el-form-item>
				<el-form-item label="操作时间">
					<el-date-picker v-model="formInline.date" type="daterange" placeholder="选择日期范围">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="操作类型">
					<el-select v-model="formInline.type" clearable placeholder="操作类型">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作人">
					<el-input v-model="formInline.operator" placeholder="操作人"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
			<section class="padding30">
				<el-table :data="roleList" style="width: 100%; text-align: left;">
					<el-table-column prop="operator" label="操作人">
					</el-table-column>
					<el-table-column prop="mod" label="操作模块" width="180">
					</el-table-column>
					<el-table-column prop="content" label="操作内容">
					</el-table-column>
					<el-table-column prop="createdAt" label="操作日期">
					</el-table-column>
				</el-table>

				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="formInline.pageSize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>

			</section>
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	import util from '../../../common/js/util'
	import { loglist,getdeplist,rolelist} from '../../../common/js/config';
	export default {
		data() {
			return {
				formInline: {
					token: '',
					moudle: '',
					date: '',
					type: 1,
					operator: '',
					pageIndex: 0,
					pageSize: 10
				},
				roleList: [],
				total: 0,
				currentPage: 1,
				search: '',
				options: [{
					value: '1',
					label: '新增'
				}, {
					value: '2',
					label: '编辑'
				}, {
					value: '3',
					label: '删除'
				}],

			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				let page = this.formInline;
				let startday = page.date[0]
				let endday = page.date[1]
				startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
				endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
				page.date = startday + "|" + endday
				loglist(page).then((res) => {
					console.log(page,res)
					//this.roleList = res.data.obj.rows;
					//this.total = Number(res.data.obj.total);
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.getList(1)
			},
			onSubmit() {
				this.getList()
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