<template>
	<section>
		<el-form :inline="true" class="demo-form-inline" @submit.prevent="submit">
			<el-form-item label="创建日期">

				<el-date-picker v-model="search.date" type="daterange" placeholder="选择日期范围">
				</el-date-picker>

			</el-form-item>
			<el-form-item label="单位名称">
				<el-input placeholder="单位名称" v-model="search.companyname"></el-input>
			</el-form-item>
			<el-form-item label="团号">
				<el-input placeholder="团号" v-model="search.collectionnumber"></el-input>
			</el-form-item>
			<el-form-item label="订单号">
				<el-input placeholder="订单号" v-model="search.ordernumber"></el-input>
			</el-form-item>

			<el-form-item label="状态">
				<el-select v-model="search.state" placeholder="请选择">
					<el-option v-for="item in state" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="业务类型">
				<el-select v-model="search.type" placeholder="请选择">
					<el-option v-for="item in type " :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>

		<!--<table class="mine-table">
				<tr>
					<th><div class="cell">创建日期</div></th>
					<th><div class="cell">订单编号/收款单号</div></th>
					<th><div class="cell">团号/产品名称</div></th>
					<th><div class="cell">单位名称/业务类型</div></th>
					<th><div class="cell">金额</div></th>
					<th><div class="cell">确认状态</div></th>
					<th><div class="cell">核销状态</div></th>
					<th><div class="cell">经办人</div></th>
					<th><div class="cell">操作</div></th>
				</tr>
				<tr v-for="(item,index) in tableData" class="el-table__row">
					<td><div class="cell">{{item.createtime}}</div></td>
					<td><div class="cell">{{item.orderno}} <br /> {{item.code}}</div></td>
					<td><div class="cell">{{item.companyname}} <br /> {{item.teamno}}</div></td>
					<td><div class="cell">{{item.linename}} <br /> {{item.businesstypename}}</div></td>
					<td><div class="cell"><b>{{item.totalfee}}</b></div></td>
					<td><div class="cell">{{item.confirmstatus}}</div></td>
					<td><div class="cell">{{item.verificationstatus}}</div></td>
					<td><div class="cell">{{item.handler}}</div></td>
					<td>
					<div class="cell operation">
						<button type="button" class="el-button el-button--text el-button--small"  @click="checklist(item)"><span>查看</span></button> 
						
							<a href="javascript:;"><el-dropdown>
						      <span class="el-dropdown-link">
						        操作<i class="el-icon-caret-bottom el-icon--right"></i>
						      </span>
						      <el-dropdown-menu slot="dropdown">
						        <el-dropdown-item > <a href="javascript:;" @click="edit(item)">编辑</a></el-dropdown-item>
						        <el-dropdown-item>确认</el-dropdown-item>
						        <el-dropdown-item>核销</el-dropdown-item>
						        <el-dropdown-item>反核销</el-dropdown-item>
						       </el-dropdown-menu>
						    </el-dropdown>
							</a>
						</div>
					</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td>合计</td>
					<td>{{total}}</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>-->

		<el-table :data="tableData" v-loading="listLoading" border style="width: 100%; font-size:12px ;">
			<el-table-column fixed prop="createtime" label="日期" width="110">
			</el-table-column>
			<el-table-column prop="orderno" label="订单编号" width="120">
			</el-table-column>
			<el-table-column prop="code" label="收款单号" width="120">
			</el-table-column>
			<el-table-column prop="teamno" label="团号" width="120">
			</el-table-column>
			<el-table-column prop="companyname" label="产品名称" width="300">
			</el-table-column>
			<el-table-column prop="linename" label="单位名称" width="120">
			</el-table-column>
			<el-table-column prop="businesstypename" label="业务类型" width="120">
			</el-table-column>
			<el-table-column prop="totalfee" label="金额" width="120">
			</el-table-column>
			<el-table-column prop="confirmstatus" label="确认状态" width="100">
			</el-table-column>
			<el-table-column prop="verificationstatus" label="核销状态" width="100">
			</el-table-column>
			<el-table-column prop="handler" label="经办人" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140">
				<!--<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>-->
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="3" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<!--<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="产品名称" prop="linename">
					<el-input v-model="editForm.linename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="单位名称" prop="companyname">
					<el-input v-model="editForm.companyname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="订单编号" prop="orderno">
					<el-input v-model="editForm.orderno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="团号" prop="teamno">
					<el-input v-model="editForm.teamno" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="金额" prop="fee">
					<el-input v-model="editForm.fee" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="editForm.remark" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>-->

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
				<el-form-item label="金额" prop="fee">
					{{showForm.fee}}
				</el-form-item>
				<el-form-item label="经办人" prop="handler">
					{{showForm.handler}}
				</el-form-item>
				<el-form-item label="业务类型" prop="businesstypename">
					{{showForm.businesstypename}}
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					{{showForm.remark}}
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">确认</el-button>

			</div>
		</el-dialog>
	</section>

</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				//搜索数据
				search: {
					date: '',
					companyname: '',
					collectionnumber: '',
					ordernumber: '',
					state: '',
					type: ''
				},
				//确认状态
				state: [{
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
				type: [{
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
				//				editFormVisible:false, //编辑显示
				editLoading: false,
				listLoading: false,
				//编辑界面数据
				//				editForm: {
				//					orderno:"",
				//					teamno: "",
				//					lineid:"",
				//					remark:"",
				//					linename: "",
				//					companyname:"",
				//					fee:""
				//					
				//					
				//				},
				showForm: {

				},
				editFormRules: {
					name: [{
						required: false,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				total: 0,
				page: 1,

			}

		},
		methods: {
			totalall: function() {
				for(let i = 0; i < this.tableData.length; i++) {
					let all = parseInt(this.tableData[i].price)
					this.pricetotal += all
				}

			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page
				};
				console.log(this.page)
				this.listLoading = true;
				axios.get('http://localhost:8080/static/json/collectlist.json', para).then((data) => {
					this.total = data.data.collectlist.length;
					this.tableData = data.data.collectlist;
					this.listLoading =false
					

				})
			},
			onSubmit() {
				let parses = this.search
				axios.get('http://localhost:8080/static/json/collectlist.json', parses).then((data) => {
					this.tableData = data.data.collectlist

				})
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			//显示编辑界面
			//			handleEdit: function (index, row) {
			//				this.editFormVisible = true;
			//				this.editForm = Object.assign({}, row);
			//			},
			//显示查看界面
			handleShow: function(index, row) {
				this.showFormVisible = true;
				this.showForm = Object.assign({}, row);
			},
			//编辑
			//			editSubmit: function () {
			//				this.$refs.editForm.validate((valid) => {
			//					if (valid) {
			//						this.$confirm('确认提交吗？', '提示', {}).then(() => {
			//							this.editLoading = true;
			//							//NProgress.start();
			//							let para = Object.assign({}, this.editForm);
			//							//日期转换
			//							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
			//							axios.get("http://localhost:8080/static/json/collectlist.json",para).then((res) => {
			//								this.editLoading = false;
			//								//NProgress.done();
			//								this.$message({
			//									message: '提交成功',
			//									type: 'success'
			//								});
			//								this.$refs['editForm'].resetFields();
			//								this.editFormVisible = false;
			//								this.getUsers();
			//							});
			//						});
			//					}
			//				});
			//			},

		},
		mounted() {
			//this.totalall()
			this.getUsers();

		}
	}
</script>
<style scoped lang="scss">
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
</style>