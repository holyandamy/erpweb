<template>
  <div>
    <div v-if="modeType == 'role'">
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="12">
          <el-button class="defaultbutton" @click="setMode('addrole','add')">新增角色</el-button>
        </el-col>
      </el-row>
    </header>
    <section class="padding30">
      <el-table :data="roleList" style="text-align: left; font-size: 12px;">
        <el-table-column prop="id" label="角色ID">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称">
        </el-table-column>
        <el-table-column prop="createtime" label="添加时间">
        </el-table-column>

        <el-table-column  label="操作">
          <template scope="scope">
            <el-button @click="editorFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
    <AddRole v-else  @setMode="setMode" :operationType="operationType"></AddRole>
  </div>
</template>

<script>
  import axios from 'axios';
  import AddRole from './addrole';
  export default {
    components: {
      AddRole, // add role
    },
    data() {
      return {
        roleList: [],
        modeType:'role',
        total:0,
        token:123,
        currentPage:1,
        pagesize:15,
        operationType:{type:'add',id:''},
        pageset:{
          token:'ssssss',
          pageIndex:0,
          pageSize:''
        },
      }
    },
    created(){
      this.getList()
    },
    methods:{
      setMode(type,option){
        this.operationType.type=option;
          this.modeType=type;
          if(type=='role') {
            if (option == "add") {
             // this.currentPage = ((this.total + 1) / this.pagesize).floor;
              this.getList()
            }
            else {
              this.getList()
            }
          }

      },
      editorFn(rows){
          this.operationType.type='edit';
          this.operationType.id=rows.id;
          this.modeType='addRole';
      },
      deleteRow(index, rows){
        this.roleList.splice(index, 1);
        axios.post('http://172.17.9.13:3001/api/sys/role/del',{token:1111,id:rows.id} ).then((res) => {
          if(res.data.error){
            this.$message.error(res.data.massage);
          }
          else {
            this.getList()
          }
        })
      },
      getList(){
        this.pageset.pageIndex = this.currentPage-1;
        this.pageset.pageSize = this.pagesize;
        let page = this.pageset;
        axios.post("http://172.17.9.13:3001/api/sys/role/list",page).then((res) => {
          this.total = Number(res.data.obj.total);
          this.roleList =Object.assign([],res.data.obj.datas);
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
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
