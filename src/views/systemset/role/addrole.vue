<template>
  <div v-model="modalOpen">
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item  ><span v-on:click="handleHide()">角色管理</span></el-breadcrumb-item>
            <el-breadcrumb-item>新增角色</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </header>
    <section class="section">
      <div class="role-name"><label><span style="color: red">*</span>角色名称</label>
        <el-input v-model="roleName" class="role-name-input" placeholder="请输入内容" ></el-input>
      </div>
      <div class="add-role-item first">
        <div class="left"><el-checkbox v-model="lineManage.status">线路管理</el-checkbox></div>
        <div class="right">
          <el-checkbox  :disabled="!lineManage.status" v-model="lineManage.editor" v-on:click="handleCheck" >备选项</el-checkbox>
          <el-checkbox  :disabled="!lineManage.status"  v-model="lineManage.book">备选项备选项</el-checkbox>
        </div>
       </div>
      <div class="add-role-item">
        <div class="left"><el-checkbox v-model="orderManage.status">订单管理</el-checkbox></div>
        <div class="right">
          <el-checkbox :disabled="!orderManage.status" v-model="orderManage.editor">备选项</el-checkbox>
          <el-checkbox :disabled="!orderManage.status" v-model="orderManage.book">备选项备选项</el-checkbox>
        </div>
      </div>
      <div class="add-role-item">
        <div class="left"><el-checkbox v-model="financeManage.status">财务管理</el-checkbox></div>
        <div class="right">
          <el-checkbox :disabled="!financeManage.status" v-model="financeManage.editor">备选项</el-checkbox>
          <el-checkbox  :disabled="!financeManage.status" v-model="financeManage.book">备选项备选项</el-checkbox>
        </div>
      </div>
      <div class="add-role-item">
        <div class="left"><el-checkbox v-model="customerManage.status">客服管理</el-checkbox></div>
        <div class="right">
          <el-checkbox :disabled="!customerManage.status" v-model="customerManage.editor">备选项</el-checkbox>
          <el-checkbox :disabled="!customerManage.status" v-model="customerManage.book">备选项备选项</el-checkbox>
        </div>
      </div>
      <div class="add-role-item">
        <div class="left"><el-checkbox v-model="systemManage.status">系统管理</el-checkbox></div>
        <div class="right">
          <el-checkbox :disabled="!systemManage.status" v-model="systemManage.editor">备选项</el-checkbox>
          <el-checkbox :disabled="!systemManage.status" v-model="systemManage.book">备选项备选项</el-checkbox>
        </div>
      </div>
      <div class="remark">
        <label class=" remark-lable">备注  </label>

          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="remarkInfo">
          </el-input>
      </div>
      <div class="save">
        <el-button type="primary" v-on:click="submitFn()">保存</el-button>
        <el-button  v-on:click="handleHide()" >取消</el-button>
      </div>

    </section>
  </div>

</template>

<script>

  import axios from 'axios';
  export default {
    props: {
    },
    data() {

      return {
        roleName: "test",
        lineManage:
          {
              status:true,
              editor:false,
              book:true
          },
        orderManage:{
          status:true,
          editor:true,
          book:true
        },
        financeManage:{
          status:true,
          editor:true,
          book:true
        },
        chartManage:{
          status:true,
          editor:true,
          book:true
        },
        customerManage:{
          status:true,
          editor:true,
          book:true
        },
        systemManage:{
          status:true,
          editor:true,
          book:true
        },
        remarkInfo:'ssss'
      }
    },

    computed: {
      modalOpen(){
        return false;
      }
    },
    methods:{

      handleHide: function() {
        this.$emit('setMode', 'role');
      },
      handleCheck:function (){
          if(!this.lineManage.status){
            this.lineManage.status=false
            return false
          }


      },
        //post date
      submitFn:function () {
        if (this.roleName.length == 0) {
          this.$message.error('请输入角色名！');
          return
        }
        let postData = {
          roleName: this.roleName,
          remark: this.remark,
          auths: {
            lineManage: this.lineManage,
            orderManage: this.orderManage,
            financeManage: this.financeManage,
            chartManage: this.chartManage,
            customerManage: this.customerManage,
            systemManage: this.systemManage
          }
        };
        axios.post('https://172.17.9.13:3001/sys/role/save', postData).then((backData) => {
            if(backData.error){
              this.$message.error(backData.massage);
            }
            else {
                this.$emit(addRoleBackData,obj);
                this.handleHide();
            }
        })
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
  *{  box-sizing: border-box;}
  section{
    background-color: white;
    margin: 30px;
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    .first{
      border-top: dotted 1px #7e8c8d ;
      border-bottom: dotted 1px #7e8c8d ;

    }
    .add-role-item{
      margin: 0 40px;
      border-bottom: dotted 1px #7e8c8d ;
      padding: 10px 30px;
      overflow: hidden;
      .left{
        width: 20%;
        padding: 20px 20px 20px 60px;
        font-weight: bold !important;
        float:left;
        .el-checkbox{
          .el-checkbox__label{
            font-size: 16px;
          }
        }

      }
      .right{
        float: left;
        border-left: dotted 1px #7e8c8d ;
        width: 80%;
        padding: 0 20px 20px ;
        .el-checkbox{
          padding: 20px 40px 0 40px;
          margin-left: 0px;
          min-width: 260px;
        }
      }
    }
    .role-name{margin: 30px}
    .role-name-input{ width: 250px;margin-left: 40px}
    .el-textarea{ width:70%; float: left;margin-top: 30px; resize: none}
    .remark{width: 100%; overflow: hidden}
    .remark-lable{padding:10px 40px ;float: left;margin-top: 30px}
    .save{
      width: 100%;
      padding: 30px 110px 80px ;
      .el-button{padding: 10px 50px}
    }


  }

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
