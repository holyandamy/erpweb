<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>系统设置</el-breadcrumb-item>
						<el-breadcrumb-item>人员管理</el-breadcrumb-item>
						<el-breadcrumb-item>新增人员</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

			</el-row>
		</header>
		<section class="padding30">
			<el-row class="bg_white">

				<el-col :span="8">
					<el-form :model="addstaff" :rules="rules" ref="addstaff" label-width="100px" class="demo-ruleForm" style="text-align: left;">
						<el-form-item label="员工编号" prop="code">
							<el-input v-model="addstaff.code"></el-input>
						</el-form-item>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="addstaff.username"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="addstaff.password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="password">
							<el-input v-model="addstaff.password"></el-input>
						</el-form-item>
						<el-form-item label="真实姓名" prop="realname">
							<el-input v-model="addstaff.realname"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="addstaff.sex">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="活动区域" prop="region">
							<el-select v-model="addstaff.region" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="活动时间" required>
							<el-col :span="11">
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="选择日期" v-model="addstaff.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="2">-</el-col>
							<el-col :span="11">
								<el-form-item prop="date2">
									<el-time-picker type="fixed-time" placeholder="选择时间" v-model="addstaff.date2" style="width: 100%;"></el-time-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
						<el-form-item label="即时配送" prop="delivery">
							<el-switch on-text="" off-text="" v-model="addstaff.delivery"></el-switch>
						</el-form-item>
						<el-form-item label="活动性质" prop="type">
							<el-checkbox-group v-model="addstaff.type">
								<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
								<el-checkbox label="地推活动" name="type"></el-checkbox>
								<el-checkbox label="线下主题活动" name="type"></el-checkbox>
								<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>

						<el-form-item label="活动形式" prop="desc">
							<el-input type="textarea" v-model="addstaff.desc"></el-input>
						</el-form-item>
						<el-form-item label-width="100px">
							<el-button type="primary" @click="submitForm('addstaff')">立即创建</el-button>
							<el-button @click="resetForm('addstaff')">重置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</section>

	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				addstaff: {
					token: '',
					username: '',
					code: '',
					password: '',
					realname: '',
					mobile: '',
					tel: '',
					sex: '',
					birthday: '',
					deptid: '',
					roleid: '',
					status: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]

				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.appform
						this.appform.isenable == "启用" ? para.isenable = true : para.isenable = false
						axios.post('https://172.17.9.13:3001/api/sys/approve/save', para).then((res) => {
							this.$notify({
								title: '成功',
								message: '添加成功！',
								type: 'success'
							});
							this.$router.push({
								path: '/approval'
							});
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
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