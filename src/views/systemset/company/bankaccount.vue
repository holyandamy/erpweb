<template>
	<div style="width: 100%;">
		<section class="padding30">
			<el-table :data="banklist" style="text-align: left; font-size: 12px;">
				<el-table-column prop="bankName" label="开户行">
				</el-table-column>
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="account" label="账号">
				</el-table-column>
				<el-table-column prop="status" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button @click="handleShow(scope.$index, scope.row)" class="hasid" id="626f8c1472bb11e7aad70242ac120006" type="text" size="small">编辑</el-button>
						<span class="hasid" id="8bcbe83a72bb11e7aad70242ac120006">
							<el-button type="text" size="small"  v-show="scope.row.status=='禁用'" style="margin-left:10px ;" @click="changestatus(1,scope.row.id)">启用</el-button>
							<el-button type="text" size="small" v-show="scope.row.status=='启用'" class="not" @click="changestatus(0,scope.row.id)">禁用</el-button>
						</span>
					</template>

				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="total">
				</el-pagination>

			</div>
			<!--编辑-->
			<el-dialog title="编辑" size="tiny" v-model="showFormVisible" :close-on-click-modal="false">
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

			<!--新增银行账户-->
			<el-dialog title="新增银行账户" size="tiny" v-model="addbankuser" :close-on-click-modal="false" style="text-align: left; ">
				<el-form :model="addBank" :rules="bankrules" ref="addBank" label-width="100px" class="demo-ruleForm">
					<el-form-item label="开户行" prop="bankName" sortable>
						<el-input v-model="addBank.bankName"></el-input>
					</el-form-item>
					<el-form-item label="开户名" prop="name">
						<el-input v-model="addBank.name"></el-input>
					</el-form-item>
					<el-form-item label="账号" prop="account">
						<el-input v-model="addBank.account"></el-input>
					</el-form-item>

					<el-form-item label="状态" prop="isEnable">
						<el-radio-group v-model="addBank.isEnable">
							<el-radio label="启用"></el-radio>
							<el-radio label="禁用"></el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label-width="100px">
						<el-button type="primary" @click="submitForm('addBank')">保存</el-button>
						<el-button @click.native="addbankuser = false">取消</el-button>
					</el-form-item>
				</el-form>

			</el-dialog>
		</section>
	</div>

</template>

<script>
  import paramm from '../../../common/js/getParam'
	import { getbanklist, addbank, updatebank, updatestatus, token } from '../../../common/js/config';
	import { showorhide } from '../../../common/js/showorhid'
	export default {
		data() {
			return {
				activeIndex: "2",
				banklist: [],
				total: 0,
				currentPage: 1,
				pagesize: 15,
				showFormVisible: false,
				addbankuser: false,
				isenable: false,
				pageset: {
					pageIndex: '',
					pageSize: ''
				},
				editbank: {
					bankName: '',
					name: '',
					account: ''

				},
				addBank: {
					bankName: '',
					name: '',
					account: '',
					isEnable: '',
				},
				updatestatus: {
					isEnable: '',
					token: paramm.getToken(),
					id: ''
				},
				bankrules: {
					bankName: [{
							required: true,
							message: '请输入开户行',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到20 个字符',
							trigger: 'blur'
						}
					],
					name: [{
							required: true,
							message: '请填写开户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到20 个字符',
							trigger: 'blur'
						}
					],
					account: [{
							required: true,
							message: '请填写账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 19,
							message: '长度在 3 到19 个字符',
							trigger: 'blur'
						}
					],
					isEnable: [{
						required: true,
						message: '请选择状态',
						trigger: 'change'
					}]

				}
			}
		},
		created() {
			this.getlist();

		},
		updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			getlist() {
				this.pageset.pageIndex = this.currentPage - 1
				this.pageset.pageSize = this.pagesize
				let page = this.pageset
        page.token = paramm.getToken()
				getbanklist(page).then((res) => {
					this.banklist = res.data.obj.datas
					this.total = Number(res.data.obj.total)

				}).catch(function(err) {
					console.log("连接错误")
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
			//新增银行账户
			addbank() {

				//this.$emit('addbank',this.addbankuser)
				this.addbankuser = true
			},
			//保存银行账户
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {

						if(this.addBank.isEnable == "禁用") {
							this.addBank.isEnable = '0'
						} else {
							this.addBank.isEnable = '1'
						}

						let para = this.addBank
            para.token = paramm.getToken()
						addbank(para).then((res) => {
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
			saveedit(formName) {
			  let _this = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.editbank
            para.token = paramm.getToken()
						updatebank(para).then((res) => {
							//console.log(para)
              if(res.data.error != 0 || res.data.err){
                paramm.getCode(res.data,_this)
              }else{
                paramm.getCode(res.data,_this)
              }
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
			changestatus(i, id) {
				this.updatestatus.isEnable = i
				this.updatestatus.id = id
				let status = this.updatestatus
				updatestatus(status).then((res) => {
					this.$notify({
						title: '成功',
						message: '状态改变成功',
						type: 'success',
            duration:800
					});
					this.getlist()
				})
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
</style>
