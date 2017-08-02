<template>
	<div>
		<div v-if="modetype == 'staff'">
			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>系统设置</el-breadcrumb-item>
							<el-breadcrumb-item>员工管理</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="12">
						<el-button class="defaultbutton" @click="setMode('addstaff')">新增员工</el-button>
					</el-col>
				</el-row>
			</header>
			<section class="padding30">

				<el-table :data="stafflist" style="text-align: left; font-size: 12px;">
					<el-table-column type="index" label="序号" width="80">
					</el-table-column>
					<el-table-column prop="username" label="用户名">
					</el-table-column>
					<el-table-column prop="realname" label="真实姓名">
					</el-table-column>
					<el-table-column prop="sexname" label="性别">
					</el-table-column>
					<el-table-column prop="mobile" label="电话号码">
					</el-table-column>
					<el-table-column prop="status" label="所属部门">
					</el-table-column>
					<el-table-column prop="statusname" label="状态">
					</el-table-column>
					<el-table-column prop="roleid" label="角色">
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button @click="setMode('editstaff',scope)" type="text" size="small">编辑</el-button>
							<el-button type="text" size="small" v-show="scope.row.statusname =='禁用'" @click="changestatus(1,scope.row.id)">启用</el-button>
							<el-button type="text" size="small" v-show="scope.row.statusname =='启用'" class="not" @click="changestatus(0,scope.row.id)">禁用</el-button>
							<el-button @click.native.prevent="deleteRow(scope.$index, stafflist)" type="text" size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>
				<!--编辑-->

			</section>
		</div>
		<AddStaff v-else-if="modetype == 'addstaff'" @setMode="setMode"></AddStaff>
		<EditStaff :edituser='edituser' v-else="modetype == 'editstaff'" @setMode="setMode"></EditStaff>
	</div>

</template>

<script>
	import AddStaff from './addstaff'
	import EditStaff from './editstaff'
	import axios from 'axios';
	import { getuserlist, userstatus, userdel } from '../../../common/js/config';
	export default {
		components: {
			AddStaff, //添加用户
			EditStaff //编辑用户
		},
		data() {
			return {
				edituser: {},
				modetype: 'staff',
				formInline: {
					user: '',
					region: ''
				},
				serial: 0,
				activeIndex: "2",
				stafflist: [],
				total: 0,
				currentPage: 1,
				pagesize: 15,
				showFormVisible: false,
				isenable: false,
				pageset: {
					token: '',
					pageIndex: '',
					pageSize: ''
				},
				editbank: {
					bankName: '',
					name: '',
					account: ''

				},
				addBank: {
					bankName: '',
					name: '',
					account: '',
					isEnable: '',
				},
				updatestatus: {
					status: false,
					token: '',
					id: ''
				}
			}
		},
		created() {
			this.getlist()
		},
		methods: {
			setMode(type, scope) {
				this.modetype = type
				this.edituser = scope
			},
			//获取列表
			getlist() {
				this.pageset.pageIndex = this.currentPage - 1
				this.pageset.pageSize = this.pagesize
				let page = this.pageset
				getuserlist(page).then((res) => {
					console.log(res)
					this.stafflist = res.data.obj.datas
					this.total = Number(res.data.obj.total)

				}).catch((res) => {

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			//分页
			handleCurrentChange(val) {
				this.getlist()
			},
			//改变状态
			changestatus(i, id) {
				this.updatestatus.status = i
				this.updatestatus.id = id
				let para = this.updatestatus
				this.updatestatus.status == "1" ? para.status = true : para.status = false
				userstatus(para).then((res) => {
					this.$message({
						message: '状态改变成功！',
						type: 'success'
					});
					this.getlist()
				})
			},
			//删除
			deleteRow(index, rows) {
				let para = {
					token: '',
					id: rows[index].id
				}
				userdel(para).then((res) => {
					let iserror = res.data.error
					if(iserror == 0) {
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						this.getlist()
						rows.splice(index, 1);
					} else {

					}

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