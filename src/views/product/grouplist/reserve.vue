<template>
  <div>
    <header>
      <h3 style='text-align: left;font-weight: bold;'>下单 >> {{{1:'占位',2:'预定'}[operationType.type]}}</h3>
    </header>
    <section>
      <h2 class="d_jump"  @click="handleHide()"></h2>
      <div class="bgfff bgfff-top">
        <!--<h3>{{detail.name}}</h3>-->
        <div class="linecenter">
          <el-row>
            <el-col :span="12">
              <ul>
                <li><span>线路名称：</span> {{detail.name || ''}} </li>
                <li><span>团号：</span>{{detail.teamno }}</li>
                <!--出行方式:1跟团游，2自由行-->
                <li><span>结算价格：</span>
                  成人 {{detailOut.sltaduilt}} /
                  儿童 {{detailOut.sltchild}} /
                  婴儿 {{detailOut.sltbaby}}
                </li>

              </ul>
            </el-col>
            <el-col :span="12">
              <ul style="padding-left: 30px;">
                <li><span>出发日期：</span>{{detailOut.starttime}}</li>
                <li><span>回团日期：</span>{{detailOut.endtime}}</li>
              </ul>
            </el-col>
            <div style="clear: both;"></div>
            <p>
              <span>集合通知：</span>{{detail.notify}} <br>
              <span>操作人：</span>
            </p>
          </el-row>
        </div>

      </div>
      <h2 class="d_jump">客户信息</h2>
      <div class="bgfff bgfff-bot">
        <!--<h3>{{detail.name}}</h3>-->
        <div class="linecenter">

          <section class="padding30">
            <el-row class="bg_white">
              <el-col :span="25">
                <el-form   ref="visitorList" v-model="visitorList"  :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;">  <!--   -->
                  <div style="width:50%;float: left;overflow:hidden">
                    <el-form-item label="客户类型：" prop="custtype" >
                      <el-col :span="4">
                        <el-select  v-model="visitorList.custtype">
                          <el-option label="请选择" :value=0 disabled ></el-option>
                          <el-option label="直客" :value=1 selected></el-option>
                          <el-option label="旅行社" :value=2></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="name">
                      <el-col :span="4">
                        <el-input v-model="visitorList.contact" ></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="公司名称：" prop="company" v-if='visitorList.custtype == 2' >
                      <el-col :span="4">
                        <el-input v-model="visitorList.comname" @change='getJidiaoo'></el-input>
                        <div class='phoneInp' v-if='isShowc && companyArr.length>0'>
                          <div class='ptSon' v-for='item in companyArr' @click='checkCson(item)'>{{item.companyname}}</div>
                        </div>
                      </el-col>
                    </el-form-item>

                  </div>
                  <div style="width:40%;float: left;border-left:1px solid rgba(153, 153, 153, 0.17);margin-top: 70px;padding-left: 20px;overflow:hidden">
                    <el-form-item label="联系人手机：" prop="mobile" >
                      <el-col :span="4">
                        <el-input v-model.number="visitorList.mobile"  @change='getJidiao'></el-input>
                        <div class='phoneInp' v-if='isShowp && phoneArr.length>0'>
                          <div class='ptSon' v-for='item in phoneArr' @click='checkPson(item)'>{{item.mobile}}</div>
                        </div>
                      </el-col>
                      <br>
                    </el-form-item>
                    <el-form-item label="计调：" prop="adjuster" v-if='visitorList.custtype == 2'>
                      <el-col :span="4">
                        <el-select  v-model="adjuster" @change='selJidiao'>
                          <el-option :label="item.realname" :key="item.id" :value='item' v-for='item in jidiaoArr' ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </div>
                  <div style="width:100%;float: left;overflow:hidden">
                    <el-form-item label="备注：" prop="remark">
                      <el-col :span="4" style="width: 100%;margin-right: 10px">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}"
                          placeholder="限120字以内！"
                          v-model="visitorList.remark">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </div>
                </el-form>
              </el-col>
            </el-row>
            <!--todo 1 -->
            <div class="bg_white padding-20-50">
              <el-row>
                <el-col :span="6">
                  <el-col :span="5" style="line-height: 26px;">成人</el-col>
                  <el-col :span="19">
                    <!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
                    <div class="el-input-number">
                      <!--is-disabled-->
                      <span class="el-input-number__decrease" @click="minuday(1)"><i class="el-icon-minus"></i></span>
                      <span class="el-input-number__increase" @click="addday(1)"><i class="el-icon-plus"></i></span>
                      <div class="el-input"><input v-model="adultArr.length" autocomplete="off" disabled type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

                      </div>
                    </div>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col :span="5" style="line-height: 26px;">儿童</el-col>
                  <el-col :span="19">
                    <!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
                    <div class="el-input-number">
                      <!--is-disabled-->
                      <span class="el-input-number__decrease" @click="minuday(2)"><i class="el-icon-minus"></i></span>
                      <span class="el-input-number__increase" @click="addday(2)"><i class="el-icon-plus"></i></span>
                      <div class="el-input"><input v-model="childArr.length" autocomplete="off" disabled type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

                      </div>
                    </div>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col :span="5" style="line-height: 26px;">婴儿</el-col>
                  <el-col :span="19">
                    <!--<el-input-number v-model="detail.totaladult" ref="num1" size="small" @change="changeaudlt" :min="0"></el-input-number>-->
                    <div class="el-input-number">
                      <!--is-disabled-->
                      <span class="el-input-number__decrease" @click="minuday(3)"><i class="el-icon-minus"></i></span>
                      <span class="el-input-number__increase" @click="addday(3)"><i class="el-icon-plus"></i></span>
                      <div class="el-input"><input v-model="babyArr.length" autocomplete="off" disabled type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

                      </div>
                    </div>
                  </el-col>

                </el-col>
              </el-row>

              <!--todo 2 -->
              <table class="adulttable" width="100%">
                <thead>
                <tr>
                  <td width="50">序号</td>
                  <td width="100">姓名</td>
                  <td width="60">类型</td>
                  <td width="150">证件类型</td>
                  <td width="200">证件号码</td>
                  <td width="130">手机号</td>
                  <td width="100">单房差</td>
                  <td width="200">游客备注</td>
                  <td width="100">操作</td>
                </tr>
                </thead>
                <tbody>

                <!--todo 3 -->
                <tr v-for='(item,idx) in checkArr' > <!--v-if='checkArr.length>0'-->
                  <td>{{idx+1}}</td>  <!--index+1-->
                  <td>
                    <el-input placeholder="姓名" v-model="item.name"></el-input>
                  </td>
                  <td>
                    {{{1:'成人',2:'儿童',3:'婴儿'}[item.type]}}
                    <!--<el-input disabled='disabled' v-model="namelist.name"></el-input> &lt;!&ndash; v-model="namelist.name"&ndash;&gt;-->
                  </td>
                  <td>
                    <el-select v-model="item.certtype" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input  placeholder="证件号" v-model="item.cert"></el-input>
                  </td>
                  <td>
                    <el-input placeholder="手机号" v-model="item.mobile"></el-input>
                  </td>
                  <td>
                    <el-checkbox v-model="item.room" @change = 'addCount(item.room)'>单房差</el-checkbox>
                  </td>
                  <td>
                    <el-input  placeholder="备注" v-model="item.remark"></el-input>
                  </td>
                  <td>
                    <el-button type="text" v-if="!detail.isconfirm" @click="deletepeople(item.type,idx)">删除</el-button>
                    <el-button type="text" v-else >申请退款</el-button>
                  </td>
                </tr>

                <tr>
                  <td colspan="5"><span class='moneyy'>成人：￥{{adultMoney}}元</span>  <span class='moneyy'>儿童：￥{{childMoney}}元</span> <span>婴儿：￥{{babyMoney}}元</span></td>
                  <td colspan="4" style="text-align: right; padding-right: 20px;">合计：￥{{allMoney}}元</td>
                </tr>
                </tbody>
              </table>
            </div>

          </section>
          <!--<el-form-item label-width="200px" style="margin-top: 50px">-->
          <!--</el-form-item>-->
          <div class='sureBtn'>
            <el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">提交</el-button>
            <el-button @click="handleHide()" style="width: 120px">取消</el-button>
          </div>

        </div>

      </div>

    </section>
  </div>
