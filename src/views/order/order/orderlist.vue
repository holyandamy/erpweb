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
				</el-row>
			</header>
			<el-form :inline="true" :model="orderinfo"  style="text-align: left; padding-left: 30px;float: left;">
				<el-row>
					<el-col :span="22">
						<el-form-item label="订单编号">
							<el-input v-model="orderinfo.orderno" placeholder="请输入订单编号"></el-input>
						</el-form-item>
						<el-form-item label="线路名称">
							<el-input v-model="orderinfo.linename" placeholder="请输入线路名称"></el-input>
						</el-form-item>
						<el-form-item label="出团日期">
							<el-date-picker v-model="date" type="daterange" placeholder="选择日期范围">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="负责人">
							<el-input v-model="orderinfo.creater" placeholder="请输入负责人"></el-input>
						</el-form-item>
						<el-form-item label="订单状态">
							<el-select v-model="orderinfo.status" clearable placeholder="订单状态">
								<el-option v-for="item in optionsstate" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="订单来源">
							<el-select v-model="orderinfo.source" clearable placeholder="订单来源">
								<el-option v-for="item in optionsfrom" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
            <el-form-item label="是否退款">
              <el-select v-model="orderinfo.refund" clearable placeholder="是否退款">
                <el-option v-for="item in optionsfrom2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算状态">
              <el-select v-model="orderinfo.settle" clearable placeholder="结算状态">
                <el-option v-for="item in optionsfrom1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
						<el-form-item>
							<el-checkbox v-model="orderinfo.hide">隐藏取消订单</el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-button class="hasid" id="bc6051cd735911e788410242ac120009" type="primary" @click="onSubmit">查询</el-button>
              <el-button  type="primary" @click="clearGetList">清空查询</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<section style="padding: 0 30px;">
				<table width="100%" class="table">
					<thead>
						<tr>
							<td width="23%" style="text-align: left;">订单编号 / 团号 / 线路名称</td>
							<td width="9%">出团 / 人数</td>
							<td width="8%">客户信息</td>
							<td width="7%">订单金额</td>
							<td width="5%">应收</td>
							<td width="6%">已收</td>
							<td width="6%">退款</td>
							<td width="10%">结算状态</td>
							<td width="10%">订单状态</td>
							<td width="10%">负责人</td>
							<td width="10%"> 操作</td>
						</tr>
					</thead>
				</table>
        <div v-loading="listLoading" v-if='isLoadd && orderLists.length==0' element-loading-text="拼命加载中" style='height: 200px;'></div>
				<dl class="list" v-for="(list,index) in orderLists">
					<dt><span>订单编号：{{list.code}} / 馨途订单编号：{{list.sourceid}}</span><span style="margin-left: 50px;">订单来源：{{list.platformname}}</span> </dt>

					<dd>
						<ul>
							<li style="width: 30%;">{{list.teamno}} <br />{{list.linename.length>70?list.linename.substring(0,70)+'...':list.linename}}<br /> 下单时间：{{list.createtime}}</li>
							<li style="width: 10%;">出团：{{list.starttime}} <br /> 人数：{{list.custnumber}}</li>
							<li style="width: 10%;">{{list.companyname}} <br /> {{list.contactmobile}}</li>
							<li style="width: 5%;">￥{{list.orderfee}}</li>
							<li style="width: 5%;">￥{{list.orderpay}}</li>
							<li style="width: 5%;">￥{{list.collection}}</li>
							<li style="width: 5%;">￥{{list.pay}}</li>
              <li style="width: 10%;">{{list.settleName}}</li>
							<li style="width: 10%;">{{list.statusName}}</li>
              <li style="width: 10%;">{{list.creater}}</li>
							<li style="width: 12%;text-align: center;padding: 10px 10px 10px 0px;" class="button">
                <el-button type="text" @click="setMode('orderinfo'),passinfo(list)">查看</el-button>

                <a href="javascript:;" class="operation" >
                  <el-dropdown @visible-change="toDown" style='position: initial;'>
									<span class="el-dropdown-link" style='color: #3ec3c8;'>
						        操作 <i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button  type="text" v-if="list.status == 1"  @click="confirmnamelists(list)">确认订单</el-button>
                        <el-button  type="text" v-if="list.status == 2"  @click="confirmnamelists1(list)">出团确认</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item  >
                        <el-button type="text" v-if="list.settle == 2" @click='getSettle(list)'>结算</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item >
                      <el-button type="text" class="hasid" id="7db5db31735d11e788410242ac120009">
                      <!--<router-link  target="_blank" :to="{path:'/singlegroup',query: {id: list.id}}">行程单</router-link>-->
                      <router-link  target="_blank" :to="{path:'/singlegroup',query: {id: list.id}}" style='color: #3ec3c8;'>导出行程</router-link>
                      </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item >
                        <el-button type="text" class="hasid" id="80c08aca735d11e788410242ac120009">
                          <!--<router-link  target="_blank" :to="{path:'/confirm',query: {id: list.id}}">确认单</router-link>-->
                          <router-link  target="_blank" :to="{path:'/confirm',query: {id: list.id}}" style='color: #3ec3c8;'>生成确认单</router-link>
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button type="text" class="hasid" id="83b7ed61735d11e788410242ac120009">
                          <!--<router-link  target="_blank" to="/singlegroup">出团单</router-link>-->
                          <router-link  target="_blank" to="/singlegroup" style='color: #3ec3c8;'>导出出团单</router-link>
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </a>
							</li>
						</ul>
					</dd>
				</dl>
				<el-dialog title="" :visible.sync="confirmnamelist" size="tiny">
					<span style="line-height: 25px;">确定要确认订单吗？</span>
					<span slot="footer" class="dialog-footer">
            <el-button @click="confirmnamelist = false">取 消</el-button>
            <el-button type="primary" @click="confirmvisitor">确 定</el-button>
          </span>
				</el-dialog>
        <el-dialog title="" :visible.sync="confirmnamelist1" size="tiny">
          <span style="line-height: 25px;">确认后，该订单游客为可出团状态</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="confirmnamelist1 = false">取 消</el-button>
            <el-button type="primary" @click="confirmfin">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="isSettle" size="tiny">
          <span style="line-height: 25px;">确定要结算订单么？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isSettle = false">取 消</el-button>
            <el-button type="primary" @click="sureSettle">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="isSettleAll" size="tiny">
          <span style="line-height: 25px;">批量结算当前检索条件下的订单列表中 <br>可结算的订单！此操作不可撤销， <br>请注意。</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isSettleAll = false">取 消</el-button>
            <el-button type="primary" @click="sureSettleAll">结 算</el-button>
          </span>
        </el-dialog>
			</section>

			<div class="page">
        <div style='text-align: left;'>
          <el-button v-if='isShowJs'  type="primary" @click='getAllSettle'>批量结算</el-button>
        </div>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
      </div>
		</div>

		<OrderInfo v-else @setMode="setMode" :listid="listid" @getList="getList"></OrderInfo>
	</div>
