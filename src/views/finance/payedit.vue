<template>
  <el-row>
    <el-breadcrumb separator="/" style="font-size:18px">
      <el-breadcrumb-item><span @click="handleHide">付款管理</span></el-breadcrumb-item>
      <el-breadcrumb-item>付款登记</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="bg-white margin30 padding30">
      <el-form :model="collectForm" ref="collectForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="创建日期">
          <el-col :span="11" prop="createtime">
            {{createtime}}
          </el-col>
        </el-form-item>
        <el-form-item label="业务类型" prop="businesstype">
          <el-select v-model="collectForm.businesstype" placeholder="选择" @change="changemenu()">
            <el-option label="预付款" value="1"></el-option>
            <el-option label="订单预付款" value="2"></el-option>
            <el-option label="成本单付款" value="3"></el-option>
            <el-option label="预收款退款" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单编号" required prop="orderno" v-show="isshowall">
          <el-col :span="10">
            <el-input @blur="typethis" v-model="collectForm.orderno" @change='getOrder'></el-input>
          </el-col>
        </el-form-item>
                     <!--
                         订单编号代表的订单未确认，就不能付款
                         根据订单编号拿到状态，然后提交的时候给出提示
                      -->
        <el-form-item label="团号" prop="teamno" v-show="isshowall" >
          <el-col :span="10">
            <el-input v-model="collectForm.teamno" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="线路名称" prop="linename" v-show="isshowall">
          <el-col :span="10">
            <el-input v-model="collectForm.linename" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收款单位" required prop="companyname">
          <el-col :span="10">
            <el-input v-model="collectForm.companyname" placeholder="请输入收款单位" :disabled = 'collectForm.businesstype == 2 || collectForm.businesstype == 3'></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-col :span="10">
            <el-input type="textarea" v-model="collectForm.remark" placeholder="请输入内容（120字以内）"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="付款明细" prop="detail">
          <el-col :span="24">
            <table border="" cellspacing="" cellpadding="" class="collecttable" width="90%">
              <tr>
                <th>付款方式</th>
                <th>付款账号</th>
                <th>到账日期</th>
                <th>金额</th>
                <th>操作</th>
              </tr>
              <tr v-for="(domain,index) in collectForm.detail">
                <td>
                  <el-col :span="20">
                    <el-select placeholder="付款方式" v-model="domain.type">
                      <el-option  v-for="bus in types" :key="bus.id" :label="bus.label" :value="bus.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </td>
                <td>
                  <el-col :span="20" v-if='domain.type!=1 && domain.type!=7'>
                    <el-select placeholder="付款账号" v-model="domain.accountid" id="bankvalue" >
                      <el-option v-for="item in banklist" :key="item.bankNameAccount" :label="item.bankNameAccount" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="20" v-if='domain.type==1 || domain.type==7'>
                    ---
                  </el-col>
                </td>
                <td>
                  <el-col :span="20">
                    <el-date-picker v-model="domain.linetime" type="date"  placeholder="选择日期" :picker-options="pickerOptions0">
                    </el-date-picker>
                  </el-col>
                </td>
                <td>
                  <el-col :span="20">
                    <el-input v-model="domain.fee" placeholder="金额" @input='addMoney'></el-input>
                  </el-col>
                </td>
                <td>
                  <el-col :span="20">
                    <el-button type="text" @click="addDomain">新增</el-button>
                    <el-button type="text" class="delete" @click.prevent="removeDomain(domain)">删除</el-button>

                  </el-col>

                </td>
              </tr>

            </table>
            <table width="90%" style="border:1px solid #ccc;margin-top:10px">
              <tr>
                <td style="text-align:right">金额合计:￥{{totalfee}}元</td>
              </tr>
            </table>
          </el-col>
        </el-form-item>
        <ImgUpload @imagelistchange="imagelistchange"></ImgUpload>
        <el-form-item>
          <el-button type="primary" @click="submitForm('collectForm')">保 存</el-button>
          <el-button @click="handleHide">取消</el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-row>
