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
          <el-table-column prop="name " label=" 姓名" width="150">
          </el-table-column>
          <el-table-column label="游客类型" >  <!--  prop="type"   -->
            <template scope="scope">
              {{{1:"成人",2:"儿童",3:"婴儿"}[scope.row.type]}}
            </template>
          </el-table-column>
          <el-table-column  label="证件类型" >  <!-- prop="certtype"   -->
            <template scope="scope">
              {{{1:"身份证",2:"护照",3:"军官证",4:"港澳通行证"}[scope.row.certtype]}}
            </template>
          </el-table-column>
          <el-table-column prop="cert" label="证件号" >
          </el-table-column>
          <el-table-column prop="mobile" label="手机号">
          </el-table-column>
        </el-table>
        <!--<div class="page">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="currentPage"-->
            <!--:page-size="pagesize"-->
            <!--layout="total, prev, pager, next"-->
            <!--:total="total">-->
          <!--</el-pagination>-->
        <!--</div>-->
        <div style='padding: 30px'>
          <span style='float: left'>操作人：{{backData.operator||'---'}}</span>
          <span style='float: right'>打印日期：{{backData.printtime||'---'}}</span>
          <span></span>
        </div>
      </section>

    </div>
  </div>
</template>
<script>
  import {ordernameslist} from '../../../common/js/config'
  import { showorhide } from '../../../common/js/showorhid'
  import paramm from '../../../common/js/getParam'
  export default {
    props: ['tdidd'],
    data() {
      return {
        total:0,
//        currentPage:1,
//        pagesize:10,
        nameList: [],
        backData: {}
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
        ordernameslist({
          token: paramm.getToken(),
          tdid: this.tdidd
        }).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data, _this)
            return
          }else {
            _this.backData = res.data.obj
            _this.nameList = res.data.obj.namelist
            _this.total = Number(res.data.obj.total)
          }
        })
      },
      handleHide: function (option) {
        this.$emit('setMode', 'list', option);
      },
      //分页
//      handleCurrentChange(val) {
//        this.getList();
//      },
//      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
//      }
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
