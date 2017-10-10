<template>
  <div>
    <div v-if="setmode == 'orderlistmodel'">
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
              <el-breadcrumb-item>定制需求</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </header>
      <el-form :inline="true" :model="orderinfo"  style="text-align: left; padding-left: 30px;">
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请时间">
              <el-date-picker v-model="date" type="daterange" placeholder="申请时间范围">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="需求状态">
              <el-select v-model="orderinfo.status" clearable placeholder="需求状态">
                <el-option v-for="item in optionsstate" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>  <!--  class="hasid" id="bc6051cd735911e788410242ac120009"     -->
              <el-button  type="primary" @click="clearGetList">清空查询</el-button>
              <el-button  type="primary" >导出列表</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <section style="padding: 0 30px;">
        <el-table :data="orderLists" border style="text-align: left; font-size: 12px;" >
          <el-table-column
            type="index"
            width="100"
            label="序号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="starttime" label="出发时间">
          </el-table-column>
          <el-table-column prop="dest" label="目的地">
          </el-table-column>
          <el-table-column prop="personnum" label="人数">
          </el-table-column>
          <el-table-column prop="mobile" label="联系电话">
          </el-table-column>
          <el-table-column prop="email" label="电子邮箱">
          </el-table-column>
          <el-table-column prop="statusName" label="状态">
          </el-table-column>
          <el-table-column  label="操作" width="120">
            <template scope="scope">
              <el-button type="text" size="small"  @click="setMode('custominfo','info'),passinfo(scope.row)">查看</el-button>
              <a href="javascript:;" >
                <el-dropdown  @visible-change="toDown">
                    <span style="font-size: 12px;color: #3ec3c8;">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item > <el-button v-if="scope.row.status==0" type="text" size="small"  @click="setMode('custominfo','edit'),passinfo(scope.row)">完善需求</el-button></el-dropdown-item>
                    <el-dropdown-item > <el-button v-if="scope.row.status==0 || scope.row.status==1"  @click="confirmnamelists(scope.row)" type="text" size="small">取消</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </a>
            </template>
          </el-table-column>
        </el-table>

        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
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

    <Custominfo v-else @setMode="setMode" :typpe='typpe' :listid="listid" @getList="getList"></Custominfo>
  </div>
</template>

<script>
  import axios from 'axios';
  import { customlist,customcancel} from '../../../common/js/config';
  import Custominfo from './custominfo'
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  import util from '../../../common/js/util'
  export default {
    components: {
      Custominfo
    },
    data() {
      return {
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
        pageSize: 10,
        date: '',
        orderinfo: {
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
          label: '已确认'
        }, {
          value: '2',
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
      // 鼠标移入下拉显示按钮
      toDown(){
        showorhide()
      },
      //点击显示弹窗
      confirmnamelists(list) {
        this.cancellist = true
        this.nameid = list.id
      },
      //取消订单
      cancelOrder() {
        let _this = this;
        let para = {
          token: paramm.getToken(),
          id: this.nameid
        }
        customcancel(para).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            this.getList()
            this.cancellist = false
          }
        })
      },

      setMode(type,typpe) {
        this.setmode = type
        this.typpe = typpe
      },
      getList() {
        let _this= this;
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
        customlist(page).then((res) => {
          if(res.data.error || res.data.err){
            paramm.getCode(res.data,_this)
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
          status: '',
          token: paramm.getToken(),
          pageIndex: 0,
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
