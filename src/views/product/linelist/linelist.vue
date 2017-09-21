<template>
	<div>
		<div v-if="modeType == 'linelist'">

			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>产品中心</el-breadcrumb-item>
							<el-breadcrumb-item>线路列表</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="12">

						<el-button class="defaultbutton hasid" id="42a741aa734711e788410242ac120009" @click="setMode('addline')" size="large" type="primary" style="color: #fff;">发布线路</el-button>
					</el-col>
				</el-row>
			</header>

			<section class="padding30" style="text-align: left;">
				<div class="search">
					<el-row>
						<span>
						线路分类：
					</span>
						<el-col :span="20">
							<ul class="kindid">
								<li @click="changecondition('-1')" :class="{checked:ischecked == -1}">全部</li>
								<li v-for="(linesort,index) in linesorts" :class="{checked:ischecked == index}" @click="changecondition(index,linesort)">{{linesort.name}}</li>
							</ul>
						</el-col>
					</el-row>
					<el-row>
						<span>
						目的地：
					</span>

						<el-col :span="20">
							<ul>
								<li @click="changedest(-1)" :class="{checked:checkeddest == -1}">全部</li>
								<li v-for="(destination,index) in destinations" :class="{checked:checkeddest == index}" @click="changedest(index,destination)">{{destination.name}}</li>
							</ul>
						</el-col>
					</el-row>
					<el-row>
						<el-form :inline="true" :model="search" class="demo-form-inline">
							<el-form-item label="状态">
								<el-select v-model="search.status" placeholder="状态">
									<el-option label="全部" value="-1"></el-option>
									<el-option label="正常" value="1"></el-option>
									<el-option label="停止" value="0"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="线路名称">
								<el-input style="width: 300px;" v-model="search.linename" placeholder="请输入线路名称关键字"></el-input>
							</el-form-item>
							<el-form-item label="线路类型">
								<el-select v-model="search.type" placeholder="线路类型">
									<el-option label="全部" value="0"></el-option>
									<el-option label="国内" value="1"></el-option>
									<el-option label="出境" value="2"></el-option>
									<el-option label="周边" value="3"></el-option>

								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" class="hasid" id="398e1080734711e788410242ac120009"  @click="getlinelist">查询</el-button>
							</el-form-item>
              <el-form-item   style="margin-left: 0px">
                <el-button  type="primary" @click="clearGetList">清空查询</el-button>
              </el-form-item>
						</el-form>
					</el-row>
				</div>
				<el-table :data="linelist" border style="width: 100%">
					<el-table-column fixed prop="code" label="线路ID" width="90">
					</el-table-column>
					<el-table-column prop="name" label="线路名称">
            <template scope="scope">
              {{scope.row.name.length>70?scope.row.name.substring(0,70)+'...':scope.row.name}}
            </template>
					</el-table-column>
					<el-table-column prop="categoryName" label="线路分类"  width="200">
					</el-table-column>
					<el-table-column prop="depart" label="出发地" width="160">
					</el-table-column>
					<el-table-column prop="dest" label="目的地" width="160">
					</el-table-column>
					<el-table-column prop="days" label="天数" width="90">
					</el-table-column>
					<el-table-column prop="creater" label="创建人" width="150">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="150">
						<template scope="scope">
							<span v-if="scope.row.isenable == true" style="text-align: center;">正常</span>
							<span v-if="scope.row.isenable == false" style="text-align: center;">停止</span>
						</template>
					</el-table-column>
					<!--<el-table-column prop="approve" label="审批状态" width="110">
					</el-table-column>-->
					<el-table-column fixed="right" label="操作" width="110">
						<template scope="scope">
							<el-button @click="setMode('lineinfo'),lineinfo(scope)"  type="text" size="small">查看</el-button>

							<a href="javascript:;" class="operation">
								<el-dropdown @visible-change="toDown">
									<span class="el-dropdown-link">
						        操作<i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item class="hasid"  id="4dcba294734711e788410242ac120009"><span @click="setMode('editline'),lineinfo(scope)">编辑线路</span></el-dropdown-item>
										<el-dropdown-item class="hasid"  id="9079b8af734711e788410242ac120009"><span @click="settop(scope)">线路置顶</span></el-dropdown-item>
										<el-dropdown-item class="hasid"  id="6e3c1a72734711e788410242ac120009"><span @click="updatastatus(scope)">查看团期</span></el-dropdown-item>
										<el-dropdown-item  v-if="scope.row.isenable == true"><span @click="stop(scope,1)">停止</span></el-dropdown-item>
										<el-dropdown-item  v-if="scope.row.isenable == false"><span @click="stop(scope,2)">启用</span></el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</a>

						</template>

					</el-table-column>
				</el-table>

				<div class="page">
					<el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="search.pagesize" layout="total, prev, pager, next" :total="total">
					</el-pagination>

				</div>
			</section>
		</div>

		<LineInfo v-else-if="modeType == 'lineinfo'"  :lineid = 'lineid' @setMode="setMode"></LineInfo>
		<EditInfo v-else-if="modeType == 'editline'" @getlinelist="getlinelist" :lineid = 'lineid'  :scope = "scope"  @setMode="setMode"></EditInfo>
		<AddIine v-else="modeType == 'addline'" @getlinelist="getlinelist"  @setMode="setMode"></AddIine>

		<!--<el-dialog title="线路审核" size="tiny" :visible.sync="examinevisiable">
			<el-form label-width="80px" :model="examineform" style="text-align: left;">
				<el-form-item label="状态" prop="approve">
					<el-radio-group v-model="examineform.approve">
						<el-radio label="true">审核通过</el-radio>
						<el-radio label="false">拒绝</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" prop="resource">
					<el-row>
						<el-col :span="20">
							  <el-input type="textarea" v-model="examineform.remark"></el-input>
							 </el-col>
					</el-row>
				</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer">
    <el-button @click="examinevisiable = false">取 消</el-button>
    <el-button type="primary" @click="examineinfo">确 定</el-button>
  </span>
		</el-dialog>-->


		<el-dialog title="线路置顶" size="lastiny" :visible.sync="topvisiable">

			<span>您确定要置顶该线路吗？</span>
			<span slot="footer" class="dialog-footer">
    <el-button @click="topvisiable = false">取 消</el-button>
    <el-button type="primary" @click="comfirmtop">确 定</el-button>
  </span>
		</el-dialog>
	</div>