</template>

<script>
  import {token,orderdet, reserveNum,orderSave} from '../../../common/js/config';
  export default {
    props:['categoryId','operationType'],
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
        modeType: 'reserve',
        menus: ['下单', '基本信息', '行程', '预定须知', '发布平台'],
        active:0,
        detail: {
          namelist: []
        },
        detailOut:{},
        groupList:[],
        edittype:true,
        visitorList: {
          custtype: 1,
          contact: '',
          mobile: '',
          comname: '',
          adjuster: '',
          remark: '',
          adultNum: '',
          childNum: '',
          babyNum: '',
          token: token
        },
        adjuster: '',
        rules: {
          mobile: [{
            validator: checkmobile,
            trigger: 'blur',
            required: true,
          }]
        },
        options: [{
          value: '1',
          label: '身份证'
        }, {
          value: '2',
          label: '护照'
        }, {
          value: '3',
          label: '军官证'
        }, {
          value: '4',
          label: '港澳通行证'
        }],
        value: '',
        checkArr: [],
        adultArr: [],
        childArr: [],
        babyArr: [],
        phoneArr: [],
        companyArr: [],
        isShowp: true,
        isShowc: true,
        jidiaoArr: [],
        adultMoney: 0,
        childMoney: 0,
        babyMoney: 0,
        allMoney: 0,
        count: 0
      }
    },
    mounted: function() {
      this.getlineinfo()
    },
    methods: {
      // 点击单房差
      addCount(sta) {
        if(sta) this.count= this.count + 1
        if(!sta) this.count = this.count - 1
        this.allMoney = (parseFloat(this.adultMoney) + parseFloat(this.childMoney) + parseFloat(this.babyMoney) + this.count * this.detailOut.sltroom).toFixed(2)
      },
      // 点击保存 取消
      submitForm () {
        let _this = this;
        this.visitorList.adultNum = this.adultArr.length;
        this.visitorList.childNum = this.childArr.length;
        this.visitorList.babyNum = this.babyArr.length;
        this.visitorList.teamdetailid = this.categoryId;
        this.visitorList.type = this.operationType.type;
        try {
          this.checkArr.forEach(function (item) {
            if((item.name && item.certtype && item.cert && item.mobile && item.remark) || (!item.name && !item.certtype && !item.cert && !item.mobile && !item.remark)){
//            console.log(1111, _this.visitorList);
            }else {
              _this.$message({
                message: '信息填写有误',
                type: 'warning'
              });
              throw false
            }
          })
        }catch (e){
          throw e
        }
        this.visitorList.list = this.checkArr
        orderSave(this.visitorList).then(function (res) {
          if(!res.data.error){
            _this.$message({
              message: '提交成功',
              type: 'success'
            });
          }else {
            _this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        })
      },
      handleHide: function() {
        this.$emit('setMode', 'groupinfo');
      },
      // 加
      addday (typee) {
        if (typee==1){
          this.adultArr.push(
            {name: '',
              type: typee,  //1 2 3
              certtype: '',  // 1 2 3 4
              cert: '',
              mobile: '',
              room: false, // 1 0
              remark: '',
              isrefund: false
            })
        }else if(typee==2){
          this.childArr.push(
            {name: '',
              type: typee,  //1 2 3
              certtype: '',  // 1 2 3 4
              cert: '',
              mobile: '',
              room: false, // 1 0
              remark: '',
              isrefund: false
            })
        }else {
          this.babyArr.push(
            {name: '',
              type: typee,  //1 2 3
              certtype: '',  // 1 2 3 4
              cert: '',
              mobile: '',
              room: false, // 1 0
              remark: '',
              isrefund: false
            })
        }
        this.checkArr = []
        let _this = this;
        this.adultArr.forEach(function (item) {
          _this.checkArr.push(item)
        });
        this.childArr.forEach(function (item) {
          _this.checkArr.push(item)
        });
        this.babyArr.forEach(function (item) {
          _this.checkArr.push(item)
        })
        // 算总价格
        this.adultMoney = (this.adultArr.length * this.detailOut.sltaduilt).toFixed(2) || 0;
        this.childMoney = (this.childArr.length * this.detailOut.sltchild).toFixed(2) || 0;
        this.babyMoney = (this.babyArr.length * this.detailOut.sltbaby).toFixed(2) || 0;
        this.allMoney = (parseFloat(this.adultMoney) + parseFloat(this.childMoney) + parseFloat(this.babyMoney) + this.count * this.detailOut.sltroom).toFixed(2)
      },
      // 减
      minuday (typee) {
        if (typee==1){
          this.adultArr.splice(this.adultArr.length-1,1)
        }else if(typee==2){
          this.childArr.splice(this.childArr.length-1,1)
        }else {
          this.babyArr.splice(this.babyArr.length - 1, 1)
        }
        this.checkArr = []
        let _this = this;
        this.adultArr.forEach(function (item) {
          _this.checkArr.push(item)
        });
        this.childArr.forEach(function (item) {
          _this.checkArr.push(item)
        });
        this.babyArr.forEach(function (item) {
          _this.checkArr.push(item)
        })
      },
      //删除游客
      deletepeople(typee,idx) {
        if(this.adultArr.length-1 >= idx) {
          this.adultArr.splice(idx, 1)
        }else if((this.adultArr.length + this.childArr.length-1) >= idx){
          this.childArr.splice(idx-this.adultArr.length, 1)
        }else {
          this.babyArr.splice(idx-(this.adultArr.length+this.childArr.length), 1)
        }
        this.checkArr.splice(idx, 1)
      },
      // 获取详情
      getlineinfo(){
        let para = {
          token:token,
          id:this.categoryId
        }
        orderdet(para).then((res) => {
          this.detailOut = res.data.obj
          this.detail = res.data.obj.line
          this.groupList = [res.data.obj]
          if(this.detail.edittype == 0 ){
            this.edittype = true
          }else{
            this.edittype = false
          }
        })
      },
      // 公司手机输入
      getJidiaoo () {
        this.isShowc = true;
        if(this.visitorList.comname.toString().length<=4) {
          this.isShowc = false;
        }
        let _this = this;
        if(this.visitorList.custtype == 2 && this.visitorList.comname.toString().length>4){
          console.log(1111, {token: token,mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.comname.toString() || ''});
          reserveNum(JSON.stringify({token: token,mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.comname.toString() || ''})).then(function (res) {
            _this.companyArr = res.data.obj
            _this.jidiaoArr = _this.companyArr
          })
        }
      },
      getJidiao () {
        this.isShowp = true;
        if(this.visitorList.mobile.toString().length<=6) {
          this.isShowp = false;
        }
        let _this = this;
        if(this.visitorList.custtype == 2 && this.visitorList.mobile.toString().length>6){
          reserveNum({token: token,mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.comname.toString() || ''}).then(function (res) {
            _this.phoneArr = res.data.obj
            _this.jidiaoArr = _this.phoneArr
          })
        }
      },
      //选取下拉的公司 手机
      checkCson (item) {
        this.visitorList.comname = item.companyname;
        this.getJidiaoo();
        this.isShowc = false;
        let _this = this;
        reserveNum(JSON.stringify({token: token,mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.comname.toString() || ''})).then(function (res) {
          _this.companyArr = res.data.obj
          _this.jidiaoArr = _this.companyArr
        })
      },
      checkPson (item) {
        this.visitorList.mobile = item.mobile;
        this.getJidiao();
        this.isShowp = false;
      },
      selJidiao (item) {
        this.visitorList.mobile = item.mobile;
        this.visitorList.comname = item.companyname;
        this.visitorList.contact = item.realname;
        this.visitorList.adjuster = item.realname;
      },
      //获取详情
      getdetail() {
        let para = {
          id: this.listid,
          token: token
        }
      },

    },
    created() {
      this.getdetail()
//      this.checkbanklist()
    }
  }
