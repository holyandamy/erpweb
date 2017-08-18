<template>
	<div>
		<div v-if="setMode == 'orderlist'">
			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>订单管理</el-breadcrumb-item>
							<el-breadcrumb-item>订单列表</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="12">
						<el-button style="float: right; margin-top: -10px;">发团计划</el-button>
					</el-col>
				</el-row>
			</header>

			<el-form :inline="true" :model="orderinfo" class="demo-form-inline" style="text-align: left; padding-left: 30px;">
				<el-row>
					<el-col :span="18">

						<el-form-item label="订单编号">
							<el-input v-model="orderinfo.orderno" placeholder="订单编号"></el-input>
						</el-form-item>
						<el-form-item label="线路名称">
							<el-input v-model="orderinfo.linename" placeholder="线路名称"></el-input>
						</el-form-item>
						<el-form-item label="操作时间">
							<el-date-picker v-model="orderinfo.date" type="daterange" placeholder="选择日期范围">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="下单人">
							<el-input v-model="orderinfo.creater" placeholder="下单人"></el-input>
						</el-form-item>
						<el-form-item label="订单状态">
							<el-select v-model="orderinfo.status" clearable placeholder="订单状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="订单来源">
							<el-select v-model="orderinfo.source" clearable placeholder="订单来源">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>

							<el-checkbox v-model="orderinfo.hide">隐藏取消订单</el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">搜索</el-button>
						</el-form-item>

					</el-col>
				</el-row>
			</el-form>
			<section style="padding: 0 30px;">
				<table width="100%" class="table">
					<thead>
						<tr>
							<td width="20%">订单编号 / 团号 / 线路名称</td>
							<td width="10%">出团 / 人数</td>
							<td width="10%">客户信息</td>
							<td width="10%">订单金额</td>
							<td width="10%">应收</td>
							<td width="10%">已收</td>
							<td width="10%">已付</td>
							<td width="10%">状态</td>
							<td width="10%">负责人 / 操作</td>
						</tr>

					</thead>
				</table>

				<dl class="list" v-for="(order,index) in orderlist">
					<dt>订单编号：{{order.code}} / 馨途订单编号：{{order.sourceid}} / 团号：{{order.teamno}}</dt>
					<dd>
						<ul>
							<li style="width: 20%;">{{order.platformname}} <br />{{order.linename}}<br /> 下单时间：{{order.createtime}} / 2017-01-02</li>
							<li style="width: 10%;">出团：{{order.starttime}} <br /> 人数：{{order.custnumber}} 大 {{order.custnumber}} 小 {{order.custnumber}} 婴</li>
							<li style="width: 10%;">{{order.companyname}} <br /> {{order.creater}}
							</li>
							<li style="width: 10%;">￥{{order.orderfee}}</li>
							<li style="width: 10%;">￥{{order.orderpay}}</li>
							<li style="width: 10%;">￥{{order.collection}}</li>
							<li style="width: 10%;">￥{{order.pay}}</li>
							<li style="width: 10%;">{{order.status}}</li>
							<li style="width: 10%;">
								<el-button type="text">确认订单</el-button>
								<el-button type="text">出团单</el-button>
								<el-button type="text">导出行程</el-button>
								<el-button type="text">确认单</el-button>
								<el-button type="text" @click="setmode('orderinfo'),getinfo(order)">查看</el-button>
							</li>
						</ul>
					</dd>
				</dl>


			</section>

		</div>
		<OrderInfo v-else="setmode == 'orderinfo'"  :orderid = 'orderid' @setMode="setMode"></OrderInfo>
	</div>
</template>

<script>
	import axios from 'axios';
	import { orderlist } from '../../../common/js/config';
	import OrderInfo from './orderinfo'
	export default {
		components:{
			OrderInfo
		},
		data() {
			return {
				orderinfo: {
					orderno: '',
					linename: '',
					date: '',
					creater: '',
					status: '',
					source: '',
					hide: false,
					token: ''
				},
				orderid:'',
				orderlist: [], //订单列表
				total: 0,
				currentPage: 1,
				pagesize: 10,
				options: [{
					value: '1',
					label: '新增'
				}, {
					value: '2',
					label: '编辑'
				}, {
					value: '3',
					label: '删除'
				}],
				setMode:'orderlist'
			}
		},
		created(){
			this.getList()
		},
		
		methods: {
			setmode(type){
				this.setMode = type
			},
			getList() {
				let dates = ''
				let startday = this.orderinfo.date[0]
				let endday = this.orderinfo.date[1]
				startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
				endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
				if(startday == '' && endday == '') {
					dates = startday + endday
				} else {
					dates = startday + '|' + endday
				}
				let page = this.orderinfo
				page.date = dates
				orderlist(page).then((res) => {
					this.orderlist = res.data.obj.list
				})
			},
			getinfo(order){
				this.orderid = order.id
			},
			handleCurrentChange(val) {
				this.getList()
			},
			onSubmit() {
				this.getList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.not:hover {
		color: red;
	}
	
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
	
	.padding30 {
		padding: 0 30px;
	}
	
	.page {
		padding: 15px 30px;
		background: white;
		text-align: right;
	}
	
	.el-table .cell {
		text-align: left;
	}
	
	.el-breadcrumb {
		margin-bottom: 20px;
	}
	
	.table {
		thead {
			td {
				background: #f5f7f9;
				font-size: 14px;
				text-align: left;
				line-height: 40px;
				padding-left: 20px;
				border-bottom: 3px solid #dee5ec;
			}
		}
		tbody {
			td {
				text-align: left;
				font-size: 14px;
			}
		}
	}
	
	.list {
		margin-top: 10px;
		background: #fff;
		font-size: 12px;
		text-align: left;
		border: 1px solid transparent;
		dt {
			line-height: 40px;
			padding: 0 20px;
			margin: 0 10px;
			border-bottom: 1px solid #dee5ec;
		}
		dd {
			height: 100%;
			ul {
				display: flex;
				width: 100%;
				height: 100%;
				overflow: hidden;
				li {
					padding: 10px 20px;
					height: 100%;
					line-height: 24px;
					position: relative;
					display: block;
					button {
						font-size: 12px;
					}
				}
				:last-child:after {
					display: none;
				}
				:after {
					content: '';
					position: absolute;
					width: 2px;
					height: 500px;
					display: block;
					background: url(../../../assets/images/linebg.png) repeat-y right;
					right: 0;
					top: 0;
				}
			}
		}
	}
	
	.list:hover {
		border: 1px solid #000000;
	}
</style>