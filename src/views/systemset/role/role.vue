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
          <el-button class="defaultbutton hasid" id="444b97a172bc11e7aad70242ac120006" @click="setMode('addrole','add')">新增角色</el-button>
        </el-col>
      </el-row>
    </header>
    <section class="padding30">
      <el-table :data="roleList" style="text-align: left; font-size: 12px;">
        <el-table-column prop="number" label="序号">
        </el-table-column>
       <!-- <el-table-column prop="id" label="角色ID">
        </el-table-column>-->
        <el-table-column prop="rolename" label="角色名称">
        </el-table-column>
        <el-table-column prop="createtime" label="添加时间">
        </el-table-column>

        <el-table-column  label="操作">
          <template scope="scope">
            <el-button class="hasid" id="487ae10e72bc11e7aad70242ac120006" @click="editorFn(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text"  class="hasid"  id="4ca1ba0f72bc11e7aad70242ac120006" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
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
  import paramm from '../../../common/js/getParam'
	import { showorhide } from '../../../common/js/showorhid'
  import axios from 'axios';
  import AddRole from './addrole';
  import {token,rolelist,roledel, roledetail} from '../../../common/js/config';
  export default {
    components: {
      AddRole, // add role
    },
    data() {
      return {
        roleList: [],
        modeType:'role',
        total:0,
        token:paramm.getToken(),
        currentPage:1,
        pagesize:15,
        operationType:{type:'add',id:''},
        pageset:{
          token:paramm.getToken(),
          pageIndex:0,
          pageSize:''
        },
      }
    },
    created(){
      this.getList()
    },
    updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
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
        //发送请求
        let _this = this;
        let para = {token:paramm.getToken(),id:rows.id}
        roledetail(para).then((res) => {
          if(res.data.error !=0 || res.data.err) {
            paramm.getCode(res.data,_this)
          }else{
            //paramm.getCode(res.data,_this)
          }
        })

      },
      deleteRow(index, rows){
        let _this = this;
        let para ={token:paramm.getToken(),id:rows.id}
        roledel(para).then((res) => {
          if(res.data.error!=0 || res.data.err){
            paramm.getCode(res.data, _this)
          } else {
            this.roleList.splice(index, 1);
            this.getList()
            paramm.getCode(res.data, _this)
          }
        })
      },
      getList(){
        this.pageset.pageIndex = this.currentPage-1;
        this.pageset.pageSize = this.pagesize;
        let page = this.pageset;
        rolelist(page).then((res) => {
          this.total = Number(res.data.obj.total);
          this.roleList =Object.assign([],res.data.obj.datas);

          this.roleList.forEach((item,index) => {
            item.number = Number(index + 1)
          })
          console.log(this.roleList)
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