</script>

<style scoped lang="scss">
  header {
    height: 40px;
    padding: 20px 30px 0 30px;
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 15;
    top: 0;
    li {
      float: left;
      height: 37px;
      border-top: 3px solid transparent;
      padding: 0 25px;
      line-height: 37px;
      font-size: 14px;
      cursor: pointer;
    }
    .active{
      background: #eef1f6;
      border-top: 3px solid #3ec3c8;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }

  section {
    margin-top: 60px;
    padding: 0 30px;
    text-align: left;
    h2 {
      color: #2cb1b6;
      font-size: 24px;
      padding-top: 20px;
      line-height: 60px;
      span {
        color: #666;
        margin-left: 20px;
      }
    }
    .bgfff {
      background: #fff;
      padding: 3px 40px 20px 40px;
      margin-top: 70px;
      h3 {
        font-size: 18px;
        line-height: 28px;
        padding: 20px 0;
        background: url(../../../assets/images/linebg.png) repeat-x bottom;
      }
      .linecenter {
        position: relative;
        margin-top: 20px;
        p {
          line-height: 55px;
          font-size: 14px;
          span {
            color: #666;
            width: 90px;
            display: inline-block;
          }
        }
      }
      .el-col {
        line-height: 55px;
        font-size: 14px;
        li {
          span {
            color: #666;
            width: 90px;
            display: inline-block;
          }
        }
      }
      .notes {
        font-size: 14px;

        li {
          padding: 20px 0;
          span {
            color: #666;
            width: 90px;
            display: inline-block;
            float: left;
            line-height: 26px;
          }
          .xc {
            margin-left: 90px;
            line-height: 26px;
          }
        }
      }
    }
    .bgfff-bot {
      margin-top: 0px;
    }
    .daylist {
      border-left: 3px solid #fbcd9f;
      padding: 10px 60px 10px 104px;
      background: #fff url(../../../assets/images/circle.png) repeat-y 48px;
      position: relative;
      min-height: 100px;
      margin-bottom: 20px;
      .day {
        position: absolute;
        left: 20px;
        top: 15px;
        background: #ff780b;
        width: 55px;
        height: 55px;
        display: block;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        line-height: 55px;
        text-align: center;
        span {
          font-size: 20px;
        }
      }
      .title {
        padding: 10px 0 20px 0;
      }
      li {
        padding: 20px 0;
        font-size: 14px;
        span {
          color: #666;
          width: 55px;
          display: inline-block;
          float: left;
          line-height: 26px;
        }
        .xc {
          margin-left: 55px;
          line-height: 26px;
          label {
            padding-left: 25px;
          }
        }
      }
    }
  }

  .linecenter:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 150px;
    display: block;
    background: url(../../../assets/images/linebg.png) repeat-y;
    left: 50%;
    top: 10px;
  }
  pre{
    font-size: 14px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #333;
    white-space:pre-wrap;
  }
  .content{padding: 20px 30px; background: #fff;}
  .topimglist{
    span{
      font-size: 14px;
      color: #666;
      width: 90px;
      display: inline-block;
    }
  }
  .demo-ruleForm{
    .el-form-item{
      .el-col-4{
        width: 200px;
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
  .sureBtn{
    text-align: center;
    margin-top: 40px;
  }

  header {
    padding: 20px 40px 20px 40px;
    background: white;
    margin-bottom: 30px;
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

  section {
    margin: 0 30px;
    h2 {
      font-size: 24px;
      color: #2cb1b6;
      text-align: left;
      padding: 30px 0 15px 0;
      .el-button {
        float: right;
        margin-left: 20px;
      }
    }
    .bg_white {
      background: #fff;
      font-size: 14px;
      color: #666;
      text-align: left;
      .title {
        line-height: 75px;
        background: url(../../../assets/images/linebg.png) repeat-x bottom;
      }
      .info {
        line-height: 60px;
        background: url(../../../assets/images/linebg.png) repeat-x bottom;
        position: relative;
        .pl-20 {
          padding-left: 20px;
        }
      }
      .infobottom {
        line-height: 60px;
      }
      .adulttable {
        margin-top: 20px;
        border: 1px solid #dee5ec;
        thead {
          td {
            background: #f5f7f9;
            border-bottom: 1px solid #bfcbda;
            border-right: 1px solid #bfcbda;
            height: 40px;
            line-height: 40px;
            text-align: center;
          }
        }
        tbody {
          td {
            padding: 8px;
            border-bottom: 1px solid #dee5ec;
            border-right: 1px solid #dee5ec;
            min-height: 50px;
            text-align: center;
          }
        }
      }
    }
    .padding-0-50 {
      padding: 0 50px;
    }
    .padding-20-50 {
      padding: 20px 50px;
    }
  }

  .info:before {
    position: absolute;
    content: '';
    width: 2px;
    height: 275px;
    background: url(../../../assets/images/linebg.png) repeat-y;
    left: 50%;
    top: 80px;
  }

  .collecttable {
    border: 1px solid #dee5ec;
    border-radius: 5px;
    th {
      height: 38px;
      background: #f5f7f9;
      border-bottom: 1px solid #bfcbda;
      padding: 0 20px;
      line-height: 38px;
    }
    td {
      padding: 10px 20px;
      border-bottom: 1px solid #dee5ec;
    }
  }

  .button {
    margin: 30px 0;
    text-align: left;
  }

  .el-input-number {
    width: 120px;
    .el-input-number__increase,
    .el-input-number__decrease {
      line-height: 29px;
      width: 30px;
      top: 13px;
    }
    .el-input {
      input {
        height: 30px;
      }
    }
  }
  .phoneInp{
    border: 1px solid #ccc;
    border-radius: 5px;
    max-height: 300px;
    overflow: auto;
    .ptSon{
      height: 30px;
      line-height: 30px;
      padding-left: 6px;
    }
    .ptSon:hover{
      background-color: rgb(55, 172, 176);
    }
  }
  .moneyy{
    margin-right: 20px;
  }
</style>
