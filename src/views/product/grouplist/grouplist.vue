<template>
  <div>
    <div  v-if="modeType == 'list'" >
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>发团列表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12">
            <el-button id="5c18b1d0734611e788410242ac120009" class="defaultbutton hasid" @click="setMode('newGroup','add')" >新增发团计划</el-button>
          </el-col>
        </el-row>
      </header>
      <section class="padding30">
        <el-form    ref="searchList" label-width="100px" class="demo-ruleForm" style="text-align: left;">
          <el-row>
           <el-form-item label="出发时间" label-width="90px"  style="margin-left: 10px">
             <div class="block">
               <el-date-picker
                 v-model="date"
                 type="daterange"
                 placeholder="选择日期范围">
               </el-date-picker>
             </div>
           </el-form-item>
           <el-form-item label="线路类型" prop="categoryType"  style="width: 326px" >
             <el-select v-model="searchList.categoryType"  >
               <el-option  v-for="item in type"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
               ></el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="状态" prop="status"  style="width: 390px" >
             <el-select v-model="searchList.status"  >
               <el-option  v-for="item in type1"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
               ></el-option>
             </el-select>
           </el-form-item>
          </el-row>

          <el-row>
           <el-form-item label="线路名称"  >
             <el-col :span="4"   >
               <el-input v-model="searchList.linename"></el-input>
             </el-col>
           </el-form-item>
           <el-form-item label="团号">
             <el-col :span="4" style="width: 150px">
               <el-input v-model="searchList.teamname"></el-input>
             </el-col>
           </el-form-item>
          </el-row>

          <el-form-item   style="margin-right: 50px;">
            <el-button class="hasid" id="49641a18734611e788410242ac120009" type="primary" @click="searchGetList">查询</el-button>
          </el-form-item>
          <el-form-item   style="margin-left: 0px">
            <el-button  type="primary" @click="clearGetList">清空查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="lineList" border style="text-align: left; font-size: 12px;">
          <el-table-column prop="teamno" label=" 团号" width="150">
          </el-table-column>
          <el-table-column prop="linename" label="线路名称" >
          </el-table-column>
          <el-table-column prop="starttime" label="出发日期" width="130">
          </el-table-column>
          <el-table-column prop="endtime" label="回团日期" width="130">
          </el-table-column>
          <el-table-column prop="plan" label="计划人数" width="80">
          </el-table-column>
          <el-table-column prop="surplus" label="余位" width="80">
          </el-table-column>
          <el-table-column prop="days" label="天数" width="80">
          </el-table-column>
          <el-table-column prop="book" label="已售" width="80">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="creater" label="发布人" width="130">
          </el-table-column>
          <el-table-column  label="操作" width="200">
            <template scope="scope">
              <el-button class="hasid" id="521410f9734611e788410242ac120009" @click="setMode('groupinfo'),editorFn(scope.row,'groupinfo')" type="text" size="small" >下单</el-button>
              <el-button class="hasid" id="6f6276e6734611e788410242ac120009" @click="setMode('newGroup','edit'),editorFn(scope.row,'newGroup')" type="text" size="small">编辑</el-button>  <!-- editorFn(scope.row)  -->
              <el-button @click="setMode('newGroup','detail'),editorFn(scope.row,'newGroup')" type="text" size="small">详情</el-button>
              <el-button class="hasid" id="8929e4a7734611e788410242ac120009" type="text" size="small" @click="deleteRow(scope.$index, scope.row)">停止</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </section>
    </div>
    <GroupInfo v-else-if="modeType == 'groupinfo'" @setMode="setMode" @editorFn='editorFn'  :categoryId="editcategory.id"></GroupInfo>
    <GroupReserve v-else-if="modeType == 'groupreserve'" @setMode="setMode" :categoryId="editcategory.id"></GroupReserve>
    <Grouporder v-else-if="modeType == 'order'"  @setMode="setMode" :operationType="operationType" ></Grouporder>
    <Reserve v-else-if="modeType == 'reserve'" @setMode="setMode" :categoryId="editcategory.id" :operationType="operationType"></Reserve>  <!-- @setMode="setMode"   :categoryId="editcategory.id"-->
    <NewGroup v-else  @setMode="setMode" :operationType="operationType" :categoryId="editcategory.id"></NewGroup>
  </div>
