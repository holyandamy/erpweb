<template>
  <div>
    <div v-if="setmode == 'orderlistmodel'">
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>报表管理</el-breadcrumb-item>
              <el-breadcrumb-item>月收款统计</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </header>
      <el-form :inline="true" :model="orderinfo"  style="text-align: left; padding-left: 30px;">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称">
              <el-input v-model="orderinfo.name" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="时间">
              <el-date-picker v-model="date" type="month" placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>  <!--  class="hasid" id="bc6051cd735911e788410242ac120009"     -->
              <el-button  type="primary" @click="clearGetList">清空查询</el-button>
              <a id='downloadd' target='_blank'  :href='plusSrc' @click="collectexport" download="export.xls"><el-button >导出Excel</el-button></a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <section style="padding: 0 30px;">
        <!-- 满意   orderLists-->
        <el-table :data="orderLists" border style="text-align: left; font-size: 12px;" v-if="orderLists.length!=0">
          <el-table-column
            type="index"
            width="200"
            label="序号">
          </el-table-column>
          <el-table-column prop="name" label="客户名称">
          </el-table-column>
          <el-table-column prop="orderCollects" label="订单预收款" width='200'>
          </el-table-column>
          <el-table-column prop="collects" label="预收款"  width='200'>
          </el-table-column>
          <el-table-column prop="refund" label="预付款退款"  width='200'>
          </el-table-column>
          <el-table-column prop="allTotal" label="合计"  width='200'>
          </el-table-column>
        </el-table>
        <!-- 满意 -->
        <div id='totalAll' v-if="orderLists.length!=0">
          <span  style='float: left;'>合计</span>
          <span>{{orderListsSum.allTotal}}</span>
          <span>{{orderListsSum.refund}}</span>
          <span>{{orderListsSum.collects}}</span>
          <span  style='border-left:1px solid #dee5ec;'>{{orderListsSum.orderCollects}}</span>
        </div>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>

        <el-dialog title="" :visible.sync="cancellist" size="tiny">
          <span style="line-height: 25px;">确定要取消吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancellist = false">取 消</el-button>
            <el-button type="primary" @click="cancelOrder">确 定</el-button>
          </span>
        </el-dialog>
      </section>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import { collectlist, ordernamelistconfirm,orderfin,ordersettle,ordersettlebat,monthearnDown } from '../../../common/js/config';
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  import util from '../../../common/js/util'
  export default {
    data() {
      return {
        plusSrc: '',
        isLoadd: false,
        isShowJs: false,
        confirmnamelist: false,
        cancellist: false,
        isSettle: false,
        isSettleAll: false,
        nameid: '',
        finid: '',
        settleid: '',
        total: 0,
        currentPage: 1,
        pagesize: 50,
        date: '',
        orderinfo: {
          name: '',
          token: paramm.getToken(),
          pageindex: 0,
          pagesize: 50
        },
        orderLists: [],
        orderListsSum: [],
        optionsstate: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '待确认'
        }, {
          value: '2',
          label: '已确认'
        }, {
          value: '3',
          label: '已取消'
        }],
        setmode: 'orderlistmodel',
        listid: '',
        lineList:[],
        formLabelWidth: '100px',
        typpe: '',
        form:{}

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
      //导出excel
      collectexport() {
        let dates = ''
        if(this.date) {
          dates = util.formatDate.format(new Date(this.date), 'yyyy-MM')
        }else{
          dates = ''
        }
        this.plusSrc = monthearnDown + '?'
          + 'token=' + paramm.getToken() +'&'
          + 'date=' + dates +'&'
          + 'name=' + this.orderinfo.name;
      },
      // 鼠标移入下拉显示按钮
      toDown(){
        showorhide()
      },
      //点击显示弹窗
      confirmnamelists(list,type) {
        type == 1 ? this.confirmnamelist = true : this.cancellist = true
        this.nameid = list.id
      },
      //取消订单
      cancelOrder() {
        return
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

      setMode(type,typpe) {
        this.setmode = type
        this.typpe = typpe
      },
      /* 获取列表数据 满意*/
      getList() {
        let page = this.orderinfo
        page.pageindex = this.currentPage - 1
        if(this.date) {
          page.date = util.formatDate.format(new Date(this.date), 'yyyy-MM')
        }else{
          page.date = ''
        }
        collectlist(page).then((res) => {
          if(res.data.error == 1){
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }else{
            this.orderLists = res.data.obj.datas;
            console.log( 99999,this.orderLists)
            this.orderListsSum = res.data.obj.totalVo;
            this.total = Number(res.data.obj.total);
          }

        })
        this.isShowJs = true
      },
      handleCurrentChange(val) {
        this.getList()
      },
      /* 满意 */
      onSubmit() {
        this.getList()
      },
      passinfo(val) {
        this.listid = val.id
      },
      // 清空查询
      clearGetList () {
        this. orderinfo= {
          name: '',
          token: paramm.getToken(),
          pageindex: 0,
          pagesize: 50
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
  #totalAll{
    font-size:12px;
    width: 100%;
    border-bottom:1px solid #dee5ec;
    border-left:1px solid #dee5ec;
    border-right:1px solid #dee5ec;
    background-color: #fff;
    overflow: hidden;
    span{
      height: 45px;
      line-height:45px;
      width: 199.5px;
      border-right:1px solid #dee5ec;
      display: inline-block;
      float: right;
    }
  }
  #downloadd{
    display: inline-block;
  }
</style>
