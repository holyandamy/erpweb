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
			<el-form :inline="true" :model="formInline" class="demo-form-inline hasid" style="text-align: left!important; padding-left: 30px; float: left;" id="54bfe60304f84742bd37e2d93c3924da">
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
					<el-button type="primary"  @click="onSubmit">搜索</el-button>
				</el-form-item>
			</el-form>
			<section class="padding30">
				<el-table :data="roleLists" style="width: 100%; text-align: left;">
					<el-table-column prop="operator" label="操作人">
					</el-table-column>
					<el-table-column prop="mod" label="操作模块">
					</el-table-column>
					<el-table-column prop="content" label="操作内容">
					</el-table-column>
					<el-table-column prop="createdAt" label="操作日期">
					</el-table-column>
				</el-table>

				<div class="page">
					<el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>

			</section>
		</div>

	</div>
</template>

<script>
  import paramm from '../../../common/js/getParam'
	import axios from 'axios';
	import util from '../../../common/js/util'
	import { showorhide } from '../../../common/js/showorhid'
	import {loglist,getdeplist,rolelist,token} from '../../../common/js/config';
	export default {
		data() {
			return {
				formInline: {
					moudle: '',
					date: '',
					type: '',
					operator: '',

				},
				roleLists: [],
				total: 0,
				currentPage: 1,
				pagesize:10,
				options: [{
					value: '0',
					label: '全部'
				}, {
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
		 updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			getList() {
				let dates=''
				let startday = this.formInline.date[0]
				let endday = this.formInline.date[1]
				startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
				endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
				if(startday == '' && endday == ''){
					dates = startday + endday
				}else{
					dates = startday+'|'+endday
				}
				let page = {
					token: paramm.getToken(),
					moudle: this.formInline.moudle,
					date: dates,
					type: this.formInline.type,
					operator: this.formInline.operator,
					pageindex: this.currentPage-1,
					pagesize: this.pagesize
				}
				loglist(page).then((res) => {
					console.log(page,res)
					this.roleLists = res.data.obj.rows
					this.total = Number(res.data.obj.total)
				})
			},
			handleCurrentChange(val) {
				this.getList()
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