</template>

<script>
	import {linelist,destlist,categoryall,lineapprove,linetop,token,linestatus} from '../../../common/js/config';
	import paramm from '../../../common/js/getParam'
	import LineInfo from './lineinfo'
	import AddIine from './addline'
	import EditInfo from './editline'
	import {showorhide} from '../../../common/js/showorhid'
	export default {
		components: {
			LineInfo,
			AddIine,
			EditInfo
		},
		data() {
			return {
				total:0,
				lineid:'',
				scope:{},
				examinevisiable: false, //线路审核
				examineform: {
					token:paramm.getToken(),
					id:'',
					approve: 'true',
					remark:''
				}, //审核表单
				topvisiable:false,//线路置顶
				modeType: 'linelist',
				search: {
					token:paramm.getToken(),
					pageindex:0,
					pagesize:10,
					categoryid:'', //分类id
					toid:'',//目的地id
					status:'-1',//状态 1正常，0停止，-1全部，
					linename:'',//线路名称
					type:'',//1.国内，2出境，3周边
				},
				currentPage:1,
				linesorts: [], //线路分类
				destinations: [], //目的地
				ischecked: -2,
				checkeddest: -2,
				linelist: [], //线路列表
				selectid:'',
				examineid:'',
				kindid:''

			}
		},
		created(){
			this.getcategoryall()

		},
		updated: function () {
		  this.$nextTick(function () {
		    showorhide()


		  })

		},
		mounted(){
			this.getcategoryall()
		},
		methods: {
      toDown(){
        showorhide()
      },
			//线路分类筛选
			checkkind(){
//				this.$route.query.name
				if(this.$route.query.name){
					console.log(this.linesorts)
					for(let i = 0 ; i <this.linesorts.length;i++){
						if(this.$route.query.name == this.linesorts[i].name){
							this.kindid =this.linesorts[i].id

//							document.getElementsByClassName('kindid').childNodes('li')[i].setAttribute('class','checked')
							document.getElementsByClassName('kindid')[0].childNodes[i+2].setAttribute('class','checked')
							let para = this.search
							para.categoryid = this.linesorts[i].id,
							para.pageindex = this.currentPage-1
							linelist(para).then((res) => {
                this.linelist = res.data.obj.datas

//
//								for(let i = 0 ; i <res.data.obj.datas.length;i++){
//									let list = res.data.obj.datas
//									if(list[i].approve == 0){
//										this.linelist[i].approve = "无须审批"
//									}else if(list[i].approve == 1){
//										this.linelist[i].approve = "待审批"
//									}else if(list[i].approve == 2){
//										this.linelist[i].approve = "通过"
//									}else{
//										this.linelist[i].approve = "拒绝"
//									}
//								}
								this.total = Number(res.data.obj.total)

			//					console.log(para)
							})
						}
					}
					//线路分类过来
				}
			},
			//筛选线路分类
			changecondition(index,list) {
				this.ischecked = index

				let listid = '0'
				if(index == '-1'){

					listid = '0'
					this.ischecked = -1
					this.search.categoryid = ''

				}else{
					listid = list.id
					this.search.categoryid = list.id
				}
			let para = {token:paramm.getToken(),categoryid:listid}
			destlist(para).then((res) => {
					this.destinations = res.data.obj
				})
			},
			//获取线路列表
			getlinelist(){
				let para = this.search
				para.pageindex = this.currentPage-1
				linelist(para).then((res) => {
				console.log(res)
					this.linelist = res.data.obj.datas
//					for(let i = 0 ; i <res.data.obj.datas.length;i++){
//						let list = res.data.obj.datas
//						if(list[i].approve == 0){
//							this.linelist[i].approve = "无须审批"
//						}else if(list[i].approve == 1){
//							this.linelist[i].approve = "待审批"
//						}else if(list[i].approve == 2){
//							this.linelist[i].approve = "通过"
//						}else{
//							this.linelist[i].approve = "拒绝"
//						}
//					}
					this.total = Number(res.data.obj.total)

//					console.log(para)
				})
			},
			//获取分类列表
			getcategoryall(){
				let para= {token:paramm.getToken()}
				categoryall(para).then(res =>{
					this.linesorts = res.data.obj
					this.checkkind()
				})

			},
			changedest(index,destination) {
				if(index == -1){
					this.checkeddest = -1
					this.search.toid = ''
				}else{
					this.checkeddest = index
					this.search.toid = destination.id
				}

			},
			//查看线路
			setMode(type) {
				this.modeType = type
			},
			lineinfo(scope){
				this.lineid = scope.row.id
				this.scope = scope.row

			},
//			//线路审核
//			examine(scope) {
//				this.examinevisiable = true
//				this.examineid = scope.row.id
//			},
//			//确定审批
//			examineinfo(){
//				this.examinevisiable = false
//				let para = this.examineform
//				para.id = this.examineid
//				para.approve == 'true' ? para.approve = true:para.approve = false
//				lineapprove(para).then((res) => {
//					if(res.data.error == 1){
//						 this.$message.error(res.data.message);
//					}else{
//						this.$message({
//				          message: '审核状态改变成功!',
//				          type: 'success'
//				        });
//				        this.getlinelist()
//					}
//				})
//			},
			//线路置顶
			settop(scope){
				this.topvisiable = true
				this.selectid = scope.row.id
			},
			comfirmtop(){
				this.topvisiable = false
				let para = {
					token:paramm.getToken(),
					id:this.selectid,
					isTop:true
				}
				linetop(para).then((res) => {
					if(res.data.error == 1){
						 this.$message.error(res.data.message);
					}else{
						this.$message({
				          message: '置顶成功',
				          type: 'success'
				        });
				        this.getlinelist()
					}
				})
			},
			handleCurrentChange(){
				this.getlinelist()
			},
			stop(scope,index){
				let _this = this;
				let para={
					token:paramm.getToken(),
					id:scope.row.id,
					status:false
				}
				if(index == 1){
					para.status = false
				}else{
					para.status = true
				}
				linestatus(para).then((res) =>{
					if(res.data.error == 1 || res.data.err){
			            paramm.getCode(res.data, _this)
			          }
			          else {
			            paramm.getCode(res.data, _this)
			           	this.getlinelist()
			          }
				})
			},
      // 清空查询
      clearGetList () {
			  this.ischecked=-1
			  this.checkeddest=-1
        this.search= {
          token:paramm.getToken(),
            pageindex:0,
            pagesize:10,
            categoryid:'', //分类id
            toid:'',//目的地id
            status:'-1',//状态 1正常，0停止，-1全部，
            linename:'',//线路名称
            type:'',//1.国内，2出境，3周边
        }
        this.$router.push({path: '/linelist'})

      },
      //查看团期
      updatastatus(scope){

      		this.$router.push({ path: '/grouplist', query: { name: scope.row.name}})
    	}

		}
	}
