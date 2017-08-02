<template>
  <div>
    <div v-if="modeType == 'list'">
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>客服管理</el-breadcrumb-item>
              <el-breadcrumb-item>游客管理</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12">
            <el-button class="defaultbutton" @click="setMode('add','add')">新增游客</el-button>
          </el-col>
        </el-row>
      </header>
      <section class="padding30">
        <el-form    ref="searchList" label-width="100px" class="demo-ruleForm" style="text-align: left;">
          <el-form-item label="游客名称"  >
            <el-col :span="4">
              <el-input v-model="searchList.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="游客电话号码"  style="margin-left: 10px">
            <el-col :span="4">
              <el-input v-model="searchList.mobile"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="创建时间"   style="margin-left: 10px">
            <div class="block">
              <el-date-picker
                v-model="searchList.date"
                type="daterange"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item   style="margin-left: -70px">
              <el-button type="primary" @click="searchGetList">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="visitorList" style="text-align: left; font-size: 12px;">
          <el-table-column prop="code" label="游客IDs">
          </el-table-column>
          <el-table-column prop="name" label="游客名字">
          </el-table-column>
          <el-table-column prop="sex" label="游客性别">
          </el-table-column>
          <el-table-column prop="mobile" label="游客手机" >
          </el-table-column>
          <el-table-column prop="birthday" label="游客生日">
          </el-table-column>
          <el-table-column prop="createtime" label="添加时间" >
          </el-table-column>

          <el-table-column  label="操作">
            <template scope="scope">
              <el-button @click="handleShow(scope.row)" type="text" size="small">编辑</el-button>
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
    <AddVisitor v-else  @setMode="setMode" :operationType="operationType" ></AddVisitor>
  </div>

</template>

<script>
  import AddVisitor from './addVisitor'
  import axios from 'axios';
  export default {
    components:{
      AddVisitor
    },
    data() {
      return {
        visitorList:[],
        modeType:'list',
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
        searchList:{
            name:'',
            mobile:'',
            date:''
        }
      }
    },
    created(){
      this.getlist()
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
        this.visitorList.splice(index, 1);
        axios.post('http://172.17.9.13:3001/api/sys/role/del',{token:1111,id:rows.id} ).then((res) => {
          if(res.data.error){
            this.$message.error(res.data.massage);
          }
          else {
            this.getList()
          }
        })
      },
      editorFn(rows){
        this.operationType.type='edit';
        this.operationType.id=rows.id;
        this.modeType='add';
      },
      getlist(){
        this.pageset.pageIndex = this.currentPage-1
        this.pageset.pageSize = this.pagesize
        let page = this.pageset
        axios.post("http://172.17.9.13:3001/api/cust/list",page).then((res) => {
          this.visitorList = res.data.obj.datas
          this.total = Number(res.data.obj.total)
          console.log(res)
        })
      },
      searchGetList(){
        if(this.searchList.mobile ||this.searchList.date||this.searchList.name){
          this.$message.error('输入搜索条件');
          return
        }
        let newDate
        if(this.searchList.date!=''){
          const mouth={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sept:'09',Oct:'10',Nov:'11',Dec:'12' }
          let start=String(this.searchList.date[0]).split(' ')
          let end=String(this.searchList.date[1]).split(' ')
          newDate=start[3]+'-'+mouth[start[1]]+'-'+start[2]+'|'+end[3]+'-'+mouth[end[1]]+'-'+end[2]
        }
        if(this.searchList.mobile){
          let mobileReg = /^[0-9]{11}$/;
          if(mobileReg.test(this.searchList.mobile)) {
            this.$message.error('输入正确手机号码');
            return
          }
        }

        let templateSeacrchList={
            pageIndex:this.currentPage-1,
            pageSize:this.pagesize,
            token:"111111111111",
            name:this.searchList.name,
            date:newDate,
            mobile:this.searchList.mobile,
          };
          axios.post("http://172.17.9.13:3001/api/cust/list",templateSeacrchList).then((res) => {
            this.visitorList = res.data.obj.datas
            this.total = Number(res.data.obj.total)
            console.log(res)
          })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //分页
      handleCurrentChange(val) {
        this.getlist()
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
