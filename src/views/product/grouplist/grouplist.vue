<template>
  <div>
    <div  v-if="modeType == 'list'" >
      <header>
        <el-row>
          <el-col :span="20">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>发团列表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="4">
            <el-button  size="large" type="primary"  id="5c18b1d0734611e788410242ac120009" class="defaultbutton hasid" @click="setMode('newGroup','add')" >发团计划</el-button>
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
               <el-input v-model="searchList.linename" placeholder='线路名称'></el-input>
             </el-col>
           </el-form-item>
           <el-form-item label="团号">
             <el-col :span="4" style="width: 150px">
               <el-input v-model="searchList.teamname" placeholder='团号'></el-input>
             </el-col>
           </el-form-item>
            <el-form-item   style="margin: 0 30px 0 40px;">
              <el-button class="hasid" id="49641a18734611e788410242ac120009" type="primary" @click="searchGetList">查询</el-button>
            </el-form-item>
            <el-form-item   style="margin-left: 0px">
              <el-button  type="primary" @click="clearGetList">清空查询</el-button>
            </el-form-item>
          </el-row>

        </el-form>

        <el-table :data="lineList" border style="text-align: left; font-size: 12px;" @cell-click="showRemark">
          <el-table-column prop="teamno" label=" 团号" width="150">
          </el-table-column>
          <el-table-column prop="linename" label="线路名称">
            <template scope="scope">
              {{scope.row.linename.length>70?scope.row.linename.substring(0,70)+'...':scope.row.linename}}
            </template>
          </el-table-column>
          <el-table-column prop="starttime" label="出发日期" width="110">
          </el-table-column>
          <el-table-column prop="endtime" label="回团日期" width="110">
          </el-table-column>
          <el-table-column prop="plan" label="计划人数" width="90">
          </el-table-column>
          <el-table-column prop="surplus" label="余位" width="70">
          </el-table-column>
          <el-table-column prop="days" label="天数" width="70">
          </el-table-column>
          <el-table-column prop="book" label="预定" width="70">
          </el-table-column>
          <!--<el-table-column prop="sit" label="占位" width="70">-->
          <!--</el-table-column>-->
          <el-table-column prop="status" label="状态" width="80">
          </el-table-column>
          <el-table-column prop="approveName" label="审批状态" width="90">
          </el-table-column>
          <el-table-column prop="creater" label="发布人" width="100">
          </el-table-column>
          <el-table-column  label="操作" width="100" >
            <template scope="scope">
              <a href="javascript:;" class="operation">
                <el-dropdown @visible-change="toDown">
									<span class="el-dropdown-link" style='color: #3ec3c8;'>
						        操作<i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
                  <el-dropdown-menu slot="dropdown"  style='text-align: center;font-size: 20px;font-weight: bold;'>
                    <el-dropdown-item> <el-button v-if="scope.row.approveName=='待审批'" type="text" size="small"  @click='setAppId(scope.row.id)' >审核</el-button></el-dropdown-item>
                    <el-dropdown-item> <el-button v-if="scope.row.isorder && scope.row.status =='待发团'&& (scope.row.approveName =='审批通过' || scope.row.approveName =='无需审批') " class="hasid" id="521410f9734611e788410242ac120009" @click="setMode('groupinfo'),editorFn(scope.row,'groupinfo')" type="text" size="small" >下单</el-button></el-dropdown-item>
                    <el-dropdown-item> <el-button class="hasid" id="6f6276e6734611e788410242ac120009" @click="setMode('newGroup','edit'),editorFn(scope.row,'newGroup')" type="text" size="small">编辑</el-button>  <!-- editorFn(scope.row)  --></el-dropdown-item>
                    <el-dropdown-item> <el-button  @click="setMode('groupnamelist'),editorFn(scope.row,'groupnamelist')" type="text" size="small">出团名单</el-button></el-dropdown-item>
                    <el-dropdown-item> <el-button v-if="new Date(scope.row.starttime.replace(/-/g,'/')).getTime() > new Date().getTime()" class="hasid" id="8929e4a7734611e788410242ac120009" type="text" size="small" @click="deleteRow(scope.$index, scope.row)">{{{false:'启用',true:'封团'}[scope.row.isenable]}}</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!--出发日期-截止日期 > 当前日期  下单就显示  否则不显示-->
              </a>
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
      <el-dialog title="" :visible.sync="dialogFormVisible" size='tiny' :close-on-click-modal=false>
        <el-form :model="form" :rules="rules">
          <el-form-item label="线路审核：" :label-width="formLabelWidth" style='text-align: left;'>
            <el-radio class="radio" v-model="radio" label="1">审核通过</el-radio>
            <el-radio class="radio" v-model="radio" label="2">拒绝</el-radio>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="不超过120字!"
              @input="titleMessage"
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="examineCancel">取 消</el-button>
          <el-button type="primary" @click="examineSure">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="" :visible.sync="dialogShow" size='tiny' :close-on-click-modal=false>
        <el-form :model="form1" :rules="rules">
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <el-input v-model="form1.mark">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
    <GroupInfo v-else-if="modeType == 'groupinfo'" @setMode="setMode" @editorFn='editorFn'  :categoryId="editcategory.id"></GroupInfo>
    <Groupnamelist v-else-if="modeType == 'groupnamelist'" @setMode="setMode"   :tdidd="tdidd"></Groupnamelist>
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
  import Groupnamelist from './groupnamelist'
  import util from '../../../common/js/util'
  import axios from 'axios'
  import {grouplist,linecategorydelete,groupStop,groupApprove} from '../../../common/js/config'
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  export default {
    components:{
      Grouporder,
      NewGroup,
      GroupInfo,
      GroupReserve,
      Reserve,
      Groupnamelist
    },
    data() {
      return {
        rules: {
          remark: [
//            { required: true, message: '请输入活动名称', trigger: 'blur' },
            {min: 0, max: 120, message: '不能超过120字!', trigger: 'blur' }
          ]

        },
        tdidd: '',
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
        type:[{value:'0',label:'全部'},{value:'1',label:'国内'},{value:'2',label:'出境游'},{value:'3',label:'周边游'}],
        type1:[{value:'0',label:'全部'},{value:'2',label:'已封团'},{value:'3',label:'待发团'},{value:'4',label:'行程中'},{value:'5',label:'已结团'},],
        total:0,
        currentPage:1,
        pagesize:10,
        operationType:{type:'add',id:''},
        lineList:[],
        editcategory:{},
        optionName: '新增发团计划',
        dialogFormVisible: false,
        dialogShow:false,
        form: {
          remark:'',
        },
        form1:{
          mark:''
        },
        radio: '1',
        formLabelWidth: '100px',
        approveId: ''
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
    mounted(){

    	if(this.$route.query.name){
    		this.getList()
    	}
    },
    methods:{
      toDown(){
        showorhide()
      },
      showRemark(row, column, cell, event){
        if(column.property === 'approveName'){
          this.dialogShow = true
        }
      },
      // 审核确定 取消
      setAppId (id) {
        this.dialogFormVisible = true;
        this.approveId = id
      },
      titleMessage(){
        if(this.form.remark.length > 120){
          this.$message({
            message:'输入的内容超过120字',
            type:'warning'
          })
        }
      },
      examineSure () {
        if(this.form.remark.length>120) {
          this.$message({
            message: '审核备注不能超过120字!',
            type: 'warning'
          });
          return
        }
        let _this = this;
        this.form.approve = _this.radio == '1'? true: false;
        this.form.id = _this.approveId;
        this.form.token = paramm.getToken();
        groupApprove(this.form).then((res)=>{
            if(res.data.error || res.data.err) {
              paramm.getCode(res.data,_this);
            }else {
              paramm.getCode(res.data,_this);
              _this.getList()
              _this.dialogFormVisible = false;
              _this.form1.mark = _this.form.remark
              console.log(777,_this.mark)
              _this.form= {
                remark:'',
              }
              _this.radio = '1'
            }

        })
      },
      examineCancel () {
        this.dialogFormVisible = false
        this.form= {
          remark:'',
        }
        this.radio = '1'
      },
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
        let _this = this;
        groupStop({token:paramm.getToken(),id:rows.id,status:!rows.isenable}).then((res) => {
          if(res.data.error == 1 || res.data.err){
            paramm.getCode(res.data, _this)
          }
          else {
            paramm.getCode(res.data, _this)
            this.getList()
          }
        })
      },
      editorFn(rows,typee){
        this.editcategory.id=rows.id;
        this.tdidd=rows.id;
        console.log(789, this.tdidd);
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
        if(this.$route.query.name){
        	searchParam.linename = this.$route.query.name
        }
        grouplist(searchParam).then((res) => {
          if(res.data.error !=0 || res.data.err) {
            paramm.getCode(res.data, _this)
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
        this.$router.push({ path: '/grouplist'})
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
      float:right;
      margin-top:-10px;
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
    margin: 0;
  }
  .el-table .cell{
    text-align: left;

  }
  .el-breadcrumb{font-size:18px ; margin-bottom: 20px;}
  .hasid {
    display: none;
  }
</style>
