<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleHide()">游客管理</span></el-breadcrumb-item>
            <el-breadcrumb-item>新增游客</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

      </el-row>
    </header>
    <section class="padding30">
      <el-row class="bg_white">
        <el-col :span="20">
          <el-form :model="visitorList"  ref="visitorList" label-width="100px" class="demo-ruleForm" style="text-align: left;">
            <div style="width:50%;float: left;overflow:hidden">
            <el-form-item label="游客姓名" prop="name">
              <el-col :span="4">
                <el-input v-model="visitorList.name"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="游客性别" prop="sexid">
              <el-radio-group v-model="visitorList.sexid">
                <el-radio label="男" value="1"></el-radio>
                <el-radio label="女" value="2"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="游客手机" prop="mobile">
              <el-col :span="4">
                <el-input v-model="visitorList.mobile"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="证件类型" prop="certtype" >
              <el-col :span="4" style="width: 100px;margin-right: 10px">
                <el-select v-model="visitorList.certtype" >
                  <el-option label="身份证" value="1" ></el-option>
                  <el-option label="护照" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11">
                <el-input v-model.number="visitorList.certno"></el-input>
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
                  <el-option label="高品质游客" value="1"></el-option>
                  <el-option label="中级游客" value="2"></el-option>
                  <el-option label="普通游客" value="3"></el-option>
                </el-select>
              </el-col>

            </el-form-item>
            <el-form-item label="游客区域" prop="">
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.provinceid"  @change="loadCity(visitorList.provinceid)">
                  <el-option  v-for="item in address.provinceList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.cityid" @change="loadArea(visitorList.cityid)"  >
                  <el-option  v-for="item in address.cityList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="width: 110px;margin-right: 10px">
                <el-select v-model="visitorList.districtid" >
                  <el-option  v-for="item in address.districtList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>

              <el-form-item label-width="200px" style="margin-top: 50px">
                <el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">保存</el-button>
                <el-button @click="handleHide()" style="width: 120px">取消</el-button>
              </el-form-item>

            </div>
            <div style="width:40%;float: left;border-left:1px solid rgba(153, 153, 153, 0.17);margin-top: 120px;overflow:hidden">
              <el-form-item label="游客生日" prop="code">
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
  import {custsave} from '../../../common/js/config';
  export default {
    data() {

      return {
        visitorList: {
          token: '',
          name: '',
          sexid: '',
          mobile:'',
          certtype:'',
          certno: '',
          qq: '',
          weixin: '',
          type: '',
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

        }

      }
    },
    created(){
      this.loadProvince('310104')
    },
    methods: {
      handleHide: function(option) {
        this.$emit('setMode', 'list',option);
      },

      //select area function by Aklliy.mou 2017/8/1
      getAddress:function(regionId,type) {
          let array = {};
          if(type==0) {//province list
            let obj = address['0'];
            let len = obj.length;
            for(let i=0; i<len; i++) {
              let key = obj[i][0];
              let value = obj[i][1];
              array[key] = value;
            }
          } else if(type==1) {// city list
            let str = regionId.substring(0,2);
            let obj = address['1'];
            let len = obj.length;
            for(let i=0; i<len; i++) {
              let key = obj[i][0];
              let value = obj[i][1];
              if(key.substring(0,2)==str) {array[key] = value;}
            }
          } else if(type==2) {//district list
            let str = regionId.substring(0,4);
            let obj = address['2'];
            let len = obj.length;
            for(let i=0; i<len; i++) {
              let key = obj[i][0];
              let value = obj[i][1];
              if(key.substring(0,4)==str) {array[key] = value;}
            }
          }
          return array;
      },
      loadProvince:function (regionId){
          let jsonStr = this.getAddress(regionId,0);
          this.address.provinceList=[];
          for(var k in jsonStr) {
            let item={value:k,label:jsonStr[k]};
            this.address.provinceList.push(item)
          }
        if(regionId.length!=6) {
          this.address.cityList=[]
          this.address.districtList=[]
          let cityItem={value:0,label:'请选择区域'};
          let districtItem={value:0,label:'请选择区域'};
          this.address.cityList.push(cityItem);
          this.address.districtList.push(districtItem);
        } else {
         this.visitorList.provinceid=regionId.substring(0,2)+"0000"
        }
        this.loadCity(regionId)
      },
      loadCity:function(regionId){
        if(regionId.length!=6) {
          this.address.districtList=[]
          let districtItem={value:0,label:'请选择区域'}
          this.address.districtList.push(districtItem);
        } else {
          var jsonStr = this.getAddress(regionId,1);
          this.address.cityList=[]
          for(var k in jsonStr) {
            let item={value:k,label:jsonStr[k]};
            this.address.cityList.push(item)
          }
          if(regionId.substring(2,6)=="0000") {
            let item={value:0,label:'请选择区域'}
            this.address.districtList=[]
            this.address.districtList.push(item)
          } else {
            this.visitorList.cityid=regionId.substring(0,4)+"00";
            this.loadArea(regionId);
          }
         this.visitorList.cityid=this.address.cityList[0].value
        }
      },
      loadArea: function(regionId){
          if(regionId.length==6) {
            var jsonStr = this.getAddress(regionId,2);
            this.address.districtList=[]
            for(var k in jsonStr) {
              let item={value:k,label:jsonStr[k]};
              this.address.districtList.push(item)
            }
            if(regionId.substring(4,6)!="00") {
              this.visitorList.districtid=regionId
            }
          }
        this.visitorList.districtid=this.address.districtList[0].value
        },
      submitForm() {
          let newDate='';
        if(this.visitorList.birthday!=''){
          const mouth={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sept:'09',Oct:'10',Nov:'11',Dec:'12' }
          let start=String(this.visitorList.birthday).split(' ');
          newDate=start[3]+'-'+mouth[start[1]]+'-'+start[2]
        }
        let newPostDate=Object.assign({},this.visitorList)
        newPostDate.birthday=newDate
          custsave(newPostDate).then((backData) => {
            if(backData.error){
              this.$message.error(backData.massage);
            }
            else {
              this.handleHide('list');
            }
          })






























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
