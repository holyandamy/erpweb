<template>
	<div>
		<header>
			<div class="container">
				<el-button size="small">发送邮件</el-button>
				<el-button size="small">打印本页</el-button>
				<el-button size="small">导出word</el-button>
				<el-button size="small" type="text" style="float: right;" onclick="window.history.go(-1)">关闭窗口</el-button>
			</div>
		</header>
		<section>
			<div class="container">
				<dl class="componyinfo">
					<dt>
					<img src="../../../assets/images/loginbg.jpg"/>
					</dt>
					<dd>
						<h4>{{detail.scVo.companyName}}</h4>
						<p>
							电话：{{detail.scVo.tel}} <br /> 传真：{{detail.scVo.fax}} <br />
							地址：{{detail.scVo.address}}
						</p>
					</dd>
				</dl>
				<div class="checkdata">
					<p>请选择需要打印的数据</p>
					<el-row>
						<el-checkbox v-model="baseinfo">基本信息</el-checkbox>
						<el-checkbox v-model="tripinfo">行程信息</el-checkbox>
						<el-checkbox v-model="reminder">温馨提醒</el-checkbox>
					</el-row>
					<el-row>
						<el-col :span="3">
							<b>选择隐藏项</b>
						</el-col>
						<el-col :span="19">
							<el-checkbox v-model="costincludes">费用包含</el-checkbox>
							<el-checkbox v-model="notincluded">费用不含</el-checkbox>
							<el-checkbox v-model="ownexpense">自费项目</el-checkbox>
							<el-checkbox v-model="children">儿童安排</el-checkbox>
							<el-checkbox v-model="shoping">购物安排</el-checkbox>
							<!--<el-checkbox v-model="checked">公司账号</el-checkbox>-->
							<el-checkbox v-model="careful">注意事项</el-checkbox>
							<el-checkbox v-model="other">其它事项</el-checkbox>
							<!--<el-checkbox v-model="instructions">报名须知</el-checkbox>-->
							<el-checkbox v-model="intogroup">成团说明</el-checkbox>
							<el-checkbox v-model="contract">违约条款</el-checkbox>
							<el-checkbox v-model="highlights">产品亮点</el-checkbox>
						</el-col>
					</el-row>

				</div>
				<table v-if="baseinfo" border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr>
						<td colspan="6" align="center">
							<h2>{{detail.linename}}</h2>
						</td>
					</tr>
					<tr>
						<td class="title">产品编号</td>
						<td>{{detail.code}}</td>
						<td class="title">出发地</td>
						<td>{{detail.lVo.depart}}</td>
						<td class="title">旅游天数</td>
						<td>{{detail.lVo.days}}</td>
					</tr>

					<tr>
						<td class="title">出团日期</td>
						<td>{{detail.starttime}}</td>
						<td class="title">出发交通</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td class="title">返程日期</td>
						<td>{{detail.endtime}}</td>
						<td class="title">返程交通</td>
						<td colspan="3"></td>
					</tr>
					<tr>
						<td class="title">集合时间</td>
						<td>{{detail.notify}}</td>
						<td class="title">集合地点</td>
						<td>{{detail.lVo.station}}</td>
						<td class="title">单房差价</td>
						<td>{{detail.roompay}}</td>
					</tr>
					<tr>
						<td class="title">送团电话</td>
						<td></td>
						<td class="title">送团标志/人</td>
						<td colspan="3"></td>
					</tr>

					<tr>
						<td class="title">产品亮点</td>
						<td colspan="5">

						</td>
					</tr>
					<tr>
						<td class="title">报名须知</td>
						<td colspan="5">
						</td>
					</tr>

				</table>
				<table v-if="tripinfo" border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr>
						<th>日期</th>
						<th>描述</th>
						<th>餐</th>
						<th>宿</th>
					</tr>
					<tr v-for="info in detail.lVo.routes">
						<!--v-for="info in detail.lVo.line.routes"-->
						<td width="90">{{info.number}}</td>
						<td>
							<h3>{{info.title}}</h3>
							<pre>
								{{info.content}}
							</pre>
						</td>
						<td width="40">
							<span v-if="info.isbreakfast">早</span>
							<span v-if="info.islunch">中</span>
							<span v-if="info.isdinner">晚</span>
						</td>
						<td width="127">
							{{info.hotel}}
						</td>
					</tr>
				</table><table border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr v-if="!costincludes">
						<td class="title">费用包含</td>
						<td><pre>{{detail.lVo.includePkg}}</pre></td>
					</tr>
					<tr v-if="!notincluded">
						<td class="title">费用不含</td>
						<td><pre>{{detail.lVo.excludePkg}}</pre></td>
					</tr>
					<tr v-if="!ownexpense">
						<td class="title">自费项目</td>
						<td></td>
					</tr>
					<tr v-if="!children">
						<td class="title">儿童安排</td>
						<td><pre>{{detail.lVo.childolder}}</pre></td>
					</tr>
					<tr v-if="!shoping">
						<td class="title">购物安排</td>
						<td><pre>{{detail.lVo.shopping}}</pre></td>
					</tr>
					<tr v-if="!careful">
						<td class="title">注意事项</td>
						<td></td>
					</tr>
					<tr v-if="!other">
						<td class="title">其它事项</td>
						<td></td>
					</tr>
					<tr v-if="!highlights">
						<td class="title">产品亮点</td>
						<td></td>
					</tr>
					<tr v-if="!intogroup">
						<td class="title">成团说明</td>
						<td></td>
					</tr>
					<tr v-if="!contract">
						<td class="title">违约条款</td>
						<td></td>
					</tr>
					<tr v-if="!reminder">
						<td class="title">温馨提醒</td>
						<td><pre>
							{{detail.lVo.reminder}}
						</pre></td>
					</tr>
				</table>
				<table border="1"  class="tablebase heighttd">
					<tr>
						<td>
							确认人/日期：
						</td>
						<td>
							确认人/日期：
						</td>
					</tr>
					<tr>
						<td>
							盖章：
						</td>
						<td>
						盖章：
						</td>
					</tr>
				</table>
			</div>
		</section>
	</div>
