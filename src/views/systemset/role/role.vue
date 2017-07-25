<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

      </el-row>
    </header>
    <section class="padding30">

      <el-table :data="roleList" style="text-align: left; font-size: 12px;">
        <el-table-column prop="roleId" label="角色ID">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间">
        </el-table-column>

        <el-table-column  label="操作">
          <template scope="scope">
            <el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
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
      <!--编辑-->
      <el-dialog title="编辑" size="tiny"  v-model="showFormVisible" :close-on-click-modal="false">
        <el-form :model="editRole" label-width="80px" ref="editbank" style="text-align: left;">
          <el-form-item label="角色ID" prop="roleId">
            <el-input v-model="editRole.roleId"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRole.roleName"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">

          <el-button type="primary" @click="saveEdit('editRole')">保存</el-button>
          <el-button @click.native="showFormVisible = false">取消</el-button>
        </div>
      </el-dialog>


    </section>
  </div>

</template>

<script>
  /*
  2017-7-25 by aklliy.mou
  example:
   get data style:
   roleList: [{
   addTime: '2016-05-03',
   roleName: '财务',
   province: '上海',
   roleId: '012000',
   },
   .....
   ]
   delete operation post data:
   operation:{
     type:'delete',
     roleID:''
   },
   editor  operation post data:
   editRole: {
     roleId: '',
     roleName: '',
   }
   
   */
  import axios from 'axios';
  export default {
    data() {
      return {
        roleList: [{
          addTime: '2016-05-03',
          roleName: '财务',
          province: '上海',
          roleId: '012000',
        },
        {
          addTime: '2016-05-03',
          roleName: '财务',
          province: '上海',
          roleId: '012000',
        },
        {
          addTime: '2016-05-03',
          roleName: '财务',
          province: '上海',
          roleId: '012000',
        }],
        activeIndex: "2",
        banklist: [],
        total:0,
        currentPage:1,
        pagesize:15,
        showFormVisible:false,
        isenable:false,
        pageset:{
          pageIndex:'',
          pageSize:''
        },
        operation:{
          type:'',
          roleID:''
        },
        editRole: {
          roleId: '',
          roleName: '',
        }
      }
    },
    created(){
      this.getList(1)
    },
    methods:{
      deleteRow(index, rows) {
        rows.splice(index, 1);
        this.operation.type='delete';
        this.operation.roleID=rows.roleId;
        this.getList(0);

      },
      getList(length,massage){
        this.pageset.pageIndex = this.currentPage-length;
        this.pageset.pageSize = this.pagesize;
        let page = this.pageset;
        axios.post("https://172.17.9.13:3001/api/sys/role/list",page).then((res) => {
          this.roleList = res.data.obj.datas;
          this.total = Number(res.data.obj.total);
          arguments.length>1?this.$message(massage):'';
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.getList(1)
      },

      handleShow: function(index, row) {
        this.showFormVisible = true;
        this.editRole = Object.assign({}, row);
      },

      //editor save
      saveEdit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://172.17.9.13:3001/api/sys/role/update',this.editRole).then((res) => {
              this.showFormVisible = false
              this.$message('保存成功！');
              this.getList(0)
            })
          } else {
            this.$message.error('提交错误！');
            return false;
          }
        });

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
