<template>
	<div>
		<div v-if="modeType == 'linelist'">

			<header>
				<el-row>
					<el-col :span="12">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>产品中心</el-breadcrumb-item>
							<el-breadcrumb-item>行程模板</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="12">
						<el-button class="defaultbutton" @click="setMode('addline')" size="large" type="primary" style="color: #fff;">发布模板</el-button>
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
								<li>全部</li>
								<li v-for="(destination,index) in destinations" :class="{checked:checkeddest == index}" @click="changedest(index,destination)">{{destination.name}}</li>
							</ul>
						</el-col>
					</el-row>
					<el-row>
						<el-form :inline="true" :model="search" class="demo-form-inline">
							<el-form-item label="状态">
								<el-select v-model="search.status" placeholder="状态">
								
									<el-option
        v-for="item in statuses"
        :key="item.value"
        :label="item.label"
        :value="item.value"></el-option>
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
					
					<el-table-column prop="name" label="模板名称">
					</el-table-column>
					<el-table-column prop="categoryName" label="线路分类"  width="200">
					</el-table-column>
					<el-table-column prop="depart" label="出发地" width="110">
					</el-table-column>
					<el-table-column prop="dest" label="目的地" width="110">
					</el-table-column>
					<el-table-column prop="days" label="天数" width="90">
					</el-table-column>
					<el-table-column prop="creater" label="创建人" width="100">
					</el-table-column>
					
					<el-table-column fixed="right" label="操作" width="110">
						<template scope="scope">
							<el-button @click="setMode('lineinfo'),lineinfo(scope)" type="text" size="small">查看</el-button>
							<el-button @click="setMode('editline'),lineinfo(scope)" type="text" size="small">编辑</el-button>
							
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
		
		
	</div>

</template>

<script>
	import {templatelist,destlist,categoryall} from '../../../common/js/config';
	import LineInfo from './lineinfo'
	import AddIine from './addline'
	import EditInfo from './editline'
	export default {
		components: {
			LineInfo,
			AddIine,
			EditInfo 
		},
		data() {
			return {
				statuses:[{
					 value: '1',
            		label: '正常'
				},
				{
					 value: '0',
            		label: '停止'
				},
				{
					 value: '-1',
            		label: '全部'
				}],
				total:0,
				lineid:'',
				scope:{},
				examineform: {
					token:'',
					id:'',
					approve: '',
					remark:''
				}, //审核表单
				modeType: 'linelist',
				search: {
					token:'',
					pageindex:0,
					pagesize:15,
					categoryid:'', //分类id
					toid:'',//目的地id
					status:'-1',//状态 1正常，0停止，-1全部，
					linename:'',//线路名称
					type:'',//1.国内，2出境，3周边
				},
				currentPage:0,
				linesorts: [], //线路分类
				destinations: [], //目的地
				ischecked: 0,
				checkeddest: 0,
				linelist: [], //线路列表
				selectid:'',
				examineid:''
			}
		},
		created(){
			this.getlinelist()
			this.getcategoryall()
		},
		methods: {
			//筛选线路分类
			changecondition(index,list) {
				this.ischecked = index
				this.search.categoryid = list.id
				let para = {token:'',ategoryid:list.id}
				destlist(para).then((res) => {
					this.destinations = res.data.obj
				})
			},
			//获取线路列表
			getlinelist(){
				let para = this.search
				templatelist(para).then((res) => {
					console.log(res)
					this.linelist = res.data.obj.datas
					this.total = Number(res.data.obj.total)
//					console.log(para)
				})
			},
			//获取分类列表
			getcategoryall(){
				let para= {token:''}
				categoryall(para).then(res =>{
					this.linesorts = res.data.obj
				})
			},
			changedest(index,destination) {
				this.checkeddest = index
				this.search.toid = destination.id
			},
			//查看线路
			setMode(type) {
				this.modeType = type
			},
			lineinfo(scope){
				this.lineid = scope.row.id
				this.scope = scope.row
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
	
	
	.el-dropdown-menu {
		font-size: 12px;
		span {
			display: block;
		}
	}
</style>