</template>
<script>
  import Grouporder from './grouporder'
  import NewGroup from './newgroup'
  import GroupInfo from './groupinfo'
  import GroupReserve from './groupreserve'
  import Reserve from './reserve'
  import util from '../../../common/js/util'
  import axios from 'axios'
  import {token,grouplist,linecategorydelete} from '../../../common/js/config'
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  export default {
    components:{
      Grouporder,
      NewGroup,
      GroupInfo,
      GroupReserve,
      Reserve
    },
    data() {
      return {
        date: '',
        searchList:{
          categoryType: '',
          linename: '',
          teamname: '',
          status: '',
          token: paramm.getToken(),
          pageindex:0,
          pagesize: 10
        },
        modeType:'list', /*reserve*/
        showAdd:false,
        showEdit:false,
        type:[{value:'1',label:'国内'},{value:'2',label:'出境游'},{value:'3',label:'周边游'}],
        type1:[{value:'1',label:'正常'},{value:'2',label:'禁用'},{value:'3',label:'待发团'},{value:'4',label:'已发团'},{value:'5',label:'已结团'}],
        total:0,
        currentPage:1,
        pagesize:10,
        operationType:{type:'add',id:''},
        lineList:[],
        editcategory:{},
        optionName: '新增发团计划'
      }
    },
    // 进入获取列表
//    created(){
//      this.getList()
//    },
    updated: function() {
      this.$nextTick(function() {
        showorhide()
      })
    },
    methods:{
      setMode(type,option,sonData){
        if(sonData) this.editcategory.id = sonData
        this.operationType.type=option;
        this.modeType=type;
        if(type=='list') {
          if (option == "add") {
            // this.currentPage = ((this.total + 1) / this.pagesize).floor;
            this.getList()
          }
          else {
            this.getList()
          }
        }

      },
      deleteRow(index, rows){
        this.lineList.splice(index, 1);
        linecategorydelete({token:paramm.getToken(),id:rows.id}).then((res) => {
          if(res.data.error){
            this.$message.error(res.data.massage);
          }
          else {
            this.getList()
          }
        })
      },
      editorFn(rows,typee){
        this.editcategory.id=rows.id;
        if(typee == 'newGroup') {
          this.editcategory.id=rows.teamid;
        }
        this.editcategory.name=rows.name;
        this.modeType = typee;
      },
      getList(){
        let _this = this;
        this.searchList.pageindex = this.currentPage-1
        this.searchList.pagesize = this.pagesize
        let dates = ''
        let startday = this.date[0]
        let endday = this.date[1]
        startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
        endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
        if(startday == '' && endday == '') {
          dates = ''
        } else {
          dates = startday + '|' + endday
        }
        let searchParam = this.searchList
        searchParam.date = dates || ''
        grouplist(searchParam).then((res) => {
          if(res.data.error || res.data.err) {
            this.$message({
              message: '查询失败',
              type: 'warning'
            });
            return
          }else {
            _this.lineList = res.data.obj.datas
            _this.total = Number(res.data.obj.total)
          }
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //分页
      handleCurrentChange(val) {
        this.getList();
      },
      //点击查询
      searchGetList(){
        this.getList();
      },
      // 清空查询
      clearGetList () {
       this.searchList = {
            categoryType: '',
            linename: '',
            teamname: '',
            status: '',
            token: paramm.getToken(),
            pageindex:0,
            pagesize: 10
        };
        this.date = ''
      }

    }
  }
</script>

<style scoped lang="scss">
  .not:hover{color: red;}
  header{
    padding: 0 40px;
    background: white;
    margin-bottom: 30px;
    padding-top: 20px;
    .defaultbutton{
      border-color:#9ad4d6 ;
      color: #2cb1b6;
      float: right;
      margin-top: -10px;
    }
    .el-menu-item{
      height: 36px;
      line-height: 36px;
      border-top: 3px solid transparent;
      padding: 0;
      a{
        padding: 0 20px;
        display: block;
      }
    }
    .el-menu-item:hover{
      background: transparent;
      border-bottom: transparent;
      color: #3ec3c8;
      height: 36px;
      line-height: 36px;
    }
    .el-menu-item.is-active{
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
        float: left;
        .el-col-4{
          width: 220px;
        }
      }

    }
  }

  .padding30{padding: 0 30px;}
  .page{
    padding: 15px 30px;
    background: white;
    text-align: right;
  }
  .el-table .cell{
    text-align: left;

  }
  .el-breadcrumb{font-size:18px ; margin-bottom: 20px;}
  .hasid {
    display: none;
  }
</style>
