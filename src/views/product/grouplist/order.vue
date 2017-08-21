<template>
  <div>
    <div >
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>发团列表</el-breadcrumb-item>
              <el-breadcrumb-item>下单</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </header>
      <section class="padding30">
        <div>
          <table border="1">
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>

        </div>


        <el-table :data="lineList" style="text-align: left; font-size: 12px;">
          <el-table-column prop="name" label=" 团号/线路名称">
          </el-table-column>
          <el-table-column prop="time" label="出发日期/回团日期">
          </el-table-column>
          <el-table-column prop="plan" label="计划人数">
          </el-table-column>
          <el-table-column prop="sex" label="余位">
          </el-table-column>
          <el-table-column prop="date" label="天数">
          </el-table-column>
          <el-table-column prop="sex" label="已售">
          </el-table-column>
          <el-table-column prop="sex" label="状态">
          </el-table-column>
          <el-table-column prop="sex" label="发布人">
          </el-table-column>
          <el-table-column  label="操作">
            <template scope="scope">
              <el-button @click="editorFn(scope.row)" type="text" size="small">下单</el-button>
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
  </div>
</template>
<script>
  import axios from 'axios';
  import util from '../../../common/js/util'
  import {token,linecategorylist,linecategoryadd,linecategoryupdate,linecategorydelete} from '../../../common/js/config';
  export default {
    data() {
      return {
        searchList:{},
        showAdd:false,
        showEdit:false,
        type:[{value:'1',label:'国内'},{value:'2',label:'出境游'},{value:'3',label:'周边游'}],
        total:0,
        currentPage:1,
        pagesize:15,
        operationType:{type:'add',id:''},
        pageset:{
          token,
          pageIndex:0,
          pageSize:''
        },
      }
    },
    created(){
      this.getList()
    },
    methods:{
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
        this.pageset.pageIndex = this.currentPage-1
        this.pageset.pageSize = this.pagesize
        let page = this.pageset
        linecategorylist(page).then((res) => {
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
