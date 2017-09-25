<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleHide()">发团列表</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{{'add':'新增发团计划','edit':'编辑','detail':'详情'}[operationType.type]}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

      </el-row>
    </header>
    <section class="padding30">
      <el-row class="bg_white">
        <el-col :span="20" style="width: 100%">
          <el-form :model="groupList"  ref="groupList"   :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;"><!-- visitorList  -->
            <div style="width:100%;float: left;overflow:hidden">
              <el-form-item label="选择线路：" required>
                <el-button @click="getcategoryall()">选择</el-button>
                <span class='routeName' style='padding-left: 10px;' v-text='routeName'>222</span>
              </el-form-item>
              <el-form-item label="取消政策：" >
                订单确认后 &nbsp;&nbsp;&nbsp;
                <el-input v-model="cancell"  style='width: 8%;'> </el-input>
                小时内未完成订单金额收款，则订单取消，释放对应库存。不填则永久不取消。
              </el-form-item>
              <el-form-item label="集合通知：" prop="notify">
                <el-col :span="4" style="width: 100%;margin-right: 10px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    placeholder="限120字以内!"
                    v-model="groupList.notify">
                  </el-input>
                </el-col>
              </el-form-item>

              <div style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">
                发团时间</div>

              <el-form-item label="发团时间：" prop="date">
                <el-col :span="4" style="width: 100%;margin-right: 10px">
                  <el-date-picker
                    :clearable = false
                    :editable = false
                    @change='addTr'
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                  <!--<el-date-picker-->
                  <!--v-model="value1"-->
                  <!--type="datecustom"-->
                  <!--placeholder="选择日期"-->
                  <!--:picker-options="pickerOptions0">-->
                  <!--</el-date-picker>-->

                </el-col>
              </el-form-item>

              <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                   style="width: 100%;">
                <div class="el-table__body-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style=" width: 100%;text-align: center">
                    <thead>
                    <tr style="text-align: center">
                      <th colspan="1" rowspan="1" class="is-leaf" >
                        <div class="cell">序号</div>
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf"   >
                        <div class="cell">操作</div>
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf" width="100">
                        <div class="cell">发团日期</div>
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf">
                        <div class="cell">计划人数</div>
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf">
                        <div class="cell">是否收客</div>
                      </th>
                      <th colspan="2" rowspan="1" class="is-leaf" style="text-align: center">
                        确认方式
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf">
                        <div class="cell">报名截止</div>
                      </th>
                      <th colspan="4" rowspan="1" class="is-leaf"  style="text-align: center" >
                        <div class="cell">市场价/元</div>
                      </th>
                      <th colspan="4" rowspan="1" class="is-leaf"  style="text-align: center"  >
                        <div class="cell">结算价/元</div>
                      </th>
                      <th colspan="4" rowspan="1" class="is-leaf"  style="text-align: center"  >
                        <div class="cell">成本价/元</div>
                      </th>
                      <th class="gutter" style="width: 0px;"></th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr class="el-table__row">
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td>
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >自动确认</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >手动确认</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >天</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >婴儿</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >儿童</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >成人</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >单房差</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >婴儿</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >儿童</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >成人</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >单房差</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >婴儿</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >儿童</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >成人</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >单房差</div>
                      </td>
                    </tr>

                    <tr class="el-table__row">
                      <td class="el-table_1_column_123 el-table-column--selection">
                        <el-checkbox v-model="allChecked" @change='allCheck' v-if="operationType.type == 'add'">全选</el-checkbox>
                        <div class="cell el-tooltip" v-if="operationType.type == 'edit'">---</div>
                      </td>
                      <td >
                        <!--<div class="cell">删除</div>-->
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td>
                        <div class="cell el-tooltip" ><el-input v-model="allplan" @change='allPlan'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-checkbox v-model="allisorder" @change='allIsorder'></el-checkbox></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="allconfirm" label='0' >自动</el-radio></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="allconfirm" label='1' >手动</el-radio></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="alldeadline" @change='allDeadline'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktbaby" @change='allMktbaby'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktchild" @change='allMktchild'></el-input></div>
                      </td>

                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktaduilt" @change='allMktaduilt'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktroom" @change='allMktroom'></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltbaby" @change='allSltbaby'></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltchild" @change='allSltchild'></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltaduilt" @change='allSltaduilt'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allsltroom" @change='allSltroom'></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allcostbaby" @change='allCostbaby'></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allcostchild" @change='allCostchild'></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allcostaduilt" @change='allCostaduilt'></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allcostroom" @change='allCostroom'></el-input></div>
                      </td>
                    </tr>
                    <tr class="el-table__row" v-for='(item,idx) in checkArr' v-if='checkArr.length>0'>
                      <td class="el-table_1_column_123 el-table-column--selection">
                        <!--{{item.checked}}-->
                        <el-checkbox v-model="item.checked" @change='sigCheck'></el-checkbox>
                      </td>
                      <td  >
                        <div class="cell" style='cursor: pointer;' @click='sigDel(item,idx)'>删除</div>
                      </td>
                      <td width='800'>
                        {{item.starttime || '---'}}
                      </td>
                      <td>
                        <div class="cell" >
                          <el-input v-model="item.plan"></el-input>
                          <span v-if="operationType.type == 'edit'" style='color: green;'>已收：{{item.book + item.sit}}</span>

                        </div>
                      </td>
                      <td >
                        <!--{{item.isorder}}-->
                        <div class="cell el-tooltip" ><el-checkbox v-model="item.isorder"></el-checkbox></div>
                      </td>
                      <td >
                        <!--{{item.confirm}}-->
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="item.confirm" label='0'>自动</el-radio></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="item.confirm" label='1'>手动</el-radio></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.deadline"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktbaby"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktaduilt"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktroom"></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltbaby"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltroom"></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.costbaby"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.costchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.costaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.costroom"></el-input></div>
                      </td>
                    </tr>
                    <!----></tbody>
                  </table><!----></div><!----><!----><!----><!---->
                <div class="el-table__column-resize-proxy" style="display: none;"></div>
                <div class="resize-triggers">
                  <div class="expand-trigger">
                    <div style="width: 761px; height: 321px;"></div>
                  </div>
                  <div class="contract-trigger"></div>
                </div>
              </div>
              <div style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">
                同步到对接平台：</div>
              <div style="overflow: hidden;padding-left: 60px;">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox :label="idx" :key="item.name" style="margin-right: 40px;" v-for='(item,idx) in pingtai'>{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <el-form-item label-width="200px" style="margin-top: 50px">
                <!--<el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">保存</el-button>-->
                <el-button type="primary" @click="save" style="width: 120px" v-if="operationType.type !='detail' ">保存</el-button>
                <el-button @click="handleHide()" style="width: 120px">{{operationType.type == 'detail'? '返回': '取消'}}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </section>

    <!--弹出框-->
    <el-dialog title="选择线路" :visible.sync="lineFlag" size="" >
      <el-form :inline="true"  :model="search" class="demo-form-inline" ref="search" >
        <el-form-item label="线路分类">
          <el-select v-model="search.categoryid" placeholder="请选择" :label-width="labelWidth">
            <el-option v-for="(linesort,index) in linesorts" :key="linesort.value" :label="linesort.name" :value="linesort.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线路名称">
          <el-input v-model="search.linename"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryLine()">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="checkItem" style='text-align: left;padding: 0 50px;' v-if='lineList.length>0'>  <!--  v-if='lineList.length>0'  -->
            <el-radio style='width: 50%;margin: 0;' :label="item" :key="item.name" v-for="item in lineList">{{item.name.length>20?item.name.substring(0,20)+'...':item.name}}</el-radio>
          </el-radio-group>
          <div v-if='showNoLine && lineList.length == 0'>
            该分类下没有线路,请前往线路列表中添加!
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lineFlag = false">取 消</el-button>
        <el-button type="primary" @click="checkRot()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {address} from '../../../common/js/address'
  import axios from 'axios';
  import {token,custsave,custupdate,custdetail, province, city, district, categoryall, destlist, linelist,groupsave,openlist,groupupdate,groupdetail,groupDel} from '../../../common/js/config';
  import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component";
  import paramm from '../../../common/js/getParam'
  export default {
    props: ['operationType','categoryId'],
    components: {ElDialog},
    data() {
      //验证手机号码
      var checkmobile = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
          if(!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            let mobilereg = /^[0-9]{11}$/;
            if(mobilereg.test(value)) {
              callback();
            } else {
              callback(new Error('请输入正确的手机号码'));
            }
          }
        }, 1000);
      };
      return {
        labelWidth: '800px',
        radio: '1',
        lineFlag: false,
        notice: '',
        lineItemId: '',
        search: {
          status: 1,
          token:paramm.getToken(),
          pageindex:0,
          pagesize: 9999,
          categoryid:'', //分类id
          linename:''//线路名称
        },
        destinations: [],
        groupList: {
          token: paramm.getToken(),
          lineid: '',
          sexid:'1',
          mobile:'',
          certtype:2,
          certno: '',
          qq: '',
          weixin: '',
          type: 1,
          provinceid: '',
          cityid: '',
          districtid: '',
          tourtype: '',
          birthday:'',
          notify:''
        },
        address:{
          provinceList:[],
          cityList:[],
          districtList:[],
        },
        linesorts: [],
        linelist: [], //线路列表
        lineList: [], //线路列表
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          sexid: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          mobile: [{
            validator: checkmobile,
            trigger: 'blur',
            required: true,
          }],
          certno:[
            { required: false,  min: 7, max: 18, message: '请输入正确的格式', trigger: 'blur' }
          ],
          notify: [
//            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 120, message: '不能超过120字!', trigger: 'blur' }
            ]

        },
        province: [],
        city: [],
        district: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
        checkList: [],
        input: '',
        radio: '',
        checked: '',
        allChecked: '',
        allplan: '',
        plan: '',
        allisorder: true,
        isorder: true,
        allconfirm: '0',
        confirm: '0',
        alldeadline: '',
        deadline: '',
        allmktbaby: '',
        mktbaby: '',
        allmktchild: '',
        mktchild: '',
        allmktaduilt: '',
        mktaduilt: '',
        allmktroom: '',
        mktroom: '',

        allsltbaby: '',
        sltbaby: '',
        allsltchild: '',
        sltchild: '',
        allsltaduilt: '',
        sltaduilt: '',
        allsltroom: '',
        sltroom: '',

        allcostbaby: '',
        costbaby: '',
        allcostchild: '',
        costchild: '',
        allcostaduilt: '',
        costaduilt: '',
        allcostroom: '',
        costroom: '',
        checkArr: [
//          {checked: '',time: ''}
        ],
        notify: '',
        cancell: '',
        cancellId: '',
        routeName: '',
        checkItem: '',
        temTime: '',
        startTimeArr: [],
        idx: '',
        pingtai: [],
        idd: '',
        getTimeArr: [],
        dayss: '',
        surpluss: '',
        TemStArr: [],
        platformId: [],
        showNoLine: false
    }
    },

    watch : {
      // 自动 手动
      allconfirm (newValue, oldValue) {
        if(newValue == 0) {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.confirm = '0'
          })
        }
        if(newValue == 1) {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.confirm = '1'
          })
        }
      }
    },

    methods: {
      // 编辑  详情时获取信息
      getdetail () {
        let _this = this;
        groupdetail({token: paramm.getToken(),id: this.categoryId}).then(function (res) {
          _this.routeName = res.data.obj.linename
          _this.idd = res.data.obj.id
          _this.lineid = res.data.obj.lineid
          _this.groupList.notify = res.data.obj.notify
          _this.cancell = res.data.obj.rules[0].releasetime/60
          _this.cancellId = res.data.obj.rules[0].id
          let _thiss = _this
          res.data.obj.platforms.forEach(function (item) {
            if(item.isenable)  _thiss.checkList.push(item.platform - 1)
            _this.platformId.push(item.id)
          })
          _this.checkArr = res.data.obj.details.slice(0)
          _this.checkArr.forEach(function (item,idx) {
            item.confirm = item.confirm.toString();
//            item.checked = item.isenable;
          })
          res.data.obj.details.forEach(function (item,idx) {
            _this.surpluss = item.surplus;
            _this.dayss = item.deadline;
            _this.getTimeArr.push(item.endtime);
          })
        })
      },
      getPingtai () {
        let _this = this;
        openlist({token: paramm.getToken()}).then(function (res) {
          // 平台列表
          _this.pingtai = res.data.obj
        })
      },
      allMktaduilt () {
        this.changeParam('mktaduilt', 'allmktaduilt')
      },
      allMktroom () {
        this.changeParam('mktroom', 'allmktroom')
      },
      allSltbaby () {
        this.changeParam('sltbaby', 'allsltbaby')
      },
      allSltchild () {
        this.changeParam('sltchild', 'allsltchild')
      },
      allSltaduilt () {
        this.changeParam('sltaduilt', 'allsltaduilt')
      },
      allSltroom () {
        this.changeParam('sltroom', 'allsltroom')
      },

      allCostbaby () {
        this.changeParam('costbaby', 'allcostbaby')
      },
      allCostchild () {
        this.changeParam('costchild', 'allcostchild')
      },
      allCostaduilt () {
        this.changeParam('costaduilt', 'allcostaduilt')
      },
      allCostroom () {
        this.changeParam('costroom', 'allcostroom')
      },
      // 儿童
      allMktchild () {
        this.changeParam('mktchild', 'allmktchild')
      },
      // 婴儿
      allMktbaby () {
        this.changeParam('mktbaby', 'allmktbaby')
      },
      // 报名截止
      allDeadline () {
        this.changeParam('deadline', 'alldeadline')
      },
      // 是否接客
      allIsorder (event){
        if(event.target.checked){
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.isorder = true
          })
        }else {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.isorder = false
          })
        }
      },
      // 计划人数
      allPlan () {
        this.changeParam('plan', 'allplan')
      },
      // 封装输入框全写
      changeParam (param, allParam) {
        let _this = this;
        this.checkArr.forEach(function (item) {
          if(item.checked) item[param] = _this[allParam]
        })
      },
      // 全选单选删除
      sigDel (item,idx) {
        let _this = this;
        if(item.id){
          groupDel({token:paramm.getToken(),id:item.id}).then((res)=>{
            if(res.data.error || res.data.err) {
              paramm.getCode(res.data,_this)
            }else {
              paramm.getCode(res.data,_this)
              _this.checkArr.splice(idx, 1)
              _this.startTimeArr.splice(idx, 1)
              _this.TemStArr = []
            }
          })
        }else {
          _this.checkArr.splice(idx, 1)
          _this.startTimeArr.splice(idx, 1)
          _this.TemStArr = []
        }

      },
      sigCheck () {
        let isAll = this.checkArr.every(function (item) {
          return (item.checked == true);
        })
        isAll == true ? this.allChecked = true : this.allChecked = false
      },
      allCheck (event) {
        if(this.allChecked){
          this.checkArr.forEach(function (item, index) {
            item.checked = true
          })

        }else {
          this.checkArr.forEach(function (item, index) {
            item.checked = false
          })
        }
      },
      // 选择日期添加一行
      addTr () {
        let _this = this;
        // 开始时间
        this.startTimeArr.push(this.value1);
        var M = (this.value1.getMonth()+1).toString().length==1 ? '0'+ (this.value1.getMonth()+1).toString() : (this.value1.getMonth()+1).toString();
        var D = this.value1.getDate().toString().length==1 ? '0'+ this.value1.getDate().toString() : this.value1.getDate().toString();
        var selectTime = this.value1.getFullYear().toString() +"-" + M+ "-" + D;
        // 添加一行之前做校验 不能添加相同团期的
        try{
          if(this.checkArr.length){
            this.checkArr.forEach(function (item) {
              if(item.starttime == selectTime) {
                _this.$message({
                  message: '该团期已添加,请添加其他团期',
                  type: 'warning'
                })
                throw false
              }
            })
          }
        }catch (e){
          throw e
        }

        this.checkArr.push(
          {checked: '',
            starttime: selectTime,
            plan: '',
            isorder: true,
            confirm: '0',
            deadline:'',
            mktbaby: '',
            mktchild:'',
            mktaduilt: '',
            mktroom: '',
            sltbaby: '',
            sltchild: '',
            sltaduilt: '',
            sltroom: '',
            costbaby: '',
            costchild: '',
            costaduilt: '',
            costroom: '',
            book: 0,
            sit: 0,
            isenable: true
          })
      },
      //获取线路列表
      queryLine(){
        let _this = this;
        setTimeout(function () {
          _this.showNoLine = true
        },500)
        linelist(this.search).then((res) => {
          if(!res.err){
            if(!res.error){
              this.lineList = res.data.obj.datas;
            }
          }
        })
      },
      //求截止日期
      getDateEnd (vall, dayy,isPlus) {
//        var now=new Date();
//        var time=now.getTime();
        var time = vall.getTime();
         if (isPlus) {
           time+=1000*60*60*24*dayy;//加上3天
         }else {
           time-=1000*60*60*24*dayy;//减上3天
         }
        vall.setTime(time);
        var M = (vall.getMonth()+1).toString().length == 1 ? '0' + (vall.getMonth()+1).toString(): (vall.getMonth()+1).toString()
        var D = vall.getDate().toString().length == 1 ? '0' + vall.getDate().toString(): vall.getDate().toString()
        return vall.getFullYear()+"-"+M+"-"+D;
      },
      // 弹出框确定
      checkRot () {
        this.lineFlag = false;
        this.routeName = this.checkItem.name;
        this.lineid = this.checkItem.id;
      },
      getcategoryall(){
        this.lineFlag = true;
        let para= {token:paramm.getToken()}
        categoryall(para).then(res =>{
          this.linesorts = res.data.obj
        })
      },
      isTrue (sTime,itemm,msg) {
        if(isNaN(itemm) || parseFloat(itemm)<0 || parseInt(itemm)!=itemm) {
          this.$message({
            message: sTime+'日'+msg+'为大于或等于0的整数',
            type: 'warning'
          })
          return true
        }
      },
      // 点击保存 取消
      save () {
        let _this = this;
        // 线路
        if(!this.lineid) {
          this.$message({
            message: '请选择线路',
            type: 'warning'
          });
          return;
        }
        // 取消政策
        if(this.cancell) {
          if(isNaN(this.cancell) || parseFloat(this.cancell)<0){
            _this.$message({
              message: '取消政策时间为大于等于0的数字',
              type: 'warning'
            });
            return;
          }
        }
        // 集合通知
        if(this.groupList.notify.toString().length >120) {
          this.$message({
            message: '集合通知不能超过120字',
            type: 'warning'
          });
          return;
        }
        if (this.checkArr.length == 0) {
          this.$message({
            message: '请添加发团信息',
            type: 'warning'
          });
          return;
        }
       try{
         this.checkArr.forEach(function (item,idx) {
           item.surplus = _this.surpluss;

           if(isNaN(item.plan) || parseFloat(item.plan)<=0 || parseInt(item.plan)!=item.plan) {
             _this.$message({
               message: item.starttime+'日计划人数为大于或等于1的整数',
               type: 'warning'
             })
             throw false
           }
           if(_this.isTrue(item.starttime,item.deadline,'截止天数') ||
             _this.isTrue(item.starttime,item.mktbaby,'婴儿市场价') || _this.isTrue(item.starttime,item.mktchild,'儿童市场价') || _this.isTrue(item.starttime,item.mktaduilt,'成人市场价') || _this.isTrue(item.starttime,item.mktroom,'市场价单房差') ||
             _this.isTrue(item.starttime,item.sltbaby,'婴儿结算价') || _this.isTrue(item.starttime,item.sltchild,'儿童结算价') || _this.isTrue(item.starttime,item.sltaduilt,'成人结算价') || _this.isTrue(item.starttime,item.sltroom,'结算价单房差') ||
             _this.isTrue(item.starttime,item.costbaby,'婴儿成本价') || _this.isTrue(item.starttime,item.costchild,'儿童成本价') || _this.isTrue(item.starttime,item.costaduilt,'成人成本价') || _this.isTrue(item.starttime,item.costroom,'成本价单房差')
           ) throw false

           _this. allChecked = false
           delete item.checked
         })
       }catch (e){
          throw e
       }
        // 合作平台

        // todo 1.1
        let platforms = [];
//        var checkListNew = []
//        this.checkList.forEach(function (item) {
//          checkListNew.push(item+1)
//        })
//        this.pingtai.forEach(function (item,idx) {
//          if (checkListNew.indexOf(item.platform) != -1) {
//            platforms.push({platform: item.platform, isenable: true,id: _this.platformId[idx]});
//          }else {
//            platforms.push({platform: item.platform, isenable: false,id: _this.platformId[idx]});
//          }
//        })
        // todo 1.2
        this.pingtai.forEach(function (item,idx) {
          platforms.push({platform: item.platform, isenable: false,id: _this.platformId[idx]})
        })
        // 结束时间
        if(_this.operationType.type == 'add'){
          _this.startTimeArr.forEach(function (item) {
            _this.TemStArr.push(_this.getDateEnd(item, _this.checkItem.days,true))
          })
        }
        if(_this.operationType.type == 'edit'){
          _this.startTimeArr.forEach(function (item) {
            _this.TemStArr.push(_this.getDateEnd(item, _this.dayss,true))
          })
          _this.TemStArr = this.getTimeArr.concat(_this.TemStArr)
        }
        this.checkArr.forEach(function (item,idx) {
          item.endtime = _this.TemStArr[idx] || ''
        })
        // 1 创建
        if(_this.operationType.type == 'add'){
          groupsave({
            token: paramm.getToken(),
            lineid: _this.lineid,
            notify: _this.groupList.notify || '',
            rules: [{releasetime:_this.cancell*60,type:1}] || [],
            platforms: platforms,
            details: _this.checkArr
          }).then(res =>{
            if(res.data.error || res.data.err) {
              paramm.getCode(res.data, _this)
              //减去之前加上的时间
              _this.startTimeArr.forEach(function (item) {
                _this.TemStArr.push(_this.getDateEnd(item, _this.checkItem.days,false))
              })
              _this.TemStArr = []
              return
            }
            if(!res.data.error) {
              paramm.getCode(res.data, _this)
              _this.$emit('setMode', 'list');
            }
          })
        }
        // 2 编辑
        if(_this.operationType.type == 'edit'){
          _this.checkArr.forEach(function (item) {
            delete item.linename;
            delete item.creater;
            delete item.status;
            delete item.teamid;
            delete item.teamno;
            delete item.surplus;
          })
          groupupdate({
            token: paramm.getToken(),
            lineid: _this.lineid,
            notify: _this.groupList.notify || '',
            rules: [{releasetime:_this.cancell*60,type:1,id:_this.cancellId}] || [],
            platforms: platforms,
            details: _this.checkArr,
            id: _this.idd
          }).then(res =>{
            if(res.data.error || res.data.err) {
              this.$message({
                message: res.data.message || '失败',
                type: 'error'
              });
              //减去之前加上的时间
              _this.startTimeArr.forEach(function (item) {
                _this.TemStArr.push(_this.getDateEnd(item, _this.dayss,false))
              })
              _this.TemStArr = _this.getTimeArr.concat(_this.TemStArr)
              _this.TemStArr = []
              return
            }
            if(!res.data.error) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
              _this.$emit('setMode', 'list');
            }
          })
        }

      },
      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
      }
    },
    beforeMount () {
      this.getPingtai();
      if(this.operationType.type == 'edit' || this.operationType.type == 'detail') this.getdetail();
    }

  }
</script>

<style scoped lang="scss">
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
  section{
    .el-col{
      li{
        float: left;
        padding: 0px 10px;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid transparent;
        &:hover,
        .checked {
          border: 1px solid #3ec3c8!important;
          color: #3ec3c8;
        }
      }
    }
    .demo-ruleForm{
      .el-form-item {
        .el-col-4 {
          width: 200px;
        }
      }
    }
  }

  .el-breadcrumb {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .padding30 {
    padding: 0 30px;
  }

  .bg_white {
    background: #fff;
    padding: 20px 35px;
  }
  table{
    font-size:12px;
  }
  .cell{
    padding: 0 5px;
  }
  .demo-form-inline{
    max-width: 800px;
  }
</style>
