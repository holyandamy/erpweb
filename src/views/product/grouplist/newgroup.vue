<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleHide()">发团列表</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{optionName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

      </el-row>
    </header>
    <section class="padding30">
      <el-row class="bg_white">
        <el-col :span="20" style="width: 100%">
          <el-form :model="groupList"  ref="visitorList"   :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;">
            <div style="width:100%;float: left;overflow:hidden">
            <el-form-item label="线路选择" prop="name">
              <el-select
                v-model="groupList.lineid"
                filterable
                allow-create>
                <el-option
                  v-for="item in linelist"
                  :key="item.lineid"
                  :label="item.linename"
                  :value="item.lineid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="集合通知：" prop="name">
              <el-col :span="4" style="width: 100%;margin-right: 10px">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="textarea3">
                </el-input>
              </el-col>
            </el-form-item>

             <div style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">
               发团时间</div>

              <el-form-item label="发团时间：" prop="name">
                <el-col :span="4" style="width: 100%;margin-right: 10px">
                  <el-date-picker
                    v-model="value1"
                    type="datecustom"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>

                </el-col>
              </el-form-item>

            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                 style="width: 100%;">
              <div class="el-table__body-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style=" width: 100%;text-align: center">
                  <thead>
                  <tr style="text-align: center">
                    <th colspan="1" rowspan="1" class="is-leaf"  >
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
                    <th class="gutter" style="width: 0px;"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_123 el-table-column--selection">
                      <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td  >
                      <div class="cell">删除</div>
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
                  </tr>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_123 el-table-column--selection">
                      <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td  >
                      <div class="cell">删除</div>
                    </td>
                    <td >
                      2017-12-02
                    </td>
                    <td>
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-checkbox v-model="checked"></el-checkbox></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-radio class="radio" v-model="radio" ></el-radio></div>
                    </td>
                    <td  >
                      <div class="cell el-tooltip" ><el-radio class="radio" v-model="radio" ></el-radio></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td  >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td  >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td  >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
                    </td>
                    <td >
                      <div class="cell el-tooltip" ><el-input v-model="input"></el-input></div>
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
              <div style="overflow: hidden">
              <el-form-item label="" prop="name" style="float: left">
                <el-checkbox v-model="checked">线路选择</el-checkbox>
              </el-form-item>
              <el-form-item label="" prop="name" style="float: left">
                <el-checkbox v-model="checked">线路选择</el-checkbox>
              </el-form-item>
              </div>
              <el-form-item label-width="200px" style="margin-top: 50px">
                <el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">保存</el-button>
                <el-button @click="handleHide()" style="width: 120px">取消</el-button>
              </el-form-item>
            </div>

          </el-form>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
  import {address} from '../../../common/js/address'
  import axios from 'axios';
  import {token,custsave,custupdate,custdetail, province, city, district } from '../../../common/js/config';
  export default {
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
        groupList: {
          token,
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
          birthday:''
        },
        address:{
          provinceList:[],
          cityList:[],
          districtList:[],
        },
        linelist: [{
          'lineid': '4545454',
          'linename': '阿娇的发生',
          'linesort': '国内长线',
          'departure': '上海',
          'destination': '北京',
          'day': '3',
          'establish': '张若昀',
          'status': '待审批'
        },
          {
            'lineid': '45454ss54',
            'linename': '阿ss娇的发生',
            'linesort': '国内长线',
            'departure': '上海',
            'destination': '北京',
            'day': '3',
            'establish': '张若昀',
            'status': '待审批'
          }], //线路列表
        optionName:'新增团计划',
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

        },
        province: [],
        city: [],
        district: []
      }
    },
    created(){
      this.getlinelist()
      this.getprovince()
      if( this.$parent.operationType.type=='edit') {
        this.optionName = "编辑游客";
        this.birthdayFlag=false;
        let data = {
          token,
          id: this.$parent.operationType.id,
        }
        custdetail(data).then((res) => {
          if (res.data.error) {
            this.$message.error(res.data.massage);
          }
          else {
            let tempEditList = {};
            tempEditList = res.data.obj;
            tempEditList.sexid=String(tempEditList.sexid);
            tempEditList.mobile=parseInt(tempEditList.mobile);
            this.visitorList=Object.assign({},tempEditList)

          }
        })
      }
    },
    methods: {

      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
      },
      //获取线路列表
      getlinelist(){/*
        let para = this.search
        linelist(para).then((res) => {
          console.log(para,res,"线路列表")
        })*/
      },
      submitForm() {
          let newDate = '';
          if (this.visitorList.birthday != '') {
            const mouth = {
              Jan: '01',
              Feb: '02',
              Mar: '03',
              Apr: '04',
              May: '05',
              Jun: '06',
              Jul: '07',
              Aug: '08',
              Sept: '09',
              Oct: '10',
              Nov: '11',
              Dec: '12'
            }
            let start = String(this.visitorList.birthday).split(' ');
            newDate = start[3] + '-' + mouth[start[1]] + '-' + start[2]
          }
          let newPostDate = Object.assign({}, this.visitorList)
          newPostDate.birthday = newDate;
          newPostDate.sexid = parseInt(newPostDate.sexid);
          newPostDate.mobile = String(newPostDate.mobile);
          this.$refs['visitorList'].validate((valid) => {
            if (valid) {
              if( this.$parent.operationType.type=='edit') {
                newPostDate.id=this.$parent.operationType.id;
                delete  newPostDate.birthday;
                custupdate(newPostDate).then((backData) => {
                  if (backData.error) {
                    this.$message.error(backData.massage);
                  }
                  else {
                    this.handleHide('list');
                  }
                })

              }
              else{
                custsave(newPostDate).then((backData) => {
                  if (backData.error) {
                    this.$message.error(backData.massage);
                  }
                  else {
                    this.handleHide('list');
                  }
                })

              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      //获取省级列表
      getprovince() {
        let count = "fb0828b148bc48afbab8ef03c55d153b"
        let para = {
          id: count,
          token: ''
        }
        province(para).then((res) => {
          this.province = res.data.obj

        }).catch(function (err) {
          console.log("连接错误")
        })
      },
      //获取市列表
      getcity(pro) {
        city(pro).then((res) => {
          this.city = res.data.obj

        }).catch(function (err) {
          console.log("连接错误")
        })
      },
      //获取区列表
      getdistrict(city) {
        district(city).then((res) => {
          this.district = res.data.obj

        }).catch(function (err) {
          console.log("连接错误")
        })
      },
      //选择城市
      changecity() {
        let pro = {
          id: this.visitorList.provinceid
        }
        this.getcity(pro)
        let city = {
          id: this.visitorList.cityid
        }
        this.getdistrict(city)
      }
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

    .demo-ruleForm{
      .el-form-item{
        .el-col-4{
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
</style>
