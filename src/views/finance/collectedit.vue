<template>
	<el-col :span="24" class="bgwhite">
		<!--:rules="rules"-->
		<el-col :span="24">
			<el-form :model="collectForm"  ref="collectForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="创建日期">
					<el-col :span="11">
						2015-55-55
					</el-col>
				</el-form-item>
				<el-form-item label="业务类型" prop="businesstypename">
					<el-select v-model="collectForm.businesstypename" placeholder="选择">
						<el-option label="预收款" value="0"></el-option>
						<el-option label="订单预收款" value="1"></el-option>
						<el-option label="预付款退款" value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="订单编号" required prop="orderno">
					<el-col :span="10">
						<el-input placeholder="HP23083098409283098028450" v-model="collectForm.orderno"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="团号" prop="teamno">
					<el-col :span="10" v-model="collectForm.teamno">
						HP23083098409283098028450
					</el-col>
				</el-form-item>
				<el-form-item label="线路名称" prop="linename">
					<el-col :span="24" v-model="collectForm.linename">
						桂林龙脊梯田、义江缘或黄洛瑶寨、訾洲象鼻山、兴坪漓江义江缘或黄洛瑶
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
							<tr v-for="(domain, index) in dynamicValidateForm.domains" >
								<td>
									<el-col :span="20">
										<el-select placeholder="选择" v-model="domain.businesstype">
											<el-option label="预收款" value="0"></el-option>
											<el-option label="订单预收款" value="1"></el-option>
											<el-option label="预付款退款" value="2"></el-option>
										</el-select>
										 
									</el-col>
								</td>
								<td><el-col :span="20">
										<el-select placeholder="收款账号" name="collectForm.accountid" v-model="domain.accountid">
											<el-option label="账号1" value="0"></el-option>
											<el-option label="账号2" value="1"></el-option>
											<el-option label="账号3" value="2"></el-option>
										</el-select>
										
									</el-col>
									
								</td>
								<td>
									<el-col :span="20">
										 <el-date-picker
										 	v-model="domain.linetime"
										      type="date"
										      placeholder="选择日期"
										      :picker-options="pickerOptions0">
										    </el-date-picker>
									</el-col>
								</td>
								<td>
									<el-col :span="20">
										<el-input v-model="collectForm.remarks" placeholder="请输入内容"></el-input>
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
		</el-col>
	</el-col>
</template>
<script>
	import axios from 'axios';
	import util from '../../common/js/util'
	export default {
		
		data() {
			return {
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				dynamicValidateForm: {
			          domains: [{
			            businesstype:'',
			            accountid:'',
			            linetime:''
			          }]
			    },
				collectForm: {
					createtime: '',
					businesstypename: '',
					orderno: '',
					teamno: '',
					list:[],
					businesstype:'',
					accountid:'',
					linetime:'',
					remarks:'',
					remarks: '',
					collectForm: ''
				},
				rules: {
					businesstypename: [{
						required: true,
						message: '请选择业务类型',
						trigger: 'change'
					}],
					orderno:[{
						required: true,
						message: '请填写订单编号',
						trigger: 'blur'
					}],
					companyname:[{
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
				]
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//this.collectForm.list.conta(this.dynamicValidateForm.domains)
						let para = Object.assign({}, this.collectForm);
						this.collectForm.list.push(this.dynamicValidateForm.domains)
						para.linetime = (!para.linetime || para.linetime == '') ? '' : util.formatDate.format(new Date(para.linetime), 'yyyy-MM-dd');
						axios.get("http://localhost:8080/static/json/collectlist.json",para).then((res) => {
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
	          accountid: '',
	          businesstype:'',
	          linetime:''
	         });
	      },
	       removeDomain(item) {
	        var index = this.dynamicValidateForm.domains.indexOf(item)
	        if (index !== -1) {
	          this.dynamicValidateForm.domains.splice(index, 1)
	        }
	      }
		}
	}
</script>
<style scoped lang="scss">
	.bgwhite {
		background: white;
		.el-form-item {
			text-align: left;
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
		
	}
</style>