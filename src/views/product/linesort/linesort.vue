<template>
  <div>
    <div >
      <header>
        <el-row>
          <el-col :span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>产品管理</el-breadcrumb-item>
              <el-breadcrumb-item>线路分类</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="12">
            <el-button class="defaultbutton" @click="showAdd=true">新增线路</el-button>
          </el-col>
        </el-row>
      </header>
      <section class="padding30">
        <el-table :data="lineList" style="text-align: left; font-size: 12px;">
          <el-table-column prop="code" label="系统分类">
          </el-table-column>
          <el-table-column prop="name" label="分类名称">
          </el-table-column>
          <el-table-column prop="sex" label="线路数量">
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

        <!--add-->
        <el-dialog title="添加" size="tiny"  v-model="showAdd" :close-on-click-modal="false">
          <el-form   label-width="80px" :model="addcategory"  :rules="rules"  ref="addcategory" style="text-align: left;">
            <el-form-item label="系统分类" prop="type"  >
              <el-select v-model="addcategory.type"  >
                <el-option  v-for="item in type"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="addcategory.name"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveAdd()">保存</el-button>
            <el-button @click.native="showAdd = false">取消</el-button>
          </div>
        </el-dialog>

        <!--edit-->
        <el-dialog title="编辑" size="tiny"   v-model="showEdit" :close-on-click-modal="false">
          <el-form :model="editcategory" :rules="rules" label-width="80px" ref="editcategory" style="text-align: left;">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="editcategory.name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveEdit()">保存</el-button>
            <el-button @click.native="showEdit= false">取消</el-button>
          </div>
        </el-dialog>
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
        lineList:[],
        addcategory:{
          type:'1',
          name:''
        },
        editcategory:{
            token,
            id:'',
          name:''
        },
        showAdd:false,
        showEdit:false,
        type:[{value:'1',label:'国内'},{value:'2',label:'出境游'},{value:'3',label:'周边游'}],
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
        },
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
      checkValue(formName){
        this.$refs[formName].validate((valid) => {
          return valid?true:false
        });
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
