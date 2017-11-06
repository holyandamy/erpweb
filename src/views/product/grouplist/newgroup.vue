<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>产品管理</el-breadcrumb-item>
            <el-breadcrumb-item><span @click="handleHide()">发团列表</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{{'add':'新增发团计划','edit':'编辑','detail':'详情'}[operationType.type]}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
         
      </el-row>
    </header>
    <section class="padding30">
      <el-row class="bg_white">
        <el-col :span="20" style="width: 100%">
          <el-form :model="groupList"  ref="groupList"   :rules="rules"  label-width="100px" class="demo-ruleForm" style="text-align: left;"><!-- visitorList  -->
            <div style="width:100%;float: left;overflow:hidden">
              <el-form-item label="选择线路：" required>
                <el-button @click="getcategoryall()" :disabled="operationType.type == 'edit'">选择</el-button>
                <span class='routeName' style='padding-left: 10px;' v-text='routeName'>222</span>
              </el-form-item>
              <!--<el-form-item label="取消政策：" >-->
                <!--订单确认后 &nbsp;&nbsp;&nbsp;-->
                <!--<el-input v-model="cancell"  style='width: 8%;'> </el-input>-->
                <!--小时内未完成订单金额收款，则订单取消，释放对应库存。不填则永久不取消。-->
              <!--</el-form-item>-->
              <el-form-item label="集合通知：" prop="notify">
                <el-col :span="4" style="width: 100%;margin-right: 10px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 5}"
                    placeholder="限120字以内!"
                    v-model="groupList.notify">
                  </el-input>
                </el-col>
              </el-form-item>
              <div style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">
                交通信息</div>
              <el-radio-group class='trafficRadio' v-model="traffictype" @change='changeTrack' >
                <el-radio class='trafficRadio_son' :label="0" :disabled="operationType.type == 'edit'" >普通交通</el-radio>
                <el-radio :label="1" :disabled="operationType.type == 'edit'">控位交通</el-radio>
              </el-radio-group>
              <table class="adulttable" width="100%">
                <thead>
                <tr>
                  <td width="150">交通名称</td>
                  <td width="50">行程</td>
                  <td width="150">出发地/目的地</td>
                  <td width="60">经停/直达</td>
                  <td width="60">去程班次</td>
                  <td width="150">出发时间/抵达时间</td>
                  <td width="50">操作</td>
                </tr>
                </thead>
                <tbody>
              <!--   显示 添加单程 -->
                <tr v-for='(item,idx) in trackArr' :key="idx">
                  <!-- 路线名称 -->
                  <td >
                    <el-input v-model='item.name' ></el-input>
                  </td>
                  <td>
                    <el-tag type="gray">单程</el-tag>
                  </td>
                  <td>
                    <el-input  style='width: 40%;'  v-model='item.depart'></el-input> --- <el-input   style='width: 40%;' v-model='item.dest'></el-input>
                  </td>
                  <td>
                    <el-input  v-model='item.stop'></el-input>
                  </td>
                  <td>
                    <el-input  v-model='item.flightno'></el-input>
                  </td>
                  <td>
                   
                    <el-time-picker
                      :editable="true"
                      :clearable="true"
                      style='width: 30%;'
                      v-model="item.starttime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      placeholder="时间">
                    </el-time-picker> ---
                    <el-checkbox v-model="item.arrivetype">次日</el-checkbox>
                    <el-time-picker
                      :editable="true"
                      :clearable="true"
                      style='width: 30%;'
                      v-model="item.endtime"
                      :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                      placeholder="时间">
                     </el-time-picker>
                     
                  </td>
                  <td>
                    <el-button type="text"  @click="deleteTrc(idx)" :disabled="item.del">删除</el-button>
                  </td>
                </tr>
               </tbody>
                <!-- 显示 添加往返 -->
               <tfoot v-for='(item,idx) in gobackArr' :key="idx" >
                <!-- 往 -->
                  <tr>
                    <!-- 路线名称 -->
                    <td :rowspan="rowNum">
                      <el-input v-model='item.name' ></el-input>
                    </td>
                    <td>
                      <el-tag type="gray">{{ item.type=="联城"?"联城" : "往" }}</el-tag>
                    </td>
                    <td>
                      <el-input  style='width: 40%;'  v-model='item.depart'></el-input> --- <el-input   style='width: 40%;' v-model='item.dest'></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.stop'></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.flightno'></el-input>
                    </td>
                    <td>
                     
                      <el-time-picker
                        :editable="false"
                        :clearable="false"
                        style='width: 30%;'
                        v-model="item.starttime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker> ---
                       <el-checkbox v-model="item.arrivetype">次日</el-checkbox>
                      <el-time-picker
                        :editable="false"
                        :clearable="false"
                        style='width: 30%;'
                        v-model="item.endtime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker>
                      <!--<el-input class='doubleTrc'  style='width: 40%;' ></el-input> <span v-if="item.type==1">-&#45;&#45; </span><el-input class='doubleTrc' v-if="item.type==1" style='width: 40%;'></el-input>-->
                    </td>
                    <td :rowspan="rowNum">
                      <el-button type="text"  @click="deleteTfoot(idx)" :disabled="item.del">删除</el-button>
                    </td>
                  </tr>
                  <!-- 返-->
                  <tr v-for='(item,idx) in item.others.slice(1)' :key="idx">
                    <td>
                        <el-tag type="gray">{{ (item.type=="联城")||(item.type==2)?"联城" : "返" }}</el-tag>
                    </td>
                    <td>
                      <el-input  style='width: 40%;'  v-model='item.depart'></el-input> --- <el-input   style='width: 40%;' v-model='item.dest'></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.stop'></el-input>
                    </td>
                    <td>
                      <el-input  v-model='item.flightno'></el-input>
                    </td>
                    <td>
                      <el-time-picker
                        :editable=false
                        :clearable=false
                        style='width: 30%;'
                        v-model="item.starttime"
                        :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                        placeholder="时间">
                      </el-time-picker> ---
                      <el-checkbox v-model="item.arrivetype">次日</el-checkbox>
                      <el-time-picker
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

              <el-button class='trackAdd' type="primary" @click="trackAddSig" v-if='traffictype!=1'>添加单程</el-button>
              <el-button class='trackAdd' type="primary" @click="trackAddBac" v-if='traffictype!=1'>添加往返</el-button>
              <el-button class='trackAdd' type="primary"  @click="insertTrack">导入交通</el-button>


              <div style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">
                发团时间
              </div>
              <!-- <el-form-item label="发团时间：" prop="date" v-if='traffictype!=1'>
                <el-col :span="4" style="width: 100%;margin-right: 10px">
                  <el-date-picker
                    :clearable = false
                    :editable = false
                    @change='addTr'
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-col>
              </el-form-item> -->
              <!-- 满意 -->
                <div class="test" v-if="traffictype!=1">
                      <div class="traffic-noraml-wrap mb20">
                    
                              <div class="group-box">
                                  <span class="clear-day action-clearday">清除所选日期</span>
                                  <a class="button-middle-v1 button-bg-green button-font-white button-operate-datepicker-add">添加日历</a>
                                  <a class="button-middle-v1 button-bg-green button-font-white ml6 button-operate-datepicker-sub">删除日历</a>
                              </div>
                              <div class="date-list-wrap"></div>
                      </div>
                    <table class="iframe-lineroad-table mb10 iframe-lineroad-border iframe-lineroad-border-third tc table-price" align="center">
                        <tbody id="line-price">
                        </tbody>
                    </table>
                    <script id="tmp-lineprice-info" type="text/x-jquery-tmpl">
                    <tr data-date="${date}" class="tr-append lineprice-append">
                      <td><label><input type="checkbox" class="item-select"><span class="index"></span></label></td>
                      <td>${date}<br>${week}</td>
                    </tr>
                    </script>
	            </div>	

             <!-- 发团时间表头模块-->
              <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                   style="width: 100%;">
                <div class="el-table__body-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style=" width: 100%;text-align: center">
                    <thead>
                    <tr style="text-align: center">
                      <th colspan="1" rowspan="1" class="is-leaf" >
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
                      <th colspan="4" rowspan="1" class="is-leaf"  style="text-align: center"  >
                        <div class="cell">成本价/元</div>
                      </th>
                      <th class="gutter" style="width: 0px;"></th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr class="el-table__row">
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
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
      
                     <tr class="el-table__row" >
                      <td class="el-table_1_column_123 el-table-column--selection">
                        <!--{{item.checked}}-->
                        <el-checkbox @change="allCheck" v-model="allChecked">全选</el-checkbox>
                      </td>
                      <td>
                        <div class="cell" style='cursor: pointer;' >---</div>
                      </td>
                      <td width='800'>---</td>
                      <td>
                        <div class="cell" >
                          <el-input v-model="allplan" @change="allPlan"></el-input>
                        </div>
                      </td>
                      <td >
                        <div class="cell" style='cursor: pointer;' >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" >---</div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input  v-model="alldeadline" @change="allDeadline" ></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktbaby" @change="allMktbaby"></el-input></div>
                      </td>
                       <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktchild" @change="allMktchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktaduilt" @change="allMktaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allmktroom" @change="allMktroom"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltbaby" @change="allSltbaby"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltchild" @change="allSltchild"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allsltaduilt" @change="allSltaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allsltroom" @change="allSltroom"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allcostbaby" @change="allCostbaby"></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allcostchild" @change="allCostchild"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="allcostaduilt" @change="allCostaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="allcostroom" @change="allCostroom"></el-input></div>
                      </td>
                    </tr>
                   <!-- 发团时间填充模块 -->
                    <tr class="el-table__row" v-for='(item,idx) in checkArr' :key="idx">
                      <td class="el-table_1_column_123 el-table-column--selection">
                        <el-checkbox v-model="item.checked" @change='sigCheck'></el-checkbox>
                      </td>

                      <td>
                        <div class="cell" style='cursor: pointer;' @click='sigDel(item,idx)'>删除</div>
                      </td>
                      <td width='800'>
                        {{item.starttime }}
                      </td>
                      <td>
                        <div class="cell" >
                          <el-input v-model="item.plan"></el-input>
                          <span v-if="operationType.type == 'edit'" style='color: green;'>已收：{{item.book + item.sit}}</span>

                        </div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-checkbox v-model="item.isorder"></el-checkbox></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="item.confirm" label='0'>自动</el-radio></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-radio class="radio" v-model="item.confirm" label='1'>手动</el-radio></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.deadline"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktbaby"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktaduilt"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.mktroom"></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltbaby"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.sltroom"></el-input></div>
                      </td>

                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.costbaby"></el-input></div>
                      </td>
                      <td  >
                        <div class="cell el-tooltip" ><el-input v-model="item.costchild"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.costaduilt"></el-input></div>
                      </td>
                      <td >
                        <div class="cell el-tooltip" ><el-input v-model="item.costroom"></el-input></div>
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
              <div style="overflow: hidden;padding-left: 60px;">
                  <el-checkbox  style="margin-right: 40px;"  v-model="editChi" @change="sys(1)" :disabled="operationType.type == 'edit'" >馨·驰誉</el-checkbox>
                  <el-checkbox  style="margin-right: 40px;"  v-model="editHuan" @change="sys(2)" :disabled="operationType.type == 'edit'">馨·欢途</el-checkbox>
              </div>
               <!-- 这里为同步到对接平台的单选中后的show --> 
             
               <div v-if="editChi||editHuan">
                    <h2 style="color: #2cb1b6; font-size: 20px;padding-top: 20px;line-height: 40px;margin-bottom: 20px;border-bottom:1px solid rgba(151, 151, 151, 0.2)">选择类目</h2>
                    <div  v-if="editChi">
                      <p>
                        <span>馨·驰誉</span>
                          <el-select placeholder="请选择类目"  @change="categoryChange" v-model="categoryvalue" :disabled="operationType.type == 'edit'">
                            <el-option  value="国内长线" >国内长线</el-option>
                            <el-option  value="周边短线" >周边短线</el-option>
                            <el-option  value="出境长线" >出境长线</el-option>
                          </el-select>
                            <el-select v-model="subvalue" placeholder="请选择" @change="subchange" v-if="operationType.type == 'add'">
                            <el-option
                              v-for="item in lineArr"
                              :key="item.categoryName"
                              :label="item.categoryName"
                              :value="item.categoryName">
                            </el-option>
                          </el-select>
                          <el-input v-model="editsubvalue" placeholder="请输入内容" v-if="operationType.type == 'edit'" size="medium" style="width: 14%" :readonly="true"></el-input>
                        </p>
                        <p  style="margin-top:20px " v-if="subvalue!=''|| (operationType.type == 'edit')">
                          <span>请选择玩法：</span>
                            <el-radio-group  v-model="initValue" ref="checkedplayName">
                              <el-radio class="radio" v-for="(item,index) in playArr" :key="index" :label="item.labelId">{{item.labelName}}</el-radio>
                           </el-radio-group>
                             <el-radio v-model="editplay" :label="editplay" v-if="operationType.type == 'edit'" disabled >{{editplay}}</el-radio>
                        </p>
                        <p  style="margin-top:20px " v-if="subvalue!=''||(operationType.type == 'edit')">
                           <span>请选择站点:</span>
                           <el-checkbox-group v-model="checksiteArr" v-if="operationType.type == 'add'">
                            <el-checkbox  v-for="(item,index) in siteArr" :key="index" :label="item.siteId">{{item.siteName}}</el-checkbox >
                            </el-checkbox-group>
                            <el-checkbox v-model="siteChecked" disabled v-for="(item,index) in editnewsiteArr" :key="index" :label="item.siteId" v-if="operationType.type == 'edit'">{{item.siteName}}</el-checkbox >
                        </p>
                    </div>
                     <div v-if="editHuan" style="margin-top:20px">
                      <p>
                        <span>馨·欢途</span>
                          <el-select placeholder="请选择类目"  @change="categoryChange_huan" v-model="categoryvalue_huan" :disabled="operationType.type == 'edit'">
                            <el-option  value="国内长线">国内长线</el-option>
                            <el-option  value="周边短线">周边短线</el-option>
                            <el-option  value="出境长线">出境长线</el-option>
                          </el-select>
                            <el-select v-model="subvalue_huan" placeholder="请选择" @change="subchange_huan" v-if="operationType.type == 'add'">
                            <el-option
                              v-for="item in lineArr_huan"
                              :key="item.categoryName"
                              :label="item.categoryName"
                              :value="item.categoryName">
                            </el-option>
                          </el-select>
                           <el-input v-model="editsubvalue_huan" placeholder="请输入内容" v-if="operationType.type == 'edit'" size="medium" style="width: 14%" :readonly="true"></el-input>
                        </p>
                        <p  style="margin-top:20px "  v-if="subvalue_huan!=''|| (operationType.type == 'edit')">
                          <span>请选择玩法：</span>
                            <el-radio-group  v-model="initValue_huan" >
                              <el-radio class="radio" v-for="(item,index) in playArr_huan" :key="index" :label="item.labelId">{{item.labelName}}</el-radio>
                           </el-radio-group>
                              <el-radio v-model="editplay_huan" :label="editplay_huan" v-if="operationType.type == 'edit'" disabled >{{editplay_huan}}</el-radio>
                        </p>
                         <p  style="margin-top:20px " v-if="subvalue_huan!=''||(operationType.type == 'edit')">
                           <span>请选择站点:</span>
                           <el-checkbox-group v-model="checksiteArr_huan" v-if="operationType.type == 'add'">
                            <el-checkbox  v-for="(item,index) in siteArr_huan" :key="index" :label="item.siteId">{{item.siteName}}</el-checkbox >
                          </el-checkbox-group> 
                           <el-checkbox v-model="siteChecked" disabled v-for="(item,index) in editnewsiteArr_huan" :key="index" :label="item.siteId" v-if="operationType.type == 'edit'">{{item.siteName}}</el-checkbox >
                        </p>
                    </div>
                </div>
           
              <el-form-item label-width="200px" style="margin-top: 50px">
                <!--<el-button type="primary" @click="submitForm('visitorList')" style="width: 120px">保存</el-button>-->
                <el-button type="primary" @click="save" style="width: 120px" v-if="operationType.type !='detail' ">保存</el-button>
                <el-button @click="handleHide()" style="width: 120px">{{operationType.type == 'detail'? '返回': '取消'}}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </section>

    <!--选择线路的弹出框-->
    <el-dialog title="选择线路" :visible.sync="lineFlag" size="small">
      <el-form :inline="true"  :model="search" class="demo-form-inline" ref="search" >

        <el-form-item label="线路分类">
          <el-select v-model="search.categoryid" placeholder="请选择" :label-width="labelWidth">
            <el-option v-for="(linesort,index) in linesorts" :key="linesort.value" :label="linesort.name" :value="linesort.id" style="z-index:9999 !important">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="线路名称">
          <el-input v-model="search.linename"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryLine()">查询</el-button>
        </el-form-item>
        <el-form-item label="" >
                <el-radio-group v-model="checkItem" style='width: 100%;text-align: left;padding: 0 50px;' v-if='lineList.length>0 && lineList.length!=2'>  <!--  v-if='lineList.length>0'  -->
                  <el-radio style='width: 50%;margin: 0;' :label="item" :key="item.name" v-for="item in lineList">{{item.name.length>20?item.name.substring(0,20)+'...':item.name}} <span style="margin-left:7px;color:green">{{item.days}}天</span></el-radio>
                </el-radio-group>
                <el-radio-group v-model="checkItem" style='width: 100%;padding-right: 150px;' v-if='lineList.length==2'>  <!--  v-if='lineList.length>0'  -->
                  <el-radio style='width: 50%;margin: 0;' :label="item" :key="item.name" v-for="item in lineList">{{item.name.length>20?item.name.substring(0,20)+'...':item.name}}</el-radio>
                </el-radio-group>
          <div v-if='showNoLine && lineList.length == 0'>
            该分类下没有线路,请前往线路列表中添加!
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lineFlag = false">取 消</el-button>
        <el-button type="primary" @click="checkRot()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="trafficLog" style="text-align: left; font-size: 12px;">
      <el-form >
        <el-form-item label="关键字：">
          <el-input v-model="formName" placeholder='请输入关键字搜索' auto-complete="off" style='width: 40%;margin-right: 20px;'></el-input>
          <el-button type="primary" @click='getTrafficList'>搜索</el-button>

        </el-form-item>
        <el-form-item label="" >
        </el-form-item>
      </el-form>
      <!-- 搜索区域的列表渲染区域 -->
      <el-table :data="importData" style="width:100%">
        <el-table-column prop="name" label="交通名称" width='150'></el-table-column>
        <el-table-column prop="depart" label="出发" width='100'></el-table-column>
        <el-table-column prop="stop" label="中转" width='100'></el-table-column>
        <el-table-column prop="dest" label="抵达" width='100'></el-table-column>
        <el-table-column prop="flightno" label="去程班次" width='100'></el-table-column>
        <el-table-column prop="starttime" label="去程时间" ></el-table-column>
        <el-table-column prop="type" label="类型" width='100' ></el-table-column>
        <el-table-column  label="选择" width='100'>
          <template scope="scope">
            <el-button type="text" size="small" @click='importTrack(scope.row)'>导入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
 
  </div>
