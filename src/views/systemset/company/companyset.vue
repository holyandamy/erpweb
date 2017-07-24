<template>
	<div>
		<header>
			<el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal" style="background: #fff;">
				<el-menu-item index="1">
					<router-link :to="'/cmanagement/department'">部门管理</router-link>
				</el-menu-item>
				<el-menu-item index="2">
					<router-link :to="'/cmanagement/bankaccount'">银行账号设置</router-link>
				</el-menu-item>
				<el-menu-item index="3">
					<router-link :to="'/cmanagement/companyset'">公司信息设置</router-link>
				</el-menu-item>
			</el-menu>
		</header>
		<section class="bg-white margin30 padding30">
			<el-col :span="15">
				<el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="公司名称" prop="companyName">
						<el-col :span="7">
							<el-input v-model="companyForm.companyName"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="所在城市" prop="companyName">
 	 <el-col :span="6">
    <el-cascader
  :options="options"
  change-on-select
></el-cascader>
    </el-col>
  </el-form-item>
					</el-form-item>
					<el-form-item label="详细地址" prop="address">
						<el-input v-model="companyForm.address"></el-input>
					</el-form-item>
					<el-form-item label="公司负责人" prop="person">
						<el-col :span="7">
							<el-input v-model="companyForm.person"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="负责人手机" prop="mobile">
						<el-col :span="7">
							<el-input v-model.number="companyForm.mobile"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="公司座机" prop="tel">
						<el-col :span="7">
							<el-input v-model="companyForm.tel"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="公司传真" prop="fax">
						<el-col :span="7">
							<el-input v-model="companyForm.fax"></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="公司logo">
						<el-col :span="15" style="float: left;">
							<el-upload class="upload-demo" style="float: left;" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
								<span slot="tip" class="el-upload__tip">建议图片格式：jpg、png。 图片大小在1M以内，宽高为200*80，比例为5:2</span>
							</el-upload>
						</el-col>
					</el-form-item>
					<el-form-item label-width="100px">
						<el-button type="primary" @click="submitForm('companyForm')">保存</el-button>
						<el-button @click="resetForm('companyForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<div class="clearfix"></div>
		</section>
	</div>

</template>
<script>
	import axios from 'axios';
	export default {
		data() {
		//验证手机号码
			var checkmobile = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('手机号码不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						let mobilereg = /^[0-9]{11}$/;
						if(mobilereg.test(value)) {
							callback();
						} else {
							callback(new Error('请输入正确的手机号码'));
						}
					}
				}, 1000);
			};
			return {
				activeIndex: '3',
				fileList2: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				//提交数据
				companyForm: {
					companyName: '',
					address: '',
					person: '',
					mobile: '',
					tel: '',
					fax: ''
				},
				//验证数据
				rules: {
					companyName: [{
							required: true,
							message: '请输入公司名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 50,
							message: '长度在 3 到 50 个字符',
							trigger: 'blur'
						}
					],
					address: [{
							required: true,
							message: '请输入详细地址',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 120,
							message: '长度在 3 到 120 个字符',
							trigger: 'blur'
						}
					],
					person: [{
							required: true,
							message: '请输入公司负责人',
							trigger: 'blur'
						},
						{
							max: 50,
							message: '长度在 2 到 50 个字符',
							trigger: 'blur'
						}
					],
					mobile: [{
						validator: checkmobile,
						trigger: 'blur',
						required: true,
					}],
					tel: [{
						max: 20,
						message: '长度在 2 到 20 个字符',
						trigger: 'blur',
						required: false,
					}],
					fax: [{
						max: 20,
						message: '长度在 2 到 20 个字符',
						trigger: 'blur',
						required: false,
					}]
				},
				province:[],
				options: [{
		          value: '陕西',
		          label: '陕西',
		          children: [{
		            value: 'shejiyuanze',
		            label: '渭南',
		            children: [{
		              value: 'yizhi',
		              label: '华州区'
		            }, {
		              value: 'fankui',
		              label: '蒲城'
		            }, {
		              value: 'xiaolv',
		              label: '华阴'
		            }, {
		              value: 'kekong',
		              label: '河阳'
		            }]
		          }, {
		            value: 'daohang',
		            label: '汉中',
		            children: [{
		              value: 'cexiangdaohang',
		              label: '安康'
		            }, {
		              value: 'dingbudaohang',
		              label: '洋县'
		            }]
		          }]
		        }]
			}
		},
		created(){
			this.getprovince()
			this.getcity()
			this.getdistrict()
		},
		methods: {
			//保存数据
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let parses = this.companyForm
						axios.post("https://172.17.9.13:3001/api/sys/company/update",parses).then((res) => {
							 this.$message('提交成功！');
							 console.log(parses)
						})
					} else {
						 this.$message.error('提交错误！');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			//获取国家列表
			
			getcountry(){
				axios.post("https://172.17.9.13:3001/api/sys/province/list").then((res) => {
							//this.province = res
							console.log(res)
				})
			},
			//获取省级列表
			getprovince(){
				axios.post("https://172.17.9.13:3001/api/sys/province/list").then((res) => {
							//this.province = res
							console.log(res)
				})
			},
			//获取市列表
			getcity(){
				axios.post("https://172.17.9.13:3001/api/sys/city/list").then((res) => {
							//this.province = res
							console.log(res)
				})
			},
			//获取区列表
			getdistrict(){
				axios.post("https://172.17.9.13:3001/api/sys/district/list").then((res) => {
							//this.province = res
							console.log(res)
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.clearfix {
		clear: both;
	}
	
	.bg-white {
		background: white;
	}
	
	.padding30 {
		padding: 20px;
	}
	
	.margin30 {
		margin: 30px;
	}
	
	header {
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
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
</style>