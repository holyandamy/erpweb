<template>
	<el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		<div class="loginbg">
			<div class="logintable">
				<h3 class="title"><img src="../assets/images/loginlogo.png" alt="" /></h3>
				<el-form-item prop="username">
					<input class="login_input " style="border-bottom: 1px solid #ddd;" type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" />
					<i class="account"></i>
				</el-form-item>
				<el-form-item prop="password">
					<input class="login_input " type="password" @keyup.enter="handleLogin" v-model="loginForm.password" auto-complete="off" placeholder="密码" />
					<i class="checkPass"></i>
				</el-form-item>
				<el-form-item style="margin-top: 50px; height: 30px; margin-bottom: 15px; ">
					<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
					<!--<a href="#" class="forget">忘记密码?</a>-->
				</el-form-item>

				<el-form-item style="width:100%;">
					<el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>

				</el-form-item>
			</div>
		</div>
	</el-form>
</template>
<script>
	//import { requestLogin } from '../api/api';
	//import NProgress from 'nprogress'
import Cookies from 'js-cookie';
	import { userlogin } from '../common/js/config';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				logining: false,
				loading: false,
				loginForm: {
					username: '',
					password: ''
				},
				rules2: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				},
				checked: true
			};
		},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
                if (valid) {
                  this.loading = true;
                  let para = {
							username: this.loginForm.username,
							password: md5(this.loginForm.password)
						}
                  userlogin(para).then((res) =>{
                  	if(res.data.error == 0){
                  		let info = res.data.obj
                  		let data = JSON.stringify(info)
	                  	if(this.checked == true){
	                  		Cookies.set('token', res.data.obj.token,{ expires: 1/3});
	                  	}else{
	                  		sessionStorage.setItem('token',res.data.obj.token)
	                  	}

            		this.$router.push({ path: '/main'});
 //                 	 this.$router.push({ path: '/'});
                  	}else{
                  		this.$message.error(res.data.message);
                  		this.loading = false;
                  	}

                  })

                } else {
                  console.log('error submit!!');
                  return false;
                }
            });

			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		.login-container {
			.logintable {
				-webkit-border-radius: 5px;
				border-radius: 5px;
				-moz-border-radius: 5px;
				background-clip: padding-box;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 280px;
				padding: 35px 60px 15px 60px;
				background: #fff;
				border: 1px solid #eaeaea;
				box-shadow: 0 0 25px rgba(0, 0, 0, .3);
				height: 415px;
			}
			.loginbg {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				background: url(../assets/images/loginbg.jpg);
				background-size: cover;
				z-index: 0;
				.title {
					margin: 10px auto 50px auto;
					text-align: center;
					color: #505458;
				}
				.remember {
					margin: 0px 0px 0 0px;
					float: left;
				}
				.forget {
					float: right;
					color: #3ec3c8;
					font-size: 12px;
				}
				.el-button {
					height: 50px;
					border-radius: 25px;
					font-size: 18px;
				}
			}
		}
	}

	.login_input {
		height: 60px;
		width: 230px;
		padding-left: 50px;
		box-shadow: 100px 100px 100px #fff inset;
		font-size: 18px;
		color: #666666;
	}

	:focus {
		border: 0;
		outline: 0;
	}

	.account {
		width: 30px;
		height: 60px;
		background: url(../assets/images/loginicon.png) no-repeat left 0;
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		z-index: 4;
	}

	.el-form-item {
		margin-bottom: 0;
	}

	.checkPass {
		width: 30px;
		height: 60px;
		background: url(../assets/images/loginicon.png) no-repeat left -60px;
		position: absolute;
		left: 0;
		top: 0;
		display: block;
		z-index: 4;
	}
</style>
