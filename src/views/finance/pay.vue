<template>
	<section>
		<header>
			
						
						<el-button type="primary"><router-link :to="'/payedit'">付款登记</router-link></el-button>
						</el-button>
				    <el-button :plain="true" type="info">导出Excel</el-button>
			</header>
		<div class="container">
		<el-form :inline="true" id="search" class="demo-form-inline" @submit.prevent="submit">
			<el-form-item label="创建日期">

				<el-date-picker v-model="search.createtime" onPick type="daterange" placeholder="选择日期范围">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="单位名称">
				<el-input placeholder="单位名称" v-model="search.companyname"></el-input>
			</el-form-item>
			
			<el-form-item label="团号">
				<el-input placeholder="团号" v-model="search.teamno"></el-input>
			</el-form-item>
			<el-form-item label="订单号">
				<el-input placeholder="订单号" v-model="search.orderno"></el-input>
			</el-form-item>

			<el-form-item label="状态">
				<el-select v-model="search.state" placeholder="请选择">
					<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="业务类型">
				<el-select v-model="search.busstypename" placeholder="请选择">
					<el-option v-for="item in type " :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>

		

		<el-table :data="tableData" v-loading="listLoading" border style="width: 100%; font-size:12px ;">
			<el-table-column fixed prop="createtime" label="日期" width="100">
			</el-table-column>
			<el-table-column prop="orderno" label="订单编号" width="120">
			</el-table-column>
			<el-table-column prop="code" label="收款单号" width="180">
			</el-table-column>
			<el-table-column prop="teamno" label="团号" width="120">
			</el-table-column>
			<el-table-column prop="linename" label="产品名称" width="300">
			</el-table-column>
			<el-table-column prop="companyname" label="单位名称" width="125">
			</el-table-column>
			<el-table-column prop="busstypename" label="业务类型" width="120">
			</el-table-column>
			<el-table-column prop="totalfee" label="金额" width="120">
			</el-table-column>
			<el-table-column prop="confirm" label="确认状态" width="90">
			</el-table-column>
			<el-table-column prop="verification" label="核销状态" width="90">
			</el-table-column>
			<el-table-column prop="operator" label="经办人" width="100">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				
				<template scope="scope">
					<el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">查看</el-button>
					<a href="javascript:;">
						<el-dropdown>
							<span class="el-dropdown-link">
						        操作<i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
							<el-dropdown-menu slot="dropdown">
								<!--<el-dropdown-item > <a href="javascript:;" @click="handleEdit(scope.$index, scope.row)">编辑</a></el-dropdown-item>-->
								<el-dropdown-item>确认</el-dropdown-item>
								<el-dropdown-item>确认不通过</el-dropdown-item>
								<el-dropdown-item>核销</el-dropdown-item>
								<el-dropdown-item>反核销</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</a>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination
    	@current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    
		</el-col>

		
		<!--查看界面-->
		<el-dialog title="查看" v-model="showFormVisible" :close-on-click-modal="false">
			<el-form :model="showForm" label-width="80px" ref="showForm">
				<el-form-item label="产品名称" prop="linename">
					{{showForm.linename}}
				</el-form-item>
				<el-form-item label="单位名称" prop="companyname">
					{{showForm.companyname}}
				</el-form-item>
				<el-form-item label="订单编号" prop="orderno">
					{{showForm.orderno}}
				</el-form-item>
				<el-form-item label="收款单号" prop="code">
					{{showForm.code}}
				</el-form-item>
				<el-form-item label="团号" prop="teamno">
					{{showForm.teamno}}
				</el-form-item>
				<el-form-item label="金额" prop="totalfee">
					{{showForm.totalfee}}
				</el-form-item>
				<el-form-item label="经办人" prop="operator">
					{{showForm.operator}}
				</el-form-item>
				<el-form-item label="业务类型" prop="busstypename">
					{{showForm.busstypename}}
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					{{showForm.remark}}
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="showFormVisible = false">确认</el-button>

			</div>
		</el-dialog>
		</div>
	</section>