</script>

<style scoped lang="scss">
	.not:hover {
		color: red;
	}

	header {
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
		.defaultbutton {
			border-color: #9ad4d6;
			color: #fff;
			float: right;
			margin-top: -10px;
		}
		.el-menu-item {
			height: 36px;
			line-height: 36px;
			border-top: 3px solid transparent;
			padding: 0;
			a {
				padding: 0 20px;
				display: block;
			}
		}
		.el-menu-item:hover {
			background: transparent;
			border-bottom: transparent;
			color: #3ec3c8;
			height: 36px;
			line-height: 36px;
		}
		.el-menu-item.is-active {
			background: #eef1f6;
			border-top: 3px solid #3ec3c8!important;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			color: #333;
		}
	}

	.padding30 {
		padding: 0 30px;
	}

	.page {
		padding: 15px 30px;
		background: white;
		text-align: right;
	}

	.el-table .cell {
		text-align: left;
	}

	.el-breadcrumb {
		font-size: 18px;
		margin-bottom: 20px;
	}

	.search {
		font-size: 14px;
		color: #333;
		.el-row {
			padding: 15px 0;
			span {
				width: 80px;
				display: inline-block;
				float: left;
				line-height: 25px;
			}
			.el-col {
				li {
					float: left;
					padding: 5px 10px;
					margin: 0 5px;
					cursor: pointer;
					border-radius: 5px;
					border: 1px solid transparent;
				}
			}
		}
	}

	.el-col li:hover,
	.checked {
		border: 1px solid #3ec3c8!important;
		color: #3ec3c8;
	}

	.operation {
		span {
			font-size: 12px;
			color: #2cb1b6;
		}
	}

	.el-dropdown-menu {
		font-size: 12px;
		width: 150px;
		li {
			display: inline-block;
			width: 130px;
			float: left;
			text-align: center;
		}
	}
  .hasid {
    display: none;
  }
</style>
