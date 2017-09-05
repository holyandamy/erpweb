<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>订单管理</el-breadcrumb-item>
						<el-breadcrumb-item>
							<a @click="handleHide">订单列表</a>
						</el-breadcrumb-item>
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
							<span>线路/团号</span> {{detail.linename}} / {{detail.teamno}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							游客人数：{{detail.totaladult}} 大 {{detail.totalchild}} 小 {{detail.totalbaby}}婴
						</el-col>
						<el-col :span="12" class="pl-20">
							出团日期：{{detail.starttime}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							门市价格：{{detail.marketprice}}
						</el-col>
						<el-col :span="12" class="pl-20">
							回团日期：{{detail.endtime}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							结算价格：   {{detail.sltprice}}   <!--  成人{{detail.sltaduilt}} 儿童{{detail.sltchild}} 婴儿{{detail.sltbaby}} 单房差{{detail.endtime}}-->
						</el-col>
						<el-col :span="12" class="pl-20">
							负责人：{{detail.creater}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							应收金额：{{detail.orderpay}} <el-button style="margin-left: 50px;">调整价格</el-button>
						</el-col>
						<el-col :span="12" class="pl-20">
							客户类型：{{detail.custtypename}}
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							已收金额：{{detail.collection}}
						</el-col>
						<el-col :span="12" class="pl-20">
							联系方式：{{detail.contactmobile}}
						</el-col>
					</el-row>
				</div>
				<div class="infobottom">
					<el-row>
						<el-col>
							集合通知:{{detail.notify}}
						</el-col>

					</el-row>
					<el-row>
						<el-col>
							备注:{{detail.remark}}
						</el-col>

					</el-row>
				</div>
			</div>
			<h2>
					<el-row>
						<el-col :span="12">收款详情</el-col>
						<el-col :span="12"><el-button @click="addcollpay('collect')" class="hasid" id="869cc288735d11e788410242ac120009">新增收款</el-button></el-col>
					</el-row>
				</h2>
			<el-table :data="detail.collections" border style="width: 100%">
				<el-table-column prop="createtime" label="创建日期">
				</el-table-column>
				<el-table-column prop="code" label="收款单号">
				</el-table-column>
				<el-table-column prop="totalfee" label="金额">
				</el-table-column>
				<el-table-column prop="confirm" label="确认状态">
				</el-table-column>
				<el-table-column prop="verification" label="核销状态">
				</el-table-column>
				<el-table-column prop="remark" label="备注">
				</el-table-column>
			</el-table>
			<h2>
					<el-row>
						<el-col :span="12">付款详情</el-col>
						<el-col :span="12"><el-button @click="addcollpay('pay')"  class="hasid" id="89cec1b8735d11e788410242ac120009">新增付款</el-button></el-col>
					</el-row>
				</h2>
			<el-table :data="detail.pays" border style="width: 100%">
				<el-table-column prop="createtime" label="创建日期">
				</el-table-column>
				<el-table-column prop="code" label="收款单号">
				</el-table-column>
				<el-table-column prop="totalfee" label="金额">
				</el-table-column>
				<el-table-column prop="confirm" label="确认状态">
				</el-table-column>
				<el-table-column prop="verification" label="核销状态">
				</el-table-column>
				<el-table-column prop="fee" label="备注">
				</el-table-column>
			</el-table>
			<h2>
					<el-row>
						<el-col :span="12">游客信息</el-col>
						<el-col :span="12">
							<el-button @click="exportnamelist">导出游客名单</el-button>
							<el-button>下载名单模版</el-button>
							<el-button>导入游客名单</el-button> 
							<el-button  v-if="!detail.isconfirm" @click="confirmnamelist=true" class="hasid" id="8dcdad97735d11e788410242ac120009">确认游客名单</el-button> 
						</el-col>
					</el-row>
				</h2>
			<div class="bg_white padding-20-50">
				<el-row>
					<el-col :span="3">
						<el-col :span="5" style="line-height: 26px;">成人</el-col>
						<el-col :span="19">
							<!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
							<div class="el-input-number">
								<!--is-disabled-->
								<span class="el-input-number__decrease" @click="minuday('adult')"><i class="el-icon-minus"></i></span>
								<span class="el-input-number__increase" @click="addday('adult')"><i class="el-icon-plus"></i></span>
								<div class="el-input"><input v-model="detail.totaladult" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

								</div>
							</div>
						</el-col>
					</el-col>
					<el-col :span="3">
						<el-col :span="5" style="line-height: 26px;">儿童</el-col>
						<el-col :span="19">
							<!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
							<div class="el-input-number">
								<!--is-disabled-->
								<span class="el-input-number__decrease" @click="minuday('child')"><i class="el-icon-minus"></i></span>
								<span class="el-input-number__increase" @click="addday('child')"><i class="el-icon-plus"></i></span>
								<div class="el-input"><input v-model="detail.totalchild" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

								</div>
							</div>
						</el-col>

					</el-col>
					<el-col :span="3">
						<el-col :span="5" style="line-height: 26px;">婴儿</el-col>
						<el-col :span="19">
							<!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
							<div class="el-input-number">
								<!--is-disabled-->
								<span class="el-input-number__decrease" @click="minuday('baby')"><i class="el-icon-minus"></i></span>
								<span class="el-input-number__increase" @click="addday('baby')"><i class="el-icon-plus"></i></span>
								<div class="el-input"><input v-model="detail.totalbaby" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

								</div>
							</div>
						</el-col>

					</el-col>
				</el-row>
				<table class="adulttable" width="100%">
					<thead>
						<tr>
							<td width="30">序号</td>
							<td width="100">姓名</td>
							<td width="60">类型</td>
							<td width="150">证件类型</td>
							<td width="200">证件号码</td>
							<td width="130">手机号</td>
							<td width="100">单房差</td>
							<td>游客备注</td>
							<td width="100">操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(namelist,index) in detail.namelist">
							<td>{{index+1}}</td>
							<td>
								<el-input v-model="namelist.name" placeholder="姓名"></el-input>
							</td>
							<td>{{namelist.type}}</td>
							<td>
								<el-select v-model="namelist.certtype" placeholder="请选择">
									<el-option v-for="item in certtypes" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
							<td>
								<el-input v-model="namelist.cert" placeholder="证件号"></el-input>
							</td>
							<td>
								<el-input v-model="namelist.mobile" placeholder="手机号"></el-input>
							</td>
							<td>
								<el-checkbox v-model="namelist.room">单房差</el-checkbox>
							</td>
							<td>
								<el-input v-model="namelist.remark" placeholder="备注"></el-input>
							</td>
							<td>
								<el-button type="text" v-if="!detail.isconfirm" @click="deletepeople(index)">删除</el-button>
								<el-button type="text" v-else @click="(index)">申请退款</el-button>
							</td>
						</tr>
						<tr>
							<td colspan="5">成人：￥82910 儿童：￥1839 婴儿：￥124</td>
							<td colspan="4" style="text-align: right; padding-right: 20px;">退款合计：￥83028.00</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2>
					<el-row>
						<el-col :span="2">操作日志
						</el-col>
						<el-col :span="12">
							<el-button type="text" @click="showmore" style="float: left;">{{more}}</el-button>
							<i v-if="more == '更多'" class="el-icon-arrow-down" style="font-size: 12px; margin: 0 0 0 5px;"></i>
							<i v-else class="el-icon-arrow-up" style="font-size: 12px; margin: 0 0 0 5px;"></i>
						</el-col>
					</el-row>
				</h2>
			<el-table :data="detail.logs" style="width: 100%; text-align: left;">
				<el-table-column prop="createtime" label="操作时间" width="180">
				</el-table-column>
				<el-table-column prop="creater" label="创建人" width="180">
				</el-table-column>
				<el-table-column prop="content" label="操作内容">
				</el-table-column>
			</el-table>
			<div class="button">
				<el-button type="primary" size="large" @click="save">提交</el-button>
				<el-button type="primary" size="large"  class="hasid"  id="91102d1d735d11e788410242ac120009" @click="cancelorder">取消订单</el-button>
				<el-button size="large" @click="handleHide">返回</el-button>
			</div>
		</section>
		<el-dialog title="新增收款" :visible.sync="addcollection" size="large">
			<table border="" cellspacing="" cellpadding="" width="100%" class="collecttable">
				<tr>
					<th>收款方式</th>
					<th>收款账号</th>
					<th>到账日期</th>
					<th>金额</th>
					<th>操作</th>
				</tr>
				<tr v-for="(domain, index) in collectionsForm.detail">
					<td>
						<el-col :span="20">
							<el-select placeholder="选择" v-model="domain.type">
								<el-option v-for="item in businesstype" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>

						</el-col>
					</td>
					<td>
						<el-col :span="20">
							<el-select placeholder="收款账号" v-model="domain.accountid">
								<el-option v-for="item in banklist" :key="item.bankNameAccount" :label="item.bankNameAccount" :value="item.id">
								</el-option>
							</el-select>
						</el-col>
					</td>
					<td>
						<el-col :span="20">
							<el-date-picker v-model="domain.linetime" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
							</el-date-picker>
						</el-col>
					</td>
					<td>
						<el-col :span="20">
							<el-input v-model="domain.fee" placeholder="请输入内容"></el-input>
						</el-col>
					</td>
					<td>
						<el-col :span="20">
							<el-button type="text" @click="addDomain">新增</el-button>
							<el-button type="text" @click.prevent="removeDomain(domain)">删除</el-button>

						</el-col>

					</td>
				</tr>
			</table>
			<span slot="footer" class="dialog-footer">
    <el-button @click="addcollection = false">取 消</el-button>
    <el-button type="primary" @click="savecollect">确 定</el-button>
  </span>
		</el-dialog>
		<el-dialog title="确认游客名单" :visible.sync="confirmnamelist" size="tiny">
			确认游客名单后，游客名单无法删除 <br /> 和修改，并且同步确认馨途平台的订单！
			<span slot="footer" class="dialog-footer">
    <el-button @click="confirmnamelist = false">取 消</el-button>
    <el-button type="primary" @click="confirmvisitor">确 定</el-button>
  </span>
		</el-dialog>

	</div>
</template>
<script>
	import util from '../../../common/js/util'
	import { showorhide } from '../../../common/js/showorhid'
	import { orderdetail, banlist, collectsave, orderupdate, ordercancel, ordernamelistconfirm, ordernamelistexport, paysave,token} from '../../../common/js/config';
	export default {
		props: ['listid'],
		data() {
			return {
				more: '更多',
				addcollection: false, //新增收款
				confirmnamelist: false,
				detail: {
					namelist: []
				},
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				certtypes: [{
						value: 1,
						label: '身份证'
					},
					{
						value: 2,
						label: '护照'
					},
					{
						value: 3,
						label: '军官证'
					},
					{
						value: 4,
						label: '港澳通行证'
					}
				],
				businesstype: [{ //1现金，2对公汇款，3刷卡，4支付宝，5微信，6网银，7其他
						value: '1',
						label: '现金'
					},
					{
						value: '2',
						label: '对公汇款'
					},
					{
						value: '3',
						label: '刷卡'
					},
					{
						value: '4',
						label: '支付宝'
					},
					{
						value: '5',
						label: '微信'
					},
					{
						value: '6',
						label: '网银'
					},
					{
						value: '7',
						label: '其他'
					}
				],
				banklist: [], //银行列表
				collectionsForm: {
					token: token,
					businesstype: '2',
					orderno: '',
					lineid: '',
					linename: '',
					teamno: '',
					companyname: '',
					detail: [{
						type: '',
						accountid: '',
						linetime: '',
						fee: ''
					}]
				},
				baseform: {
					id: '',
					token: token
				},
				type: '',
				alllogs: [],
				oldtotal:0,
			}
		},
		created() {
			this.getdetail()
			this.checkbanklist()
		},
		 updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			//返回列表
			handleHide: function() {
				this.$emit('setMode', 'orderlistmodel');
			},
			//天数减少
			minuday(type) {
				let index = this.detail.namelist
				
				if(type == "adult") {
					if(this.detail.totaladult <= 1) {
						this.detail.totaladult == 1
						index = 1
					} else {
						this.detail.totaladult -= 1
						for(let i = 0; i < index.length; i++) {
							if(index[i].type == "成人") {
								index.splice(i + this.detail.totaladult, 1)
							}
						}
					}
				} else if(type == "child") {
					if(this.detail.totalchild <= 1) {
						this.detail.totalchild == 1
						index = 1
					} else {
						this.detail.totalchild -= 1
						for(let i = 0; i < index.length; i++) {
							if(index[i].type == "儿童") {
								index.splice(i + this.detail.totalchild, 1)
							}
						}
					}
				} else if(type == "baby") {
					if(this.detail.totalbaby <= 1) {
						this.detail.totalbaby == 1
						index = 1
					} else {
						this.detail.totalbaby -= 1
						for(let i = 0; i < index.length; i++) {
							if(index[i].type == "婴儿") {
								index.splice(i + this.detail.totalbaby, 1)
							}
						}
					}
				}

			},
			//天数增加
			addday(type) {
				let total = this.detail.totaladult + this.detail.totalchild + this.detail.totalbaby
				let nowtotal = total - this.oldtotal+1
				if(nowtotal > this.detail.surplus) {
					this.$message({
						message: '不能超出库存' + this.detail.surplus + '',
						type: 'warning'
					});
				} else {
					if(type == "adult") {
						this.detail.totaladult += 1
						this.detail.namelist.push({
							name: '',
							mobile: '',
							certtype: '',
							cert: '',
							room: false,
							remark: '',
							type: '成人'
						})

					} else if(type == "child") {
						this.detail.totalchild += 1
						this.detail.namelist.push({
							name: '',
							mobile: '',
							certtype: '',
							cert: '',
							room: false,
							remark: '',
							type: '儿童'
						})
					} else if(type == "baby") {
						this.detail.totalbaby += 1
						this.detail.namelist.push({
							name: '',
							mobile: '',
							certtype: '',
							cert: '',
							room: false,
							remark: '',
							type: '婴儿'
						})
					}
				}

			},
			//删除游客
			deletepeople(index) {
				this.detail.namelist.splice(index, 1)
			},
			//获取详情
			getdetail() {
				let para = {
					id: this.listid,
					token: token
				}
				orderdetail(para).then((res) => {
					console.log(res)
					this.detail = res.data.obj
					let type = res.data.obj.namelist
					this.alllogs = res.data.obj.logs
					this.detail.logs = res.data.obj.logs.slice(0, 3)
					this.oldtotal = res.data.obj.totaladult + res.data.obj.totalchild + res.data.obj.totalbaby
					for(let i = 0; i < type.length; i++) {
						if(type[i].type == 1) {
							type[i].type = "成人"
						} else if(type[i].type == 2) {
							type[i].type = "儿童"
						} else if(type[i].type == 3) {
							type[i].type = "婴儿"
						}
					}
					//this.detail = res
				})
			},
			//获取账号列表
			checkbanklist() {
				let para = {
					token: token
				}
				banlist(para).then((res) => {
					this.banklist = res.data.obj
				})
			},
			//新增收款
			addDomain() {
				this.collectionsForm.detail.push({
					type: '',
					accountid: '',
					linetime: '',
					fee: ''
				});
			},
			//删除收款
			removeDomain(item) {
				var index = this.collectionsForm.detail.indexOf(item)
				if(index !== -1) {
					this.collectionsForm.detail.splice(index, 1)
				}
			},
			//保存收款
			savecollect() {
				let companyname = ''
				this.detail.companyname == "" ? companyname = this.detail.contact : companyname = this.detail.companyname
				this.addcollection = false
				let para = this.collectionsForm
				para.orderno = this.detail.code
				para.companyname = companyname
				para.lineid = this.detail.lineid
				para.teamno = this.detail.teamno
				para.linename = this.detail.linename
				for(let i = 0; i < para.detail.length; i++) {
					para.detail[i].linetime = (!para.detail[i].linetime || para.detail[i].linetime == '') ? '' : util.formatDate.format(new Date(para.detail[i].linetime), 'yyyy-MM-dd');
				}

				if(this.type == "collect") {
					collectsave(para).then((res) => {
						if(res.data.error == 1) {
							this.$message({
								message: '提交失败',
								type: 'error'
							});
						} else {
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.collectionsForm.detail = [{
								type: '',
								accountid: '',
								linetime: '',
								fee: ''
							}]

						}
						this.getdetail()
					});
				} else {
					paysave(para).then((res) => {
						if(res.data.error == 1) {
							this.$message({
								message: '提交失败',
								type: 'error'
							});
						} else {
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.collectionsForm.detail = [{
								type: '',
								accountid: '',
								linetime: '',
								fee: ''
							}]
						}
						this.getdetail()
					});
				}

			},
			//提交表单
			save() {
				let para = {
					id: this.detail.id,
					adultNum: this.detail.totaladult,
					childNum: this.detail.totalchild,
					babyNum: this.detail.totalbaby,
					list: this.detail.namelist,
					token: token
				}
				for(let i = 0; i < this.detail.namelist.length; i++){
					if(this.detail.namelist[i].type == "成人") {
						para.list[i].type = 1
						console.log()
					} else if(this.detail.namelist[i].type == "儿童") {
						para.list[i].type = 2
					} else if((this.detail.namelist[i].type == "婴儿")) {
						para.list[i].type = 3
					}
				}
				orderupdate(para).then((res) => {
					if(res.data.error == 1) {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					} else {
						this.handleHide()
						this.$message({
							message: '保存成功',
							type: 'success'
						});

					}
					console.log(para, res, '提交表单')
				})
			},
			//取消订单
			cancelorder() {
				ordercancel(this.baseform).then((res) => {
					console.log(this.baseform, res, '取消订单')
				})
			},
			//确认游客名单
			confirmvisitor() {
				this.confirmnamelist = false
				ordernamelistconfirm(this.baseform).then((res) => {
					console.log(res, "确认游客名单")
				})
			},
			//导出游客名单
			exportnamelist() {
				ordernamelistexport(this.baseform).then((res) => {
					console.log(this.baseform, res, "导出游客名单")
				})
			},
			addcollpay(type) {
				this.addcollection = true
				this.type = type
			},
			showmore(val) {
				if(this.more == "更多") {
					this.detail.logs = this.alllogs
					this.more = "收起"
				} else {
					this.more = "更多"
					this.detail.logs = this.detail.logs.slice(0, 3)
				}

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
			.el-button {
				float: right;
				margin-left: 20px;
			}
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
			.adulttable {
				margin-top: 20px;
				border: 1px solid #dee5ec;
				thead {
					td {
						background: #f5f7f9;
						border-bottom: 1px solid #bfcbda;
						height: 40px;
						line-height: 40px;
					}
				}
				tbody {
					td {
						padding: 8px 0 8px 20px;
						border-bottom: 1px solid #dee5ec;
						min-height: 50px;
					}
				}
				td {
					padding-left: 20px;
				}
			}
		}
		.padding-0-50 {
			padding: 0 50px;
		}
		.padding-20-50 {
			padding: 20px 50px;
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
	
	.collecttable {
		border: 1px solid #dee5ec;
		border-radius: 5px;
		th {
			height: 38px;
			background: #f5f7f9;
			border-bottom: 1px solid #bfcbda;
			padding: 0 20px;
			line-height: 38px;
		}
		td {
			padding: 10px 20px;
			border-bottom: 1px solid #dee5ec;
		}
	}
	
	.button {
		margin: 30px 0;
		text-align: left;
	}
	
	.el-input-number {
		width: 120px;
		.el-input-number__increase,
		.el-input-number__decrease {
			line-height: 29px;
			width: 30px;
		}
		.el-input {
			input {
				height: 30px;
			}
		}
	}
</style>