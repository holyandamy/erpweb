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
            <el-button class="defaultbutton" @click="setMode('newGroup','add')">新增发团计划</el-button>
          </el-col>
        </el-row>
      </header>
      <section class="padding30">
        <el-form    ref="searchList" label-width="100px" class="demo-ruleForm" style="text-align: left;">
          <el-form-item label="出发时间"   style="margin-left: 10px">
            <div class="block">
              <el-date-picker
                v-model="searchList.date"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="线路类型" prop="type"  style="width: 190px" >
            <el-select v-model="searchList.type"  >
              <el-option  v-for="item in type"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="type"  style="width: 190px" >
            <el-select v-model="searchList.stateType"  >
              <el-option value="0">全部</el-option>
              <el-option value="1">正常</el-option>
              <el-option value="2">停止</el-option>
              <el-option value="3">待发团</el-option>
              <el-option value="4">已发团</el-option>
              <el-option value="5">已结团</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路名称"  >
            <el-col :span="4"   >
              <el-input v-model="searchList.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="团号"  style="margin-left: 10px">
            <el-col :span="4" style="width: 150px">
              <el-input v-model="searchList.groupNumber"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item   style="margin-left: -70px">
            <el-button type="primary" @click="searchGetList">查询</el-button>
          </el-form-item>
          <el-form-item   style="margin-left: -70px">
            <el-button type="primary" @click="searchGetList">清空查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="lineList" border style="text-align: left; font-size: 12px;">
          <el-table-column prop="teamno" label=" 团号">
          </el-table-column>
          <el-table-column prop="linename" label="线路名称">
          </el-table-column>
          <el-table-column prop="starttime" label="出发日期">
          </el-table-column>
          <el-table-column prop="endtime" label="回团日期">
          </el-table-column>
          <el-table-column prop="plan" label="计划人数">
          </el-table-column>
          <el-table-column prop="surplus" label="余位">
          </el-table-column>
          <el-table-column prop="days" label="天数">
          </el-table-column>
          <el-table-column prop="book" label="已售">
          </el-table-column>
          <el-table-column prop="status" label="状态">
          </el-table-column>
          <el-table-column prop="creater" label="发布人">
          </el-table-column>
          <el-table-column  label="操作">
            <template scope="scope">
              <el-button @click="setMode('groupinfo'),editorFn(scope.row)" type="text" size="small">下单</el-button>
              <el-button @click="editorFn(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="editorFn(scope.row)" type="text" size="small">详情</el-button>
              <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">停止</el-button>
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
    <GroupInfo v-else-if="modeType == 'groupinfo'" @setMode="setMode" :categoryId="editcategory.id"></GroupInfo>
    <GroupReserve v-else-if="modeType == 'groupreserve'" @setMode="setMode" :categoryId="editcategory.id"></GroupReserve>
    <Grouporder v-else-if="modeType == 'order'"  @setMode="setMode" :operationType="operationType" ></Grouporder>
    <Reserve v-else-if="modeType == 'reserve'" @setMode="setMode" :categoryId="editcategory.id" :operationType="operationType"></Reserve>  <!-- @setMode="setMode"   :categoryId="editcategory.id"-->
    <NewGroup v-else  @setMode="setMode" :operationType="operationType" ></NewGroup>
  </div>
</template>
<script>
  import Grouporder from './grouporder'
  import NewGroup from './newgroup'
  import GroupInfo from './groupinfo'
  import GroupReserve from './groupreserve'
  import Reserve from './reserve'
  import axios from 'axios';
  import {token,grouplist,linecategoryadd,linecategoryupdate,linecategorydelete} from '../../../common/js/config';
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
        searchList:{},
        modeType:'list', /*reserve*/
        showAdd:false,
        showEdit:false,
        type:[{value:'1',label:'国内'},{value:'2',label:'出境游'},{value:'3',label:'周边游'}],
        total:0,
        currentPage:1,
        pagesize:15,
        operationType:{type:'add',id:''},
        pageset:{
          token,
          pageindex:0,
          pagesize:''
        },
        lineList:[],
        editcategory:{}
      }
    },
    created(){
      this.getList()
    },
    methods:{
      setMode(type,option){
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
        linecategorydelete({token,id:rows.id}).then((res) => {
          if(res.data.error){
            this.$message.error(res.data.massage);
          }
          else {
            this.getList()
          }
        })
      },
      editorFn(rows){
        this.editcategory.id=rows.id;
        this.editcategory.name=rows.name;
        this.modeType = 'groupinfo';
      },
      saveEdit(){
        this.$refs['editcategory'].validate((valid) => {
          if (valid) {
            this.showEdit=false;
            linecategoryupdate(this.editcategory).then((res) => {
              if(res.data.error){
                this.$message.error(res.data.massage);
              }
              else {
                this.getList()
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveAdd(){
        this.$refs['addcategory'].validate((valid) => {
          if (valid) {
            let addPost=Object.assign({},this.addcategory);
            addPost.type=parseInt(addPost.type);
            linecategoryadd(addPost).then((res) => {
              if(res.data.error){
                this.$message.error(res.data.massage);
              }
              else {
                this.getList()
                this.addcategory.name='';
                this.showAdd=false;
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getList(){
        this.pageset.pageindex = this.currentPage-1
        this.pageset.pagesize = this.pagesize
        let page = this.pageset
        grouplist(JSON.stringify(page)).then((res) => {
          this.lineList = res.data.obj.datas
          this.total = Number(res.data.obj.total)
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //分页
      handleCurrentChange(val) {
        this.getList()
      },
      //查询
      searchGetList(){

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
          width: 200px;
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
</style>
