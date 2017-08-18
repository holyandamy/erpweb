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
							订单编号：hp1308402805892408029830480
						</el-col>
						<el-col :span="12">
							下单时间：2017-01-13 14:43
						</el-col>
					</el-row>

				</div>
				<div class="info">

					<el-row>
						<el-col :span="24">
							<span>
									线路/团号
								</span> 桂林訾州、漓江风光、榕杉湖、阳朔十里画廊、少数民族寨、西街 双飞4日游 / shanghai2381408340982904850824
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：12 大 2 小 4 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：2017-07-17
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：12 大 2 小 4 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：2017-07-17
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：12 大 2 小 4 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：2017-07-17
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：12 大 2 小 4 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：2017-07-17
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：12 大 2 小 4 婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：2017-07-17
						</el-col>
					</el-row>
					<el-row>
						<el-col>
							应收金额
						</el-col>

					</el-row>
				</div>
				<div class="infobottom">
					<el-row>
						<el-col>
							集合通知
						</el-col>

					</el-row>
					<el-row>
						<el-col>
							备注
						</el-col>

					</el-row>
				</div>
			</div>
			<h2>
					收款详情
				</h2>
			<el-table :data="paylist" border style="width: 100%">
				<el-table-column prop="date" label="创建日期">
				</el-table-column>
				<el-table-column prop="name" label="收款单号">
				</el-table-column>
				<el-table-column prop="province" label="金额">
				</el-table-column>
				<el-table-column prop="city" label="确认状态">
				</el-table-column>
				<el-table-column prop="address" label="核销状态">
				</el-table-column>
				<el-table-column prop="zip" label="备注">
				</el-table-column>
			</el-table>
			<h2>
					付款详情
				</h2>
			<el-table :data="collectionlist" border style="width: 100%">
				<el-table-column prop="date" label="创建日期">
				</el-table-column>
				<el-table-column prop="name" label="收款单号">
				</el-table-column>
				<el-table-column prop="province" label="金额">
				</el-table-column>
				<el-table-column prop="city" label="确认状态">
				</el-table-column>
				<el-table-column prop="address" label="核销状态">
				</el-table-column>
				<el-table-column prop="zip" label="备注">
				</el-table-column>
			</el-table>
			<h2>
					游客信息
				</h2>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collectionlist: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}],
				paylist: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}]
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