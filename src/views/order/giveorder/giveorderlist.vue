<template>
	<div>
		<div v-if="setmode == 'orderlistmodel'">
			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>订单管理</el-breadcrumb-item>
							<el-breadcrumb-item>接送订单列表</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				</el-row>
			</header>
			<el-form :inline="true" :model="orderinfo"  style="text-align: left; padding-left: 30px;">
				<el-row>
					<el-col :span="6">
						<el-form-item label="订单编号">
							<el-input v-model="orderinfo.code" placeholder="请输入订单编号"></el-input>
						</el-form-item>
          </el-col>
          <el-col :span="6">
						<el-form-item label="线路名称">
							<el-input v-model="orderinfo.lineName" placeholder="请输入线路名称"></el-input>
						</el-form-item>
          </el-col>
          <el-col :span="8">
						<el-form-item label="用车时间">
							<el-date-picker v-model="date" type="daterange" placeholder="用车时间范围">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人" label-width="68px">
              <el-input v-model="orderinfo.contact" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select v-model="orderinfo.status" clearable placeholder="订单状态">
                <el-option v-for="item in optionsstate" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button class="hasid" id="bc6051cd735911e788410242ac120009" type="primary" @click="onSubmit">查询</el-button>
              <el-button  type="primary" @click="clearGetList">清空查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
			</el-form>
			<section style="padding: 0 30px;">
        <el-table :data="orderLists" border style="text-align: left; font-size: 12px;" >
          <el-table-column prop="typeName" label="订单编号/线路订单编号" width="180">
            <template scope="scope" >
                {{scope.row.code}} / <br>
                {{scope.row.lineCode}}
            </template>
          </el-table-column>
          <el-table-column prop="lineName" label="线路名称">
          </el-table-column>
          <el-table-column prop="usetime" label="用车时间">
          </el-table-column>
          <el-table-column prop="createtime" label="下单时间">
          </el-table-column>
          <el-table-column prop="personnum" label="人数">
          </el-table-column>
          <el-table-column prop="typeName" label="客户信息" width="120">
            <template scope="scope">
              {{scope.row.contact}} <br>
              {{scope.row.contactmobile}}
            </template>
          </el-table-column>
          <el-table-column prop="orderpay" label="订单金额">
          </el-table-column>

          <el-table-column prop="dest" label="接送地址">
          </el-table-column>
          <el-table-column prop="carTypeName" label="车型">
          </el-table-column>
          <el-table-column prop="typeName" label="接送类型">
          </el-table-column>
          <el-table-column prop="statusName" label="状态">
          </el-table-column>
          <el-table-column  label="操作" width="120">
            <template scope="scope">
              <el-button type="text" size="small" @click="setMode('giveorderinfo'),setId(scope.row)">查看</el-button>
              <a href="javascript:;"  v-if="(scope.row.status=='0')|| scope.row.status=='1'">
                <el-dropdown  @visible-change="toDown">
                    <span style="font-size: 12px;color: #3ec3c8;">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item > <el-button v-if="scope.row.status=='0'" @click="confirmnamelists(scope.row,1)" type="text" size="small">确认订单</el-button></el-dropdown-item>
                    <el-dropdown-item > <el-button v-if="scope.row.status=='0' || scope.row.status=='1'" @click="confirmnamelists(scope.row,2)" type="text" size="small">取消</el-button></el-dropdown-item>
                  </el-dropdown-menu> <!--  class="hasid" id="9250c2ef72b911e7aad70242ac120006"   -->
                </el-dropdown>
              </a>
            </template>
          </el-table-column>
        </el-table>

        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>

				<el-dialog style='text-align: left;' title="确认订单:" :visible.sync="confirmnamelist" size="tiny" :close-on-click-modal="false" :show-close='false'>
          <el-form :model="form">
            <el-form-item label="设置价格：" :label-width="formLabelWidth" style='width: 80%;position: relative;' >
              <el-input v-model="form.money" auto-complete="off" placeholder="请填写大于0的整数价格!"></el-input><span style='position: absolute;right: -20px;'>元</span>
            </el-form-item>
            <el-form-item label="用车明细：" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请填写用车明细，多段用车建议用回车键隔开!"
                v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-form>
					<span slot="footer" class="dialog-footer">
            <el-button @click="smallSure">取 消</el-button>
            <el-button type="primary" @click="sureOrder">确 定</el-button>
          </span>
				</el-dialog>
        <el-dialog title="" :visible.sync="cancellist" size="tiny">
          <span style="line-height: 25px;">确定要取消订单吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancellist = false">取 消</el-button>
            <el-button type="primary" @click="cancelOrder">确 定</el-button>
          </span>
        </el-dialog>
			</section>

		</div>

		<GiveorderInfo v-else @setMode="setMode" :listid="listid" @getList="getList"></GiveorderInfo>
	</div>