</template>
<script>
  import paramm from '../../common/js/getParam'
  import axios from 'axios';
  import util from '../../common/js/util'
  import { paysave, banlist, orderlist } from '../../common/js/config';
  import ImgUpload from './upload'
  import {showorhide} from '../../common/js/showorhid'
  export default {
    components:{
      ImgUpload,
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if(value === '') {
          this.isshow = false
          callback(new Error('请输入订单编号'));
        } else {
          if(this.collectForm.orderno !== '') {
            this.isshow = true
          }
          callback();
        }
      };
      return {
        createtime:'',
        item: [],
        banklist: [],
        isshow: false,
        isshowall: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        collectForm: {
          token:paramm.getToken(),
          businesstype: '',
          orderno: '',
          teamno: '',
          lineid:'',
          linename:'',
          companyname:'',
          remark: '',
          attach:'',
          detail: [{
            type:'',
            accountid: '',
            linetime: '',
            fee: '',
          }],
        },
        rules: {
          businesstype: [{
            required: true,
            message: '请选择业务类型',
            trigger: 'change'
          }],
//          orderno: [{
//            required: true,
//            message: '请输入订单编号',
//            trigger: 'blur'
//          }],
//          companyname: [{
//            required: true,
//            message: '请输入付款单位',
//            trigger: 'blur'
//          }]
        },
        accounts: [],
        types: [{ //1现金，2对公汇款，3刷卡，4支付宝，5微信，6网银，7其他
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
        today: '',
        totalfee:0
      }
    },
    created() {
      let _this =this;
      let mydate = new Date()
      console.log(66,  (mydate.getMonth() + 1).toString().length)
      let M = (mydate.getMonth() + 1).toString().length == 1? '0'+(mydate.getMonth() + 1) : (mydate.getMonth() + 1)
      let D = (mydate.getDate()).toString().length == 1? '0'+(mydate.getDate()) : (mydate.getDate())
      this.today = mydate.getFullYear() + "-" + M + "-" + D
      this.createtime = this.today
      this.checkbanklist()
      this.collectForm.detail.forEach(function (item) {
        item.linetime = _this.today
      })

    },
    methods: {
      addMoney(){
        let _this = this;
        _this.totalfee = 0;
        this.collectForm.detail.forEach(function (item) {
          console.log(111, parseFloat(item.fee));
          if(item.fee) _this.totalfee += parseFloat(item.fee)
        })
        console.log(3333, this.collectForm.detail);
      },
      handleHide: function() {
        this.$emit('setMode', 'collectlist');
      },
      submitForm(formName) {
        let _this = this;
        if(this.collectForm.businesstype == '') {
          this.$message({
            message: '请选择业务类型',
            type: 'warning'
          });
          return
        }
        if(this.collectForm.businesstype != '2' && this.collectForm.businesstype != '3' && this.collectForm.companyname == '') {
          this.$message({
            message: '请填写收款单位',
            type: 'warning'
          });
          return
        }
        if((this.collectForm.businesstype == '2' || this.collectForm.businesstype == '3') && this.collectForm.orderno == '') {
          this.$message({
            message: '请填写订单编号',
            type: 'warning'
          });
          return
        }
        if((this.collectForm.businesstype == '2' || this.collectForm.businesstype == '3') && this.collectForm.companyname == '') {
          this.$message({
            message: '您填写的订单号有误',
            type: 'warning'
          });
          return
        }
        try {
          this.collectForm.detail.forEach(function (item,idx) {
            if(item.type == '') {
              _this.$message({
                message: '请选择收款方式',
                type: 'warning'
              });
              throw false
            }
            if(item.fee == '') {
              _this.$message({
                message: '请填写金额',
                type: 'warning'
              });
              throw false
            }
            if(isNaN(item.fee) || parseFloat(item.fee) < 0) {
              _this.$message({
                message: '请填写合法金额',
                type: 'warning'
              });
              throw false
            }
            if(item.fee.length > 10) {
              _this.$message({
                message: '金额最大不超多10位',
                type: 'warning'
              });
              throw false
            }
            if(item.type != '1' && item.type != '7') {
              if(item.accountid == ''){
                _this.$message({
                  message: '请选择收款账号',
                  type: 'warning'
                });
                throw false
              }
            }
          })
        }catch (e){
          throw e
        }

        this.$refs[formName].validate((valid) => {
          if(valid) {
            let para = this.collectForm
            console.log(1111, this.collectForm)
            for(let i =0;i<this.collectForm.detail.length;i++){
              para.detail[i].linetime = (!para.detail[i].linetime || para.detail[i].linetime == '') ? '' : util.formatDate.format(new Date(para.detail[i].linetime), 'yyyy-MM-dd');
            }
            //对付款单位和备注进行字数
            if(this.collectForm.companyname.length > 50 ){
              this.$message({
                message:'收款单位名称在50字以内',
                type:'warning'
              })
              return false
            }
            if(this.collectForm.remark.length > 120) {
              this.$message({
                message:'备注在120字以内',
                type:'warning'
              })
              return false
            }
            paysave(para).then((res) => {
              if(res.data.error!=0 || res.data.err){
                paramm.getCode(res.data, _this)
              }
              else {
                paramm.getCode(res.data, _this)
                this.handleHide()
                _this.$emit('getL', 'onSubmit')
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      typethis() {
        //输完订单编号，应该获取团号和线路名称  并且展示
        if(this.collectForm.orderno == "") {
          //this.rules.push("orderno: [{required: false,validator: validatePass,trigger: 'blur'}]")

        } else {
          //输入了订单编号  要获取那一行的数据
          this.isshow = true
        }
        //				this.$refs.collectForm.validateField('orderno');
      },
      resetForm(formName) {
//        this.$refs[formName].resetFields();
        this.$emit('toparent', 'collectlist')
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      addDomain() {
        let _this = this;
        let list ={
          type:'',
          accountid: '',
          linetime: _this.today,
          fee: '',
        }
        this.collectForm.detail.push(list);
      },
      removeDomain(item) {
        var index = this.collectForm.detail.indexOf(item)
        if(index !== -1 && index !== 0) {
          this.collectForm.detail.splice(index, 1)
        }
      },
      imagelistchange (val) {
        this.collectForm.attach = val;

        console.log(this.collectForm.attach)
      },
      changemenu() {
        let changetype = this.collectForm.businesstype
        if(changetype == 1 || changetype == 4) {
          this.collectForm.orderno = ''
          this.collectForm.teamno = ''
          this.collectForm.linename = ''
          this.collectForm.companyname = ''
          //预收款、预付款退款
          this.isshowall = false
          this.typethis()
        }
        if(changetype == 2 || changetype == 3) {
          //订单收款
          this.isshowall = true

        }
      },
      checkbanklist() {
        let para = {
          token:paramm.getToken()
        }
        banlist(para).then((res) => {
          console.log(res.data)
          this.banklist = res.data.obj
        })
      },
      getOrder(){
        console.log(555);
        let _this = this;
        if(this.collectForm.orderno.trim().length == 20){
          orderlist({
            creater: "",
            date: "",
            hide: false,
            linename: "",
            orderno: this.collectForm.orderno.trim(),
            pageindex: 0,
            pagesize: 10,
            source: "",
            status: "",
            token: paramm.getToken()
          }).then((res)=>{
            if(res.data.error || res.data.err){
              paramm.getCode(res.data,_this)
            }else {
              //没查到订单
              if(res.data.obj.datas.length==0){
                _this.$message({
                  message: '你输入的订单有误',
                  type: 'warning'
                });
              }else {
                _this.collectForm.teamno = res.data.obj.datas[0].teamno;
                _this.collectForm.linename = res.data.obj.datas[0].linename;
                _this.collectForm.lineid = res.data.obj.datas[0].lineid;
                if(res.data.obj.datas[0].companyname) {
                  _this.collectForm.companyname = res.data.obj.datas[0].companyname
                }else {
                  _this.collectForm.companyname = res.data.obj.datas[0].contact
                }
              }
            }
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .bg-white {
    background: white;
  }

  .padding30 {
    padding: 20px;
  }

  .margin30 {
    margin: 30px;
  }

  .el-form-item {
    text-align: left;
  }

  .el-breadcrumb {
    padding: 20px 40px;
    background: white;
  }

  .collecttable {
    border: 1px solid #dee5ec;
    border-radius: 5px;
    th {
      height: 38px;
      background: #f5f7f9;
      border-bottom: 1px solid #bfcbda;
      padding: 0 20px;
    }
    td {
      padding: 10px 20px;
      border-bottom: 1px solid #dee5ec;
    }
  }
  .delete {
    margin-left:0
  }
</style>
