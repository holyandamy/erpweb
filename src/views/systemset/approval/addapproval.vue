<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>系统设置</el-breadcrumb-item>
						<el-breadcrumb-item>审批配置</el-breadcrumb-item>
						<el-breadcrumb-item>新增审批</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

			</el-row>
		</header>
		<section class="padding30">
			<el-row class="bg_white">

				<el-col :span="8">
					<el-form ref="appform" :model="appform" :rules="rules" label-width="110px" style="text-align: left;">
						<el-form-item label="被审批人员"  prop='executorid'>
							<el-row>
								<el-col :span="19">

									<el-input v-model="appform.executorid"></el-input>
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

									<el-input v-model="appform.approverid"></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="approvalVisible = true">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="审批状态">
							<el-radio-group v-model="appform.isenable">
								<el-radio label="启用"></el-radio>
								<el-radio label="禁用"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label-width="80px">
							<el-button type="primary" @click="onSubmit('appform')">保存</el-button>
							<el-button @click="addappqx">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</section>
		<!-- 被审批人员 -->
		<el-dialog title="选择人被审批员" size="tiny" :visible.sync="dialogFormVisible" style="text-align: left;">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				<el-checkbox v-for="approval in approvals" :label="approval" :key="approval">{{approval}}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="comfirm()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 审批人员 -->
		<el-dialog title="选择审批人员" size="tiny" :visible.sync="approvalVisible" style="text-align: left;">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAllapp" @change="appCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedapproval" @change="appCheckedCitiesChange">
				<el-checkbox v-for="approval in approvaleds" :label="approval" :key="approval">{{approval}}</el-checkbox>
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
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	const approvaleds = ['陕西', '山西', '郑州', '河南'];
	export default {
		data() {
			return {
				appform: {
					token:'',
					executorid: '',
					approverid: '',
					isenable: ''
				},
				dialogFormVisible: false,
				checkAll: true,
				checkAllapp:true,
				checkedCities: ['上海', '北京'],
				checkedapproval:[],
				approvals: cityOptions,
				approvaleds:approvaleds,
				isIndeterminate: true,
				approvalVisible:false,
				rules:{executorid:[{required:true, message: '请选择被审批人'}]}
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		         		 let para = this.appform
						this.appform.isenable == "启用" ? para.isenable = true:para.isenable = false
						axios.post('https://172.17.9.13:3001/api/sys/approve/save',para).then((res) => {
							 this.$notify({
					          title: '成功',
					          message: '添加成功！',
					          type: 'success'
					        });
					        this.$router.push({path: '/approval'});
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
			addappqx(){
				this.$router.push({path: '/approval'});
			},
			//被审批人员选择
			handleCheckAllChange(event) {
				this.checkedCities = event.target.checked ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.approvals.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.approvals.length;
			},
			comfirm() {
				this.appform.executorid = this.checkedCities.join(",")
				this.dialogFormVisible = false
			},
			//审批人员选择
			comfirmapp(){
				this.appform.approverid = this.checkedapproval.join(",")
				this.approvalVisible = false
			},
			appCheckAllChange(event) {
				this.checkedapproval = event.target.checked ? approvaleds : [];
				this.isIndeterminate = false;
			},
			appCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAllapp = checkedCount === this.approvaleds.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.approvaleds.length;
			},
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