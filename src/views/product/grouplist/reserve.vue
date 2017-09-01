<template>
  <div>
    <header>
        <h3 style='text-align: left;font-weight: bold;'>下单 >> 预定</h3>
    </header>
    <section>
      <h2 class="d_jump"  @click="handleHide()"></h2>
      <div class="bgfff">
        <!--<h3>{{detail.name}}</h3>-->
        <div class="linecenter">
          <el-row>
            <el-col :span="12">
              <ul>
                <li><span>线路名称：</span> </li>  <!-- -- {{detail.categoryName}}-->
                <li><span>团号：</span></li>
                <!--出行方式:1跟团游，2自由行-->
                <li><span>结算价格：</span>
                  <!--成人 {{detailOut.sltaduilt}} /-->
                  <!--儿童 {{detailOut.sltchild}} /-->
                  <!--婴儿 {{detailOut.sltbaby}}-->
                </li>

              </ul>
            </el-col>
            <el-col :span="12">
              <ul style="padding-left: 30px;">
                <li><span>出发日期：</span></li>
                <li><span>回团日期：</span></li>
              </ul>
            </el-col>
            <div style="clear: both;"></div>
            <p>
              <span>集合通知：</span> <br>
              <span>操作人：</span>
            </p>
          </el-row>
          <!--<el-table  :data="groupList"-->
                     <!--border-->
                     <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="plan"-->
              <!--label="计划人数"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="book"-->
              <!--label="预订人数"-->
              <!--width="180">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="sit"-->
              <!--label="占位">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="surplus"-->
              <!--label="余位">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作">-->
              <!--<template scope="scope">-->
                <!--<el-button @click="handleClick" type="text" size="small">预定</el-button>-->
                <!--<el-button type="text" size="small">占位</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        </div>

      </div>
      <h2 class="d_jump">客户信息</h2>
      <div class="bgfff">
        <!--<h3>{{detail.name}}</h3>-->
        <div class="linecenter">

          <section class="padding30">
            <el-row class="bg_white">
              <el-col :span="25">
                <el-form   ref="visitorList" v-model="visitorList"  :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;">  <!--   -->
                  <div style="width:50%;float: left;overflow:hidden">
                    <el-form-item label="客户类型：" prop="type" >
                      <el-col :span="4">
                        <el-select  v-model="visitorList.type">
                          <el-option label="请选择" :value=1 disabled ></el-option>
                          <el-option label="直客" :value=2 selected></el-option>
                          <el-option label="旅行社" :value=3></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="name">
                      <el-col :span="4">
                        <el-input v-model="visitorList.name" ></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="公司名称：" prop="company" v-if='visitorList.type == 3' >
                      <el-col :span="4">
                        <el-input v-model="visitorList.company" @change='getJidiaoo'></el-input>
                      </el-col>
                    </el-form-item>

                  </div>
                  <div style="width:40%;float: left;border-left:1px solid rgba(153, 153, 153, 0.17);margin-top: 70px;padding-left: 20px;overflow:hidden">
                    <el-form-item label="联系人手机：" prop="mobile" >
                      <el-col :span="4">
                        <el-input v-model.number="visitorList.mobile"  @change='getJidiao'></el-input>
                        <!--<div style='height: 18px;line-height: 30px;'>www</div>-->
                        <!--<div style='height: 18px;line-height: 30px;'>www</div>-->
                        <!--<div style='height: 18px;line-height: 30px;'>www</div>-->
                      </el-col>
                      <br>
                    </el-form-item>
                    <el-form-item label="计调：" prop="jidiao" v-if='visitorList.type == 3'>
                      <el-col :span="4">
                        <el-select  v-model="visitorList.jidiao">
                          <el-option label="请选择" :value=4 disabled></el-option>
                          <el-option label="直客" :value=5 ></el-option>
                          <el-option label="旅行社" :value=6></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </div>
                  <div style="width:100%;float: left;overflow:hidden">
                    <el-form-item label="备注：" prop="name">
                      <el-col :span="4" style="width: 100%;margin-right: 10px">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 3, maxRows: 5}"
                          placeholder="限120字以内！"
                          v-model="visitorList.des">
                        </el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label-width="200px" style="margin-top: 50px">
                      <el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">提交</el-button>
                      <el-button @click="handleHide()" style="width: 120px">取消</el-button>
                    </el-form-item>
                  </div>

                </el-form>
              </el-col>
            </el-row>
          </section>


        </div>

      </div>
      <!--<el-table-->
        <!--:data="loglist"-->
        <!--border-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="creater"-->
          <!--label="操作人"-->
          <!--width="180"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="createtime"-->
          <!--label="操作时间"-->
          <!--width="180"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="content"-->
          <!--label="操作内容">-->
        <!--</el-table-column>-->
      <!--</el-table>-->

    </section>
  </div>
