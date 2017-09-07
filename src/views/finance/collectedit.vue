<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><span @click="handleHide">收款管理</span></el-breadcrumb-item>
			<el-breadcrumb-item>收款登记</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="bg-white margin30 padding30">
			<el-form :model="collectForm" ref="collectForm" :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-form-item label="创建日期">
					<el-col :span="11" prop="createtime">
						{{createtime}}
					</el-col>
				</el-form-item>
				<el-form-item label="业务类型" prop="businesstype">
					<el-select v-model="collectForm.businesstype" placeholder="选择" @change="changemenu()">
						<el-option label="预收款" value="1"></el-option>
						<el-option label="订单预收款" value="2"></el-option>
						<el-option label="预付款退款" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单编号" required prop="orderno" v-show="isshowall">
					<el-col :span="10">
						<el-input placeholder="HP23083098409283098028450" @blur="typethis" v-model="collectForm.orderno"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="团号" prop="teamno" v-show="isshowall">
					<el-col :span="10" v-model="collectForm.teamno">
            <el-input v-model="collectForm.teamno"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="线路名称" prop="linename" v-show="isshowall">
					<el-col :span="10">
            <el-input v-model="collectForm.linename"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="付款单位" prop="companyname">
					<el-col :span="10">
						<el-input v-model="collectForm.companyname" placeholder="搜索选择收款单位"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-col :span="10">
						<el-input type="textarea" v-model="collectForm.remark"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="收款明细" prop="detail">
					<el-col :span="24">
						<table border="" cellspacing="" cellpadding="" class="collecttable" width="90%">
							<tr>
								<th>收款方式</th>
								<th>收款账号</th>
								<th>到账日期</th>
								<th>金额</th>
								<th>操作</th>
							</tr>
							<tr v-for="(domain,index) in collectForm.detail">
								<td>
									<el-col :span="20">
										<el-select placeholder="收款方式" v-model="domain.type">
											<el-option  v-for="bus in types" :key="bus.id" :label="bus.label" :value="bus.value">
											</el-option>
										</el-select>
									</el-col>
								</td>
								<td>
									<el-col :span="20">
										<el-select placeholder="收款账号" v-model="domain.accountid" id="bankvalue">
											<el-option v-for="item in banklist" :key="item.bankNameAccount" :label="item.bankNameAccount" :value="item.id">
											</el-option>
										</el-select>
									</el-col>

								</td>
								<td>
									<el-col :span="20">
										<el-date-picker v-model="domain.linetime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
										</el-date-picker>
									</el-col>
								</td>
								<td>
									<el-col :span="20">
										<el-input v-model="domain.fee" placeholder="金额"></el-input>
									</el-col>
								</td>
								<td>
									<el-col :span="20">
										<el-button type="text" @click="addDomain">新增</el-button>
										<el-button type="text" @click.prevent="removeDomain(domain)">删除</el-button>

									</el-col>

								</td>
							</tr>
						</table>

					</el-col>
				</el-form-item>
				<ImgUpload @imagelistchange="imagelistchange"></ImgUpload>
				<el-form-item>
					<el-button class="hasid" id="869cc288735d11e788410242ac120009" type="primary" @click="submitForm('collectForm')">保 存</el-button>
					<el-button @click="resetForm('collectForm')">重置</el-button>
				</el-form-item>

			</el-form>
		</div>

	</el-row>
</template>
<script>
  import paramm from '../../common/js/getParam'
	import axios from 'axios';
	import util from '../../common/js/util'
	import { collectsave, banlist,token } from '../../common/js/config';
	import ImgUpload from './upload'
	import {showorhide} from '../../common/js/showorhid'
	export default {
		components:{
			ImgUpload,
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					this.isshow = false
					callback(new Error('请输入订单编号'));
				} else {
					if(this.collectForm.orderno !== '') {
						this.isshow = true
					}
					callback();
				}
			};
			return {
				createtime:'',
				item: [],
				banklist: [],
				isshow: false,
				isshowall: false,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				collectForm: {
					token:paramm.getToken(),
					businesstype: '',
					orderno: '',
					teamno: '',
					lineid:'',
					linename:'',
					companyname:'',
					remark: '',
					attach:'',
					detail: [{
						type:'',
						accountid: '',
						linetime: '',
						fee: '',
					}],
				},
				rules: {
					businesstypename: [{
						required: true,
						message: '请选择业务类型',
						trigger: 'change'
					}],

					companyname: [{
						required: true,
						message: '请选择付款单位',
						trigger: 'blur'
					}]
				},
				accounts: [],
				types: [{ //1现金，2对公汇款，3刷卡，4支付宝，5微信，6网银，7其他
						value: '1',
						label: '现金'
					},
					{
						value: '2',
						label: '对公汇款'
					},
					{
						value: '3',
						label: '刷卡'
					},
					{
						value: '4',
						label: '支付宝'
					},
					{
						value: '5',
						label: '微信'
					},
					{
						value: '6',
						label: '网银'
					},
					{
						value: '7',
						label: '其他'
					}
				],
			}
		},
		created() {
			let mydate = new Date()
			let today = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate()
			this.createtime = today
			this.checkbanklist()


		},
		mounted(){
			showorhide()
		},
		methods: {
			handleHide: function() {
				this.$emit('setMode', 'collectlist');
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.collectForm
						console.log(this.collectForm)
						for(let i =0;i<this.collectForm.detail.length;i++){
							para.detail[i].linetime = (!para.detail[i].linetime || para.detail[i].linetime == '') ? '' : util.formatDate.format(new Date(para.detail[i].linetime), 'yyyy-MM-dd');
						}
						collectsave(para).then((res) => {
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.handleHide()
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			typethis() {
				if(this.collectForm.orderno == "") {
					//this.rules.push("orderno: [{required: false,validator: validatePass,trigger: 'blur'}]")

				} else {
					this.isshow = true
				}
				//				this.$refs.collectForm.validateField('orderno');
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			addDomain() {
				let list ={
						type:'',
						accountid: '',
						linetime: '',
						fee: '',
					}
				this.collectForm.detail.push(list);
			},
			removeDomain(item) {
				var index = this.collectForm.detail.indexOf(item)
				if(index !== -1) {
					this.collectForm.detail.splice(index, 1)
				}
			},
			imagelistchange (val) {
                this.collectForm.attach = val;

                console.log(this.collectForm.attach)
           },
			changemenu() {
				let changetype = this.collectForm.businesstype
				if(changetype == 1 || changetype == 3) {
					//预收款、预付款退款
					this.isshowall = false
					this.typethis()
				}
				if(changetype == 2) {
					//订单收款
					this.isshowall = true
				}
			},
			checkbanklist() {
				let para = {
					token:paramm.getToken()
				}
				banlist(para).then((res) => {
          console.log(res.data)
					this.banklist = res.data.obj
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.bg-white {
		background: white;
	}

	.padding30 {
		padding: 20px;
	}

	.margin30 {
		margin: 30px;
	}

	.el-form-item {
		text-align: left;
	}

	.el-breadcrumb {
		padding: 20px 40px;
		background: white;
	}

	.collecttable {
		border: 1px solid #dee5ec;
		border-radius: 5px;
		th {
			height: 38px;
			background: #f5f7f9;
			border-bottom: 1px solid #bfcbda;
			padding: 0 20px;
		}
		td {
			padding: 10px 20px;
			border-bottom: 1px solid #dee5ec;
		}
	}
	.hasid{display: none;}
</style>
