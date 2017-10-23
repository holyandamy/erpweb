<template>
  <section>
    <div v-if="showedit == 'collectlist'">
      <header>
        <el-button type="primary" @click="setMode('collectedit')" class="hasid" id="5e47a82072b911e7aad70242ac120006">
          收款登记
        </el-button>
        <a id='downloadd' target='_blank'  :href='plusSrc' @click="collectexport" download="export.xls"><el-button >导出excel</el-button></a>
      </header>
      <div class="container">
        <el-form :inline="true" id="search" class="demo-form-inline" @submit.prevent="submit">
          <el-form-item label="创建日期">

            <el-date-picker v-model="search.date" onPick type="daterange" placeholder="选择日期范围">
            </el-date-picker>

          </el-form-item>
          <el-form-item label="单位名称">
            <el-input placeholder="单位名称" v-model="search.companyname"></el-input>
          </el-form-item>

          <el-form-item label="团号">
            <el-input placeholder="团号" v-model="search.teamno"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input placeholder="订单号" v-model="search.orderno"></el-input>
          </el-form-item>

          <el-form-item label="确认状态">
            <el-select v-model="search.confirmstatus" placeholder="请选择">
              <el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="核销状态">
            <el-select v-model="search.verifstatus" placeholder="请选择">
              <el-option v-for="item in verifstatuss" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务类型">
            <el-select v-model="search.businesstype" placeholder="请选择">
              <el-option v-for="item in type " :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="hasid" id="44e8ae4ae5324d82851719fcbbb6b106" @click="onSubmit">查询</el-button>
            <el-button  type="primary" @click="clearGetList">清空查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="listLoading" border  style="width:100%; font-size:12px ;" >
          <el-table-column fixed="left" prop="createtime" label="创建日期" width="100">
          </el-table-column>
          <el-table-column prop="orderno" label="订单编号" width="120">
          </el-table-column>
          <el-table-column prop="teamno" label="团号" width="120">
          </el-table-column>
          <el-table-column prop="linename" label="线路名称" width="300">
          </el-table-column>
          <el-table-column prop="code" label="收款单号" width="180">
          </el-table-column>
          <el-table-column prop="busstypename" label="业务类型" width="120">
          </el-table-column>
          <el-table-column prop="companyname" label="单位名称" width="125">
          </el-table-column>
          <el-table-column prop="totalfee" label="金额" width="120">
          </el-table-column>
          <el-table-column prop="confirm" label="确认状态" width="120" ref="confirm" class="confirm">
            <template scope="scope">
              <span v-if="scope.row.confirm == '未确认'" style='color: red;'>{{scope.row.confirm}}</span>
              <span v-if="scope.row.confirm != '未确认'">{{scope.row.confirm}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="verification" label="核销状态" width="120">
            <template scope="scope">
              <span v-if="scope.row.verification == '未核销'" style='color: red;'>{{scope.row.verification}}</span>
              <span v-if="scope.row.verification != '未核销'">{{scope.row.verification}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operator" label="经办人" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template scope="scope">
              <el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              <a href="javascript:;" v-if="scope.row.cfmValue !='2' && scope.row.verfValue =='0'">
                <el-dropdown @visible-change="toDown">
                    <span el-dropdown-link style="color: #3ec3c8; font-size:12px;">
                      操作<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="hasid"  id="9250c2ef72b911e7aad70242ac120006" v-if="scope.row.cfmValue =='0'"><span @click="updatastatus(scope,1)">确认</span></el-dropdown-item>
                    <el-dropdown-item class="hasid"  id="9250c2ef72b911e7aad70242ac120006" v-if="scope.row.cfmValue =='0'"><span @click="setconfirm(scope,2)">确认不通过</span></el-dropdown-item>
                    <el-dropdown-item class="hasid"  id="a5ecf87872b911e7aad70242ac120006" v-if="scope.row.cfmValue =='1'&&scope.row.verfValue =='0'"><span @click="setverification(scope,3)">核销</span></el-dropdown-item>
                    <!--<el-dropdown-item class="hasid" id="b16981ef72b911e7aad70242ac120006" v-if="scope.row.verfValue ==''"><span @click="updatastatus(scope,4)">反核销</span></el-dropdown-item>-->
                  </el-dropdown-menu>
                </el-dropdown>
              </a>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </el-col>

        <!--查看界面-->
        <el-dialog title="查看" v-model="showFormVisible">  <!--  点击旁边也可关闭  :close-on-click-modal="false"   -->
          <el-form :model="showForm" label-width="90px" ref="showForm">
            <el-form-item label="创建日期：" prop="createtime">
              {{showForm.createtime}}
            </el-form-item>
            <el-form-item label="业务类型：" prop="busstypename">
              {{showForm.busstypename}}
            </el-form-item>
            <el-form-item label="订单编号：" prop="orderno" v-if="showForm.orderno">
              {{showForm.orderno}}
            </el-form-item>
            <el-form-item label="团号：" prop="teamno" v-if="showForm.teamno">
              {{showForm.teamno}}
            </el-form-item>
            <el-form-item label="线路名称：" prop="linename" v-if="showForm.linename">
              {{showForm.linename}}
            </el-form-item>
            <el-form-item label="收款单位：" prop="companyname">
            {{showForm.companyname}}
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
              {{showForm.remark || '- - -'}}
            </el-form-item>
            <el-form-item label="确认备注：" prop="cfmRemark">
              {{showForm.cfmRemark || '- - -'}}
            </el-form-item>
            <el-form-item label="核销备注：" prop="verfRemark">
              {{showForm.verfRemark || '- - -'}}
            </el-form-item>
            <el-form-item label="收款明细：" prop="detail">  <!--  prop="detail" -->
              <el-table :data="detail" border>
                <el-table-column property="typee" label="收款方式" width="150"></el-table-column>
                <el-table-column property="accountname" label="收款账户" ></el-table-column>
                <el-table-column property="linetime" label="到账日期" width="150"></el-table-column>
                <el-table-column property="fee" label="金额" width="150"></el-table-column>
              </el-table>
              <el-col :span="24">
                <table style="border:1px solid #ccc;margin-top:10px"  width="100%">
                  <tr>
                    <td style="text-align:right"><span style="margin-right:24px">金额合计:￥{{summoney}}元</span></td>
                  </tr>
                </table>
              </el-col>
            </el-form-item>
            <el-form-item label="附件图片：">  <!--   prop="remark"  -->
              <ul v-if="imgArr">
                <li v-for='(imgg,index) in imgArr' style='margin: 10px;width: 50%;' :key="index">
                  <img :src="imgg" alt="">
                </li>
              </ul>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click.native="showFormVisible = false">关闭</el-button>
          </div>
        </el-dialog>
        <!--确认弹窗-->
        <el-dialog title="财务确认" :visible.sync="dialogVisible" size="tiny" >
          <div style="text-align:left;margin-bottom:15px">您是否确认通过这笔款项？</div>
          <el-form :model="form">
            <el-form-item   style='text-align: left;'>
              <el-input
                type="textarea"
                :rows="3"
                placeholder='备注(不超过120字)'
                v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" style="padding-top:0">
            <el-button @click="confirmPass">确认不通过</el-button>
            <el-button type="primary" @click="confirmCancel">取消</el-button>
          </span>
        </el-dialog>
        <!--核销弹窗-->
        <el-dialog title="财务核销" :visible.sync="dialogVerification" size="tiny" >
          <div style="text-align:left;margin-bottom:15px">您是否确认核销这笔款项？</div>
          <el-form :model="form1" >
            <el-form-item   style='text-align: left;'>
              <el-input
                type="textarea"
                :rows="3"
                placeholder='备注(不超过120字)'
                v-model="form1.remark"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" style="padding-top:0">
            <el-button @click="verificatePass">核销通过</el-button>
            <el-button type="primary" @click="verificateCancel">取消</el-button>
          </span>
        </el-dialog>

        <!--
          点击确认，弹窗对话框，添加备注，发请求（token id status remark）, 点击确认，成功，点击不通过，让弹窗消失
        -->
      </div>
    </div>
    <CollectEdit v-else @setMode="setMode" @toparent = 'setMode' @getL = 'onSubmit'></CollectEdit>
  </section>

</template>
<script>
  import paramm from '../../common/js/getParam'
  import util from '../../common/js/util'
  import CollectEdit from './collectedit'
  import { getcollectlist, collectstatus, collectdetail,collectlistDown} from '../../common/js/config';
  import { showorhide } from '../../common/js/showorhid'
  //导出excel
  export default {
    components: {
      CollectEdit,
    },
    data() {
      return {
        summoney:'',
        plusSrc: '',
        detail: [],
        imgArr: [],
        showedit: 'collectlist',
        //搜索数据
        search: {
          token: paramm.getToken(),
          date: '',
          companyname: '',
          teamno: '',
          orderno: '',
          confirmstatus: '-1',
          verifstatus: '-1',
          businesstype: '0',
          pageindex: 0,
          pagesize: 10
      },
      pageset: {
        pageindex: '',
          pagesize: ''
      },
      currentPage: 1,

        //确认状态
        state: [{
        value: '-1',
        label: '全部'
      },
        {
          value: '0',
          label: '未确认'
        }, {
          value: '1',
          label: '确认通过'
        }, {
          value: '2',
          label: '确认不通过'
        }
      ],
        verifstatuss: [
         {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '待核销'
        }, {
          value: '1',
          label: '核销通过'
        },
        {
          value: '2',
          label: '核销不通过'
        }
      ],
        //类型
        type: [{
        value: '0',
        label: '全部'
      },
        {
          value: '1',
          label: '预收款'
        },
        {
          value: '2',
          label: '订单收款'
        },
        {
          value: '3',
          label: '预收款退款'
        }
      ],
        tableData: [],
        statevalue: '',
        typevalue: '',
        pricetotal: 0, //总价格
        showFormVisible: false, //查看显示
        dialogVisible:false,  //状态确认显示
        dialogVerification:false,
        editLoading: false,
        listLoading: false,
        confirmId:'',
        confirmStatus:'',
        verificateId:'',
        verificateStatus:'',
        cfmRemark:'',
        verfRemark:'',
        showForm: {},
        form:{
          remark:''
        },
        form1:{
          remark:''
        },
        //formLabelWidth:'100px',
      editFormRules: {
        name: [{
          required: false,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      total: 0,
        pagesize: 10,
        qr: true,
        hx: true,
        dataid: []
    }

    },
    created() {
      this.collectexport()
      //console.log('created')
    },
    updated: function() {
      //console.log('updated')
      this.$nextTick(function() {
        showorhide()
      })
      this.collectexport()
    },

    methods: {
      toDown() {
        showorhide()
      },
      //导出excel
      collectexport() {
        let dates = ''
        let startday = this.search.date[0]
        let endday = this.search.date[1]
        startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
        endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
        if(startday == '' && endday == '') {
          dates = startday + endday
        } else {
          dates = startday + '|' + endday
        }
        this.plusSrc = collectlistDown + '?'
          + 'date=' + dates +'&'
          + 'token=' + paramm.getToken() +'&'
          + 'companyname=' + this.search.companyname +'&'
          + 'teamno=' + this.search.teamno +'&'
          + 'orderno=' + this.search.orderno +'&'
          + 'confirmstatus=' + this.search.confirmstatus +'&'
          + 'verifstatus=' + this.search.verifstatus +'&'
          + 'businesstype=' + this.search.businesstype;
        //console.log(77,this.plusSrc)
      },
      // 清空查询
      clearGetList () {
        this.search = {
            token: paramm.getToken(),
            date: '',
            companyname: '',
            teamno: '',
            orderno: '',
            confirmstatus: '-1',
            verifstatus: '-1',
            businesstype: '0',
            pageindex: 0,
            pagesize: 10
        }
      },
      setMode(type) {
        this.showedit = type;
      },
      totalall: function() {
        //				for(let i = 0; i < this.tableData.length; i++) {
        //					let all = parseInt(this.tableData[i].price)
        //					this.pricetotal += all
        //				}

      },
      handleSizeChange(val) {

      },

      onSubmit() {
        let _this = this;
        this.listLoading = true;

        let dates = ''
        let startday = this.search.date[0]
        let endday = this.search.date[1]
        startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
        endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
        if(startday == '' && endday == '') {
          dates = startday + endday

        } else {
          dates = startday + '|' + endday
        }
        let parses = {
          token: paramm.getToken(),
          date: dates,
          companyname: this.search.companyname,
          teamno: this.search.teamno,
          orderno: this.search.orderno,
          confirmstatus: this.search.confirmstatus,
          verifstatus: this.search.verifstatus,
          businesstype: this.search.businesstype,
          pageindex: this.currentPage - 1,
          pagesize: this.pagesize
        }

        getcollectlist(parses).then((res) => {
          if(res.data.error || res.data.err){
            paramm.getCode(res.data,_this)
            return
          }else {
            _this.tableData = res.data.obj.datas
            _this.total = Number(res.data.obj.total);
            _this.listLoading = false
          }
        })

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.onSubmit();
      },
      //显示查看界面
      handleShow (idx, row) {
        let _this = this;
        collectdetail({token: paramm.getToken(),id:row.id}).then((res)=>{
            if(res.data.error || res.data.err){
              paramm.getCode(res.data,_this)
            }else {
              _this.showForm.remark=res.data.obj.remark
              _this.imgArr = res.data.obj.attach.split(',')
              _this.detail = res.data.obj.details
              _this.summoney = res.data.obj.totalfee
              _this.detail.forEach(function (item,idx) {
                item.typee = {1:'现金',2:'对公汇款',3:'刷卡',4:'支付宝',5:'微信',6:'网银',7:'其他'}[item.type]
              })
            }
        })
        this.showFormVisible = true;
        this.showForm = Object.assign({}, row);
      },
      setconfirm(scope,i){
        this.dialogVisible = true
        this.confirmId = scope.row.id
        this.confirmStatus = i
      },
      setverification(scope,i){
        this.dialogVerification = true
        this.verificateId = scope.row.id
        this.verificateStatus = i
      },
      //状态弹出框
      confirmPass(){
        let _this = this
        this.form.token = paramm.getToken()
        this.form.id = _this.confirmId
        this.form.status = _this.confirmStatus
        if(_this.form.remark.length > 120){
          this.$message({
            message:'内容不能超过120字',
            type:'warning'
          })
          return 
        }
        collectstatus(this.form).then((res) => {
          if(res.data.error != 0 || res.data.err) {
           paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this);
            _this.onSubmit()
            _this.dialogVisible = false
            _this.form.remark = ''
          }
        })
      },
      confirmCancel(){
        this.dialogVisible = false
        this.form.remark = ''
      },
      //核销弹窗框
      verificatePass(){
        let _this = this
        this.form1.token = paramm.getToken()
        this.form1.id = _this.verificateId
        this.form1.status = _this.verificateStatus
        if(_this.form1.remark.length > 120){
          this.$message({
            message:'内容不能超过120字',
            type:'warning'
          })
          return 
        }
        collectstatus(this.form1).then((res) => {
          if(res.data.error != 0 || res.data.err) {
           paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this);
            _this.onSubmit()
            _this.dialogVerification = false
            _this.form1.remark = ''
          }
        })
      },
      verificateCancel(){
        this.dialogVerification = false
        this.form1.remark = ''
      },
      //		状态编辑
      updatastatus(scope, i) {
        let _this = this;
        let para = {
          token: paramm.getToken(),
          id: scope.row.id,
          status: i,
          remark:'',
        }
        collectstatus(para).then((res) => {
          if(res.data.error != 0 || res.data.err) {
           paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this);
            _this.onSubmit()
          }

        })
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      }
    },
    //自定义指令
    directives:{
      display(el,binding) {
        for(let i=0;i<el.children.length;i++){
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  header {
    background: white;
    padding: 20px 40px;
    text-align: left;
    margin-bottom: 20px;
  }

  .container {
    padding: 0 40px;
  }

  .el-form {
    text-align: left;
  }

  .el-table td .cell {
    font-size: 12px;
  }
  .el-dropdown-menu {
    width:100px;
  }
  .el-dropdown-menu li {
    font-size: 12px;
    color:#3ec3c8;
    width:100px;
    text-align:center;
  }

  .pages {
    padding: 10px 40px;
    background: #fff;
    text-align: right;
  }

  a {
    color: #fff;
  }
  .hasid {
    display: none;
  }
  #downloadd{
    display: inline-block;
  }
  
</style>
