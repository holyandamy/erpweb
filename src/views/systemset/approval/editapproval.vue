<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>系统设置</el-breadcrumb-item>
						<el-breadcrumb-item><span @click="handleHide()">审批配置</span></el-breadcrumb-item>
						<el-breadcrumb-item>编辑审批</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

			</el-row>
		</header>
		<section class="padding30">
			<el-row class="bg_white">
				<el-col :span="8">
					<el-form ref="appform" :model="appform" :rules="rules" label-width="110px" style="text-align: left;">
						<el-form-item label="被审批人员" prop='executor'>
							<el-row>
								<el-col :span="19">

									<el-input v-model="appform.executor"></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="dialogFormVisible = true">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="审批功能">
							线路发布
						</el-form-item>
						<el-form-item label="审批人">
							<el-row>
								<el-col :span="19">

									<el-input v-model="appform.approver"></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="approvalVisible = true">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="审批状态">
							<el-radio-group v-model="appform.status">
								<el-radio label="启用"></el-radio>
								<el-radio label="禁用"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label-width="80px">
							<el-button size="large" type="primary" @click="onSubmit('appform')">保存</el-button>
							<el-button size="large" @click="handleHide">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</section>
		<!-- 被审批人员 -->
		<el-dialog title="选择人被审批员" size="tiny" :visible.sync="dialogFormVisible" style="text-align: left;">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group :min="1" :max="10" v-model="checkedCities" @change="handleCheckedCitiesChange">
				<el-checkbox v-for="approval in approvals" :label="approval.username" :key="approval.username">{{approval.username}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="comfirm()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 审批人员 -->
		<el-dialog title="选择审批人员" size="tiny" :visible.sync="approvalVisible" style="text-align: left;">
			<el-checkbox  :indeterminate="isIndeterminate" v-model="checkAllapp" @change="appCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group :min="1" :max="10" v-model="checkedapproval" @change="appCheckedCitiesChange">
				<el-checkbox v-for="approval in approvaleds" :label="approval.username" :key="approval.username">{{approval.username}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="approvalVisible = false">取 消</el-button>
				<el-button type="primary" @click="comfirmapp()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios';
	import {approveupdate, userenablelist} from '../../../common/js/config';
	export default {
		props: ['edit'],
		data() {
			return {
				appform: {
					token: '',
					approver: '',
					executorid: '',
					executor: '',
					approverid: '',
					isenable: '',
					status: '',
					id: ''
				},
				dialogFormVisible: false,
				checkAll: true,
				checkAllapp: true,
				checkedCities: [],
				checkedapproval: [],
				approvals: [],
				approvaleds: [],
				isIndeterminate: true,
				approvalVisible: false,
				rules: {
					executorid: [{
						required: true,
						message: '请选择被审批人'
					}]
				},
				approvalsid: [],
				approvalsedid: [],
				approvallist:[],
				approvaledlist:[]

			}
		},
		created() {
			this.getuser()
			this.appform = this.edit.row
			this.checkedCities = this.edit.row.executor.split(',')
			this.checkedapproval = this.edit.row.approver.split(',')

		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = {
							token: '',
							executorid: '',
							approverid: '',
							isenable: '',
							id: this.edit.row.id
						}
						this.appform.isenable == "启用" ? para.isenable = true : para.isenable = false
						for(let i = 0; i < this.checkedCities.length; i++) {
							for(let j = 0; j < this.approvals.length; j++) {
								if(this.checkedCities[i] == this.approvals[j].username) {
									this.approvalsid.push(this.approvals[j].id)
								}
							}
						}
						for(let i = 0; i < this.checkedapproval.length; i++) {
							for(let j = 0; j < this.approvaleds.length; j++) {
								if(this.checkedapproval[i] == this.approvaleds[j].username) {
									this.approvalsedid.push(this.approvaleds[j].id)
								}
							}
						}
						para.executorid = this.approvalsid.join(',')
						para.approverid = this.approvalsedid.join(',')
						approveupdate(para).then((res) => {
							if(res.data.error = 1) {
								this.$notify({
									title: '错误',
									message: res.data.err.message,
									type: 'error'
								});
							} else {
								this.$notify({
									title: '成功',
									message: '编辑成功！',
									type: 'success'
								});
								this.handleHide()
							}

						})
					} else {
						this.$notify.error({
							title: '错误',
							message: '添加未成功！'
						});
						return false;
					}
				});

			},

			//被审批人员选择
			handleCheckAllChange(event) {
				this.checkedCities = event.target.checked ? this.approvallist : [];
				this.isIndeterminate = false;
				
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.approvallist.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.approvallist.length;
			},
			comfirm() {
				this.appform.executor = this.checkedCities.join(",")
				this.dialogFormVisible = false
			},
			//审批人员选择
			comfirmapp() {
				this.appform.approver = this.checkedapproval.join(",")
				this.approvalVisible = false
			},
			appCheckAllChange(event) {
				this.checkedapproval = event.target.checked ? this.approvaledlist : [];
				this.isIndeterminate = false;
			},
			appCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAllapp = checkedCount === this.approvaledlist.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.approvaledlist.length;
			},
			handleHide: function() {
				this.$emit('setMode', 'approval');
			},
			//获取被审批人员
			getuser() {
				let para = {
					token: ''
				}
				userenablelist(para).then((res) => {
					if(res.data.error == 1) {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					} else {
						this.approvals = res.data.obj
						this.approvaleds = res.data.obj
						
						for(let i=0;i<res.data.obj.length;i++){
							this.approvallist.push(res.data.obj[i].username)
							this.approvaledlist.push(res.data.obj[i].username)
						}
						
					}
				})
			}
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
	
	.el-breadcrumb {
		font-size: 18px;
		margin-bottom: 20px;
	}
	
	.padding30 {
		padding: 0 30px;
	}
	
	.bg_white {
		background: #fff;
		padding: 20px 35px;
	}
</style>