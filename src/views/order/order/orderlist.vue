<template>
	<div>
		<div v-if="setmode == 'orderlistmodel'">
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
							<td width="40%">订单编号 / 团号 / 线路名称</td>
							<td width="10%">出团 / 人数</td>
							<td width="10%">客户信息</td>
							<td width="5%">订单金额</td>
							<td width="5%">应收</td>
							<td width="5%">已收</td>
							<td width="5%">退款</td>
							<td width="10%">状态</td>
							<td width="10%">负责人 / 操作</td>
						</tr>

					</thead>
				</table>

				<dl class="list" v-for="(list,index) in orderLists">
					<dt>订单编号：{{list.code}} / 馨途订单编号：{{list.sourceid}}</dt>
					<dd>
						<ul>
							<li style="width: 40%;">{{list.teamno}} <br />{{list.linename}}<br /> 下单时间：{{list.createtime}}</li>
							<li style="width: 10%;">出团：{{list.starttime}} <br /> 人数：{{list.custnumber}}</li>
							<li style="width: 10%;">{{list.companyname}} <br /> {{list.contactmobile}}
							</li>
							<li style="width: 5%;">￥{{list.orderfee}}</li>
							<li style="width: 5%;">￥{{list.orderpay}}</li>
							<li style="width: 5%;">￥{{list.collection}}</li>
							<li style="width: 5%;">￥{{list.pay}}</li>
							<li style="width: 10%;">{{list.status}}</li>
							<li style="width: 10%;" class="button">
								<el-button type="text" style="margin-left: 10px;">确认名单</el-button>
								<el-button type="text"><router-link to="/singlegroup">出团单</router-link></el-button>
								<el-button type="text"><router-link :to="{path:'/singlegroup',query: {id: '111'}}">行程单</router-link></el-button>
							   <el-button type="text"><router-link :to="{path:'/confirm',query: {id: '111'}}">确认单</router-link></el-button>
								<el-button type="text" @click="setMode('orderinfo'),passinfo(list)">查看</el-button>
							</li>
						</ul>
					</dd>
				</dl>


			</section>

		</div>
		<OrderInfo v-else @setMode="setMode" :listid="listid"></OrderInfo>
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
				orderLists: [],
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
				setmode:'orderlistmodel',
				listid:''

			}
		},
		created(){
			this.getList()
		},
		methods: {
			setMode(type){
				this.setmode = type
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
					
					
									this.orderLists = res.data.obj.datas
									console.log(this.orderinfo)
									
					//					this.total = Number(res.data.obj.total)
				})
			},
			handleCurrentChange(val) {
				this.getList()
			},
			onSubmit() {
				this.getList()
			},
			passinfo(val){
				this.listid=val.id
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
		border: 1px solid #9ad4d6;
	}
	.button{
		.el-button{
			padding: 7px 3px;
			a{
				color: #3ec3c8;
			}
		}
	}
</style>