</template>

<script>
	import axios from 'axios';
	import { givelist, giveconfirm,givecancel} from '../../../common/js/config';
	import GiveorderInfo from './giveorderinfo'
	import { showorhide } from '../../../common/js/showorhid'
	import paramm from '../../../common/js/getParam'
  import util from '../../../common/js/util'
  export default {
		components: {
      GiveorderInfo
		},
		data() {
			return {
        isLoadd: false,
        isShowJs: false,
				confirmnamelist: false,
        cancellist: false,
				nameid: '',
				total: 0,
				currentPage: 1,
				pagesize: 10,
        date: '',
        orderinfo: {
          code: '',
          lineName: '',
          date: '',
          contact: '',
          status: '-1',
					token: paramm.getToken(),
          pageIndex: 0,
          pageSize: 10
				},
				orderLists: [],
				optionsstate: [{
					value: '-1',
					label: '全部'
				}, {
					value: '0',
					label: '待确认'
				}, {
					value: '1',
					label: '待支付'
				}, {
					value: '2',
					label: '已支付'
				}, {
					value: '3',
					label: '已取消'
				}],
				setmode: 'orderlistmodel',
				listid: '',
        formLabelWidth: '100px',
        form: {
          money: '',
          remark: ''
        }

      }
		},

		mounted() {
			showorhide()
		},
//    updated: function() {
//      this.$nextTick(function() {
//        showorhide()
//      })
//    },
		methods: {
      // 鼠标移入下拉显示按钮
      toDown(){
        showorhide()
      },
      //点击显示弹窗
			confirmnamelists(list,type) {
        type == 1 ? this.confirmnamelist = true : this.cancellist = true
				this.nameid = list.id
			},
      smallSure(){
        this.confirmnamelist= false
        this.form.money=''
        this.form.remark=''
      },
			//确认订单
      sureOrder() {
        if(isNaN(this.form.money) || parseFloat(this.form.money)<0 || parseFloat(this.form.money)%1 != 0){
          this.$message({
            message: '请填写大于0的整数价格!',
            type: 'warning'
          });
          return
        }
        let _this = this;
				let para = {
					token: paramm.getToken(),
					id: _this.nameid,
          money: parseFloat(_this.form.money),
          remark: _this.form.remark
				}
        giveconfirm(para).then((res) => {
					if(res.data.error || res.data.err) {
						paramm.getCode(res.data,_this)
					} else {
            paramm.getCode(res.data,_this)
            _this.getList()
            _this.confirmnamelist = false
            _this.form.money=''
            _this.form.remark=''
					}
				})
			},
      //取消订单
      cancelOrder() {
        let _this = this;
        let para = {
          token: paramm.getToken(),
          id: this.nameid
        }
        givecancel(para).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            _this.getList()
            _this.cancellist = false
          }
        })
      },

			setMode(type) {
        this.setmode = type
			},
      setId(roww) {
         this.listid = roww.id
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
				page.pageIndex = this.currentPage - 1
				page.date = dates
        givelist(page).then((res) => {
					if(res.data.error == 1){
						this.$message({
							message: res.data.message,
							type: 'error'
						});
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
          code: '',
          lineName: '',
          date: '',
          contact: '',
          status: '-1',
          token: paramm.getToken(),
          pageIndex	: 0,
          pageSize: 10
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
  .hasid {
    display: none;
  }
</style>
