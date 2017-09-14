<template>
	<section>
		<header>
			<el-row>
				<el-col :span="12">
					<el-menu class="el-menu-demo" :default-active="activeIndex" mode="horizontal" style="background: #fff;">
						<el-menu-item index="1"  class="hasid"  id="d018149d72ba11e7aad70242ac120006">
							<a @click="setmode('depart')" >组织架构管理</a>
						</el-menu-item>
						<el-menu-item index="2" class="hasid"  id="a6c286e072ba11e7aad70242ac120006">
							<a @click="setmode('bank')" >银行账号设置</a>
						</el-menu-item>
						<el-menu-item index="3">
							<a @click="setmode('company')">公司信息设置</a>
						</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button class="defaultbutton hasid" id="d4b9cb5372bb11e7aad70242ac120006" v-if="modeType == 'depart'" @click="addpartment">新增部门</el-button>
					<el-button class="defaultbutton hasid" id="54e8373572bb11e7aad70242ac120006" v-else-if="modeType == 'bank'" @click="addbank">新增银行账户</el-button>
				</el-col>
			</el-row>
		</header>

		<!--公司信息设置-->
		<CompanySet v-if="modeType == 'company'"></CompanySet>
		<!--组织架构管理-->
		<DepartMent  v-else-if="modeType == 'depart'" ref="Addpartment"></DepartMent>
		<!--银行账号设置-->
		<BankAccount  v-else-if="modeType == 'bank'" ref="BankAccount"></BankAccount>
	</section>
</template>

<script>
	import DepartMent from './department'
	import BankAccount from './bankaccount'
	import CompanySet from './companyset'
	import {showorhide} from '../../../common/js/showorhid'
	export default {
		components: {
			DepartMent,
			BankAccount,
			CompanySet
		},
		data() {
			return {
				modeType: 'company',
				activeIndex: '3',
			}
		},
		updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			setmode(type) {
				this.modeType = type

			},
			//新增银行账户
			addbank() {
			  //新建银行账户的时候应该要把上一次的数据清空
				this.$refs.BankAccount.addbank()
			},
			//新增部门
			addpartment() {
				this.$refs.Addpartment.addpartment()
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
</style>
