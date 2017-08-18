<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>订单管理</el-breadcrumb-item>
						<el-breadcrumb-item>订单列表</el-breadcrumb-item>
						<el-breadcrumb-item>订单详情</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
		</header>
		<section>
			<div class="bg_white padding-0-50">
				<div class="title">
					<el-row>
						<el-col :span="12">
							订单编号：{{detail.code}}
						</el-col>
						<el-col :span="12">
							下单时间：{{detail.createtime}}
						</el-col>
					</el-row>

				</div>
				<div class="info">
					<el-row>
						<el-col :span="24">
							<span>
									线路/团号
								</span> {{detail.linename}} / {{detail.teamno}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：{{detail.totaladult}} 大 {{detail.totalchild}} 小 {{detail.totalbaby}} 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：{{detail.starttime}}
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							应收金额 {{detail.orderpay}}
						</el-col>

					</el-row>
				</div>
				<div class="infobottom">
					<el-row>
						<el-col>
							集合通知 {{detail.notify}}
						</el-col>

					</el-row>
					<el-row>
						<el-col>
							备注 {{detail.remark}}
						</el-col>

					</el-row>
				</div>
			</div>
			<h2>
			收款详情
			</h2>
			<el-table :data="collectionlist" border style="width: 100%">
				<el-table-column prop="type" label="收款类型">
				</el-table-column>
				<el-table-column prop="accountid" label="收款账户">
				</el-table-column>
				<el-table-column prop="linetime" label="到账日期">
				</el-table-column>
				<el-table-column prop="fee" label="金额">
				</el-table-column>
			</el-table>
			<h2>
			付款详情
			</h2>
			<el-table :data="paylist" border style="width: 100%">
                <el-table-column prop="type" label="收款类型">
                    </el-table-column>
                    <el-table-column prop="accountid" label="收款账户">
                    </el-table-column>
                    <el-table-column prop="linetime" label="到账日期">
                    </el-table-column>
                    <el-table-column prop="fee" label="金额">
                    </el-table-column>
                </el-table>
			<h2>
			游客信息
			</h2>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';
	import { orderdetail } from '../../../common/js/config';
	export default {
		props:['orderid'],
		data() {
			return {
				detail:{},
				collectionlist: [],
				paylist: []
			}
		},
		mounted: function() {
			this.getorderinfo()
		},
		methods: {
		    getorderinfo(){
		       let para = {
        		   token:'',
        		   id:this.orderid
        	   }
        	   orderdetail(para).then((res) => {
        	      this.detail = res.data.obj
				  this.collectionlist = res.data.obj.collections
				  this.paylist = res.data.obj.pays
        	   })
        	}
		}
	}
</script>

<style scoped lang="scss">
	header {
		padding: 20px 40px 20px 40px;
		background: white;
		margin-bottom: 30px;
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
	
	section {
		margin: 0 30px;
		h2 {
			font-size: 24px;
			color: #2cb1b6;
			text-align: left;
			padding: 30px 0 15px 0;
		}
		.bg_white {
			background: #fff;
			font-size: 14px;
			color: #666;
			text-align: left;
			.title {
				line-height: 75px;
				background: url(../../../assets/images/linebg.png) repeat-x bottom;
			}
			.info {
				line-height: 60px;
				background: url(../../../assets/images/linebg.png) repeat-x bottom;
				position: relative;
				.pl-20 {
					padding-left: 20px;
				}
			}
			.infobottom {
				line-height: 60px;
			}
		}
		.padding-0-50 {
			padding: 0 50px;
		}
	}
	
	.info:before {
		position: absolute;
		content: '';
		width: 2px;
		height: 275px;
		background: url(../../../assets/images/linebg.png) repeat-y;
		left: 50%;
		top: 80px;
	}
</style>