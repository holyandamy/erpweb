<template>
  <div>
    <div>
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item><span @click="handleHide()">发团列表</span></el-breadcrumb-item>
              <el-breadcrumb-item>出团名单</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>

        </el-row>
      </header>
      <section class="padding30">
        <el-row style='padding-bottom:50px;'>
          <el-col :span='8'>
            <el-button type="primary">打印本页</el-button>
          </el-col>
          <el-col :span='8'>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col :span='8'>
            <el-button type="primary"  @click="handleHide()">关闭窗口</el-button>
          </el-col>
        </el-row>
        <el-table :data="nameList" border style="text-align: left; font-size: 12px;">
          <el-table-column
            type="index"
            width="100"
            label="序号">
          </el-table-column>
          <el-table-column prop="teamno" label=" 姓名" width="150">
          </el-table-column>
          <el-table-column prop="linename" label="游客类型" >
          </el-table-column>
          <el-table-column prop="linename" label="证件类型" >
          </el-table-column>
          <el-table-column prop="linename" label="证件号" >
          </el-table-column>
          <el-table-column prop="linename" label="手机号" >
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
  import {token,grouplist} from '../../../common/js/config'
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  export default {
    data() {
      return {
        total:0,
        currentPage:1,
        pagesize:10,
        nameList: []
      }
    },
    // 进入获取列表
    created(){
      this.getList()
    },
    updated: function() {
      this.$nextTick(function() {
        showorhide()
      })
    },
//    mounted(){
//    	if(this.$route.query.name){
//    		this.getList()
//    	}
//    },
    methods:{
      getList(){
        let _this = this
        grouplist({
          date: '',
          categoryType: '',
          linename: '',
          teamname: '',
          status: '',
          token: paramm.getToken(),
          pageindex:this.currentPage-1,
          pagesize: this.pagesize
        }).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data, _this)
            return
          }else {
            _this.nameList = res.data.obj.datas
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
      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
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