</template>

<script>
  import {orderdetail, reserveNum} from '../../../common/js/config';
  export default {
    props:['categoryId'],
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
        detail:{},
        detailOut:{},
        groupList:[],
        loglist:[],
        edittype:true,
        imglist:[],
        toplist:[],
        visitorList: {
          type: 2,
          name: '',
          mobile: '',
          company: '',
          jidiao: '',
          des: ''
        },
        rules: {
          mobile: [{
            validator: checkmobile,
            trigger: 'blur',
            required: true,
          }]
        }
      }
    },
    mounted: function() {
          this.getlineinfo()
    },
    methods: {
      getlineinfo(){
        let para = {
          token:'',
          id:this.categoryId
        }
        orderdetail(para).then((res) => {
//          console.log(123, res.data);
//          return;
          this.detailOut = res.data.obj
          this.detail = res.data.obj.line
          this.groupList = [res.data.obj]
          this.toplist = this.detail.images.split(',')

          for(let i = 0 ; i <this.detail.routes.length;i++){
            let arr = []
            arr = res.data.obj.routes[i].titleimages.split(',')
            console.log(arr)
            this.detail.routes[i].titleimages = arr
            console.log(this.detail.routes[i].titleimages)
          }

          if(this.detail.edittype == 0 ){
            this.edittype = true
          }else{
            this.edittype = false
            let str = this.detail.routes[0].content
            this.detail.routes[0].content = str

          }
          this.loglist = res.data.obj.logs
          let categorytype =  res.data.obj.categorytype
          switch (categorytype){
            case 0:
              this.detail.categorytype = "全部";
              break;
            case 1:
              this.detail.categorytype = "国内游";
              break;
            case 2:
              this.detail.categorytype = "出境游";
              break;
            case 3:
              this.detail.categorytype = "周边游";
              break;
          }
          let day=res.data.obj.trafficgo
          switch (day)
          {
            case 1:
              this.detail.trafficgo = "飞机";
              break;
            case 2:
              this.detail.trafficgo = "动车";
              break;
            case 3:
              this.detail.trafficgo = "火车";
              break;
            case 4:
              this.detail.trafficgo = "高铁";
              break;
            case 5:
              this.detail.trafficgo = "大巴";
              break;
            case 6:
              this.detail.trafficgo = "轮船";
              break;
          }
          let trafficback=res.data.obj.trafficreturn
          switch (trafficback)
          {
            case 1:
              this.detail.trafficreturn = "飞机";
              break;
            case 2:
              this.detail.trafficreturn = "动车";
              break;
            case 3:
              this.detail.trafficreturn = "火车";
              break;
            case 4:
              this.detail.trafficreturn = "高铁";
              break;
            case 5:
              this.detail.trafficreturn = "大巴";
              break;
            case 6:
              this.detail.detail = "轮船";
              break;
          }
        })
      },
      jump(index) {
        this.active=index

        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop
        let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if(total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }

        function smoothDown() {
          if(distance < total) {
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
            window.pageYOffset = total
          }
        }

        function smoothUp() {
          if(distance > total) {
            distance -= step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            window.pageYOffset = distance
            setTimeout(smoothUp, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
            window.pageYOffset = total
          }
        }
      },
      getJidiaoo () {
        if(this.visitorList.type == 3 && this.visitorList.company.toString().length>4){
          console.log(1111, {token: '0828',mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.company.toString() || ''});
          reserveNum(JSON.stringify({token: '0828',mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.company.toString() || ''})).then(function (res) {
            console.log(res);
            console.log(typeof res);
            console.log(JSON.parse(res));
          })
        }
      },
      //返回线路列表
      handleHide: function() {
        this.$emit('setMode', 'groupreserve');
      },
      submitForm () {
        console.log(1111, this.visitorList);
      },
      getJidiao () {
        if(this.visitorList.type == 3 && this.visitorList.mobile.toString().length>6){
          reserveNum({token: '0828',mobile: this.visitorList.mobile.toString() || '', companyname: this.visitorList.company.toString() || ''}).then(function (res) {
            console.log(res);
            console.log(typeof res);
            console.log(JSON.parse(res));
          })
        }
      }
//			onScroll() {
//				let scrolled = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop　　　 // 586、1063分别为第二个和第三个锚点对应的距离
//				let jump = document.querySelectorAll('.d_jump')
//				let two = jump[1].offsetTop
//				let three = jump[2].offsetTop
//				let four = jump[3].offsetTop
//				if(scrolled >= four) {
//					this.active = 3
//				}else if(scrolled < four && scrolled >= three){
//					this.active = 2
//				} else if(scrolled < three && scrolled >= two) {
//					this.active = 1
//				} else {
//					this.active = 0
//				}
//			}
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
      padding: 0 40px 20px 40px;

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

</style>
