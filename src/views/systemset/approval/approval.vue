<template>
	<div>
		<div v-if="modeType == 'approval'">
			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>系统设置</el-breadcrumb-item>
							<el-breadcrumb-item>审批配置</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="12">
						<el-button class="defaultbutton" @click="setMode('addapproval')">新增审批</el-button>
					</el-col>
				</el-row>
			</header>

			<section class="padding30">
				<el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;">

					<el-form-item label="被审批人">
						<el-input v-model="formInline.search" placeholder="被审批人"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="banklist" style="text-align: left; font-size: 12px;">
					<el-table-column prop="executor" label="被审批人">
					</el-table-column>
					<el-table-column prop="approver" label="审批流程">
					</el-table-column>
					<el-table-column prop="status" label="状态">
					</el-table-column>

					<el-table-column label="操作">
						<template scope="scope">
							<el-button @click="setMode('editroval',scope)" type="text" size="small">编辑</el-button>
							<el-button type="text" size="small" v-show="scope.row.status=='禁用'" @click="changestatus('1',scope.row.id)">启用</el-button>
							<el-button type="text" size="small" v-show="scope.row.status=='启用'" class="not" @click="changestatus('0',scope.row.id)">禁用</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>
			</section>
		</div>
		<AppRoval v-else-if="modeType == 'addapproval'" @setMode="setMode" :banklist="banklist"></AppRoval>
		<EditRoval :edit="edit" v-else="modeType == 'editroval'" @setMode="setMode"></EditRoval>
	</div>

</template>

<script>
  import paramm from '../../../common/js/getParam'
	import axios from 'axios';
	import AppRoval from './addapproval.vue'
	import EditRoval from './editapproval.vue'
	import {getapprovelist, approvestatus,token} from '../../../common/js/config';
	export default {
		components: {
			AppRoval, // add role
			EditRoval //编辑
		},
		data() {
			return {
				functiona: '被审批人',
				modeType: 'approval',
				formInline: {
					search: ''
				},
				activeIndex: "2",
				banklist: [],
				total: 0,
				currentPage: 1,
				pagesize: 15,
				isenable: false,
				pageset: {
					token: paramm.getToken(),
					executor: '',
					pageIndex: '',
					pageSize: ''
				},
				updatestatus: {
					isEnable: '',
					token: paramm.getToken(),
					id: ''
				},
				edit: {}
			}
		},
		methods: {
			setMode(type, scope) {
				this.modeType = type
				this.edit = scope
			},
			onSubmit() {
				this.getlist()
			},
			getlist() {
				this.pageset.pageIndex = this.currentPage - 1
				this.pageset.pageSize = this.pagesize
				this.pageset.executor = this.formInline.search
				let page = this.pageset
				console.log(page)
				getapprovelist(page).then((res) => {
					this.banklist = res.data.obj.datas
					this.total = Number(res.data.obj.total)
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			//分页
			handleCurrentChange(val) {
				this.getlist()
			},
			changestatus(i, id) {
				this.updatestatus.id = id
				let para = this.updatestatus
				i == "1" ? para.isenable = true : para.isenable = false
				approvestatus(para).then((res) => {
					this.$message.success("状态改变成功！")
					this.getlist()
				})
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
		font-size: 18px;
		margin-bottom: 20px;
	}
</style>
