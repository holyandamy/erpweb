<template>
  <div>
    <section>
      <h2 class="d_jump">下单</h2>
      <div class="bgfff">
        <!--<h3>{{detail.name}}</h3>-->
        <div class="linecenter">
          <el-row>
            <el-col :span="12">
              <ul>
                <li><span>线路名称</span> {{detail.categorytype}} -- {{detail.categoryName}}</li>
                <li><span>团号</span>{{detail.type == 1?'跟团游':'自由行'}}</li>
                <!--出行方式:1跟团游，2自由行-->
                <li><span>结算价格</span>
                  <el-checkbox label="成人" prop="isadult" disabled v-model="detail.isadult"></el-checkbox>
                  <el-checkbox label="儿童" prop="ischild" disabled v-model="detail.ischild"></el-checkbox>
                  <el-checkbox label="老人" prop="isbaby" disabled v-model="detail.isbaby"></el-checkbox>
                </li>

              </ul>
            </el-col>
            <el-col :span="12">
              <ul style="padding-left: 30px;">
                <li><span>出发时间</span>{{detail.depart}}</li>
                <li><span>回团时间</span>{{detail.dest}}</li>
              </ul>
            </el-col>
            <div style="clear: both;"></div>
            <p>
              <span>集合通知</span>{{detail.station}}
            </p>
            <p>
              <span>操作人</span>
            </p>
          </el-row>

        </div>

      </div>
      <h2 class="d_jump">客户信息</h2>
      <div class="bgfff">
        <div class="baseinfo">
          <el-form label-width="100px">
            <el-form-item label="客户类型">
              <el-select placeholder="请选择" v-model="cvalue">
                <el-option v-for="item in ctype" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人手机">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="cvalue == 2">
              <el-col :span="12">
                <el-form-item label="公司名称">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计调">
                  <el-select placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="备注">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="成人数"><el-input></el-input></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="儿童数"><el-input></el-input></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="婴儿数"><el-input></el-input></el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="成人数">
                  <el-button>导入游客名单</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="成人数">
                  <el-button>下载名单模板</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {orderdetail} from '../../../common/js/config';
  export default {
    props:['categoryId'],
    data() {
      return {
        cvalue: '',
        ctype: [
          {label:'直客', value: 1},
          {label: '旅行社', value: 2}
        ],
        active:0,
        detail:{},
        edittype:true,
      }
    },
    mounted: function() {
//      this.getlineinfo()
    },
    methods: {
      getlineinfo(){
        let para = {
          token:'',
          id:this.categoryId
        }
        orderdetail(para).then((res) => {
          console.log(res.data);
          return;
          this.detail = res.data.obj
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
      //返回线路列表
      handleHide: function() {
        this.$emit('setMode', 'grouplist');
      }
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
      .baseinfo {
        background: #fff;
        padding-top: 20px;
      }
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
</style>
