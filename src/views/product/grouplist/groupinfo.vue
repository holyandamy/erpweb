<template>
  <div>
    <div v-if="modeType= 'groupinfo'">
      <header>
        <el-row >
          <el-col :span="12">
            <el-breadcrumb separator="/" style="font-size:18px;color:#2cb1b6">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item><span @click="handleHide()">发团列表</span></el-breadcrumb-item>
              <el-breadcrumb-item>{{optionName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>

        </el-row>
        <ul>
          <li v-for="(menu,index) in menus" :class="{active:active==index}" :key="index" @click="jump(index)">{{menu}}</li>
        </ul>
      </header>
      <section>
        <h2 class="d_jump" >下单</h2>
        <div class="bgfff">
          <!--<h3>{{detail.name}}</h3>-->
          <div class="linecenter">
            <el-row>
              <el-col :span="12">
                <ul>
                  <li><span>线路名称：</span> {{detail.name || ''}}</li>  <!-- -- {{detail.categoryName}}-->
                  <li><span>团号：</span>{{detail.teamno }}</li>
                  <!--出行方式:1跟团游，2自由行-->
                  <li><span>结算价格：</span>
                    成人： {{detailOut.sltaduilt}}元/人 &nbsp;&nbsp; /
                    儿童： {{detailOut.sltchild}}元/人 &nbsp;&nbsp;  /
                    婴儿： {{detailOut.sltbaby}}元/人
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
                <span>集合通知：</span>{{detailOut.notify}}
              </p>
            </el-row>
            <p>交通&nbsp;：</p>
            <!-- 交通信息模块  满意 -->
            <table class="adulttable" width="100%">
                <thead>
                <tr>
                  <td width="150">交通名称</td>
                  <td width="50">行程</td>
                  <td width="150">出发地/目的地</td>
                  <td width="60">经停/直达</td>
                  <td width="60">去程班次</td>
                  <td width="150">出发时间/抵达时间</td>
                </tr>
                </thead>
                <tbody>
              <!--   显示 添加单程 -->
                <tr v-for='(item,idx) in trackArr' :key="idx">
                  <!-- 路线名称 -->
                  <td >
                    <el-input v-model='item.name' :disabled="true"></el-input>
                  </td>
                  <td>
                    <el-tag type="gray">单程</el-tag>
                  </td>
                  <td>
                    <el-input  style='width: 40%;'  v-model='item.depart' :disabled="true"></el-input> --- <el-input   style='width: 40%;' v-model='item.dest' :disabled="true"></el-input>
                  </td>
                  <td>
                    <el-input  v-model='item.stop' :disabled="true"></el-input>
                  </td>
                  <td>
                    <el-input  v-model='item.flightno' :disabled="true"></el-input>
                  </td>
                  <td>
                   
                    <el-time-picker
                      :disabled="true"
                      :editable="true"
                      :clearable="true"
                      style='width: 30%;'
                      v-model="item.starttime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      placeholder="时间">
                    </el-time-picker> ---
                    <el-checkbox v-model="item.arrivetype" :disabled="true">次日</el-checkbox>
                    <el-time-picker
                      :disabled="true"
                      :editable="true"
                      :clearable="true"
                      style='width: 30%;'
                      v-model="item.endtime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      placeholder="时间">
                     </el-time-picker>
                     
                  </td>
                
                </tr>
               </tbody>
                <!-- 显示 添加往返 -->
               <tfoot v-for='(item,idx) in gobackArr' :key="idx" >
                <!-- 往 -->
                  <tr>
                    <!-- 路线名称 -->
                    <td :rowspan="rowNum">
                      <el-input v-model='item.name' :disabled="true" ></el-input>
                    </td>
                    <td>
                      <el-tag type="gray">{{ item.type=="联程"?"联程" : "往" }}</el-tag>
                    </td>
                    <td>
                      <el-input  style='width: 40%;'  v-model='item.depart' :disabled="true"></el-input> --- <el-input   style='width: 40%;' v-model='item.dest' :disabled="true"></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.stop' :disabled="true"></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.flightno' :disabled="true"></el-input>
                    </td>
                    <td>
                     
                      <el-time-picker
                        :disabled="true"
                        :editable="false"
                        :clearable="false"
                        style='width: 30%;'
                        v-model="item.starttime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker> ---
                       <el-checkbox v-model="item.arrivetype" :disabled="true">次日</el-checkbox>
                      <el-time-picker
                        :disabled="true"
                        :editable="false"
                        :clearable="false"
                        style='width: 30%;'
                        v-model="item.endtime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker>
                      <!--<el-input class='doubleTrc'  style='width: 40%;' ></el-input> <span v-if="item.type==1">-&#45;&#45; </span><el-input class='doubleTrc' v-if="item.type==1" style='width: 40%;'></el-input>-->
                    </td>
                  </tr>
                  <!-- 返-->
                  <tr v-for='(item,idx) in item.others.slice(1)' :key="idx">
                    <td>
                        <el-tag type="gray">{{ (item.type=="联程")||(item.type==2)?"联程" : "返" }}</el-tag>
                    </td>
                    <td>
                      <el-input  style='width: 40%;'  v-model='item.depart' :disabled="true"></el-input> --- <el-input   style='width: 40%;' v-model='item.dest' :disabled="true"></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.stop' :disabled="true"></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.flightno' :disabled="true"></el-input>
                    </td>
                    <td>
                      <el-time-picker
                        :disabled="true"
                        :editable=false
                        :clearable=false
                        style='width: 30%;'
                        v-model="item.starttime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker> ---
                      <el-checkbox v-model="item.arrivetype" :disabled="true">次日</el-checkbox>
                      <el-time-picker
                        :disabled="true"
                        :editable=false
                        :clearable=false
                        style='width: 30%;'
                        v-model="item.endtime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker>
                    </td>  
                  </tr>
              </tfoot>
            </table>

            
            <el-table :data="groupList"
                      border
                      style="width: 100%">
              <el-table-column
                prop="plan"
                label="计划人数"
                width="180">
              </el-table-column>
              <el-table-column
                prop="book"
                label="预订人数"
                width="180">
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="sit"-->
                <!--label="占位">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="surplus"
                label="余位">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button class="hasid" id="b6152355735911e788410242ac120009" @click="setModee(2)" type="primary" size="medium ">预定</el-button>
                  <!--<el-button class="hasid" id="b175d38b735911e788410242ac120009" @click="setModee(1)" type="text" size="small">占位</el-button>-->
                  <el-button class="hasid" id="6f6276e6734611e788410242ac120009" @click="setModEdit(detailOut.teamid)" type="primary" size="medium ">编辑团期</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
        <h2 class="d_jump">基本信息</h2>
        <div class="bgfff">
          <!--<h3>{{detail.name}}</h3>-->
          <div class="linecenter">
            <el-row>
              <el-col :span="12">
                <ul>
                  <li><span>线路分类：</span> {{{0:'全部',1:'国内',2:'出境游',3:'周边游'}[detail.categorytype]}}-- {{detail.categoryName}}</li>
                  <li><span>出行方式：</span>{{detail.type == 1 ? '跟团游' : '自由行'}}</li>
                  <!--出行方式:1跟团游，2自由行-->
                  <li><span>收客类型：</span>
                    <el-checkbox label="成人" prop="isadult" disabled v-model="detail.isadult"></el-checkbox>
                    <el-checkbox label="儿童" prop="ischild" disabled v-model="detail.ischild"></el-checkbox>
                    <el-checkbox label="婴儿" prop="isbaby" disabled v-model="detail.isbaby"></el-checkbox>
                  </li>

                </ul>
              </el-col>
              <el-col :span="12">
                <ul style="padding-left: 30px;">
                  <li><span>出港地：</span>{{detail.depart}}</li>
                  <li><span>目的地：</span>{{detail.dest}}</li>
                  <li><span>交通工具：</span>去：{{{'0':'---',1:'飞机',2:'动车',3:'火车',4:'高铁',5:'大巴',6:'轮船'}[detail.trafficgo]}} | 返：{{{'0':'---',1:'飞机',2:'动车',3:'火车',4:'高铁',5:'大巴',6:'轮船'}[detail.trafficreturn]}}</li>

                  <!--去程交通：1飞机，2动车，3火车，4高铁，5大巴，6轮船-->
                </ul>
              </el-col>
              <el-col :span="24">
                <span style="float: left;">线路说明：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><div class="xc" style="float: left; line-height: 55px;">{{detail.remark}}</div>
              </el-col>
              <div style="clear: both;"></div>
              <p>
                <span>集合地点：</span>{{detail.station}}
              </p>
              <div class="topimglist">
                <span style="float: left;">图片：</span>
                <div class="xc" style="float: left; line-height: 26px;">
                  <ul>
                    <li v-if='toplist' v-for="img in toplist" style='float: left;'>
                      <img style='width: 168px;height: 168px;margin: 0 10px;' :src="img"/>
                    </li>
                    <li v-if='!toplist'>
                      ---
                    </li>
                  </ul>
                </div>
              </div>
            </el-row>
          </div>

        </div>
        <h2 class="d_jump">行程 <span>天数：{{detail.days}}天</span></h2>
        <div class="daylist" v-for="route in detail.routes" v-if="edittype">
          <div class="day">
            第<span>{{route.number}}</span>天
          </div>
          <div class="title">
            {{route.title}}
          </div>
          <ul>
            <li>
              <span>三餐</span>
              <div class="xc">

                <el-checkbox label="早" disabled v-model="route.isbreakfast"></el-checkbox>
                <el-checkbox label="中" disabled v-model="route.islunch"></el-checkbox>
                <el-checkbox label="晚" disabled v-model="route.isdinner"></el-checkbox>
              </div>
            </li>
            <li>
              <span>住宿</span>
              <div class="xc">
                {{route.hotel}}
              </div>
            </li>
            <li>
              <span>行程{{detail.edittype}}</span>
              <div class="xc">
                <pre>{{route.content}}</pre>
              </div>
            </li>
            <li>
              <span>备注</span>
              <div class="xc">
                {{route.remark || '无'}}
              </div>

            </li>
            <li>
              <span>图片</span>
              <div class="xc">
                <div v-if='route.titleimages' v-for="im in route.titleimages">  <!--  .split(',')  -->
                  <img style='width: 168px;height: 168px;margin: 0 10px;' :src="im"/>
                </div>
                <div v-if='!route.titleimages'>
                  ---
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content" v-else>

				<span v-html="detail.routes[0].content">
				  {{detail.routes[0].content}}
				</span>
        </div>
        <h2 class="d_jump">预定须知</h2>
        <div class="bgfff">
          <ul class="notes">
            <li><span style="line-height: 26px;">不含项目：</span>

              <div class="xc">
                {{detail.excludePkg}}
              </div>
            </li>
            <li><span>包含项目：</span>
              <div class="xc">
                <pre>{{detail.includePkg}}</pre>
              </div>
            </li>
            <li><span>购物安排：</span>
              <div class="xc">
                <pre>{{detail.shopping}}</pre>
              </div>
            </li>
            <li><span>温馨提示：</span>
              <div class="xc">
                <pre>{{detail.reminder}}</pre>
              </div>
            </li>
            <li><span>儿童/老人：</span>
              <div class="xc">
                <pre>{{detail.childolder}}</pre>
              </div>
            </li>
            <li><span>对外备注：</span>
              <div class="xc">
                <pre>{{detail.outremark}}</pre>
              </div>
            </li>
            <li><span>内部备注：</span>
              <div class="xc">
                <pre>{{detail.innerremark}}</pre>
              </div>
            </li>
          </ul>
        </div>
        <h2 class="d_jump">发布平台 </h2>
        <div class='pingtai'>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="idx" :key="item.name" style="margin-right: 40px;" v-for='(item,idx) in pingtai'>{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </section>
      <el-button class='back-list' type="primary" @click="backList">返回</el-button>

    </div>
  </div>
</template>

<script>
  import {orderdet,openlist} from '../../../common/js/config';
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  export default {
    props: ['categoryId'],
    data() {
      return {
        optionName:'下单',
        modeType: 'groupinfo',
        menus: ['下单', '基本信息', '行程', '预定须知', '发布平台'],
        active: 0,
        detail: {},
        detailOut: {},
        groupList: [],
        loglist: [],
        edittype: true,
        imglist: [],
        toplist: [],
        pingtai: [],
        checkList: [],
           /* 单程数组 */
        trackArr:[],
         /* 往返数组 */
        gobackArr:[],
      }
    },
    components:{
    },
    mounted: function () {
      this.getlineinfo()
    },
    created(){
      this.getPingtai();
    },
    updated: function() {
      this.$nextTick(function() {
        showorhide()
      })
    },
    methods: {
      // 平台列表
      getPingtai () {
        let _this = this;
        openlist({token: paramm.getToken()}).then(function (res) {
          _this.pingtai = res.data.obj
        })
      },
//      setMode(type){
//        this.modeType=type;
//      },
      getlineinfo() {
        let para = {
          token: paramm.getToken(),
          id: this.categoryId
        }
        let _this = this;
        /*获取产品管理 下面 下单信息  满意  */
        orderdet(para).then((res) => {
          this.detailOut = res.data.obj
          this.detail = res.data.obj.line
          this.groupList = [res.data.obj]
          if(this.detail.images) this.toplist = this.detail.images.split(',')
          //设置交通信息模块
           var result=res.data.obj;
             for(var i=0;i<result.traffics.length;i++){
              console.log(result.traffics[i].starttime);
              var hh=result.traffics[i].starttime.slice(0,result.traffics[i].starttime.indexOf(":") );
              var ehh=result.traffics[i].endtime.slice(0,result.traffics[i].endtime.indexOf(":") );
              var mm=result.traffics[i].starttime.slice(result.traffics[i].starttime.indexOf(":")+1,result.traffics[i].starttime.indexOf(":")+3);
              var emm=result.traffics[i].endtime.slice(result.traffics[i].endtime.indexOf(":")+1,result.traffics[i].starttime.indexOf(":")+3);
              
              result.traffics[i].starttime=new Date(2016,9,10,hh,mm);
              result.traffics[i].endtime=new Date(2016,9,10,ehh,emm);
              result.traffics[i].arrivetype=result.traffics[i].arrivetype==0?false:true;
              for(var k=0;k<result.traffics[i].others.length;k++){
                result.traffics[i].others[k].arrivetype=result.traffics[i].others[k].arrivetype==0?false:true;
              }
             if(result.traffics[i].typeName=="单程"){
               result.traffics[i].others=[];
               _this.trackArr.push(result.traffics[i]);
            
             }else if((result.traffics[i].typeName=="往返")||(result.traffics[i].typeName=="联城")){
               for(var k=0;k<result.traffics[i].others.length;k++){  
                result.traffics[i].others[k].starttime=new Date(2016,9,10, result.traffics[i].others[k].starttime.slice(0, result.traffics[i].others[k].starttime.indexOf(":")),
                 result.traffics[i].others[k].starttime.slice( result.traffics[i].others[k].starttime.indexOf(":")+1,result.traffics[i].others[k].starttime.indexOf(":")+3));
                  
                  result.traffics[i].others[k].endtime=new Date(2016,9,10, result.traffics[i].others[k].endtime.slice(0, result.traffics[i].others[k].endtime.indexOf(":")),
                 result.traffics[i].others[k].endtime.slice( result.traffics[i].others[k].endtime.indexOf(":")+1,result.traffics[i].others[k].endtime.indexOf(":")+3));
                
               }
                result.traffics[i].type=result.traffics[i].type==1?"往返":"联程";
               _this.gobackArr.push(result.traffics[i]);
              _this.rowNum=result.traffics[i].others.length;
             }
           }
          // 设置平台显示状态
          this.detailOut.platforms.forEach(function (item,idx) {
            if(item.isenable) _this.checkList.push(idx)
          })

          if (this.detail.edittype == 0) {
            this.edittype = true
          } else {
            this.edittype = false
            let str = this.detail.routes[0].content
            this.detail.routes[0].content = str
          }
          this.loglist = res.data.obj.logs
          let categorytype = res.data.obj.categorytype
          switch (categorytype) {
            case 0:
              this.detail.categorytype = "全部";
              break;
            case 1:
              this.detail.categorytype = "国内";
              break;
            case 2:
              this.detail.categorytype = "出境游";
              break;
            case 3:
              this.detail.categorytype = "周边游";
              break;
          }
          let day = res.data.obj.trafficgo
          switch (day) {
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
          let trafficback = res.data.obj.trafficreturn
          switch (trafficback) {
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
          for (var i = 0; i < this.detail.routes.length; i++) {
            let arr = []
            if(res.data.obj.line.routes[i].titleimages) {
              arr = res.data.obj.line.routes[i].titleimages.split(',')
            }
            this.detail.routes[i].titleimages = arr
          }
        })
      },
      jump(index) {
        this.active = index

        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop
        let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total
          step = newTotal / 50
          smoothUp()
        }

        function smoothDown() {
          if (distance < total) {
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
          if (distance > total) {
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
      //返回线路列表
      backList: function () {
        this.$emit('setMode', 'list');
      },
      handleHide: function () {
        this.$emit('setMode', 'list');
      },
      setModee: function (typ) {
        this.$emit('setMode', 'reserve',typ);
      },
      setModEdit: function (sonData) {
        this.$emit('setMode', 'newgroup','edit',sonData);
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
    height: 66px;
    padding: 25px 30px 0 30px;
    background: #fff;
    position: fixed;
    width: 100%;
    z-index: 15;
    top: 0;
    .el-row{
      height: 30px;
    }
    li {
      float: left;
      height: 37px;
      border-top: 3px solid transparent;
      padding: 0 25px;
      line-height: 37px;
      font-size: 14px;
      cursor: pointer;
    }
    .active {
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
      padding-top: 34px;
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

  pre {
    font-size: 14px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #333;
    white-space: pre-wrap;
  }

  .content {
    padding: 20px 30px;
    background: #fff;
  }

  .topimglist {
    span {
      font-size: 14px;
      color: #666;
      width: 90px;
      display: inline-block;
    }
  }
  .pingtai{
    padding: 20px 0 30px 40px;
    background-color: #fff;
  }
  .hasid {
    display: none;
  }
  .back-list{
    width: 120px;
    margin: 20px 0 50px 0;
  }
  /* 交通信息样式 */

   .adulttable {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #dee5ec;
  }
   .adulttable thead td {
        background: #f5f7f9;
        border-bottom: 1px solid #bfcbda;
        border-right: 1px solid #bfcbda;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
.adulttable tbody td, .adulttable tfoot  td{
        padding: 8px;
        border-bottom: 1px solid #dee5ec;
        border-right: 1px solid #dee5ec;
        min-height: 50px;
        text-align: center;
        vertical-align: middle;
}
.adulttable tbody td .doubleTrc, .adulttabl tfoot td .doubleTrc{
          margin-top: 10px;
        }
</style>
