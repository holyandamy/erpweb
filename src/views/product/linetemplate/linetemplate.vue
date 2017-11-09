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
						<el-button class="defaultbutton hasid"  id="c9494719734711e788410242ac120009" @click="setMode('addline')" size="large" type="primary" >发布模板</el-button>
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
							<!--<el-form-item label="状态">
								<el-select v-model="search.status" placeholder="状态">

									<el-option
        v-for="item in statuses"
        :key="item.value"
        :label="item.label"
        :value="item.value"></el-option>
								</el-select>
							</el-form-item>-->
							<el-form-item label="线路名称">
								<el-input style="width: 300px;" v-model="search.linename" placeholder="请输入线路名称关键字"></el-input>
							</el-form-item>
							<el-form-item label="线路类型">
								<el-select v-model="search.type" placeholder="线路类型">
									<el-option label="全部" value="0"></el-option>
									<el-option label="国内" value="1"></el-option>
									<el-option label="出境游" value="2"></el-option>
									<el-option label="周边游" value="3"></el-option>

								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="searchGetList" class="hasid" id="b6c64c62734711e788410242ac120009">查询</el-button>
                <el-button  type="primary" @click="clearGetList">清空查询</el-button>
              </el-form-item>
						</el-form>
					</el-row>
				</div>
				<el-table :data="linelist" border style="width: 100%">

					<el-table-column prop="name" label="模板名称">
            <template scope="scope">
              {{scope.row.name.length>70?scope.row.name.substring(0,70)+'...':scope.row.name}}
            </template>
					</el-table-column>
					<el-table-column prop="categoryName" label="线路分类"  width="220">
					</el-table-column>
					<el-table-column prop="depart" label="出发地" width="200">
					</el-table-column>
					<el-table-column prop="dest" label="目的地" width="200">
					</el-table-column>
					<el-table-column prop="days" label="天数" width="90">
					</el-table-column>
					<el-table-column prop="creater" label="创建人" width="130">
					</el-table-column>

					<el-table-column fixed="right" label="操作" width="160">
						<template scope="scope">
							<el-button class="hasid" id="d245d97b734711e788410242ac120009" @click="setMode('lineinfo'),lineinfo(scope)" type="text" size="small">查看</el-button>
							<el-button class="hasid" id="ce9c845e734711e788410242ac120009" @click="setMode('editline'),lineinfo(scope)" type="text" size="small">编辑</el-button>

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
	import {templatelist,destlist,categoryall,token} from '../../../common/js/config';
	import LineInfo from './lineinfo'
	import AddIine from './addline'
	import EditInfo from './editline'
	import { showorhide } from '../../../common/js/showorhid'
 	 import paramm from '../../../common/js/getParam'
	export default {
		components: {
			LineInfo,
			AddIine,
			EditInfo
		},
		data() {
			return {
				statuses:[
				{
					 value: '-1',
            		label: '全部'
				},
				{
					 value: '1',
            		label: '正常'
				},
				{
					 value: '0',
            		label: '停止'
				}
				],
				total:0,
				lineid:'',
				scope:{},
				examineform: {
					token:paramm.getToken(),
					id:'',
					approve: '',
					remark:''
				}, //审核表单
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
				examineid:''
			}
		},
		created(){
//			this.getlinelist()
			this.getcategoryall()
		},
		updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			//筛选线路分类
			changecondition(index,list) {

				let listid = '0'
				if(index == '-1'){
					listid = '0'
					this.ischecked = '-1'
					this.search.categoryid = ''

				}else{
					this.ischecked = index
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
				para.token = paramm.getToken()
				templatelist(para).then((res) => {
					this.linelist = res.data.obj.datas
					this.total = Number(res.data.obj.total)
//					console.log(para)
				})
			},
			//获取分类列表
			getcategoryall(){
				let para= {token:paramm.getToken()}
				categoryall(para).then(res =>{
					this.linesorts = res.data.obj
				})
			},
			changedest(index,destination) {
        if(index == -1){
					this.checkeddest = -1
					this.search.toid = ''
				}else{
					this.checkeddest = index
					this.search.toid = destination.todistrictid
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

			handleCurrentChange(){
					this.getlinelist()
			},
      //点击查询
      searchGetList(){
        this.getlinelist()
      },
      // 清空查询
      clearGetList () {
        this.ischecked = -1
        this.checkeddest = -1
        this.search = {
          token:paramm.getToken(),
          pageindex:0,
          pagesize:10,
          categoryid:'', //分类id
          toid:'',//目的地id
          status:'-1',//状态 1正常，0停止，-1全部，
          linename:'',//线路名称
          type:'',//1.国内，2出境，3周边
        }
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


	.el-dropdown-menu {
		font-size: 12px;
		span {
			display: block;
		}
	}
  .hasid {
    display: none;
  }
	.demo-form-inline{
		width: 100%;
	}

</style>
