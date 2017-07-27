<template>
<div>
	<div v-if="modeType == 'approval'">
<header>
	<el-row>
			<el-col :span="12">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item>系统设置</el-breadcrumb-item>
			  <el-breadcrumb-item>审批配置</el-breadcrumb-item>
			</el-breadcrumb>
		</el-col>
		<el-col :span="12">
		<el-button class="defaultbutton" @click="setMode('addapproval')">新增审批</el-button>
		</el-col>
		</el-row>
		</header>
		
		<section class="padding30">
		<el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align: left;">
		  
		  <el-form-item label="被审批人">
		    <el-input v-model="formInline.user" placeholder="被审批人"></el-input>
		  </el-form-item><el-form-item>
		    <el-button type="primary" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table :data="banklist" style="text-align: left; font-size: 12px;">
			<el-table-column prop="bankName" label="被审批人">
			</el-table-column>
			<el-table-column prop="name" label="审批功能">
			</el-table-column>
			<el-table-column prop="account" label="产品分类">
			</el-table-column>
			<el-table-column prop="status" label="审批流程" >
			</el-table-column>
			<el-table-column prop="status" label="状态" >
			</el-table-column>
			
			<el-table-column  label="操作">
				<template scope="scope">
					<el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" v-show="scope.row.status=='禁用'"  @click="changestatus(1,scope.row.id)">启用</el-button>
					<el-button type="text" size="small" v-show="scope.row.status=='启用'" class="not"   @click="changestatus(0,scope.row.id)">禁用</el-button>
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
			<el-form :model="editbank" label-width="80px" ref="editbank" style="text-align: left;">
				 <el-form-item label="开户行" prop="bankName">
				    <el-input v-model="editbank.bankName"></el-input>
				  </el-form-item>
				   <el-form-item label="开户名" prop="name">
				    <el-input v-model="editbank.name"></el-input>
				  </el-form-item>
				   <el-form-item label="账号" prop="account">
				    <el-input v-model="editbank.account"></el-input>
				  </el-form-item>
				 
			</el-form>
			<div slot="footer" class="dialog-footer">
				
				<el-button type="primary" @click="saveedit('editbank')">保存</el-button>
    			<el-button @click.native="showFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		
		
	</section>
	</div>
<AppRoval v-else @setMode="setMode"></AppRoval>
</div>
	
</template>

<script>
	import axios from 'axios';
	import AppRoval from './addapproval.vue'
	
	export default {
		components: {
	      AppRoval, // add role
	    },
		data() {
			return {
				modeType:'approval',
				formInline: {
		          user: '',
		          region: ''
		     	},
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
				editbank: {
					bankName: '',
			         name: '',
			         account: ''
			         
				},
				addBank:{
					 bankName: '',
			         name: '',
			         account: '',
			         isEnable: '',
				},
				updatestatus:{
					isEnable:'',
					token:'',
					id:''
				}
			}
		},
		created(){
			this.getlist()
		},
		methods:{
			setMode(type){
				this.modeType = type;
			},
			onSubmit() {
		        console.log('submit!');
		     },
			getlist(){
				this.pageset.pageIndex = this.currentPage-1
		    	this.pageset.pageSize = this.pagesize
		    	let page = this.pageset
		    	axios.post("https://172.17.9.13:3001/api//sys/approve/list",page).then((res) => {
					//this.banklist = res.data.obj.datas
					//this.total = Number(res.data.obj.total)
					console.log(res)
				})
			},
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		     },
		    //分页
		    handleCurrentChange(val) {
		    	this.getlist()
		    },
		     //显示查看界面
			handleShow: function(index, row) {
				this.showFormVisible = true;
				this.editbank = Object.assign({}, row);
			},
			//保存银行账户
			  submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            
		            if(this.addBank.isEnable=="禁用"){
		            	this.addBank.isEnable = 0
		            }else{
		            	this.addBank.isEnable = 1
		            }
		            let para = this.addBank
		            axios.post('https://172.17.9.13:3001/api/sys/approve/save',para).then((res) => {
		            	this.addbankuser = false
		            	this.$message('保存成功！');
		            	this.getlist()
		            })
		          } else {
		           this.$message.error('提交错误！');
		            return false;
		          }
		        });
		      },
		      //编辑保存
		      saveedit(formName){
		      	 this.$refs[formName].validate((valid) => {
		          if (valid) {
		           let para = this.editbank
		            axios.post('https://172.17.9.13:3001/api/sys/bank/update',para).then((res) => {
		            	//console.log(para)
		            	this.showFormVisible = false
		            	this.$message('保存成功！');
		            	this.getlist()
		            })
		          } else {
		           this.$message.error('提交错误！');
		            return false;
		          }
		        });
		         
		      },
		      changestatus(i,id){
		      	   this.updatestatus.isEnable = i
		      	   this.updatestatus.id = id
		      	   let status =   this.updatestatus
		      		//console.log(status)
		      		axios.post('https://172.17.9.13:3001/api/sys/bank/status',status).then((res) =>{
		      			console.log(status)
		      			console.log(res)
		      			this.$message("状态改变成功！")
		      			this.getlist()
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