</template>
<script>
  import {address} from '../../../common/js/address'
  import axios from 'axios';
  import {syscategorysite,traffitemplateclist,trafficlist,trafficdays,custsave,custupdate,custdetail, province, city, district, categoryall, destlist, linelist,groupsave,openlist,groupupdate,groupdetail,groupDel,groupexists} from '../../../common/js/config';
  import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component";
  import paramm from '../../../common/js/getParam'
  export default {
    props: ['operationType','categoryId'],
    components: {ElDialog},
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
        newDateArr:[],
        isDel:[],
        rowNum:2,
        siteChecked:true,
        editplay:"",
        editplay_huan:"",
        editsubvalue:"",
        editsubvalue_huan:"",
        editOrAdd:false,
        categoryvalue:"",
        categoryvalue_huan:"",
        subvalue:"",
        subvalue_huan:"",
        labelWidth: '800px',
        editChi:false,
        editHuan:false,
        radio: '1',
        traffictype: 0,
        danTrc: '单程',
        /* 单程数组 */
        trackArr:[],
         /* 往返数组 */
        gobackArr:[],
        savegobackArr:[],
        /* 交通保存数组 */
        traffic:[],
        /* 平台数组 */
         platformsArrXin:[],
         platformsArrHuan:[],
         tongbucategoryid:"",
         tongbucategoryid_huan:"",
         tongbucategorytype:"",
         tongbucategorytype_huan:"",
         tongbulabelsname:"",
         tongbulabelsname_huan:"",
         tongbucompanyId:"",
         tongbucompanyId_huan:"",
        platformsArr:[],
        lianChengArr:[],
        tongbudetailArr:[],
        /* 页面中的发团时间以及人数数组 */
        lineArr:[],
        lineArr_huan:[],
        playArr:[],
        siteArr:[],
        siteArr_huan:[],
        /* 同步平台选中的站点id集合 */
        checksiteArr:[],
        checksiteArr_huan:[],
        playArr_huan:[],
        sysTotal:{},
        sysTotal_huan:{},
        /* 页面中已经存在的专门年月日数组 */
        newTimeArr:[],
        trafficLog: false,
        /* 交通列表数组 */
        importData:[],
        initValue:"",
        initValue_huan:"",
        siteinitValue:"",
        /* 线路天数 */
        trafficDays: '',
        lineFlag: false,
        formName: '',
        notice: '',
        lineItemId: '',
        search: {
          status: 1,
          token:paramm.getToken(),
          pageindex:0,
          pagesize: 9999,
          categoryid:'', //分类id
          linename:''//线路名称
        },
        destinations: [],
        editnewsiteArr:[],
        editnewsiteArr_huan:[],
        groupList: {
          token: paramm.getToken(),
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
          birthday:'',
          notify:''
        },

        address:{
          provinceList:[],
          cityList:[],
          districtList:[],
        },
        linesorts: [],
        linelist: [], //线路列表
        lineList: [], //线路列表
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
          notify: [
//            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 0, max: 120, message: '不能超过120字!', trigger: 'blur' }
            ]

        },
        province: [],
        city: [],
        district: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
        checkList: [],
        input: '',
        radio: '',
        checked: '',
        allChecked: '',
        //全选
        checkedAll:'',
        allplan: '',
        plan: '',
        allisorder: true,
        isorder: true,
        allconfirm: '0',
        confirm: '0',
        alldeadline: '',
        deadline: '',
        allmktbaby: '',
        mktbaby: '',
        allmktchild: '',
        mktchild: '',
        allmktaduilt: '',
        mktaduilt: '',
        allmktroom: '',
        mktroom: '',

        allsltbaby: '',
        sltbaby: '',
        allsltchild: '',
        sltchild: '',
        allsltaduilt: '',
        sltaduilt: '',
        allsltroom: '',
        sltroom: '',

        allcostbaby: '',
        costbaby: '',
        allcostchild: '',
        costchild: '',
        allcostaduilt: '',
        costaduilt: '',
        allcostroom: '',
        costroom: '',
        checkArr: [],
        notify: '',
        cancell: 0,
        cancellId: '',
        routeName: '',
        checkItem: '',
        temTime: '',
        startTimeArr: [],
        idx: '',
        pingtai: [],
        idd: '',
        getTimeArr: [],
        dayss: '',
        surpluss: '',
        TemStArr: [],
        platformId: [],
        showNoLine: false
    }
    },

    watch : {
      // 自动 手动
      allconfirm (newValue, oldValue) {
        if(newValue == 0) {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.confirm = '0'
          })
        }
        if(newValue == 1) {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.confirm = '1'
          })
        }
      }
    },
    methods: {
      /* 生成groupid的方法 */
      getgroupid(){
       function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
       }
       return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
      },
      /* 长途 短途 改变时触发的 */
      categoryChange(){
         this.subvalue="" ;
         if(this.categoryvalue=="国内长线"){
          this.lineArr=this.sysTotal.longLine
         
         }else if(this.categoryvalue=="周边短线"){
           this.lineArr=this.sysTotal.shortLine
         }else if(this.categoryvalue=="出境长线"){
            this.lineArr=this.sysTotal.externalLine
         }
      },
      /* 馨·欢途*/
      categoryChange_huan(){
        this.subvalue_huan="" ;
         if(this.categoryvalue_huan=="国内长线"){
          this.lineArr_huan=this.sysTotal_huan.longLine
        
         }else if(this.categoryvalue_huan=="周边短线"){
           this.lineArr_huan=this.sysTotal_huan.shortLine
         }else if(this.categoryvalue_huan=="出境长线"){
            this.lineArr_huan=this.sysTotal_huan.externalLine
         }
      },
      subchange(){
        for(var i=0;i<this.lineArr.length;i++){
          if(this.lineArr[i].categoryName==this.subvalue){
            this.playArr=this.lineArr[i].labels;
          }
        }
      },
      subchange_huan(){
        console.log("huan改变了")
        for(var i=0;i<this.lineArr_huan.length;i++){
          if(this.lineArr_huan[i].categoryName==this.subvalue_huan){
            this.playArr_huan=this.lineArr_huan[i].labels;
          }
        }
          console.log("huan改变了", this.playArr_huan)
      },
      /* 请求数据：同步对接平台 */
      sys(platform){
         /* 1馨·驰誉 */
         let _this=this;
        if(platform==1&&this.editChi==true){
          let sysPara={
            "token":paramm.getToken(),
            "platform":1,
          }
          syscategorysite(sysPara).then(function(res){
             if(res.data.error==1){
               _this.$message({
                  message: "无法获取类目,请联系馨途客服",
                  type: 'warning'
                });
                _this.editChi=false;
                return;
             }          
             _this.sysTotal=res.data.obj;
              _this.siteArr=res.data.obj.sites;
              _this.tongbucompanyId=res.data.obj.companyId;
          })
        }  
        /* 2馨·欢途*/
        else if(platform==2&&this.editHuan==true){
           
            let sysPara={
            "token":paramm.getToken(),
            "platform":2,
          }
          syscategorysite(sysPara).then(function(res){
             if(res.data.error==1){
               _this.$message({
                  message: "无法获取类目,请联系馨途客服",
                  type: 'warning'
                });
                _this.editHuan=false;
                 return;
             }          
              _this.sysTotal_huan=res.data.obj;
               _this.siteArr_huan=res.data.obj.sites;
              _this.tongbucompanyId_huan=res.data.obj.companyId;
          })
        }
      },
      /* 普通交通和控位交通切换 */
      changeTrack(){
        if(this.operationType.type == 'add'){ this.checkArr.length=0;}
        this.allplan=this.alldeadline=this.allmktbaby=this.allmktchild=this.allmktaduilt="";
        this.allmktroom=this.allsltbaby=this.allsltchild=this.allsltaduilt="";
         this.allsltroom=this.allcostbaby=this.allcostchild=this.allcostaduilt=this.allcostroom="";
         if(this.traffictype!=1){this.dates()}
      },
      // 添加单程 
      trackAddSig(){
        var _this=this;
        _this.trackArr.push(
          {
          type:0,
          groupid:_this.getgroupid(),
          name:'上海一日游',
          depart:'北京',
          dest:'上海',
          stop:'南京',
          flightno:'HK00123',
          starttime:new Date(2016, 9, 10, 18, 40),
          endtime:new Date(2016, 9, 10, 18, 40),
          arrivetype:false,
          others:[]
          }
        )
      },
      // 添加往返
      trackAddBac(){
        var _this=this;
        var trackgetgroupid=_this.getgroupid()
        _this.gobackArr.push({
            groupid:trackgetgroupid,
            type:1,
            name:'英国两日游',
            depart:'北京',
            dest:'纽约',
            stop:'英国',
            flightno:'HK00123',
            starttime:new Date(2016, 9, 10, 18, 40),
            endtime:new Date(2016, 9, 10, 18, 40),
            arrivetype:false,
            others:[{type:1,
            groupid:trackgetgroupid,
            name:'英国两日游',
            depart:'北京',
            dest:'纽约',
            stop:'英国',
            flightno:'HK00123',
            starttime:new Date(2016, 9, 10, 18, 40),
            endtime:new Date(2016, 9, 10, 18, 40),
            arrivetype:false},
            {type:1,
            groupid:trackgetgroupid,
            name:'英国两日游',
            depart:'上海',
            dest:'武汉',
            stop:'南京',
            flightno:'SH001',
            starttime:new Date(2016, 9, 10, 18, 40),
            endtime:new Date(2016, 9, 10, 18, 40),
            arrivetype:false}]
          })
      },
      //导入交通
      insertTrack(){
        console.log(666666,this.trafficDays);
        if(this.trafficDays<1&&this.traffictype==1&&this.operationType.type !== 'edit'){
          this.$message({
          message: '请先选择线路再导入控位交通！',
          type: 'warning'
          });
          return;
        }
         this.trafficLog= true;
         this.getTrafficList();
      },
      //搜索功能
      getTrafficList(){
        // 控位交通搜索功能已经完善
        let _this = this;
      
      _this.newTimeArr=[];
        if(_this.traffictype==1){
          /* 控位交通的获取列表的接口 */
          console.log(9999999999,_this.checkArr);
          if(_this.checkArr.length!=0){
                for(var i=0;i<_this.checkArr.length;i++){
              _this.newTimeArr.push(_this.checkArr[i].date||_this.checkArr[i].starttime)
            }
          }
         console.log(11111,_this.newTimeAr);
          let dates=_this.newTimeArr.length==0?"":_this.newTimeArr.join(",");
          trafficlist({token: paramm.getToken(),day: _this.trafficDays,title:_this.formName,dates:dates}).then( (res)=> {

           if(res.data.error || res.data.err) {
              paramm.getCode(res.data,_this)
            }else {
              paramm.getCode(res.data,_this)
              _this.importData = res.data.obj;
         /*      console.log( _this.importData ) */
              _this.importData.forEach((item) => {
                if(item.type === 0){
                  item.type = '单程'
                }else if(item.type === 1){
                  item.type = '往返'
                }else if(item.type === 2){
                    item.type = '联城'
                }
              })
            }
        })
        }
        //普通交通的搜索功能
        else{
          let templatePara={
            "token": paramm.getToken(),
            "title":_this.formName
          }
          traffitemplateclist(templatePara).then(function(res){
             _this.importData = res.data.obj;
             _this.importData.forEach((item) => {
                if(item.type === 0){
                  item.type = '单程'
                }else if(item.type === 1){
                  item.type = '往返'
                }else if(item.type === 2){
                  item.type = '联城'
                }
              })
          })
        }
          _this.formName="";
      },
      // 删除单程交通
      deleteTrc(idx){
        this.trackArr.splice(idx,1)
      },
      //删除往返交通
      deleteTfoot(idx){
        this.gobackArr.splice(idx,1)
      },
      // 弹框中的导入功能
      importTrack(row){
        this.trafficLog= false;
        /* 处理时间格式 满意*/
        var hh=row.starttime.slice(0,row.starttime.indexOf(":") );
        var ehh=row.endtime.slice(0,row.endtime.indexOf(":") );
        var mm=row.starttime.slice(row.starttime.indexOf(":")+1,row.starttime.indexOf(":")+3);
        var emm=row.endtime.slice(row.endtime.indexOf(":")+1,row.endtime.indexOf(":")+3);
        for(var i=0;i<row.others.length;i++){
          row.others[i].starttime= new Date(2017,9,10, row.others[i].starttime.slice(0,row.others[i].starttime.indexOf(":") ), row.others[i].starttime.slice(row.others[i].starttime.indexOf(":")+1,row.others[i].starttime.indexOf(":")+3 ));
          row.others[i].endtime= new Date(2017,9,10, row.others[i].endtime.slice(0,row.others[i].endtime.indexOf(":") ), row.others[i].endtime.slice(row.others[i].endtime.indexOf(":")+1,row.others[i].endtime.indexOf(":")+3 ));
        }
         row.starttime=new Date(2017,9,10,hh,mm);
         row.endtime=new Date(2017,9,10,ehh,emm);
       console.log(1010,row.others)
        /* 处理当日 次日问题 */
        row.arrivetype=row.arrivetype==0?false:true;
        /* 处理导入后单程  往返  联城*/
       if(row.type=="单程"||(row.type==0)){ 
         this.trackArr.push(row);
       }else if(row.type=="往返"||(row.type==1)){
        this.gobackArr.push(row);
       console.log( 55555,this.gobackArr)
       }else if(row.type=="联城"||(row.type==2)){
         console.log(row,"进入联城了")
         this.rowNum=row.others.length;
         this.gobackArr.push(row);
        // this.lianChengArr.push(row);
        // this.gobackArr=this.gobackArr.concat(this.lianChengArr);
       }
       this.getTrafficList();
       /* 请求数据：控位交通需要额外发送请求获取日期以及详情 */
       if(this.traffictype==1){
         let daysPara={
           "token":paramm.getToken(),
           "code":row.tid
         }
        let _this=this;
        var yyear=new Date(row.endtime-0).getFullYear();
        var ymonth=new Date(row.endtime-0).getMonth()+1<10?"0"+new Date(row.endtime-0).getMonth()+1:new Date(row.endtime-0).getMonth()+1;
        var ydate=new Date(row.endtime-0).getDate()<10?"0"+new Date(row.endtime-0).getDate():new Date(row.endtime-0).getDate();
        row.importEndTime=yyear+"-"+ymonth+"-"+ydate;
       
        trafficdays(daysPara).then(function(res){
          console.log("控位交通",res.data.obj)
          for(var i=0;i<res.data.obj.length;i++){
            res.data.obj[i].starttime= res.data.obj[i].date;
           /*  res.data.obj[i].endtime= res.data.obj[i].starttime+_this.trafficDays; */ 
           res.data.obj[i].newstarttime=new Date( res.data.obj[i].starttime);
            res.data.obj[i].isorder=true; 
            res.data.obj[i].confirm="0"; 
            res.data.obj[i].deadline=0; 
            res.data.obj[i].mktbaby=""; 
            res.data.obj[i].mktchild=""; 
            res.data.obj[i].mktaduilt=""; 
            res.data.obj[i].mktroom=""; 

            res.data.obj[i].sltbaby=""; 
            res.data.obj[i].sltchild=""; 
            res.data.obj[i].sltaduilt=""; 
            res.data.obj[i].sltroom=""; 

            res.data.obj[i].costbaby=""; 
            res.data.obj[i].costchild=""; 
            res.data.obj[i].costaduilt=""; 
            res.data.obj[i].costroom=""; 

             res.data.obj[i].plan=res.data.obj[i].total+"";
             res.data.obj[i].book=0;
             res.data.obj[i].sit=res.data.obj[i].surplus;
             res.data.obj[i].isenable=true;
             res.data.obj[i].tid=row.tid; 
             res.data.obj[i].checked=false;
          }
           _this.checkArr= _this.checkArr.concat(res.data.obj);
           for(var i=0;i<_this.checkArr.length;i++){
            _this.startTimeArr.push(_this.checkArr[i].newstarttime)
           }
            console.log( _this.checkArr)
        })
       }
      },
      /* 去掉空格 */
      trim(str,is_global) 
            { 
            var result; 
            result = str.replace(/(^\s+)|(\s+$)/g,""); 
            if(is_global.toLowerCase()=="g") 
            result = result.replace(/\s/g,""); 
            return result; 
            } ,
      // 编辑时获取信息 满意
      getdetail () {
        let _this = this;
       
        groupdetail({token: paramm.getToken(),id: this.categoryId}).then(function (res) {
          console.log("进入编辑页",res.data.obj);
          // 1.交通信息部分
           var result=res.data.obj;
            _this.traffictype=result.traffictype;
          /* 若是控位交通 编辑的时候刚开始的数据不能删除 */
          if(_this.traffictype==1){
            _this.isDel=result.traffics;
              for(var i=0;i<_this.isDel.length;i++){
              _this.isDel[i].del=true;
              }
          }
           for(var i=0;i<result.traffics.length;i++){
              console.log(result.traffics[i].starttime);
              var hh=result.traffics[i].starttime.slice(0,result.traffics[i].starttime.indexOf(":") );
              var ehh=result.traffics[i].endtime.slice(0,result.traffics[i].endtime.indexOf(":") );
              var mm=result.traffics[i].starttime.slice(result.traffics[i].starttime.indexOf(":")+1,result.traffics[i].starttime.indexOf(":")+3);
              var emm=result.traffics[i].endtime.slice(result.traffics[i].endtime.indexOf(":")+1,result.traffics[i].starttime.indexOf(":")+3);
              
              result.traffics[i].starttime=new Date(2016,9,10,hh,mm);
              result.traffics[i].endtime=new Date(2016,9,10,ehh,emm);
              result.traffics[i].arrivetype=result.traffics[i].arrivetype==0?false:true;
          
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
                result.traffics[i].type=result.traffics[i].type==1?"往返":"联城";
               _this.gobackArr.push(result.traffics[i]);
              _this.rowNum=result.traffics[i].others.length;
             }
           }
           
         /* 处理发团时间部分 */
         _this.checkArr= _this.checkArr.concat(result.details)
          _this.routeName = res.data.obj.linename
          _this.idd = res.data.obj.id
          _this.groupList.lineid = res.data.obj.lineid
          _this.groupList.notify = res.data.obj.notify
          _this.cancell = 0
          for(var i=0;i< _this.checkArr.length;i++){
             _this.newDateArr.push( _this.checkArr[i].starttime)
          }
           _this.dates();
          console.log("新的时间日期数组", _this.newDateArr)
        /*   _this.cancellId = res.data.obj.rules[0].id */
          let _thiss = _this
          res.data.obj.platforms.forEach(function (item) {
            if(item.isenable)  _thiss.checkList.push(item.platform - 1)
            _this.platformId.push(item.id)
          })
          _this.checkArr = res.data.obj.details.slice(0)
          _this.checkArr.forEach(function (item,idx) {
            item.confirm = item.confirm.toString();
          })
          res.data.obj.details.forEach(function (item,idx) {
            _this.surpluss = item.surplus;
            _this.getTimeArr.push(item.endtime);
          })
          _this.dayss = res.data.obj.days;
        /* 新增日历框部分 */
        

        /* 处理同步平台部分*/
         var newsiteArr=[];
         var newsiteArr_huan=[];

         console.log("处理同步平台部分",result.platforms)
         for(var i=0;i<result.platforms.length;i++){
           
           /* 驰誉选中*/
          if(result.platforms[i].platform==1&&(result.platforms[i].isenable)){
           _this.editChi=true;
            if(result.platforms[i].categorytype=="shortLine"){
                result.platforms[i].categorytype="周边短线"
              }else if(result.platforms[i].categorytype=="longLine"){
                result.platforms[i].categorytype="国内长线"
              }else if(result.platforms[i].categorytype=="externalLine"){
                result.platforms[i].categorytype="出境长线"
              }
           _this.categoryvalue=result.platforms[i].categorytype;
           _this.editsubvalue=result.platforms[i].categoryname;
           _this.editplay=result.platforms[i].labelsname;
          newsiteArr=result.platforms[i].sites.split(",");
           let sysPara={
            "token":paramm.getToken(),
            "platform":1,
          }
         syscategorysite(sysPara).then(function(res){
              _this.sysTotal=res.data.obj;
              _this.siteArr=res.data.obj.sites;
              _this.tongbucompanyId=res.data.obj.companyId;
            for(var i=0;i<newsiteArr.length;i++){
                        console.log("进入for")
                      for(var k=0;k<_this.siteArr.length;k++){
                          if(_this.siteArr[k].siteId==newsiteArr[i]){
                            console.log("又找到一样的id了")
                            _this.editnewsiteArr.push({"siteId":_this.siteArr[k].siteId,"siteName":_this.siteArr[k].siteName})
                          }
                      }
                    }
                      console.log(77777, _this.editsubvalue,_this.editnewsiteArr);
          })
          }
          /* 欢途选中 */
          if(result.platforms[i].platform==2&&(result.platforms[i].isenable)){
             _this.editHuan=true;
            if(result.platforms[i].categorytype=="shortLine"){
                result.platforms[i].categorytype="周边短线"
              }else if(result.platforms[i].categorytype=="longLine"){
                result.platforms[i].categorytype="国内长线"
              }else if(result.platforms[i].categorytype=="externalLine"){
                result.platforms[i].categorytype="出境长线"
              }
           _this.categoryvalue_huan=result.platforms[i].categorytype;
           _this.editsubvalue_huan=result.platforms[i].categoryname;
           _this.editplay_huan=result.platforms[i].labelsname;
          newsiteArr_huan=result.platforms[i].sites.split(",");
          let sysPara={
            "token":paramm.getToken(),
            "platform":2,
          }
         syscategorysite(sysPara).then(function(res){
              _this.sysTotal_huan=res.data.obj;
              _this.siteArr_huan=res.data.obj.sites;
              _this.tongbucompanyId_huan=res.data.obj.companyId;
            for(var i=0;i<newsiteArr_huan.length;i++){
                        console.log("进入for")
                      for(var k=0;k<_this.siteArr_huan.length;k++){
                          if(_this.siteArr_huan[k].siteId==newsiteArr_huan[i]){
                            console.log("又找到一样的id了")
                            _this.editnewsiteArr_huan.push({"siteId":_this.siteArr_huan[k].siteId,"siteName":_this.siteArr_huan[k].siteName})
                          }
                      }
                    }
                    
          })
          }
         }

    /*      for(var k=0;k<result.platforms.length;k++){
           
          newsiteArr=result.platforms[k].sites.split(",");
          platform=result.platforms[k].platform;
         }

          if(platform==1&&_this.editChi==true){
         
          let sysPara={
            "token":paramm.getToken(),
            "platform":1,
          }
          syscategorysite(sysPara).then(function(res){
             _this.sysTotal=res.data.obj;
              _this.siteArr=res.data.obj.sites;
              _this.tongbucompanyId=res.data.obj.companyId;
            for(var i=0;i<newsiteArr.length;i++){
                        console.log("进入for")
                      for(var k=0;k<_this.siteArr.length;k++){
                          if(_this.siteArr[k].siteId==newsiteArr[i]){
                            console.log("又找到一样的id了")
                            _this.editnewsiteArr.push({"siteId":_this.siteArr[k].siteId,"siteName":_this.siteArr[k].siteName})
                          }
                      }
                    }
                      console.log(77777, _this.editsubvalue,_this.editnewsiteArr);
          })
        }  */        
        })
 
      },
      getPingtai () {
        let _this = this;
        /* 请求数据：同步到对接平台 */
        openlist({token: paramm.getToken()}).then(function (res) {
          // 平台列表
          _this.pingtai = res.data.obj || []
        })
      },
      allMktaduilt () {
        this.changeParam('allmktaduilt','mktaduilt' )
      },
      allMktroom () {
        this.changeParam('allmktroom','mktroom' )
      },
      allSltbaby () {
        this.changeParam('allsltbaby','sltbaby' )
      },
      allSltchild () {
        this.changeParam('allsltchild','sltchild')
      },
      allSltaduilt () {
        this.changeParam( 'allsltaduilt','sltaduilt')
      },
      allSltroom () {
        this.changeParam('allsltroom','sltroom')
      },

      allCostbaby () {
        this.changeParam('allcostbaby','costbaby' )
      },
      allCostchild () {
        this.changeParam('allcostchild','costchild' )
      },
      allCostaduilt () {
        this.changeParam('allcostaduilt','costaduilt' )
      },
      allCostroom () {
        this.changeParam('allcostroom','costroom' )
      },
      // 儿童
      allMktchild () {
        this.changeParam('allmktchild','mktchild' )
      },
      // 婴儿
      allMktbaby () {
        this.changeParam('allmktbaby','mktbaby' )
      },
      // 报名截止
      allDeadline () {
        this.changeParam( 'alldeadline','deadline')
      },
      // 是否接客
      allIsorder (event){
        if(event.target.checked){
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.isorder = true
          })
        }else {
          this.checkArr.forEach(function (item, index) {
            if(item.checked) item.isorder = false
          })
        }
      },
      allPlan () {
        this.changeParam('allplan','plan')
      },
      // 封装输入框全写
      changeParam (param, allParam) {
        let _this = this;

        this.checkArr.forEach(function (item) {
          if(item.checked) item[allParam] = _this[param]
        })
      },
      // 全选单选删除 满意
      sigDel (item,idx) {
        let _this = this;
         $(".date-list-wrap").find(".c" + item.starttime).removeClass("selected");
        if(item.id){
          groupDel({token:paramm.getToken(),id:item.id}).then((res)=>{
            if(res.data.error || res.data.err) {
              paramm.getCode(res.data,_this)
            }else {
              paramm.getCode(res.data,_this)
              _this.checkArr.splice(idx, 1)
              _this.startTimeArr.splice(idx, 1)

              _this.getTimeArr.splice(idx, 1)
              _this.TemStArr = []
            }
          })
        }else {
          _this.checkArr.splice(idx, 1)
          _this.startTimeArr.splice(idx, 1)
          _this.TemStArr = []
        }

      },
      /* 反全选只要一个没选中，全选就不选中 */
      sigCheck () {
        let isAll = this.checkArr.every(function (item) {
          return (item.checked == true);
        })
        isAll == true ? this.allChecked = true : this.allChecked = false
      },
      /* 全选 */
      allCheck (event) {
        if(this.allChecked){
          this.checkArr.forEach(function (item, index) {
            item.checked = true
          })

        }else {
          this.checkArr.forEach(function (item, index) {
            item.checked = false
          })
        }
      },
      //编辑功能中的全选(暂时不改)
      /*checkAll(){
        console.log(777,this.checkedAll,this.checkArr)
        if(this.checkedAll){
          this.checkArr.map(function (item, index) {
            item.checked = true
          })
        }else{
          this.checkArr.map(function (item, index) {
            item.checked = false
          })
        }
      },*/
      // 选择日期添加一行
      addTr () {
        let _this = this;
        // 开始时间
        console.log(this.value1)
        this.startTimeArr.push(this.value1);
        var M = (this.value1.getMonth()+1).toString().length==1 ? '0'+ (this.value1.getMonth()+1).toString() : (this.value1.getMonth()+1).toString();
        var D = this.value1.getDate().toString().length==1 ? '0'+ this.value1.getDate().toString() : this.value1.getDate().toString();
        var selectTime = this.value1.getFullYear().toString() +"-" + M+ "-" + D;
        // 添加一行之前做校验 不能添加相同团期的
        try{
          if(this.checkArr.length){
            this.checkArr.forEach(function (item) {
              if(item.starttime == selectTime) {
                _this.$message({
                  message: '该团期已添加,请添加其他团期',
                  type: 'warning'
                })
                throw false
              }
            })
          }
        }catch (e){
          throw e
        }
         /*满意  */
        this.checkArr.push(
          {checked: '',
            starttime: selectTime,
            endtime:'',
            isorder: true,
            confirm: "0",
            deadline:0,
            mktbaby: '',
            mktchild:'',
            mktaduilt: '',
            mktroom: '',
            sltbaby: '',
            sltchild: '',
            sltaduilt: '',
            sltroom: '',
            costbaby: '',
            costchild: '',
            costaduilt: '',
            costroom: '',
            plan: 0,
            book: 0,
            sit: 0,
            isenable: true,
            tid:"",
          })
       
      },
      //获取线路列表
      queryLine(){
        let _this = this;
        setTimeout(function () {
          _this.showNoLine = true
        },500)
        linelist(this.search).then((res) => {
          if(!res.err){
            if(!res.error){
              this.lineList = res.data.obj.datas;
            }
          }
        })
      },
      //求截止日期
      getDateEnd (vall, dayy,isPlus) {
//        var now=new Date();
//        var time=now.getTime();
        var time = vall.getTime();
        console.log("求截止时间",vall,time);
         if (isPlus) {
           time+=1000*60*60*24*(dayy-1);//加上3天
         }else {
           time-=1000*60*60*24*(dayy-1);//减上3天
         }
        vall.setTime(time);
        var M = (vall.getMonth()+1).toString().length == 1 ? '0' + (vall.getMonth()+1).toString(): (vall.getMonth()+1).toString()
        var D = vall.getDate().toString().length == 1 ? '0' + vall.getDate().toString(): vall.getDate().toString()
        return vall.getFullYear()+"-"+M+"-"+D;
      },
      // 弹出框确定
      checkRot () {
        let _this = this;
        // 去掉的限制
//        groupexists({token:paramm.getToken(),id:this.checkItem.id}).then((res)=>{
//          if(res.data.error || res.data.err) {
//            paramm.getCode(res.data, _this)
//          }else {
//            _this.lineFlag = false;
//            _this.routeName = _this.checkItem.name;
//            _this.lineid = _this.checkItem.id;
//          }
//        })
        _this.lineFlag = false;
        _this.routeName = _this.checkItem.name;
        _this.groupList.lineid = _this.checkItem.id;
        _this.trafficDays = _this.checkItem.days;
        console.log( _this.trafficDays);
      },
      //弹出框出现，调用这个方法，第一次点击下拉框，下拉框样式有问题，第二次点击正常
      getcategoryall(){
        this.lineFlag = true;
        let para= {token:paramm.getToken()}
        categoryall(para).then(res =>{
          this.linesorts = res.data.obj
        })
      },
      isTrue (sTime,itemm,msg) {
        if(isNaN(itemm) || parseFloat(itemm)<0 || parseInt(itemm)!=itemm) {
          this.$message({
            message: sTime+'日'+msg+'为大于或等于0的整数',
            type: 'warning'
          })
          return true
        }
      },
      // 点击保存
      save () {

        let _this = this;
        // 保存之前线路必须选择
        if(!_this.groupList.lineid) {
          this.$message({
            message: '请选择线路',
            type: 'warning'
          });
          return;
        }
          for(var i=0;i<_this.checkArr.length;i++){

           _this.checkArr[i].confirm=Number(_this.checkArr[i].confirm);
            _this.checkArr[i].deadline=Number(_this.checkArr[i].deadline);
         }
         if (_this.checkArr.length == 0) {
          this.$message({
            message: '请添加发团信息',
            type: 'warning'
          });
          return;
        }
          try{
         this.checkArr.forEach(function (item,idx) {
           item.surplus = _this.surpluss;

          //  if(isNaN(item.plan) || parseFloat(item.plan)<=0 || parseInt(item.plan)!=item.plan) {
          //    _this.$message({
          //      message: item.starttime+'日计划人数为大于或等于1的整数',
          //      type: 'warning'
          //    })
          //    throw false
          //  }
           if(_this.isTrue(item.starttime,item.deadline,'截止天数') ||
             _this.isTrue(item.starttime,item.mktbaby,'婴儿市场价') || _this.isTrue(item.starttime,item.mktchild,'儿童市场价') || _this.isTrue(item.starttime,item.mktaduilt,'成人市场价') || _this.isTrue(item.starttime,item.mktroom,'市场价单房差') ||
             _this.isTrue(item.starttime,item.sltbaby,'婴儿结算价') || _this.isTrue(item.starttime,item.sltchild,'儿童结算价') || _this.isTrue(item.starttime,item.sltaduilt,'成人结算价') || _this.isTrue(item.starttime,item.sltroom,'结算价单房差') ||
             _this.isTrue(item.starttime,item.costbaby,'婴儿成本价') || _this.isTrue(item.starttime,item.costchild,'儿童成本价') || _this.isTrue(item.starttime,item.costaduilt,'成人成本价') || _this.isTrue(item.starttime,item.costroom,'成本价单房差')
           ) throw false

           _this.allChecked = false
           delete item.checked
         })
       }catch (e){
          throw e
       }
         console.log("保存了",_this.gobackArr);
         for(var i=0;i<_this.gobackArr.length;i++){
            _this.savegobackArr= _this.savegobackArr.concat(_this.gobackArr[i].others)
         }
         _this.traffic=_this.trackArr.concat(_this.savegobackArr); 
         for(var i=0;i< _this.traffic.length;i++){
            /* 提交时处理当日 次日 */
            _this.traffic[i].arrivetype= _this.traffic[i].arrivetype==false?0:1;
            /* 开始时间 */
            var startH=new Date(_this.traffic[i].starttime).getHours();
                startH=startH<10?"0"+startH:startH;
            var startM=new Date(_this.traffic[i].starttime).getMinutes();   
                startM=startM<10?"0"+startM:startM;
                _this.traffic[i].starttime= startH+":"+ startM;
           /* 结束时间 */
           var endH=new Date(_this.traffic[i].endtime).getHours();
                endH=endH<10?"0"+endH:endH;
            var endM=new Date(_this.traffic[i].endtime).getMinutes();   
                endM=endM<10?"0"+endM:endM;
             _this.traffic[i].endtime= endH+":"+ endM;
             /* 处理手动单程 往返的direction */
             if( _this.traffic[i].type=="单程"|| _this.traffic[i].type==0){
                 _this.traffic[i].direction=_this.traffic[i].type=0;
             }else if( _this.traffic[i].type=="往返"||_this.traffic[i].type==1){
                _this.traffic[i].direction=_this.traffic[i].type=1;
             }else if( _this.traffic[i].type=="联城"||_this.traffic[i].type==2){
                _this.traffic[i].direction=_this.traffic[i].type=2;
             }
              if(!_this.traffic[i].id){
               _this.traffic[i].id="";
             }
              if(!_this.traffic[i].tid){
               _this.traffic[i].tid="";
             }
          }
     
         for(var i=0;i<_this.lineArr.length;i++){
           if(_this.lineArr[i].categoryName==_this.subvalue){
             _this.tongbucategoryid=_this.lineArr[i].categoryId;
           }
         }
           for(var i=0;i<_this.lineArr_huan.length;i++){
           if(_this.lineArr_huan[i].categoryName==_this.subvalue_huan){
             _this.tongbucategoryid_huan=_this.lineArr_huan[i].categoryId;
           }
         }
         if(_this.categoryvalue=="国内长线"){
           _this.tongbucategorytype="longLine"
         }else if(_this.categoryvalue=="周边短线"){
            _this.tongbucategorytype="shortLine"
         }else if(_this.categoryvalue=="出境长线"){
            _this.tongbucategorytype="externalLine"
         }

          if(_this.categoryvalue_huan=="国内长线"){
           _this.tongbucategorytype_huan="longLine"
         }else if(_this.categoryvalue_huan=="周边短线"){
            _this.tongbucategorytype_huan="shortLine"
         }else if(_this.categoryvalue_huan=="出境长线"){
            _this.tongbucategorytype_huan="externalLine"
         }
          for(var i=0;i<_this.playArr.length;i++){
            if(_this.playArr[i].labelId== _this.initValue){
              _this.tongbulabelsname=_this.playArr[i].labelName;
            }
          }
          for(var i=0;i<_this.playArr_huan.length;i++){
            if(_this.playArr_huan[i].labelId== _this.initValue_huan){
              _this.tongbulabelsname_huan=_this.playArr_huan[i].labelName;
            }
          }
          /* 解决保存发送请求的platforms数组  */
         _this.platformsArrXin=[{
                id:"",
                platform:_this.editChi?1:2,
                categoryid: _this.tongbucategoryid,
                categorytype: _this.tongbucategorytype,
                categoryname:_this.subvalue,
                sourceid:"",
                sites:_this.checksiteArr.join(","),
                isenable:_this.editChi,
                labels: _this.initValue,
                labelsname:_this.tongbulabelsname,
                companyId:_this.tongbucompanyId,
                companyname:"" ,
                memberId:"",  
         },{
                id:"",
                platform:_this.editHuan?2:1,
                categoryid: _this.tongbucategoryid_huan,
                categorytype: _this.tongbucategorytype_huan,
                categoryname:_this.subvalue_huan,
                sourceid:"",
                sites:_this.checksiteArr_huan.join(","),
                isenable:_this.editHuan,
                labels: _this.initValue_huan,
                labelsname:_this.tongbulabelsname_huan,
                companyId:_this.tongbucompanyId_huan,
                companyname:"" ,
                memberId:"",  
         }];
          /* 若平台没有勾选就不保存 */
          if(!_this.editChi&&!_this.editHuan){
             _this.platformsArrXin=[]
         }
         else if(!_this.editChi){
             _this.platformsArrXin= _this.platformsArrXin.slice(1)
         }
         else if(!_this.editHuan){
             _this.platformsArrXin= _this.platformsArrXin.slice(0,1)
         }
        
       
         _this.tongbudetailArr= _this.tongbudetailArr.concat(_this.checkArr);
       
         _this.platformsArr= _this.platformsArr.concat(_this.platformsArrXin);
        
        // 集合通知
        if(_this.groupList.notify.toString().length >120) {
          this.$message({
            message: '集合通知不能超过120字',
            type: 'warning'
          });
          return;
        }
        
       
     
        // 合作平台

        let platforms = [];

        this.pingtai.forEach(function (item,idx) {
          platforms.push({platform: item.platform, isenable: false,id: _this.platformId[idx]})
        })

        // 结束时间
        if(_this.operationType.type == 'add'){
          _this.startTimeArr.forEach(function (item) {
            _this.TemStArr.push(_this.getDateEnd(item, _this.trafficDays,true))
          })
        }

        if(_this.operationType.type == 'edit'){
          _this.startTimeArr.forEach(function (item) {
            _this.TemStArr.push(_this.getDateEnd(item, _this.dayss,true))
          })
          _this.TemStArr = this.getTimeArr.concat(_this.TemStArr)
        }
        _this.checkArr.forEach(function (item,idx) {
          item.endtime = _this.TemStArr[idx] || ''
        })
        /* 发布线路 添加时候的保存  */
         let savePara={
           lineid:_this.groupList.lineid,
           notify: _this.groupList.notify|| '',
           traffictype: _this.traffictype,
           traffics: _this.traffic,
           platforms: _this.platformsArrXin,
           rules: [{releasetime:0,type:1}] || [],
           details: _this.tongbudetailArr,
           token:paramm.getToken(),
         }
        // 1 添加
        if(_this.operationType.type == 'add'){
          groupsave(savePara).then(res =>{
            if(res.data.error || res.data.err) {
              paramm.getCode(res.data, _this)
              //减去之前加上的时间
              _this.startTimeArr.forEach(function (item) {
                _this.TemStArr.push(_this.getDateEnd(item, _this.checkItem.days,false))
              })
              _this.TemStArr = []
              return
            }
            if(!res.data.error) {
              paramm.getCode(res.data, _this)
              _this.$emit('setMode', 'list');  
            }
          })
        }
        // 2 编辑
        if(_this.operationType.type == 'edit'){
          
          _this.checkArr.forEach(function (item) {
            delete item.linename;
            delete item.creater;
            delete item.status;
            delete item.teamid;
            delete item.teamno;
            delete item.surplus;
          })
          /* 编辑的时候 保存  */
          groupupdate({
            token: paramm.getToken(),
            lineid: _this.groupList.lineid,
            notify: _this.groupList.notify || '',
            traffictype: _this.traffictype,
            traffics:_this.traffic,
            rules: [{releasetime:0,type:1,id:_this.cancellId}] || [],
            platforms: _this.platformsArrXin,
            details: _this.tongbudetailArr,
            id: _this.idd
          }).then(res =>{
            if(res.data.error) {
              this.$message({
                message: res.data.message || '失败',
                type: 'error'
              });
              //减去之前加上的时间
              _this.startTimeArr.forEach(function (item) {
                _this.TemStArr.push(_this.getDateEnd(item, _this.dayss,false))
              })
              _this.TemStArr = _this.getTimeArr.concat(_this.TemStArr)
              _this.TemStArr = []
              return
            }
            if(!res.data.error) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
            _this.$emit('setMode', 'list');  
            }
          })
        }

      },
      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
      },
      dates(){

         var _this=this;
  console.log("进来时调用",_this.newDateArr.length,typeof _this.newDateArr)
    var currentDate = new Date();
    var currentMonthDiff = 0;
    var currentyear = currentDate.getFullYear();//年
    var today = getDate(-1);
    var calendar = {
        add: function (opts,params) {
            var wrap = $(".date-list-wrap");
            $("<div>", { "class": "calendar_custom_v2 date-picker-dialog" }).appendTo(wrap).datepickerCalendar(opts, $.extend(params,{url:""}));
        },
        sub: function () {
            var wrap = $(".date-list-wrap");
            var last = wrap.find(".date-picker-dialog").last();
            last.find("td.selected").each(function () {
                var date = $(this).attr("title");
                console.log(date,666666);
                /* 满意 */
                 for(var i=0;i< _this.checkArr.length;i++){
              if( _this.checkArr[i].starttime==date){
                    _this.checkArr.splice(i,1)
                   console.log("删除了", _this.checkArr)
              }
             }
            })
            last.remove();
        },
        index: function () {
            $("#line-price .index").each(function (index) {$(this).text((index+1).LenWithZero(2)) });
        },
        cancel: function (date) {
            $(".date-list-wrap").find(".c" + date).removeClass("selected");
        }
    }


    function getDate(dates) {
        var dd = new Date();
        dd.setDate(dd.getDate() + dates);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;
        var d = dd.getDate();
        return new Date(y, m - 1, d);
    }

    function getWeek(date){
        function weekMap(n){
            switch (n){
                case 0:return "周日";break;
                case 1:return "周一";break;
                case 2:return "周二";break;
                case 3:return "周三";break;
                case 4:return "周四";break;
                case 5:return "周五";break;
                case 6:return "周六";break;
            }
        }
        var d=new Date(date);
        return weekMap(d.getDay());
    }
    //时间格式化
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,  //month
            "d+": this.getDate(),     //day
            "h+": this.getHours(),    //hour
            "m+": this.getMinutes(),  //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (typeof this == "string") { return this; }
        if (format == null || format == "undefined") { format = "yyyy-MM-dd"; }

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

     function getMonth(number) {
         var d = new Date(currentyear, currentDate.getMonth(), 1);
         var year = d.getFullYear();
         var month = d.getMonth() + number;
         return new Date(year, month, 1);
     }

     function calendarSelect(month,selectedList,whiteList){
       
         calendar.add({
             defaultDate: getMonth(month), beforeShowDay: function (date) { var selected = "",allow=""; if ($.inArray(date.format(), selectedList) > -1) { selected = " selected "; }if ($.inArray(date.format(), whiteList) > -1 || whiteList.length==0) { allow = " allowselect "; } if (date.getTime() > today.getTime()) { if (date.getDay() == 6 || date.getDay() == 0) { return [false, allow+"weekend" + selected + " c" + date.format(), date.format()]; } else { return [false, allow+"workday" + selected + " c" + date.format(), date.format()]; } } else { return [false, selected + "c" + date.format(), ""]; } }
         }, { url: "" });
     }

     function orderIndexNum(obj) {
         $(obj).closest('table').find('.index').each(function (index, element) {
             $(this).text(index + 1);
         });
         if (typeof resetTr != "undefined") resetTr();
     }

    /*满意*/

      function getMonthDiff(datelist){
         var newDate = new Date();
         var beginday = newDate.getTime();
         var endday = newDate.getTime();
         for(var i = 0;i < datelist.length; i++) {
             var selectday = Date.parse(new Date(datelist[i]));
             if(selectday>endday){
                 endday = selectday;
             }
         }
         newDate.setTime(beginday);
         var date1 = newDate.format('yyyy-MM-dd');
         newDate.setTime(endday);
         var date2 = newDate.format('yyyy-MM-dd');

         //用-分成数组
         date1 = date1.split("-");
         date2 = date2.split("-");
         //获取年,月数
         var year1 = parseInt(date1[0]) ,
             month1 = parseInt(date1[1]) ,
             year2 = parseInt(date2[0]) ,
             month2 = parseInt(date2[1]) ,
         //通过年,月差计算月份差
             months = (year2 - year1) * 12 + (month2-month1) + 1;
         return months;
     }
     
     var monthdiff = getMonthDiff(_this.newDateArr);
     for (var i = 0; i <monthdiff; i++) {
         calendarSelect(i,_this.newDateArr,[]);
     }
     currentMonthDiff=monthdiff+1;

     //添加
     $(".button-operate-datepicker-add").click(function () {
         if (currentMonthDiff > 8) {    
          _this.$message({
          showClose: true,
          message: '只能添加近8个月份额',
          type: 'warning'
        });; return; }
         calendarSelect(currentMonthDiff, [], []);
         currentMonthDiff++;
 
     });
     //删除
     $(".button-operate-datepicker-sub").click(function () {
         console.log(9999999,currentMonthDiff)
         currentMonthDiff < 1 ? currentMonthDiff = 0 : currentMonthDiff--, calendar.sub();

     });
     
     /* 选中每一个日期触发的事件  满意*/
     $(".date-list-wrap").on("click", ".allowselect", function () {
           console.log("选中日期了");
         var td = $(this);
          var date=td.attr("title");
          console.log(date)
         td.toggleClass("selected");
         if (td.hasClass("selected")) {
              _this.checkArr.push(
          { checked: '',
            starttime: date,
            endtime:'',
            isorder: true,
            confirm: "0",
            deadline:0,
            mktbaby: '',
            mktchild:'',
            mktaduilt: '',
            mktroom: '',
            sltbaby: '',
            sltchild: '',
            sltaduilt: '',
            sltroom: '',
            costbaby: '',
            costchild: '',
            costaduilt: '',
            costroom: '',
            plan: 0,
            book: 0,
            sit: 0,
            isenable: true,
            tid:"",
          })
          for(var i=0;i< _this.checkArr.length;i++){
            _this.checkArr[i].newstarttime= new Date(_this.checkArr[i].starttime);
            _this.startTimeArr.push(_this.checkArr[i].newstarttime)
          }
         } else {
             for(var i=0;i< _this.checkArr.length;i++){
              if( _this.checkArr[i].starttime==date){
                    _this.checkArr.splice(i,1)
                   console.log("删除了", _this.checkArr)
              }
             }
         }
       
     })
   //清除所选日期
     $(".action-clearday").click(function () {
       console.log("触发了");
        _this.checkArr=[];
         $(".date-list-wrap .allowselect").removeClass("selected");
     });

      }
    },
    created(){
       this.getPingtai();
    },
    beforeMount () {
      if(this.operationType.type == 'edit' || this.operationType.type == 'detail') this.getdetail();
    },
    // updated(){
    //    this.dates();
    // },
     
     mounted(){
      if(this.operationType.type=="add"){
        this.dates();
      }
   }
  }
 