</template>

<script>
	import { orderexportdetail } from '../../../common/js/config';
	import paramm from '../../../common/js/getParam'
	export default{
		data(){
			return {
				baseinfo:true,
				tripinfo:true,
				reminder:false,
				costincludes:false,
				notincluded:false,
				ownexpense:false,
				children:false,
				shoping:false,
				careful:false,
				other:false,
				highlights:false,
				intogroup:false,
				contract:false,
				id : this.$route.query.id,
				detail:{}
			}
		},
		created(){

			this.getdetail()
		},
		methods:{
			getdetail(){
				console.log(111)
				let para = {
					token:paramm.getToken(),
					id:this.id
				}
				orderexportdetail(para).then((res) =>{
					this.detail = res.data.obj

				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 800px;
		margin: 0 auto;
	}

	header {
		padding: 7px 0;
		background: #dee5ec;
		.container {
			text-align: left;
		}
	}

	section {
		.container {
			background: #fff;
			margin-top: 20px;
			padding: 0 20px 20px 20px;
			box-shadow: 0 0 5px rgba(0, 0, 0, .1);
			border-radius: 5px;
		}
		.componyinfo {
			display: -webkit-box;
			padding-top: 20px;
			text-align: left;
			dt {
				width: 158px;
				height: 108px;
				border: 1px solid #dee5ec;
				margin-right: 20px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			dd {
				text-align: left;
				h4 {
					font-size: 18px;
					height: 44px;
					font-weight: bold;
				}
				p {
					font-size: 12px;
					line-height: 22px;
				}
			}
		}
		.checkdata {
			background: #f1fcfc;
			border: 1px solid #9ad4d6;
			margin-top: 20px;
			p {
				font-size: 14px;
				color: #2cb1b6;
				text-align: left;
				padding: 15px 20px;
				font-weight: bold;
			}
			.el-row {
				text-align: left;
				margin-bottom: 10px;
				b {
					font-size: 12px;
					margin-left: 30px;
					font-weight: bold;
				}
				.el-checkbox {
					margin-left: 20px;
					margin-bottom: 10px;
				}
			}
		}
		.tablebase {
			border: 1px solid #bfcbda;
			margin-top: 20px;
			width: 100%;
			text-align: left;
			th{
				background: #f5f7f9;
				font-weight: bold;
				width: 70px;
				font-size: 12px;
				border: 1px solid #bfcbda;
				padding: 5px 10px;
			}
			td {
				padding: 5px 10px;
				border: 1px solid #bfcbda;
				font-size: 12px;
				line-height: 22px;
				h2 {
					font-size: 18px;
					font-weight: bold;
					margin: 10px 0 5px 0;
				}

				p {
					margin-bottom: 10px;
					font-size: 12px;
					margin-top: 10px;
				}
				h3{
					font-size: 16px;
					font-weight: bold;
					margin: 10px 0;
				}
				pre{
					white-space:pre-wrap;
				}
			}
			.title {
				background: #f5f7f9;
				font-weight: bold;
				width: 70px;
			}
		}
		.heighttd{
			margin-bottom: 20px;
			td{
				height: 80px;
			}

		}
	}
</style>
