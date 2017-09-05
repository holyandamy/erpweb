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
                <el-select v-model="visitorList.provinceid" placeholder="请选择" @change="changecity">
                  <el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.cityid" placeholder="请选择" @change="changecity">
                  <el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.districtid" placeholder="请选择">
                  <el-option v-for="item in district" :key="item.name" :label="item.name" :value="item.id">
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
              <el-form-item label="游客方式" prop="tourtype" style="width: 150px">
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
        visitorList: {
          token:token,
          name: '',
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
        optionName:'新增游客',
        birthdayFlag:true,
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
      this.getprovince()
      if( this.$parent.operationType.type=='edit') {
        this.optionName = "编辑游客";
        this.birthdayFlag=false;
        let data = {
          token:token,
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
          token: token
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