</template>

<script>
	import axios from 'axios';
	import util from '../../common/js/util'
	export default {
		data() {
			return {
				//搜索数据
				search: {
					createtime: '',
					companyname: '',
					teamno: '',
					orderno: '',
					state: '',
					busstypename: ''
				},
				//确认状态
				state: [
					{
						value: '-1',
						label: '取消选择'
					},
					{
						value: '1',
						label: '未确认'
					}, {
						value: '2',
						label: '确认通过'
					}, {
						value: '3',
						label: '确认不通过'
					}, {
						value: '4',
						label: '待核销'
					}, {
						value: '5',
						label: '核销不通过'
					},
					{
						value: '6',
						label: '核销通过'
					}
				],
				//类型
				type: [
					{
						value: '0',
						label: '取消选择'
					},
					{
						value: '1',
						label: '预收款'
					},
					{
						value: '2',
						label: '订单收款'
					},
					{
						value: '3',
						label: '预付款退款'
					},
					{
						value: '4',
						label: '预付款'
					},
					{
						value: '5',
						label: '订单付款'
					},
					{
						value: '6',
						label: '成本单付款'
					},
					{
						value: '7',
						label: '预收款退款'
					}
				],
				tableData: [],
				statevalue: '',
				typevalue: '',
				pricetotal: 0, //总价格
				showFormVisible: false, //查看显示
				editLoading: false,
				listLoading: false,
	
				showForm: {},
				editFormRules: {
					name: [{
						required: false,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				total: 0,
				pagesize:10,
				currentPage:1,
				pageset:{
					pageindex:'',
					pagesize:''
				}

			}

		},
		methods: {
			totalall: function() {
//				for(let i = 0; i < this.tableData.length; i++) {
//					let all = parseInt(this.tableData[i].price)
//					this.pricetotal += all
//				}

			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.pageset.pageindex = this.currentPage -1
		    	this.pageset.pagesize = this.pagesize
		    	let page = this.pageset
				//console.log(para)
				this.listLoading = true;
				axios.post('https://172.17.9.13:3001/api/finance/pay', page).then((data) => {
					//console.log(data.data.res)
					this.total = Number(data.data.obj.total);
					//console.log(data)
					this.tableData = data.data.obj.datas
					this.listLoading = false
					
					

				})
			},
			onSubmit() {
				let parses = this.search
				this.listLoading = true;
				let startday = parses.createtime[0]
				let endday = parses.createtime[1]
				startday = (!startday || startday == '') ? '' : util.formatDate.format(new Date(startday), 'yyyy-MM-dd');
				endday = (!endday || endday == '') ? '' : util.formatDate.format(new Date(endday), 'yyyy-MM-dd');
				parses.createtime = startday+"|"+ endday
				axios.post('https://172.17.9.13:3001/api/finance/pay', parses).then((data) => {
					this.tableData = data.data.obj.datas
					console.log(parses)
					this.listLoading =false

				})
			},
			//显示查看界面
			handleShow: function(index, row) {
				this.showFormVisible = true;
				this.showForm = Object.assign({}, row);
			}
		},
		mounted() {
			//this.totalall()
			this.getUsers();


		}
	}
</script>
<style scoped lang="scss">
header{
	background: white;
	padding: 20px 40px;
	text-align: left;
	margin-bottom: 20px;
}
.container{
	padding: 0 40px;
}
	.el-form {
		text-align: left;
		
	}
	
	.el-table td .cell {
		font-size: 12px;
	}
	
	.el-dropdown-menu li {
		font-size: 12px;
		a {
			display: block;
		}
	}
	
	.pages {
		padding: 10px 40px;
		background: #fff;
		text-align: right;
	}
	.el-dropdown-link{
		font-size: 12px;
		color: #20a0ff;
	}
	a{color: #fff;}
</style>