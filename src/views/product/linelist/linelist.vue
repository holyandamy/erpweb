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
						<!--<el-button class="defaultbutton" @click="setMode('addline')">发布线路</el-button>-->
						<el-button class="defaultbutton" @click="setMode('addline')" size="large" type="primary" style="color: #fff;">发布线路</el-button>
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
							<ul>
								<li>全部</li>
								<li v-for="(linesort,index) in linesorts" :class="{checked:ischecked == index}" @click="changecondition(index)">{{linesort}}</li>
							</ul>
						</el-col>
					</el-row>
					<el-row>
						<span>
						目的地：
					</span>

						<el-col :span="20">
							<ul>
								<li>全部</li>
								<li v-for="(destination,index) in destinations" :class="{checked:checkeddest == index}" @click="changedest(index)">{{destination}}</li>
							</ul>
						</el-col>
					</el-row>
					<el-row>
						<el-form :inline="true" :model="search" class="demo-form-inline">
							<el-form-item label="状态">
								<el-select v-model="search.status" placeholder="状态">
									<el-option label="正常" value="1"></el-option>
									<el-option label="停止" value="0"></el-option>
									<el-option label="全部" value="-1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="线路名称">
								<el-input style="width: 300px;" v-model="search.linename" placeholder="请输入线路名称关键字"></el-input>
							</el-form-item>
							<el-form-item label="线路类型">
								<el-select v-model="search.type" placeholder="线路类型">
									<el-option label="国内" value="1"></el-option>
									<el-option label="出境" value="2"></el-option>
									<el-option label="周边" value="3"></el-option>
									
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="getlinelist">搜索</el-button>
							</el-form-item>
						</el-form>
					</el-row>
				</div>
				<el-table :data="linelist" border style="width: 100%">
					<el-table-column fixed prop="lineid" label="线路ID">
					</el-table-column>
					<el-table-column prop="linename" label="线路名称">
					</el-table-column>
					<el-table-column prop="linesort" label="线路分类">
					</el-table-column>
					<el-table-column prop="departure" label="出发地">
					</el-table-column>
					<el-table-column prop="destination" label="目的地">
					</el-table-column>
					<el-table-column prop="day" label="天数">
					</el-table-column>
					<el-table-column prop="establish" label="创建人">
					</el-table-column>
					<el-table-column prop="status" label="审批状态">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template scope="scope">
							<el-button @click="setMode('lineinfo'),lineinfo(scope)" type="text" size="small">查看</el-button>
							<a href="javascript:;" class="operation">
								<el-dropdown>
									<span class="el-dropdown-link">
						        操作<i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
									<el-dropdown-menu slot="dropdown">
										<!--<el-dropdown-item > <a href="javascript:;" @click="handleEdit(scope.$index, scope.row)">编辑</a></el-dropdown-item>-->
										<el-dropdown-item><span @click="examine(scope)">线路审核</span></el-dropdown-item>
										<el-dropdown-item><span @click="setMode('addline'),lineinfo(scope)">编辑线路</span></el-dropdown-item>
										<el-dropdown-item><span @click="settop(scope)">线路置顶</span></el-dropdown-item>
										<el-dropdown-item><span @click="updatastatus(scope,4)">查看团期</span></el-dropdown-item>
										<el-dropdown-item><span @click="updatastatus(scope,4)">操作日志</span></el-dropdown-item>
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
		
		<LineInfo v-else-if="modeType == 'lineinfo'" :scope="scope" :lineid = 'lineid' @setMode="setMode"></LineInfo>
		<AddIine v-else="modeType == 'addline'" :scope="scope"  @setMode="setMode"></AddIine>
		
		<el-dialog title="线路审核" size="tiny" :visible.sync="examinevisiable">
			<el-form label-width="80px" :model="examineform" style="text-align: left;">
				<el-form-item label="状态" prop="approve">
					<el-radio-group v-model="examineform.approve">
						<el-radio label="审核通过"></el-radio>
						<el-radio label="拒绝"></el-radio>
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
		</el-dialog>
		
		
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
	import {linelist,destlist,categoryall,lineapprove,linetop} from '../../../common/js/config';
	import LineInfo from './lineinfo'
	import AddIine from './addline'
	export default {
		components: {
			LineInfo,
			AddIine
		},
		data() {
			return {
				total:0,
				lineid:'',
				scope:'',
				examinevisiable: false, //线路审核
				examineform: {
					token:'',
					id:'',
					approve: '',
					remark:''
				}, //审核表单
				topvisiable:false,//线路置顶
				modeType: 'linelist',
				search: {
					token:'',
					pageindex:0,
					pagesize:15,
					categoryid:'', //分类id
					toid:'',//目的地id
					status:'',//状态 1正常，0停止，-1全部，
					linename:'',//线路名称
					type:'',//1.国内，2出境，3周边
				},
				currentPage:0,
				linesorts: ['分类1', '分类2', '分类3'], //线路分类
				destinations: ['上海', '北京', '广州'], //目的地
				ischecked: 0,
				checkeddest: 0,
				linelist: [{
					'lineid': '4545454',
					'linename': '阿娇的发生',
					'linesort': '国内长线',
					'departure': '上海',
					'destination': '北京',
					'day': '3',
					'establish': '张若昀',
					'status': '待审批'

				}] //线路列表
			}
		},
		created(){
			this.getlinelist()
			this.getcategoryall()
			this.changecondition()
			
		},
		methods: {
			//筛选线路分类
			changecondition(index) {
				this.ischecked = index
				let para = this.search.categoryid
				destlist(para).then((res) => {
					console.log(res,"目的地列表")
				})

			},
			//获取线路列表
			getlinelist(){
				let para = this.search
				linelist(para).then((res) => {
					console.log(para,res,"线路列表")
				})
			},
			//获取分类列表
			getcategoryall(){
				let para= {token:''}
				categoryall(para).then(res =>{
					console.log(res,"分类列表")
				})
			},
			changedest(index) {
				this.checkeddest = index
			},
			//查看线路
			setMode(type) {
				this.modeType = type
			},
			lineinfo(scope){
				this.scope = scope.row
			},
			//线路审核
			examine(scope) {
				this.examinevisiable = true
			},
			//确定审批
			examineinfo(){
				this.examinevisiable = false
				let para = this.examineform
				lineapprove(para).then((res) => {
					console.log(para,res,"线路审核")
				})
			},
			//线路置顶
			settop(scope){
				this.topvisiable = true
			},
			comfirmtop(){
				this.topvisiable = false
				let para = {
					token:'',
					id:'',
					isTop:''
				}
				linetop(para).then((res) => {
					console.log(para,res,"线路审核")
				})
			},
			handleCurrentChange(){
				
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
			color: #2cb1b6;
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
		span {
			display: block;
		}
	}
</style>