</script>

<style>

 /* 日历样式 */

  .traffic-noraml-wrap{ height: auto; overflow:hidden; width: 100%;}
       .mb20 {margin-bottom:  20px}
      .mb10 {margin-bottom:  10px}
       .ml6 {margin-left: 6px}
       .site-map-title-wrap {
          border-bottom: 2px solid #e5e5e5;
          height: 36px;
           line-height: 36px;
           *position: relative;
      }
      .button-middle-v1 {font-size:12px;line-height:28px;height:28px;padding:0 20px;display:inline-block;cursor:pointer;}
      .button-bg-green{background-color:#4bba46;border:solid 1px #3d9e39;.select-more-white-button{border-left:solid 1px #42a03e;}.select-dropdown-box{background-color:#4bba46;border:solid 1px #42a03e !important;}.select-dropdown-item a:hover,.selected a{background-color:#42a03e !important;}.select-dropdown-item{border-bottom:solid 1px #42a03e !important;a{color:#fff !important;}}}
       .button-font-white{color:#fff;}

     .site-map-title-wrap .map-title-bar {
         display: inline-block;
         font-size: 14px;
          font-weight: 700;
         font-family: '微软雅黑';
         padding: 0 15px;
         border-bottom: 2px solid #2d92d8;
          *display: inline;
          zoom: 1;
         height: 36px;
           line-height: 36px;
      }
     .group-box span{ font-size: 14px; font-weight: bold; margin-right: 20px; cursor: pointer; line-height: 30px; margin-bottom: 10px; color: #06c;}

     .date-list-wrap{ height: auto; overflow:hidden;}
      .date-list-wrap .calendar_custom_v2{position:static;float:left;margin:10px;}
      .date-list-wrap .ui-datepicker-prev,.date-list-wrap .ui-datepicker-next{display:none;}
     .date-list-wrap .ui-state-disabled .ui-state-default{color:#ccc;}
      .date-list-wrap .allowselect{cursor:pointer !important;}
   .date-list-wrap .allowselect .ui-state-default{color:#000;}
      .date-list-wrap .selected{background-attachment:scroll;background-clip:border-box;background-color:#fdf8e1!important;background-image:url("selected.png") !important;background-origin:padding-box;background-position:center top;background-repeat:no-repeat;background-size:auto auto}

      /* 以前样式 */
  header {
    padding: 0 40px;
    background: white;
    margin-bottom: 30px;
    padding-top: 20px;
  }
  header .defaultbutton {
      border-color: #9ad4d6;
      color: #2cb1b6;
      float: right;
      margin-top: -10px;
    }
  header .el-menu-item {
      height: 36px;
      line-height: 36px;
      border-top: 3px solid transparent;
      padding: 0;
     
    }
 header .el-menu-item a {
        padding: 0 20px;
        display: block;
      }
  header .el-menu-item:hover {
      background: transparent;
      border-bottom: transparent;
      color: #3ec3c8;
      height: 36px;
      line-height: 36px;
    }
  header .el-menu-item .is-active {
      background: #eef1f6;
      border-top: 3px solid #3ec3c8!important;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: #333;
    }
  .el-select-dropdown__item .selected{
   background-color:#fff;
   color:#000;
  }

section .el-col li{
        float: left;
        padding: 0px 10px;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid transparent;
}
/* 看下有没有问题 */
section .el-col li:hover,  .checked {
          border: 1px solid #3ec3c8!important;
          color: #3ec3c8;
   }
  section   .demo-ruleForm .el-col-4{
    width: 200px;
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
  table{
    font-size:12px;
  }
  .el-table .cell{
    padding: 0 5px;
  }
  .demo-form-inline{
    max-width: 800px;
  }
  .trafficRadio{
    padding-left: 50px;
   
  }
 .trafficRadio  .trafficRadio_son{
      margin: 0 30px;
    }
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
  .trackAdd{
    margin: 0 30px;
  }
  .el-checkbox-group{
    display: inline;
  }
</style>
