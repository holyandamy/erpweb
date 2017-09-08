<template>
	<div>
		<section class="bg-white margin30 ">
			<div class="title">
				<ul>
					<li>部门名称</li>
					<li>人数</li>
					<li>添加下级</li>
					<li>操作</li>
				</ul>
			</div>
			<div class="list">
				<div class="firstlist" v-for="(one,index) in firstchilds">
					<ul>
						<li>
							<div class="name">{{one.name}}</div>
							<div class="presonnum">{{one.total}}</div>
							<div class="add hasid" id="df01417372bb11e7aad70242ac120006" @click="addone(one)"><i class="el-icon-plus"></i></div>
							<div>
								<el-col :span="5">
									<el-button type="text" class="hasid" id="d85b361b72bb11e7aad70242ac120006" @click="edit(one)">编辑</el-button>
									<el-button type="text" class="hasid" id="db72ae8872bb11e7aad70242ac120006"  @click="deletechild(index,one)">删除</el-button>
								</el-col>
							</div>
						</li>

					</ul>
					<div class="secondlist" v-for="(two,index) in one.childs ">
						<ul>
							<li>
								<div class="name">{{two.name}}</div>
								<div class="presonnum">{{two.total}}</div>
								<div class="add hasid" id="df01417372bb11e7aad70242ac120006" @click="addone(two)"><i class="el-icon-plus"></i></div>
								<div>
									<el-col :span="5">
										<el-button type="text" class="hasid" id="d85b361b72bb11e7aad70242ac120006" @click="edit(two)">编辑</el-button>
										<el-button type="text" class="hasid" id="db72ae8872bb11e7aad70242ac120006"  @click="deletechild(index,two)">删除</el-button>
									</el-col>
								</div>
							</li>
						</ul>
						<div class="threelist" v-for="(three,index) in two.childs">
							<ul>
								<li>
									<div class="name">{{three.name}}</div>
									<div class="presonnum">{{three.total}}</div>
									<div class="add hasid" id="df01417372bb11e7aad70242ac120006" @click="addone(three)"><i class="el-icon-plus"></i></div>
									<div>
										<el-col :span="5">
											<el-button type="text" class="hasid" id="d85b361b72bb11e7aad70242ac120006" @click="edit(three)">编辑</el-button>
											<el-button type="text" class="hasid" id="db72ae8872bb11e7aad70242ac120006"  @click="deletechild(index,three)">删除</el-button>
										</el-col>
									</div>
								</li>
							</ul>
							<div class="fourlist" v-for="(four,index) in three.childs">
								<ul>
									<li>
										<div class="name">{{four.total}}</div>
										<div class="presonnum">&nbsp;</div>
										<div class="add">&nbsp;</div>
										<div>
											<el-col :span="5">
												<el-button type="text" class="hasid" id="d85b361b72bb11e7aad70242ac120006" @click="edit(four)">编辑</el-button>
												<el-button type="text" class="hasid" id="db72ae8872bb11e7aad70242ac120006" @click="deletechild(index,four)">删除</el-button>
											</el-col>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!--新增部门-->
		<el-dialog title="新增部门" :visible.sync="adddepartment" size="tiny">
			<el-form label-width="80px" :model="adddatas">
				<el-form-item label="名称">
					<el-col :span="17">
						<el-input v-model="adddatas.name"></el-input>
					</el-col>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
  	<el-button type="primary" @click="add">确 定</el-button>
    <el-button @click="adddepartment = false">取 消</el-button>

  </span>
		</el-dialog>
		<!--新增下级-->
		<el-dialog title="新增下级" :visible.sync="subordinate" size="tiny">
			<el-form label-width="80px" :model="subordinates">
				<el-form-item label="上级部门">
					<el-col :span="17" style="text-align: left;">
						{{upname}}
					</el-col>
				</el-form-item>
				<el-form-item label="名称">
					<el-col :span="17">
						<el-input v-model="subordinates.name"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
  	<el-button type="primary" @click="addsubordinate">确 定</el-button>
    <el-button @click="subordinate = false">取 消</el-button>

  </span>
		</el-dialog>

		<!--编辑-->
		<el-dialog title="编辑" :visible.sync="editpartment" size="tiny">
			<el-form label-width="80px" :model="editpartmentmodel">
				<el-form-item label="名称">
					<el-col :span="17">
						<el-input v-model="editpartmentmodel.name"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
  	<el-button type="primary" @click="editpartmentconfirm">确 定</el-button>
    <el-button @click="editpartment = false">取 消</el-button>

  </span>
		</el-dialog>
	</div>
</template>

