<template>
	<section>
		<header>
			欢迎回来！ {{userinfo}}
		</header>
		<div class="main">
			<h2>
				代办事项
			</h2>
			<div class="list">
				<ul>
					<li>
						<h3>{{lists.onc}}</h3>
						<p>订单待确认</p>
					</li>
					<li>
						<h3>{{lists.lna}}</h3>
						<p>待审批</p>
					</li>
					<li>
						<h3>{{lists.cnc}}</h3>
						<p>收款待确认</p>
					</li>
					<li>
						<h3>{{lists.cnv}}</h3>
						<p>收款待核销</p>
					</li>
					<li>
						<h3>{{lists.pnc}}</h3>
						<p>付款待确认</p>
					</li>
					<li>
						<h3>{{lists.pnv}}</h3>
						<p>付款待核销</p>
					</li>
					<div class="clearfix"></div>
				</ul>
			</div>
			<h2>
				操作日志
			</h2>
		</div>
		<div class="padding30">

			<el-table :data="loglist" style="width: 100%; text-align: left;">
				<el-table-column prop="operator" label="操作人">
				</el-table-column>
				<el-table-column prop="mod" label="操作模块">
				</el-table-column>
				<el-table-column prop="content" label="操作内容">
				</el-table-column>
				<el-table-column prop="createdAt" label="操作日期">
				</el-table-column>
			</el-table>
			<div class="page" style="margin-top: 40px;">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
				</el-pagination>

			</div>

		</div>
	</section>
</template>

<script>
	import Cookies from 'js-cookie';
	import { dashboard, loglist, token, tokenlogin } from '../common/js/config';
	import paramm from '../common/js/getParam.js'
	export default {
		data() {
			return {
				lists: [],
				loglist: [],
				pagesize: 10,
				total: 0,
				currentPage: 1,
				userinfo: '',
				userinfos: {},
        tokenn: ''
			}
		},
    beforeMount() {
//			this.getToken()
			this.getinfo()
			this.getloglist()
			this.getuserinfo()
		},
		methods: {
		getinfo() {
				
        dashboard({token: paramm.getToken()}).then((res) => {
					this.lists = res.data.obj
				})
			},
			getuserinfo() {
				tokenlogin({token: paramm.getToken()}).then((res) => {
					this.userinfo = res.data.obj.username
					this.menu = res.data.obj.menu
				})
			},
			getloglist() {
				let page = {
					token: paramm.getToken(),
					moudle: '',
					date: '',
					type: '',
					operator: '',
					pageindex: this.currentPage-1,
					pagesize: 10
				}
				loglist(page).then((res) => {
					this.loglist = res.data.obj.rows
					this.total = Number(res.data.obj.total)
				})
			},
			handleCurrentChange(val) {
				this.getloglist()
			},
		}
	}
</script>
<style scoped lang="scss">
	header {
		padding: 20px 40px;
		background: white;
		font-size: 16px;
		text-align: left;
	}

	.main {
		padding: 0 40px;
		h2 {
			color: #2cb1b6;
			font-size: 24px;
			line-height: 60px;
			margin-top: 20px;
			text-align: left;
		}
		.list {
			li {
				float: left;
				width: 15%;
				margin-right: 1%;
				background: white;
				height: 68px;
				border: 1px solid #fff;
				padding-top: 20px;
				line-height: 25px;
				h3 {
					color: #2cb1b6;
					font-size: 24px;
				}
				p {
					font-size: 14px;
					color: #999;
				}
			}
		}
	}

	.clearfix {
		clear: both;
	}

	.list li:hover {
		border: 1px solid #2cb1b6;
	}

	.padding30 {
		padding: 0 30px
	}
</style>
