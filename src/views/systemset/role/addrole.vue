<template>
  <div v-model="modalOpen">
    <header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item  ><span @click="handleHide()">角色管理</span></el-breadcrumb-item>
            <el-breadcrumb-item>{{optionName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </header>
    <section class="section">
      <div class="role-name"><label><span style="color: red">*</span>角色名称</label>
        <el-input v-model="roleName" class="role-name-input" placeholder="请输入内容"></el-input>
      </div>

      <div class="bigItem" v-for="value in roleMap.childs">
        <div class="bigTitle"><el-checkbox v-model="value.status" @change="clickChangeChildState(value)" >{{value.authname}}</el-checkbox></div>
        <div class="add-role-item " v-for="sValue in value.childs">
          <div class="left"><el-checkbox :disabled="!value.status"  v-model="sValue.status" @change="clickChangeChildState(sValue)">{{sValue.authname}}</el-checkbox></div>
          <div class="right" >
            <div v-for="tValue in sValue.childs" style="float: left">
              <el-checkbox  :disabled="!value.status || !sValue.status" v-model="tValue.status" >{{tValue.authname}}</el-checkbox>
                            <!--只要有一个不可用，就不能用-->
            </div>
          </div>
        </div>

      </div>

      <!--
      <div class="bigItem">
          <div class="bigTitle"><el-checkbox v-model="lineManage.status" @change="clickChangeChildState('lineManage')" >线路管理</el-checkbox></div>
          <div class="add-role-item ">
            <div class="left"><el-checkbox :disabled="!lineManage.status"  v-model="lineManage.editor.status">线路编辑</el-checkbox></div>
            <div class="right">
              <el-checkbox  :disabled="!lineManage.status || !lineManage.editor.status" v-model="lineManage.editor.china" >国内线路</el-checkbox>
              <el-checkbox  :disabled="!lineManage.status"  v-model="lineManage.editor.international">国际线路</el-checkbox>
            </div>
          </div>
      </div>-->
      <!--
         用户勾选了系统设置 重新登陆 就只能看到系统设置
         但是没有勾选里面的功能模块  但是却可以使用功能模块  比如可以新增角色  编辑角色
         角色react  系统设置 -> 操作日志  银行账号管理  角色管理  员工管理

         修改权限的思路：判断角色有哪些功能  没有的功能全都隐藏  仅仅作为展示
      -->

      <div class="remark">
        <label class=" remark-lable">备注  </label>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容（120字以内)"
          v-model="remarkInfo">
        </el-input>
      </div>
      <div class="save">
        <el-button type="primary" @click="submitFn()">保存</el-button>
        <el-button  @click="handleHide()" >取消</el-button>
      </div>

    </section>
  </div>

</template>

<script>

  import paramm from '../../../common/js/getParam'
  import axios from 'axios';
  import {roledetail,authlist,rolesave,roleupdate} from '../../../common/js/config';
  export default {

    data() {
      return {
        roleName:'',
        roleMap:{},
        remarkInfo:'',
        checkedIdList:'',
        optionName:'新增角色',
        optionType:this.$parent.operationType.type
      }
    },
    created: function () {
      let para={token:paramm.getToken()}
      authlist(para).then((res) => {
        if(res.data.error){
          this.$message.error(res.data.massage);
        }
        else {
          let resData={};
          resData.childs=res.data.obj;
          this.changeStateOfChildNodes(resData,true);
          this.roleMap = Object.assign({}, resData);
          if( this.$parent.operationType.type=='edit'){
            this.optionName="编辑角色"
            let data={
              token:paramm.getToken(),
              id:this.$parent.operationType.id,
            }
            roledetail(data).then((res) => {
              if(res.data.error){
                this.$message.error(res.data.massage);
              }
              else {
                let tempEditList={};
                this.roleName=res.data.obj.rolename;
                this.remarkInfo=res.data.obj.remark;
                tempEditList.childs=res.data.obj.auths;
                this.changeStateOfChildNodes(this.roleMap,false);
                this.changeStateOfChildNodes(tempEditList,true);
                this.deepCopyStatus(this.roleMap,tempEditList);
              }
            })
          }
        }
      })
    },
    computed: {
      modalOpen(){
        return false;
      }
    },
    methods:{
      deepCopyStatus:function (target,sources) {
        var newData=this.getData(sources).split(',')
        newData.pop();
        newData.map((value)=>{
          target.childs.forEach(singleChild=>{
              this.changeChildStateForDeepCopy(singleChild,value)
            }
          )
        })
      },
      changeChildStateForDeepCopy:function (singleChild,key) {
        if(singleChild.id == key){
          singleChild.status=true;
          return  true
        }
        if(singleChild.childs){
          singleChild.childs.forEach(newChild=>{
            this.changeChildStateForDeepCopy(newChild,key);
          })
        }
        return false
      },

      // This is an assign function that copies full descriptors
      completeAssign:function(target, ...sources) {
        sources.forEach(source => {
          let descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
          }, {});
          // by default, Object.assign copies enumerable Symbols too
          Object.getOwnPropertySymbols(source).forEach(sym => {
            let descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor.enumerable) {
              descriptors[sym] = descriptor;
            }
          });
          Object.defineProperties(target, descriptors);
        });
        return target;
      },
      changeStateOfChildNodes:function (oldObject,type) {
        if(typeof oldObject== "object"){
          oldObject.id?oldObject.status=type:'';
          if(oldObject.childs&&oldObject.childs.length>0)
          {
            for(let i=0;i<oldObject.childs.length;i++)
            {
              this.changeStateOfChildNodes(oldObject.childs[i],type)
            }
          }
        }
      },
      handleHide: function(option) {
        this.$emit('setMode', 'role',option);
      },
      clickChangeChildState:function (newObject){
        console.log(999)
        this.changeStateOfChildNodes(newObject,newObject.status)
      },
      getData(mapDate){
        var postList=''
        for(let i=0;i<mapDate.childs.length;i++){
          if(mapDate.childs[i].status == true){
            postList+= mapDate.childs[i].id+','
          }
          if(mapDate.childs[i].childs&&mapDate.childs[i].childs.length>0&&mapDate.childs[i].status==true){
            postList+=this.getData(mapDate.childs[i])
          }
        }
        return postList
      },
      //post date
      submitFn:function () {
        let _this = this;
        if (this.roleName.length == 0) {
          this.$message.error('请输入角色名！');
          return
        }
        if(this.roleName.length > 15) {
          this.$message({
            message:'角色名称在15字以内',
            type:'warning'
          })
          return false
        }
        if(this.remarkInfo.length > 120) {
          this.$message({
            message:'备注在120字以内',
            type:'warning'
          })
          return false
        }
        let newAuths=this.getData(this.roleMap).split(',')
        newAuths.pop();
        if( this.$parent.operationType.type!='edit'){
          let addPostData = {
            token:paramm.getToken(),
            name: this.roleName,
            remark: this.remarkInfo,
            auths: newAuths
          };
          rolesave(addPostData).then((backData) => {
            if(backData.data.error!=0 || backData.data.err){
              paramm.getCode(backData.data, _this)
            }
            else {
              paramm.getCode(backData.data, _this)
              this.handleHide('add');
            }
          })
        } else {
          let editPostData = {
            token:paramm.getToken(),
            name: this.roleName,
            remark: this.remarkInfo,
            auths: newAuths,
            id:this.$parent.operationType.id,
          };
          roleupdate(editPostData).then((backData) => {
            if(backData.data.error!=0 || backData.data.err){
              paramm.getCode(backData.data, _this)
            } else {
               _this.$message({
                  message:'保存成功，如果想要获取最新权限，请刷新页面或重新登录！',
                  type:'success'
               })
              // paramm.getCode(backData.data, _this)
              this.handleHide('edit');
            }
            /*if(backData.error){
              this.$message.error(backData.massage);
            }
            else {
              this.handleHide('edit');
            }*/
          })
        }
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

    .bigItem {
      margin-top: 10px;
      overflow: hidden;
      .bigTitle {
        border-top: 1px solid #eaeded;
        border-bottom: 1px solid #eaeded;
        background-color: rgba(131, 242, 243, 0.13);
        padding: 10px 20px 10px 70px;
        margin: 0 40px;

      }
      .add-role-item {
        margin: 0 40px;
        border-bottom: dotted 1px rgba(126, 140, 141, 0.34);
        padding: 0 30px;
        overflow: hidden;
        min-height: 38px;
        .left {
          width: 20%;
          padding: 10px 20px 0 60px;
          float: left;
          .el-checkbox {
            .el-checkbox__label {
              font-size: 16px;
              font-weight: bold !important;
            }
          }

        }
        .right {
          float: left;
          border-left: dotted 1px rgba(126, 140, 141, 0.34);
          width: 80%;
          padding: 0 20px 10px 0;
          min-height: 38px;
          .el-checkbox {
            padding: 10px 40px 0 40px;
            margin-left: 0px;
            min-width: 260px;
          }
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