<script>
  import paramm from '../../../common/js/getParam'
	import axios from 'axios';
	import { getdeplist,adddep,deldep,editdep,token } from '../../../common/js/config';
	import { showorhide } from '../../../common/js/showorhid'
	export default {
		data() {
			return {
				activeIndex: "1",
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				upname: '',
				firstchilds: [], //一级部门
				adddepartment: false, //新增部门
				subordinate: false, //新增下级
				editpartment: false, //编辑
				listLoading: false,
				adddatas: {
					token: paramm.getToken(),
					name: '',
					path: '',
					parentid: ''
				},
				subordinates: {
					token:paramm.getToken(),
					name: '',
					path: '',
					parentid: ''
				},
				editpartmentmodel: {
					token: paramm.getToken(),
					name: '',
					id: ''
				}
			}
		},
		created() {
			this.getuser()
		},
		updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			getuser() {
				let para = {
					token: paramm.getToken()
				}
				getdeplist(para).then((res) => {
					console.log(res)
					this.firstchilds = res.data.obj
				}).catch((res) => {

				})
			},
			addpartment() {
				this.adddepartment = true
			},
			//新增部门
			add() {
				let para = this.adddatas
				adddep(para).then((res) => {
					if(res.data.error == 1) {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					} else {
						this.adddepartment = false
						this.$message({
							message: '添加成功！',
							type: 'success'
						});
						this.getuser()
					}
				}).catch((res) => {

				})
			},
			//新增下级显示
			addone(firstchild) {
				this.subordinate = true
				this.upname = firstchild.name
				this.subordinates.path = firstchild.path
				this.subordinates.parentid = firstchild.id

			},
			//新增下级
			addsubordinate() {
				let para = this.subordinates
				adddep(para).then((res) => {
					this.subordinate = false
					this.getuser()
				}).catch((res) => {

				})
			},
			//删除部门
			deletechild(index, data) {
				let para = {
					token:paramm.getToken(),
					id: data.id
				}
				deldep(para).then((res) => {
					if(res.data.error == 1) {
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					} else {
						this.adddepartment = false
						this.getuser()
						this.$message({
							message: '删除成功！',
							type: 'success'
						});

					}
				})
			},
			//			编辑部门
			edit(data) {
				this.editpartment = true
				this.editpartmentmodel.id = data.id
				this.editpartmentmodel.name = data.name
			},
			editpartmentconfirm() {
				let para = this.editpartmentmodel
				editdep(para).then((res) => {
					this.editpartment = false
					this.getuser()
				}).catch((res) => {
					console.log(res)
				})
			}

		}

	}
</script>
<style scoped lang="scss">
	.clearfix {
		clear: both;
	}

	.bg-white {
		background: white;
		text-align: left;
	}

	.padding30 {
		padding: 20px;
	}

	.margin30 {
		margin: 30px;
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

	.title {
		padding: 0 20px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #bfcbda;
		background: #f5f7f9;
		ul {
			width: 100%;
			li {
				float: left;
				font-size: 12px;
			}
			:first-child {
				width: 50%;
			}
			:nth-child(2) {
				width: 10%;
				text-align: center;
			}
			:nth-child(3) {
				width: 10%;
				text-align: center;
			}
			:last-child {
				width: 29%;
				padding-left: 1%;
			}
		}
	}

	.list {
		background: #fff;
		height: 40px;
		ul {
			background: #fff;
			li {
				height: 40px;
				display: block;
				font-size: 12px;
				border-bottom: 1px solid #dee5ec;
				line-height: 40px;
				div {
					float: left;
				}
				:first-child {
					width: 49%;
					padding-left: 1%;
				}
				:nth-child(2) {
					width: 10%;
				}
				:nth-child(3) {
					width: 10%;
				}
				:last-child {
					width: 30%;
				}
			}
		}
		.firstlist {
			background: #fff;
			div.name {
				color: #232c39;
				font-size: 14px;
				font-weight: bold;
				background: -webkit-linear-gradient(left top, #f1fafb, #fff);
			}
			div.presonnum,
			div.add {
				text-align: center;
				position: relative;
			}
			.secondlist {
				li {
					div.name {
						font-size: 12px;
						font-weight: normal;
						text-indent: 3em;
						background: url(../../../assets/images/setcompany.png) no-repeat 30px center;
					}
				}
				.threelist {
					li {
						div.name {
							text-indent: 5em;
							background-position: 50px center;
						}
					}
					.fourlist {
						li {
							div.name {
								text-indent: 7em;
								background-position: 70px center;
							}
						}
					}
				}
			}
		}
	}

	div.presonnum:before,
	div.presonnum:after,
	div.add:after {
		position: absolute;
		width: 1px;
		height: 20px;
		border-right: 1px dashed #ddd;
		right: 0;
		display: block;
		content: '';
		top: 10px;
	}

	div.presonnum:after {
		left: 0;
	}

	div.add:after {
		right: 0;
	}

	div.add i {
		color: #3ec3c8;
	}
</style>
