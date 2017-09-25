<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleHide()">游客管理</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{optionName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

      </el-row>
    </header>
    <section class="padding30">
      <el-row class="bg_white">
        <el-col :span="20">
          <el-form :model="visitorList"  ref="visitorList"   :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;">
            <div style="width:50%;float: left;overflow:hidden">
            <el-form-item label="游客姓名" prop="name">
              <el-col :span="4">
                <el-input v-model="visitorList.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="游客性别" prop="sexid">
              <el-radio-group v-model="visitorList.sexid">
                <el-radio label='1' >男</el-radio>
                <el-radio label='2'>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="游客手机" prop="mobile">
              <el-col :span="4">
                <el-input v-model.number="visitorList.mobile"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="证件类型" prop="certno" >
              <el-col :span="4" style="width: 100px;margin-right: 10px">
                <el-select v-model="visitorList.certtype" >
                  <el-option label="身份证" :value=1 ></el-option>
                  <el-option label="护照" :value=2></el-option>
                  <el-option label="军官证" :value=3></el-option>
                  <el-option label="港澳通行证" :value=4></el-option>
                </el-select>
              </el-col>
              <el-col :span="11">
                <el-input v-model="visitorList.certno" max="18"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="游客QQ" prop="qq">
              <el-col :span="4">
                <el-input v-model="visitorList.qq"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="游客类型" prop="type" >
              <el-col :span="4">
                <el-select v-model="visitorList.type"  >
                  <el-option label="高品质游客" :value=1></el-option>
                  <el-option label="中级游客" :value=2></el-option>
                  <el-option label="普通游客" :value=3></el-option>
                </el-select>
              </el-col>

            </el-form-item>
            <el-form-item label="游客区域" prop="">
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.country" placeholder="请选择" disabled>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.provinceid" placeholder="请选择" @change="change()">
                  <el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.cityid" placeholder="请选择">
                  <el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>

              <el-form-item label-width="200px" style="margin-top: 50px">
                <el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">保存</el-button>
                <el-button @click="handleHide()" style="width: 120px">取消</el-button>
              </el-form-item>

            </div>
            <div style="width:40%;float: left;border-left:1px solid rgba(153, 153, 153, 0.17);margin-top: 120px;overflow:hidden">
              <el-form-item label="游客生日" prop="code"  v-show="birthdayFlag">
                <div class="block">
                  <el-date-picker
                    v-model="visitorList.birthday"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="visitorList.birthday">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="游客微信" prop="weixin">
                <el-col :span="4">
                  <el-input v-model="visitorList.weixin"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="游客偏好" prop="interest">
                <el-col :span="4">
                  <el-input v-model="visitorList.interest"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="出游方式" prop="tourtype" style="width: 150px">
                <el-col :span="4">
                  <el-input v-model="visitorList.tourtype"></el-input>
                </el-col>
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
  import paramm from '../../../common/js/getParam'
  export default {
    data() {
      //验证手机号码
      var checkmobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            let mobilereg = /^[0-9]{11}$/;
            if (mobilereg.test(value)) {
              callback();
            } else {
              callback(new Error('请输入正确的手机号码'));
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        // 身份证
        if (this.visitorList.certtype == 1) {
          if (!value) {
            return callback(new Error('身份证号码不能为空'));
          }
          let cardOne1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
          let cardOne2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
          if (cardOne1.test(value) || cardOne2.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的身份证号码'));
          }
        }
        // 护照
        if (this.visitorList.certtype == 2) {
          if (!value) {
            return callback(new Error('护照号码不能为空'));
          }
          let cardTwo1 = /^[a-zA-Z]{5,17}$/;
          let cardTwo2 = /^[a-zA-Z0-9]{5,17}$/;
          if (cardTwo1.test(value) || cardTwo2.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的护照号码'));
          }
        }
        // 军官证
        if (this.visitorList.certtype == 3) {
          if (!value) {
            return callback(new Error('军官证号码不能为空'));
          }
          let cardThree1 = /南字第(\d{8})号|北字第(\d{8})号|沈字第(\d{8})号|兰字第(\d{8})号|成字第(\d{8})号|济字第(\d{8})号|广字第(\d{8})号|海字第(\d{8})号|空字第(\d{8})号|参字第(\d{8})号|政字第(\d{8})号|后字第(\d{8})号|装字第(\d{8})号/;
          if (cardThree1.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的军官证号码'));
          }
        }
        // 港澳通行证
        if (this.visitorList.certtype == 4) {
          if (!value) {
            return callback(new Error('港澳通行证号码不能为空'));
          }
          let cardFour1 = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
          if (cardFour1.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的港澳通行证号码'));
          }
        }

      };

      return {
        visitorList: {
          token: paramm.getToken(),
          name: '',
          sexid: '1',
          mobile: '',
          certtype: 1,
          certno: '',
          qq: '',
          weixin: '',
          type: 1,
          country:'',
          provinceid: '',
          cityid: '',
          districtid: '',
          tourtype: '',
          birthday: ''
        },
        address: {
          provinceList: [],
          cityList: [],
          districtList: [],

        },
        optionName: '新增游客',
        birthdayFlag: true,
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
          ],
          sexid: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          mobile: [{
            validator: checkmobile,
            trigger: 'blur',
            required: true,
          }],
          certno: [
//            { required: true,  min: 7, max: 18, message: '请输入正确的格式', trigger: 'blur' }
            {validator: validatePass, trigger: 'blur', required: true}
          ],

        },
        province: [],
        cities: [],
        district: [],
        //触发事件的标志
        flag:false
      }
    },
    created() {
      //省的展示
      this.getprovince()

      if (this.$parent.operationType.type == 'edit') {
        this.optionName = "编辑游客";
        //this.flag = true
//        this.birthdayFlag=false;
        let data = {
          token: paramm.getToken(),
          id: this.$parent.operationType.id,
        }
        custdetail(data).then((res) => {
          if (res.data.error) {
            this.$message.error(res.data.massage);
          } else {
            let tempEditList = {};
            tempEditList = res.data.obj;
            tempEditList.sexid = String(tempEditList.sexid);
            tempEditList.mobile = parseInt(tempEditList.mobile);
            this.visitorList = Object.assign({}, tempEditList)
            this.visitorList.country = '中国'
            //成功时的回调
            //市的展示
            console.log(this.visitorList.provinceid);
            let province = {
              id: this.visitorList.provinceid,
              token: paramm.getToken()
            }
            this.getcity(province)
          }
        })
      }else {
        this.visitorList.country = '中国'
        this.flag = true
      }
    },
    methods: {
      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
      },
      submitForm() {
        let _this = this;
        var newDate = '';
        if (this.visitorList.birthday && typeof(this.visitorList.birthday) == 'object') {
          let M = (this.visitorList.birthday.getMonth() + 1).toString().length == 1 ? '0' + (this.visitorList.birthday.getMonth() + 1).toString() : (this.visitorList.birthday.getMonth() + 1).toString();
          let D = this.visitorList.birthday.getDate().toString().length == 1 ? '0' + this.visitorList.birthday.getDate().toString() : this.visitorList.birthday.getDate().toString();
          newDate = this.visitorList.birthday.getFullYear().toString() + "-" + M + "-" + D;
        }
        let newPostDate = Object.assign({}, this.visitorList)
        if (typeof(this.visitorList.birthday) == 'object') {
          newPostDate.birthday = newDate;
        } else {
          newPostDate.birthday = this.visitorList.birthday;
        }
        newPostDate.sexid = parseInt(newPostDate.sexid);
        newPostDate.mobile = String(newPostDate.mobile);
        newPostDate.token = paramm.getToken();
        this.$refs['visitorList'].validate((valid) => {
          if (valid) {
            if (this.$parent.operationType.type == 'edit') {
              newPostDate.id = this.$parent.operationType.id;
//                delete  newPostDate.birthday;
              custupdate(newPostDate).then((backData) => {
                console.log(newPostDate)
                if(newPostDate.cityid === '') {
                  this.$message({
                    message: '所在城市不能为空',
                    type: 'warning'
                  });
                  return false
                }
                if (backData.data.error != 0 || backData.data.err) {
                  paramm.getCode(backData.data, _this)
                }
                else {
                  paramm.getCode(backData.data, _this)
                  this.handleHide('list');
                }
              })

            }
            else {
              custsave(newPostDate).then((backData) => {
                if(newPostDate.cityid === '') {
                  this.$message({
                    message: '所在城市不能为空',
                    type: 'warning'
                  });
                  return false
                }
                if (backData.data.error != 0 || backData.data.err) {
                  paramm.getCode(backData.data, _this)
                }
                else {
                  paramm.getCode(backData.data, _this)
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
        let count = "100001"
        let para = {
          id: count,
          token: paramm.getToken()
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
          this.cities = res.data.obj

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
      change() {
        this.flag ? this.changecity() : this.flag = true
      },
      //选择城市
      changecity() {
        console.log(777,'changecity')
        let pro = {
          id:this.visitorList.provinceid,
          token:paramm.getToken()
        }
        this.getcity(pro)
        this.visitorList.cityid = ''
      },
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
