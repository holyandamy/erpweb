<template>
  <div>
    <section class="bg-white margin30 padding30">
      <el-col :span="15">
        <el-form :model="companyForm" :rules="rules" ref="companyForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司名称" prop="companyName">
            <el-col :span="7">
              <el-input v-model="companyForm.companyName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所在城市" prop="provinceId">
            <el-col :span="4">
              <el-select v-model="companyForm.countryId" placeholder="请选择" disabled>
                <el-option v-for="item in countrys" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="companyForm.provinceId" placeholder="请选择"  @change="change()">
                <el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="companyForm.cityId" placeholder="请选择">
                <el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="companyForm.address"></el-input>
          </el-form-item>
          <el-form-item label="公司负责人" prop="person">
            <el-col :span="7">
              <el-input v-model="companyForm.person"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="负责人手机" prop="mobile">
            <el-col :span="7">
              <el-input v-model.number="companyForm.mobile"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="公司座机" prop="tel">
            <el-col :span="7">
              <el-input v-model="companyForm.tel"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-col :span="7">
              <el-input v-model="companyForm.brand"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="公司传真" prop="fax">
            <el-col :span="7">
              <el-input v-model="companyForm.fax"></el-input>
            </el-col>
          </el-form-item>
          <ImgLoad @imagelistchange="imagelistchange" :logo="logo" ref='logos'></ImgLoad>
          <el-form-item label-width="100px" style="text-align: left;">
            <el-button type="primary" class="hasid" id="e10adc3949ba59abbe56e057f20f883e" @click="submitForm('companyForm')">保存</el-button>
            <!--<el-button @click="resetForm('companyForm')">取消</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
      <div class="clearfix"></div>
    </section>
  </div>

</template>
<script>
  import paramm from '../../../common/js/getParam'
  import axios from 'axios';
  import { companyupdate, province, city, district,companydetail } from '../../../common/js/config';
  import ImgLoad from './upload'
  import {showorhide} from '../../../common/js/showorhid'
  export default {
    components: {
      ImgLoad
    },
    data() {
      //验证手机号码
      var checkmobile = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('手机号码不能为空'));
        }else {
          let mobilereg = /^[0-9]{11}$/;
          if(mobilereg.test(value)) {
            callback();
          } else {
            callback(new Error('请输入正确的手机号码'));
          }
        }
      };
      //验证所在城市
      /*var checkprovince = (rule,value,callback) => {
        if(!value){
          return false;
          //return callback(new Error('所在城市不能为空'));
        }else{

        }
      };*/
      return {
        activeIndex: '3',
        //提交数据
        companyForm: {
          token: paramm.getToken(),
          companyName: '',
          country: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          address: '',
          person: '',
          mobile: '',
          tel: '',
          fax: '',
          companyId: '',
          brand:''
        },
        //验证数据
        rules: {
          companyName: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          },
          {
              min: 3,
              max: 50,
              message: '长度在 3 到 50 个字符',
              trigger: 'blur'
          }
          ],
          provinceId: [{
            required: true,
            message: '请选择地址',
            trigger: 'change'
          }],
          address: [{
            required: true,
            message: '请输入详细地址',
            trigger: 'blur'
          },
            {
              min: 3,
              max: 120,
              message: '长度在 3 到 120 个字符',
              trigger: 'blur'
            }
          ],
          person: [{
            required: true,
            message: '请输入公司负责人',
            trigger: 'blur'
          },
            {
              max: 50,
              message: '长度在 2 到 50 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [{
            validator: checkmobile,
            trigger: 'blur',
            required: true,
          }],
          tel: [{
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
            required: false,
          }],
          fax: [{
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur',
            required: false,
          }]
        },
        province:[],
        city:[],
        district:[],
        logo:'',
        //触发事件的标志
        flag:false,
        countrys: [{
          name: '中国',
          id: '100001',
        }]
      }
    },
    created() {
      this.getinfo() //能拿到provinceId，cityId，districtId
      this.getprovince()
    },
    updated: function() {
      this.$nextTick(function() {
        showorhide()
      })
    },
    methods: {
      //获取公司信息
      getinfo(){
        let para={token:paramm.getToken()}
        companydetail(para).then((res) => {
          this.companyForm = res.data.obj
          let pro = {
            id:this.companyForm.provinceId,
            token:paramm.getToken()
          }
          this.getcity(pro)
          this.logo = res.data.obj.logo
          this.$refs.logos.loading(this.logo)
        })
      },
      //保存数据
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //valid值无效
          console.log('是否有效')
          if(valid) {
            let _this =this;
            let parses = this.companyForm
            parses.companyId = this.companyForm.id
            parses.token = paramm.getToken()
            parses.mobile = parses.mobile.toString()
            //如果市或者县为空时，直接阻止发请求
            if(parses.cityId === ''){
               //alert('所在城市不能为空');
               this.$message({
                 message:'所在城市不能为空',
                 type:'warning'
               })
               return false;
            }
            companyupdate(parses).then((res) => {
              if(res.data.error == 1 || res.data.err){
                paramm.getCode(res.data,_this)
              }else{
                paramm.getCode(res.data,_this)
              }
            })
          } else {
            this.$message.error('提交错误！');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.companyForm.provinceId = ''
        this.companyForm.cityId = ''
        this.companyForm.districtId = ''
      },
      //
      //获取省级列表
      getprovince() {
        let count = "100001"
        let para = {
          id: count,
          token: paramm.getToken()
        }
        province(para).then((res) => {
          //console.log(res)
          this.province = res.data.obj
        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取市列表
      getcity(pro) {
        city(pro).then((res) => {
          this.city = res.data.obj
          //console.log(this.city)
        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取区列表
      /*getdistrict(city) {
        district(city).then((res) => {
          this.district = res.data.obj
          //console.log(this.district)
        }).catch(function(err) {
          console.log("连接错误")
        })
      },*/
      change() {
        this.flag ? this.changecity() : this.flag = true
      },
      //选择城市
      changecity() {
        console.log(777,'changecity')
        this.companyForm.cityId = ''
        //获取城市
        let pro = {
          id:this.companyForm.provinceId,
          token:paramm.getToken()
        }
        this.getcity(pro)
      },
      imagelistchange(val){
        this.companyForm.logo = val
      }
    }
  }
</script>
<style scoped lang="scss">
  .clearfix {
    clear: both;
  }

  .bg-white {
    background: white;
  }

  .padding30 {
    padding: 20px;
  }

  .margin30 {
    margin: 30px;
  }

  header {
    padding: 0 40px;
    background: white;
    margin-bottom: 30px;
    padding-top: 20px;
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

  .el-select {
    margin-right: 15px;
  }

  .hasid {
    display:none;
  }
</style>
