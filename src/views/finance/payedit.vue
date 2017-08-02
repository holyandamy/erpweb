<template>
	<el-row>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item><span @click="handleHide">付款管理</span></el-breadcrumb-item>
			<el-breadcrumb-item>付款登记</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="bg-white margin30 padding30">
			<el-form :model="collectForm" ref="collectForm" :rules="rules" label-width="100px" class="demo-ruleForm">
				<el-form-item label="创建日期">
					<el-col :span="11" prop="createtime">
						{{collectForm.createtime}}
					</el-col>
				</el-form-item>
				<el-form-item label="业务类型" prop="businesstypename">
					<el-select v-model="collectForm.businesstypename" placeholder="选择" @change="changemenu()">
						<el-option label="预收款" value="0"></el-option>
						<el-option label="订单预收款" value="1"></el-option>
						<el-option label="预付款退款" value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="订单编号" required prop="orderno" v-show="isshowall">
					<el-col :span="10">
						<el-input placeholder="HP23083098409283098028450" @blur="typethis" v-model="collectForm.orderno"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="团号" prop="teamno" v-show="isshow">
					<el-col :span="10" v-model="collectForm.teamno">
						HP23083098409283098028450
					</el-col>
				</el-form-item>
				<el-form-item label="线路名称" prop="linename" v-show="isshow">
					<el-col :span="24">
						{{collectForm.linename}}
					</el-col>
				</el-form-item>
				<el-form-item label="付款单位" prop="companyname">
					<el-col :span="10">
						<el-input v-model="collectForm.companyname" placeholder="搜索选择收款单位"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="备注" prop="remarks">
					<el-col :span="10">
						<el-input type="textarea" v-model="collectForm.remarks"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="收款明细" prop="list">
					<el-col :span="24">
						<table border="" cellspacing="" cellpadding="" class="collecttable" width="90%">
							<tr>
								<th>收款方式</th>
								<th>收款账号</th>
								<th>到账日期</th>
								<th>金额</th>
								<th>操作</th>
							</tr>
							<tr v-for="(domain, index) in dynamicValidateForm.domains">
								<td>
									<el-col :span="20">
										<el-select placeholder="选择" v-model="domain.businesstype">
											<el-option label="预收款" value="0"></el-option>
											<el-option label="订单预收款" value="1"></el-option>
											<el-option label="预付款退款" value="2"></el-option>
											
										</el-select>

									</el-col>
								</td>
								<td>
									<el-col :span="20">
										<el-select placeholder="收款账号" v-model="domain.id" id="bankvalue">
											 <el-option
											      v-for="item in banklist"
											      :key="item.bankNameAccount"
											      :label="item.bankNameAccount"
											      :value="item.id"
											      >
											     
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
										<el-input v-model="domain.remark" placeholder="请输入内容"></el-input>
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
				<el-form-item>
					<el-col :span="5">
						<el-upload class="upload-demo" :show-file-list="true" :multiple="true" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">单张图片大小不能超过1M，张数不能超过十张。</div>
						</el-upload>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('collectForm')">保 存</el-button>
					<el-button @click="resetForm('collectForm')">重置</el-button>
				</el-form-item>

			</el-form>
		</div>

	</el-row>
</template>
<script>
	import axios from 'axios';
	import util from '../../common/js/util'
	import {paysave,banlist} from '../../common/js/config';
	export default {

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
				item:[],
				banklist:[],
		        isshow: false,
				isshowall:false,
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				dynamicValidateForm: {
					domains: [{
						businesstype: '',
						bank: '',
						id:'',
						linetime: '',
						account:'',
						remark: ''
					}]
				},

				collectForm: {
					createtime: '',
					businesstypename: '',
					orderno: '',
					teamno: '',
					list: [],
					remarks: '',
					linename: '222'

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
				fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					},
					{
						name: 'food2.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}
				],
				accounts:[]
				
			}
		},
		created() {
			let mydate = new Date()
			let today = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate()
			this.collectForm.createtime = today
			this.checkbanklist()

		},
		methods: {
			handleHide: function() {
		        this.$emit('setMode', 'collectlist');
		    },
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = Object.assign({}, this.collectForm);
						this.collectForm.list.push(this.dynamicValidateForm.domains)
						para.linetime = (!para.linetime || para.linetime == '') ? '' : util.formatDate.format(new Date(para.linetime), 'yyyy-MM-dd');
						for(let i = 0 ; i < this.banklist.length;i++){
							for(let j = 0 ; j <para.list[0].length;j++){
								if(this.banklist[i].id == para.list[0][j].id){
								console.log(this.banklist[i].bankNameAccount)
								para.list[0][j].account =  this.banklist[i].bankNameAccount
								}
							}
						}
						paysave(para).then((res) => {
							console.log(para, res)
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['collectForm'].resetFields();

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
					
				}else{
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
				this.dynamicValidateForm.domains.push({
					id: '',
					businesstype: '',
					linetime: '',
					remark:'',
					account:''
				});
			},
			removeDomain(item) {
				var index = this.dynamicValidateForm.domains.indexOf(item)
				if(index !== -1) {
					this.dynamicValidateForm.domains.splice(index, 1)
				}
			},
			changemenu() {
				let changetype = this.collectForm.businesstypename
				if(changetype==0 || changetype ==2){
					//预收款、预付款退款
					this.isshowall = true
					this.typethis()
				}
				if(changetype==1){
					//订单收款
					this.isshowall = false
				}
			},
			checkbanklist(){
				banlist
				let para = {token:''}
				banlist(para).then((res) => {
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
</style>