</template>

<script>
	import axios from 'axios';
	import Cookies from 'js-cookie';
	import { orderlist, ordernamelistconfirm,orderfin,ordersettle,ordersettlebat,tokenlogin} from '../../../common/js/config';
	import md5 from 'js-md5';
	import OrderInfo from './orderinfo'
	import { showorhide } from '../../../common/js/showorhid'
	import paramm from '../../../common/js/getParam'
  import util from '../../../common/js/util'
  export default {
		components: {
			OrderInfo
		},
		data() {
			return {
        listLoading: true,
        isLoadd: false,
        isShowJs: false,
				confirmnamelist: false,
				confirmnamelist1: false,
        isSettle: false,
        isSettleAll: false,
				nameid: '',
				finid: '',
        settleid: '',
				total: 0,
				currentPage: 1,
				pagesize: 10,
        date: '',
        orderinfo: {
					orderno: '',
					linename: '',
					creater: '',
					status: '0',
					source: '-1',
          settle: '-1',
          refund: '0',
					hide: false,
					token: paramm.getToken(),
					pageindex: 0,
					pagesize: 10
				},
				orderLists: [],
				optionsstate: [{
					value: '0',
					label: '全部'
				}, {
					value: '1',
					label: '未确认'
				}, {
					value: '2',
					label: '已确认'
				}, {
					value: '3',
					label: '已出团'
				}, {
					value: '4',
					label: '已取消'
				}, {
          value: '5',
          label: '已退团'
        }],
				optionsfrom: [{
					value: '-1',
					label: '全部'
				},  {
          value: '0',
          label: '内部'
        },{
					value: '2',
					label: '馨·欢途'
				}, {
					value: '1',
					label: '馨·驰誉'
				}],
        optionsfrom2: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '是'
        }, {
          value: '2',
          label: '否'
        }],
        optionsfrom1: [{
          value: '-1',
          label: '全部'
        }, {
          value: '0',
          label: '未结算'
        }, {
          value: '1',
          label: '已结算'
        }, {
          value: '2',
          label: '可结算'
        }],
				setmode: 'orderlistmodel',
				listid: ''

			}
		},

		mounted() {
			showorhide();
      this.handleRole()
		},
   updated: function() {
		  // this.handleRole();
     this.$nextTick(function() {
       showorhide()
		 });
	 },
	 created:function(){
		//  this.handleRole()
	 },
		methods: {
      // 鼠标移入下拉显示按钮
      toDown(){
        showorhide()
			},
			//查询按钮显示影藏处理角色权限
			handleRole(){
			tokenlogin({token: paramm.getToken()}).then(function(res){
				console.log(res.data.obj.auths)
			})
			},
      //点击显示弹窗
			confirmnamelists(list) {
				this.confirmnamelist = true
				this.nameid = list.id
			},
      confirmnamelists1(list) {
        this.confirmnamelist1 = true
        this.finid = list.id
      },
      getSettle(list) {
        this.isSettle = true
        this.settleid = list.id
      },
      getAllSettle() {
        this.isSettleAll = true
      },
			//确认订单
			confirmvisitor() {
        let _this = this;
				let para = {
					token: paramm.getToken(),
					id: this.nameid
				}
			ordernamelistconfirm(para).then((res) => {
					if(res.data.error || res.data.err) {
						paramm.getCode(res.data,_this)
					} else {
            paramm.getCode(res.data,_this)
						this.getList()
						this.confirmnamelist = false
					}
				})
			},
      //出团确认
      confirmfin() {
        let _this = this;
        let para = {
          token: paramm.getToken(),
          id: this.finid
        }
        orderfin(para).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            this.getList()
            this.confirmnamelist1 = false
          }
        })
      },
      //结算
      sureSettle() {
        let _this = this;
        let para = {
          token: paramm.getToken(),
          id: this.settleid
        }
        ordersettle(para).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            this.getList()
            this.isSettle = false
          }
        })
      },
      //批量结算
      sureSettleAll() {
        this.isLoadd = true;
        let _this =this;
        let dates = ''
        let startday = this.date[0]
        let endday = this.date[1]
        startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
        endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
        if(startday == '' && endday == '') {
          dates = startday + endday
        } else {
          dates = startday + '|' + endday
        }
        ordersettlebat({
          date: dates,
          orderno: this.orderinfo.orderno,
          linename: this.orderinfo.linename,
          creater: this.orderinfo.creater,
          status: this.orderinfo.status,
          source: this.orderinfo.source,
          refund: this.orderinfo.refund,
          hide: this.orderinfo.hide,
          token: paramm.getToken()
        }).then((res)=>{
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            _this.isLoadd = false;
            _this.isSettleAll = false;
            _this.getList()
          }
        })
      },
			setMode(type) {
				this.setmode = type
			},
			getList() {

				let dates = ''
				let startday = this.date[0]
				let endday = this.date[1]
				startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
				endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
				if(startday == '' && endday == '') {
					dates = startday + endday
				} else {
					dates = startday + '|' + endday
				}

				let page = this.orderinfo
				page.pageindex = this.currentPage - 1
				page.date = dates
				orderlist(page).then((res) => {

					if(res.data.error || res.data.err){

					}else{
						this.orderLists = res.data.obj.datas
						this.total = Number(res.data.obj.total)
					}

				})
        this.isShowJs = true
      },
			handleCurrentChange(val) {
				this.getList()
			},
			onSubmit() {
				this.getList()
			},
			passinfo(val) {
				this.listid = val.id
			},
      // 清空查询
      clearGetList () {
        this. orderinfo= {
           orderno: '',
           linename: '',
           creater: '',
           status: '0',
           source: '-1',
           settle: '-1',
           refund: '0',
           hide: false,
           token: paramm.getToken(),
           pageindex: 0,
           pagesize: 10
        };
        this.date = ''
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
				padding:0 20px;
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
			padding: 0 20px 0 10px ;
			margin: 0 10px;
			color: #666;
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
						.el-col {
							float: left;
							text-align: left;
						}
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

	.button {
		.el-button {
			padding: 7px 3px;
			a {
				color: #3ec3c8;
			}
		}
	}

	.demo-form-inline {
	}

	.page {
		margin: 0 30px;
		margin-top: 20px;
	}
  .hasid {
    display: none;
  }
</style>
