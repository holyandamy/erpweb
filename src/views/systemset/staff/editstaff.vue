<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>系统设置</el-breadcrumb-item>
						<el-breadcrumb-item><span @click="handleHide()">员工管理</span></el-breadcrumb-item>
						<el-breadcrumb-item>人员编辑</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>

			</el-row>
		</header>
		<section class="padding30">
			<el-row class="bg_white">
				<!--:rules="rules"-->
				<el-col :span="20">
					<el-form :model="addstaff" :rules="rules" ref="addstaff" label-width="100px" class="demo-ruleForm" style="text-align: left;">
						<el-form-item label="员工编号" prop="code">
							<el-col :span="4">
								<el-input v-model="addstaff.code"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="用户名" prop="username">
							<el-col :span="4">
								<el-input v-model="addstaff.username"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-col :span="4">
								<el-button @click="changepassword()">修改密码</el-button>
							</el-col>
						</el-form-item>
						<el-form-item label="真实姓名" prop="realname">
							<el-col :span="4">
								<el-input v-model="addstaff.realname"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="addstaff.sex">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-row>
							<el-col :span="10">
								<el-form-item label="手机号码" prop="mobile">
									<el-col :span="11">
										<el-input v-model.number="addstaff.mobile"></el-input>
									</el-col>

								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="电话号码" prop="tel">
									<el-col :span="11">
										<el-input v-model="addstaff.tel"></el-input>
									</el-col>

								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="电子邮件" prop="email">
									<el-col :span="11">
										<el-input v-model="addstaff.email"></el-input>
									</el-col>

								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="员工生日" prop="birthday">
									<el-col :span="11">
										<el-date-picker v-model="addstaff.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
										</el-date-picker>
									</el-col>

								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item label="选择部门" prop="deptid">
							<el-row>
								<el-col :span="4">
									<el-input v-model="checkeddepar"></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="finddep = true">查找</el-button>

								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="选择角色">
							<el-row>
								<el-col :span="4">
									<el-input v-model="roleids"></el-input>
								</el-col>
								<el-col :span="1">&nbsp;</el-col>
								<el-col :span="4">
									<el-button @click="finddepartment = true">查找</el-button>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="状态" prop="status">
							<el-radio-group v-model="addstaff.status">
								<el-radio label="启用">启用</el-radio>
								<el-radio label="禁用">禁用</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label-width="100px">
							<el-button type="primary" @click="submitForm('addstaff')">保存</el-button>
							<el-button @click="handleHide()">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</section>

		<!--角色选择-->
		<el-dialog title="选择角色" :visible.sync="finddepartment" size="tiny">

			  <div style="margin: 15px 0;"></div>
			  <el-checkbox-group v-model="checkdepartment" @change="handleCheckedCitiesChange">
			    <el-checkbox v-for="role in rolelists" :label="role.id" :key="role.id">{{role.rolename}}</el-checkbox>
			  </el-checkbox-group>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="finddepartment = false">取 消</el-button>
			    <el-button type="primary" @click="comfirmrole">确 定</el-button>
			  </span>
		</el-dialog>
		<!--部门选择-->
		<el-dialog title="选择角色" :visible.sync="finddep" size="tiny">
			<ul class="dapul">
				<li v-for="department in departments">
					<el-radio class="radio" v-model="addstaff.deptid" :label="department.id">{{department.name}}</el-radio>
					<ul>
						<li v-for="depar in department.childs">
							<el-radio class="radio" v-model="addstaff.deptid" :label="depar.id">{{depar.name}}</el-radio>
							<ul>
								<li v-for="de in depar.childs">
									<el-radio class="radio" v-model="addstaff.deptid" :label="de.id">{{de.name}}</el-radio>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
    <el-button @click="finddep = false">取 消</el-button>
    <el-button type="primary" @click="comfirmdepa">确 定</el-button>
  </span>
		</el-dialog>
		<!--修改密码-->
		<el-dialog title="提示" :visible.sync="resetPassword" size="tiny">
			<el-row>
				<el-col :span='20'>

					<el-form :model="resetpassword" :rules="rules2" ref="changepass" label-width="100px" class="demo-ruleForm">
						<el-form-item label="请输入旧密码" prop="pass">
							<el-input type="password" v-model="resetpassword.pass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="请输入新密码" prop="checkPass">
							<el-input type="password" v-model="resetpassword.checkPass" auto-complete="off"></el-input>
						</el-form-item>

						<el-button type="primary" @click="savepass('changepass')">确定</el-button>
						<el-button @click="resetPassword = false">取消</el-button>
						</el-form-item>
					</el-form>

				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
  import paramm from '../../../common/js/getParam'
	import axios from 'axios';
	import util from '../../../common/js/util'
	import { editusersave, getdeplist, rolelist,userdetail,userpwd,token } from '../../../common/js/config'

	import md5 from 'js-md5';
	export default {
		props: ['edituser'],
		data() {
			//验证手机号码
			var checkmobile = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('手机号码不能为空'));
				}
				setTimeout(() => {
					let mobilereg = /^[0-9]{11}$/;
					if(mobilereg.test(value)) {
						callback();
					} else {
						callback(new Error('请输入正确的手机号码'));
					}
				}, 1000);
			};
			//验证员工编号
      var checkcode = (rule,value,callback) => {
        let codereg = /^[0-9]{1,20}$/;
        if(codereg.test(value)){
          callback()
        }else{
          callback(new Error('编号为1-20位数字'))
        }
      };
      //验证用户名
      var checkusername = (rule,value,callback) => {
        let usernamereg = /^[a-z0-9A-Z]{1,16}$/;
        if(usernamereg.test(value)){
          callback()
        }else{
          callback(new Error('用户名由1~20位的字母或数字组成'))
        }
      };
      //验证真实姓名
      var checkrealname =  (rule,value,callback) => {
        if(value.length >0 && value.length <= 15){
          callback()
        }else{
          callback(new Error('姓名不能超过15位'))
        }
      }
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.resetpassword.checkPass !== '') {
						this.$refs.changepass.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.resetpassword.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				finddep:false,
				addstaff: {
					token: token,
					username: '',
					realname: '',
					mobile: '',
					tel: '',
					sex: '',
					birthday: '',
					deptid: '',
					roleid: [],
					status: '',
					deptname: '',
				},
				resetpassword: {
					pass: '',
					checkPass: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				},
				pickerOptions0: {},
				rules: {
          code:[{
            validator:checkcode,
            required:true,
            //message:'长度小于20位',
            trigger:'blur'
          }],
					username: [{
              validator:checkusername,
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 20,
							//message: '长度在6 到 20 个字符',
							trigger: 'blur'
						}
					],
					mobile: [{
						validator: checkmobile,
						trigger: 'blur',
						required: true,
						type: 'number'
					}],
					realname: [{
            validator:checkrealname,
						required: true,
						//message: '请填写真实姓名',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '性别',
						trigger: 'change'
					}],
					deptid: [{
						required: true,
						message: '请选择部门',
						trigger: 'blur'
					}],
					roleid: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
					status: [{
						required: true,
						message: '请选择状态',
						trigger: 'change'
					}]

				},
				finddepartment: false,
				resetPassword: false,
				departments: [],
				rolelists: [],
				roleids: '',
				checkdepartment: [],
				roleid:[],
				checkeddepar:''

			}
		},
		created() {
			this.getinfo()
			this.getdepartment()
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = {
							token: paramm.getToken(),
							username: this.addstaff.username,
							code: this.addstaff.code,
							realname: this.addstaff.realname,
							mobile: '',
							tel: this.addstaff.tel,
							sex: '',
							birthday: '',
							deptid: this.addstaff.deptid,
							roleid: this.addstaff.roleid,
							status: '',
							id: this.addstaff.id,
							password: this.addstaff.password
						}
						this.addstaff.status == "启用" ? para.status = true : para.status = false
						this.addstaff.sex == "男" ? para.sex = "1" : para.sex = "2"
						para.birthday = (!this.addstaff.birthday || this.addstaff.birthday == '') ? '' : util.formatDate.format(new Date(this.addstaff.birthday), 'yyyy-MM-dd');
						para.mobile = String(this.addstaff.mobile)
						editusersave(para).then((res) => {
							console.log(para, res)
							if(res.data.error == 0) {
								this.$message({
									message: "编辑成功！",
									type: 'success'
								});
								this.handleHide()

							} else {
								this.$message({
									message: res.data.message,
									type: 'error'
								});

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
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleHide: function() {
				this.$emit('setMode', 'staff');
			},
			//获取部门
			getdepartment() {
				let para = {
					token: paramm.getToken()
				}
				getdeplist(para).then((data) => {
					this.departments = data.data.obj
				})
			},
			//选择角色
			comfirmrole() {
				this.finddepartment = false
				let role = [];
				this.addstaff.roleid = this.checkdepartment
				for(let i = 0; i < this.checkdepartment.length; i++) {
					for(let j =0;j<this.rolelists.length;j++){
						console.log(this.rolelists[j].id)
						if(this.rolelists[j].id == this.checkdepartment[i]){
							role.push(this.rolelists[j].rolename)
						this.roleids = role.join(',')
						}
					}

				}
			},
			findrole(){
				this.finddepartment = true
					let para = {
						token: paramm.getToken(),
						pageIndex: 0,
						pageSize: 10
					}
					rolelist(para).then((res) => {
						this.rolelists = res.data.obj.datas
					})

					},//传值
			getinfo() {
				let para = {
					token: paramm.getToken(),
					id: this.edituser.row.id
				}
				userdetail(para).then((res) => {
					this.addstaff = res.data.obj
					res.data.obj.sex == 1 ? this.addstaff.sex = "男" : this.addstaff.sex = "女"
					res.data.obj.status == true ? this.addstaff.status = "启用" : this.addstaff.status = "禁用"
					this.checkeddepar = res.data.obj.deptname
					this.roleid = res.data.obj.roleid
					console.log(res.data.obj)


				}).then(()=>{
					let para = {
						token:paramm.getToken(),
						pageIndex: 0,
						pageSize: 10
					}
					rolelist(para).then((res) => {
						this.rolelists = res.data.obj.datas
						let role = []
						for(let i = 0 ; i <this.roleid.length;i++){
							for(let j=0;j<this.rolelists.length;j++){
								if(this.roleid[i] == this.rolelists[j].id){
									role.push(this.rolelists[j].rolename)
									this.roleids = role.join(',')
									this.checkdepartment.push(this.rolelists[j].id)
								}
							}
						}
					})
				})


			},
			//修改密码
			changepassword() {
				console.log(1)
				this.resetPassword = true
			},
			savepass(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para ={
							pwd:this.resetpassword.pass,
							token:paramm.getToken(),
							id:this.addstaff.id
						}
						para.pwd = md5(this.resetpassword.pass)
						userpwd(para).then((res) =>{
							if(res.data.error == "0"){
								this.$message({
									message: "修改成功！",
									type: 'success'
								});
								this.resetPassword = false
							}else{
								this.$message({
									message: res.data.message,
									type: 'error'
								});
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetFormpass(formName) {
				this.$refs[formName].resetFields();
			},
			//角色单选
		      handleCheckedCitiesChange(value) {
		       let checkedCount = value.length;
		      this.isIndeterminate = checkedCount > 0 && checkedCount < this.rolelists.length;
		      },
		      			//选择部门
			comfirmdepa() {
				//console.log(this.addstaff.deptid)
				this.finddep = false
				//this.checkeddepar = this.addstaff.deptid
				let list = this.departments
				for(let i = 0; i < list.length; i++) {
					if(this.addstaff.deptid == list[i].id) {
						this.checkeddepar = list[i].name
					} else {
						for(let j = 0; j < list[i].childs.length; j++) {
							if(this.addstaff.deptid == list[i].childs[j].id) {
								this.checkeddepar = list[i].childs[j].name
							} else {
								for(let k = 0; k < list[i].childs[j].childs.length; k++) {
									if(this.addstaff.deptid == list[i].childs[j].childs[k].id) {
										this.checkeddepar = list[i].childs[j].childs[k].name
									}
								}
							}
						}
					}

				}

			},

		},

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
