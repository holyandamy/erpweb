<template>
	<section>
		<header>
		<el-row>
		<el-col :span="12">
			<el-menu  class="el-menu-demo" :default-active="activeIndex" mode="horizontal"  style="background: #fff;" >
					  <!--<el-menu-item index="1">
					  	<router-link :to="'/cmanagement/department'">部门管理</router-link>
					  </el-menu-item>
					<el-menu-item index="2" >
					  	<router-link :to="'/cmanagement/bankaccount'">银行账号设置</router-link>
					  </el-menu-item>
					  <el-menu-item index="3" >
					  	<router-link :to="'/cmanagement/companyset'">公司信息设置</router-link>
					  </el-menu-item>-->
					   <el-menu-item index="1">
					  	<a @click="setmode('depart')">部门管理</a>
					  </el-menu-item>
					<el-menu-item index="2" >
					  <a @click="setmode('bank')">银行账号设置</a>
					  </el-menu-item>
					  <el-menu-item index="3" >
					  	<a @click="setmode('company')">公司信息设置</a>
					  </el-menu-item>
		</el-menu>
		</el-col>
		<el-col :span="12" style="text-align: right;">
		<el-button class="defaultbutton" v-if="modeType == 'depart'" >新增部门</el-button>
		<el-button class="defaultbutton" v-else-if = "modeType == 'bank'"  @click="addbank">新增银行账户</el-button>
		</el-col>
		</el-row>
		</header>
		<!--部门管理-->
		<DepartMent v-if="modeType == 'depart'"></DepartMent>
		<!--银行账号设置-->
		<BankAccount v-else-if = "modeType == 'bank'"  ref="BankAccount"></BankAccount>	
		<!--公司信息设置-->
		<CompanySet v-else-if ="modeType == 'company'"></CompanySet>
	</section>
</template>

<script>
import DepartMent from './department'
import BankAccount from './bankaccount'
import CompanySet from './companyset'
	export default{
		components:{
			DepartMent,
			BankAccount,
			CompanySet
		},
		data(){
			return {
				modeType :'depart',
				activeIndex:'1',
				
			}
		},
		methods:{
			setmode(type){
				this.modeType = type
			},
			//新增银行账户
			addbank() {
				this.$refs.BankAccount.addbank()
	       
	    }
		}
	}
</script>

<style scoped lang="scss">
	header{
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
		.defaultbutton{
			border-color:#9ad4d6 ;
			color: #2cb1b6;
			float: right;
			margin-top: -10px;
		}
		.el-menu-item{
			height: 36px;
			line-height: 36px;
			border-top: 3px solid transparent;
			padding: 0;
			a{
				padding: 0 20px;
				display: block;
			}
			}
			.el-menu-item:hover{
				background: transparent;
				border-bottom: transparent;
				color: #3ec3c8;
				height: 36px;
				line-height: 36px;
			}
		.el-menu-item.is-active{
			background: #eef1f6;
			border-top: 3px solid #3ec3c8!important;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			color: #333;
		}
		
		
	}
	
</style>