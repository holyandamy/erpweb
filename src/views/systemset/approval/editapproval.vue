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
									<el-input v-model="appform.executor" disabled></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="executorSearch">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="审批功能">
							线路发布
						</el-form-item>
						<el-form-item label="审批人">
							<el-row>
								<el-col :span="19">
									<el-input v-model="appform.approver" disabled></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="approverSearch">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="审批状态">
							<el-radio-group v-model="appform.status">
								<el-radio label="启用"></el-radio>
								<el-radio label="停止"></el-radio>
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
		<el-dialog title="选择被审批人员" size="tiny" :visible.sync="dialogFormVisible" style="text-align: left;" :show-close=false>
			<!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group :min="1" :max="10" v-model="checkedCities" @change="handleCheckedCitiesChange">
				<el-checkbox v-for="approval in approvals" :label="approval.username" :key="approval.username">{{approval.username}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelCheck">取 消</el-button>
				<el-button type="primary" @click="comfirm()">确 定</el-button>
			</div>
      <!--
        点取消按钮 应该恢复到之前选中的数据 而不是简单的让弹窗消失
      -->
		</el-dialog>
		<!-- 审批人员 -->
		<el-dialog title="选择审批人员" size="tiny" :visible.sync="approvalVisible" style="text-align: left;" :show-close=false>
			<!--<el-checkbox  :indeterminate="isIndeterminate" v-model="checkAllapp" @change="appCheckAllChange">全选</el-checkbox>-->
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group :min="1" :max="10" v-model="checkedapproval" @change="appCheckedCitiesChange">
				<el-checkbox v-for="approval in approvaleds" :label="approval.username" :key="approval.username">{{approval.username}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelCheckApp">取 消</el-button>
        <!--approvalVisible = false-->
				<el-button type="primary" @click="comfirmapp()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import paramm from '../../../common/js/getParam'
	import axios from 'axios';
	import {approveupdate, userenablelist,token} from '../../../common/js/config';
	export default {
		props: ['edit'],
		data() {
			return {
				appform: {
					token: paramm.getToken(),
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
				approvaledlist:[],
        oldexecutor:'',
        oldapprover:''
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
			  let _this = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = {
							token: paramm.getToken(),
							executorid: '',
							approverid: '',
							isenable: '',
							id: this.edit.row.id
						}
						this.appform.status == "启用" ? para.isenable = true : para.isenable = false
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
							if(res.data.error != 0 || res.data.err) {
								paramm.getCode(res.data, _this)
							} else {
                paramm.getCode(res.data, _this)
                _this.handleHide()
                _this.$emit('toparent','getlist')
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
//			handleCheckAllChange(event) {
//				this.checkedCities = event.target.checked ? this.approvallist : [];
//				this.isIndeterminate = false;
//
//			},
			handleCheckedCitiesChange(value) {
			  //console.log(666)
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.approvallist.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.approvallist.length;
			},
      //被审批人员查找
      executorSearch() {
			  //保存appform.executor
        this.oldexecutor = this.appform.executor
        //console.log(this.oldexecutor)
        this.dialogFormVisible = true
      },
      //被审批人员取消  先保存原来的值  appform.executor
      cancelCheck() {
			  console.log(typeof this.oldexecutor)
        this.checkedCities = this.oldexecutor.split(',')
        this.appform.executor = this.checkedCities.join(",")
        this.dialogFormVisible = false
      },
			comfirm() {
				this.appform.executor = this.checkedCities.join(",")
				this.dialogFormVisible = false
			},

      //审批人查找
      approverSearch() {
			  this.oldapprover = this.appform.approver
        this.approvalVisible = true
      },
      //审批人取消
      cancelCheckApp() {
			  this.checkedapproval = this.oldapprover.split(',')
        this.appform.approver = this.checkedapproval.join('')
        this.approvalVisible = false
      },
			//审批人员选择
			comfirmapp() {
				this.appform.approver = this.checkedapproval.join(",")
				this.approvalVisible = false
			},
//			appCheckAllChange(event) {
//				this.checkedapproval = event.target.checked ? this.approvaledlist : [];
//				this.isIndeterminate = false;
//			},
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
					token: paramm.getToken()
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
