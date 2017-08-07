<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<ul>
						<li v-for="(menu,index) in menus" :class="{active:active==index}" @click="jump(index)">{{menu}}</li>
					</ul>
				</el-col>
				<el-col :span="12">
					<el-button @click="handleHide()" style=" margin-top: -10px;">返回线路列表</el-button>
				</el-col>
			</el-row>
		</header>
		<section>

			<el-form :model="baseForm" ref="baseForm" label-width="100px" class="demo-baseForm">
				<h2 class="d_jump">基本信息</h2>
				<div class="baseinfo">
					<el-row>
						<el-col :span="20">
							<el-form-item label="模板导入">
								<el-button>添加模板</el-button>
							</el-form-item>
							<el-form-item label="线路名称" prop="name">
								<el-input v-model="baseForm.name"></el-input>
							</el-form-item>
							<el-form-item label="团号代码" prop="teamno">
								<el-input v-model="baseForm.teamno"></el-input>
							</el-form-item>
							<el-form-item label="出行方式" prop="type">
								<el-radio-group v-model="baseForm.type">
									<el-radio label="自由行" value="2"></el-radio>
									<el-radio label="跟团游" value='1'></el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="收客类型">
								<el-checkbox label="成人" prop="isadult" v-model="baseForm.isadult"></el-checkbox>
								<el-checkbox label="儿童" prop="ischild" v-model="baseForm.ischild"></el-checkbox>
								<el-checkbox label="老人" prop="isbaby" v-model="baseForm.isbaby"></el-checkbox>
							</el-form-item>
							<el-form-item label="出港地" >
								<el-col :span="5">
									<el-form-item prop="fromprovinceid">
									<el-select v-model="baseForm.fromprovinceid" placeholder="请选择"  @change="changecityfrom">
											<el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
										</el-select>
									</el-form-item>
									
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="fromcityid">
									<el-select v-model="baseForm.fromcityid" placeholder="请选择"  @change="changecityfrom">
										<el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="fromdistrictid">
									<el-select v-model="baseForm.fromdistrictid" placeholder="请选择">
										<el-option v-for="item in district" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
									</el-select>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="目的地">
								<el-col :span="5">
									<el-form-item prop="toprovinceid">
									<el-select v-model="baseForm.toprovinceid" placeholder="请选择"  @change="changecityback">
										<el-option v-for="item in province" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="tocityid">
									<el-select v-model="baseForm.tocityid" placeholder="请选择"  @change="changecityback">
										<el-option v-for="item in city" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="5">
									<el-form-item prop="todistrictid">
									<el-select v-model="baseForm.todistrictid" placeholder="请选择">
										<el-option v-for="item in district" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
									</el-select>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="交通工具">
								<el-col :span="2">
									去程
								</el-col>
								<el-col :span="4">
									<el-form-item prop="trafficgo">
									<el-select v-model="baseForm.trafficgo" placeholder="请选择" >
										<el-option v-for="item in traffics" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									&nbsp;
								</el-col>
								<el-col :span="2">
									返程
								</el-col>
								<el-col :span="4">
									<el-form-item prop="trafficreturn">
									<el-select v-model="baseForm.trafficreturn" placeholder="请选择" >
										<el-option v-for="item in traffics" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									</el-form-item>
								</el-col>

							</el-form-item>
							<el-form-item label="线路说明" prop="remark">
								<el-input type="textarea" v-model="baseForm.remark"></el-input>
							</el-form-item>
							<el-form-item label="集合地点" prop="station">
								<el-input v-model="baseForm.station"></el-input>
							</el-form-item>
							<el-form-item label="上传图片" prop="images">
								<el-upload
  class="upload-demo"
  action="http://172.17.9.13:3001/api/images"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
							</el-form-item>

						</el-col>
					</el-row>
				</div>

				<h2 class="d_jump">编辑行程</h2>

				<div class="tablemenu">
					<el-button @click="editor = false; menucheck1=true; menucheck2=false">普通方式录入<i :class="[{'el-icon-check': menucheck1},'el-icon--right']"></i></el-button>
					<el-button @click="editor = true; menucheck1=false; menucheck2=true">自定义录入<i :class="[{'el-icon-check': menucheck2},'el-icon--right']"></i></el-button>
					<span>行程天数</span>
					<!--<el-input-number v-model="baseForm.days" @change="changeday" :min="1" :max="10"></el-input-number>-->
					<div class="el-input-number">
						<!--is-disabled-->
						<span class="el-input-number__decrease" @click="minuday"><i class="el-icon-minus"></i></span>
						<span class="el-input-number__increase" @click="addday"><i class="el-icon-plus"></i></span>
				<div class="el-input"><input v-model="baseForm.days" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">
					
				</div></div>
				</div>
				<div class="baseinfo" v-show="editor">
					<div class="editor-container">
						 <UE v-model="customtext" :defaultMsg=defaultMsg :config=config ref="ue"></UE>
					</div>
				</div>
				<div class="base" v-show="!editor" ref="baseday" id="baseday">
					<ul>
						<li class="daylist" v-for="(route,index) in baseForm.routes" >
							<div class="day">
							第<span v-model="route.number">{{index+1}}</span>天
						</div>
						<el-row>
							<el-col :span="14">
								<el-form-item label="标题">
									<el-input v-model="route.title"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10"></el-col>
						</el-row>
						<el-row>
							<el-col :span="7">
								<el-form-item label="三餐">
									<el-checkbox v-model="route.isbreakfast">早</el-checkbox>
									<el-checkbox v-model="route.islunch">中</el-checkbox>
									<el-checkbox v-model="route.isdinner">晚</el-checkbox>
									

								</el-form-item>
							</el-col>
							<el-col :span="7">
								<el-form-item label="住宿" prop="hotel">
									<el-input v-model="route.hotel"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="14">
								<el-form-item label="行程" prop="content">
									<el-input type="textarea" v-model="route.content"></el-input>
								</el-form-item>
							</el-col>

						</el-row>

						<el-row>
							<el-col :span="14">
								<el-form-item label="备注" prop="remark">
									<el-input type="textarea" v-model="route.remark"></el-input>
								</el-form-item>
							</el-col>

						</el-row>
						<el-row>
							<el-col :span="14">
								<el-form-item label="图片"  prop="titleimages">
									<el-upload action="http://172.17.9.13:3001/api/titleimages" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
										<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog v-model="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</el-form-item>
							</el-col>

						</el-row>
							
							
						</li>
					</ul>
					<!--<div class="daylist" v-for="route in baseForm.routes" >
						
					</div>-->
				</div>
				<h2 class="d_jump">备注说明</h2>
				<div class="baseinfo">
					<el-row>
						<el-col :span="20">
							<el-form-item label="购物安排" prop="shopping">
								<el-input type="textarea" v-model="baseForm.shopping"></el-input>
							</el-form-item>
							<el-row>
								<el-col :span="12">
									<el-form-item label="包含项目" prop="includePkg">
										<el-input type="textarea" v-model="baseForm.includePkg"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="不含项目" prop="excludePkg">
										<el-input type="textarea" v-model="baseForm.excludePkg"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="温馨提示" prop="reminder">
										<el-input type="textarea" v-model="baseForm.reminder"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="儿童/老人" prop="childolder">
										<el-input type="textarea" v-model="baseForm.childolder"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="对外备注" prop="outremark">
								<el-input type="textarea" v-model="baseForm.outremark"></el-input>
							</el-form-item>
							<el-form-item label="内部备注" prop="innerremark">
								<el-input type="textarea" v-model="baseForm.innerremark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>

				<div class="button">
					<el-form-item>
						<el-button size="large" type="primary" @click="submitForm('baseForm')">立即创建</el-button>
						<el-button size="large" @click="resetForm('baseForm')">重置</el-button>
					</el-form-item>
				</div>

			</el-form>

		</section>
	</div>
</template>

<script>
	import UE from '../../common/ue.vue';
	import { linesave,province, city, district} from '../../../common/js/config';
	export default {
		components: {UE},
		props:['scope'],
		data() {
			return {
				traffics: [{
					value: '1',
					label: '飞机'
				}, {
					value: '2',
					label: '动车'
				}, {
					value: '3',
					label: '火车'
				}, {
					value: '4',
					label: '高铁'
				}, {
					value: '5',
					label: '大巴'
				}, {
					value: '6',
					label: '轮船'
				}], //出行方式
				daylists: [],
				dialogImageUrl: '',
				dialogVisible: false,
				menucheck1: true,
				menucheck2: false,
				num1: 1, //天数选择
				defaultMsg: '请输入行程详情',
				editor: false,
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				menus: ['基本信息', '编辑行程', '备注说明'],
				active: 0,
				fileList: [],
				customtext:'', //自定义文本内容
				baseForm: {
					token: '',
					categoryid: '',
					name: '',
					teamno: '',
					type:" 1",
					isadult: false,
					ischild: false,
					isbaby: false,
					fromprovinceid: '',
					fromcityid: '',
					fromdistrictid: '',
					toprovinceid: '',
					tocityid: '',
					todistrictid: '',
					trafficgo: '',
					trafficreturn: '',
					edittype: 1,
					days: 1,
					remark: '',
					station: '',
					images: '',
					shopping: '',
					includePkg: '',
					excludePkg: '',
					reminder: '',
					childolder: '',
					outremark: '',
					innerremark: '',
					includePkg: '',
					routes: [{
						'number': 1,
						'title': '',
						'titleimages': '',
						'isbreakfast': false,
						'islunch': false,
						'isdinner': false,
						'content': '',
						'hotel': '',
						'remark': ''

					}]
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
				},
				province: [],
				city: [],
				district: []
			}
		},
		mounted: function() {
			this.getprovince()
			console.log(this.scope)
		},
		methods: {
			jump(index) {
				this.active = index

				// 用 class="d_jump" 添加锚点
				let jump = document.querySelectorAll('.d_jump')
				let total = jump[index].offsetTop
				let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				// 平滑滚动，时长500ms，每10ms一跳，共50跳
				let step = total / 50
				if(total > distance) {
					smoothDown()
				} else {
					let newTotal = distance - total
					step = newTotal / 50
					smoothUp()
				}

				function smoothDown() {
					if(distance < total) {
						distance += step　　　　　　　
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						window.pageYOffset = distance
						setTimeout(smoothDown, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
						window.pageYOffset = total
					}
				}

				function smoothUp() {
					if(distance > total) {
						distance -= step　　　　　　　
						document.body.scrollTop = distance
						document.documentElement.scrollTop = distance
						window.pageYOffset = distance
						setTimeout(smoothUp, 10)
					} else {
						document.body.scrollTop = total
						document.documentElement.scrollTop = total
						window.pageYOffset = total
					}
				}
			},
			//返回线路列表
			handleHide: function() {
				this.$emit('setMode', 'linelist');
			},
			//保存表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.baseForm
						let html = this.$refs.ue.getUEContent()
						if(this.editor == false){
								//基本录入
								para.routes = this.baseForm.routes
							}else{
								//自定义录入
								para.routes[0].content = html
						}
						linesave(para).then((res) => {
							console.log(para, res, "保存线路")
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			//天数减少
			minuday(){
				let index = this.baseForm.length
				if(this.baseForm.days <= 1){
					this.baseForm.days == 1
					index = 1
				}else{
					this.baseForm.days -= 1
					this.baseForm.routes.splice(index, 1)
				}
				
				
			},
			//天数增加
			addday() {
				 this.baseForm.days += 1
				 this.baseForm.routes.push({
                    value: null
                })

			},
			//早中晚
			handlecheckedeat() {},
			//图片上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//获取省级列表
			getprovince() {
				let count = "fb0828b148bc48afbab8ef03c55d153b"
				let para = {
					id: count,
					token: ''
				}
				province(para).then((res) => {
					this.province = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//获取市列表
			getcity(pro) {
				city(pro).then((res) => {
					this.city = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//获取区列表
			getdistrict(city) {
				district(city).then((res) => {
					this.district = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
			//选择去程城市
			changecityfrom() {
				let pro = {
					id: this.baseForm.fromprovinceid
				}
				this.getcity(pro)
				let city = {
					id: this.baseForm.fromcityid
				}
				this.getdistrict(city)

			},
			//选择返程城市
			changecityback(){
				let pro = {
					id: this.baseForm.toprovinceid
				}
				this.getcity(pro)
				let city = {
					id: this.baseForm.tocityid
				}
				this.getdistrict(city)
			}

		}
	}
</script>

<style scoped lang="scss">
	header {
		height: 40px;
		padding: 20px 30px 0 30px;
		background: #fff;
		position: fixed;
		z-index: 1105;
		top: 0;
		width: 90%;
		.el-row {
			li {
				float: left;
				height: 37px;
				border-top: 3px solid transparent;
				padding: 0 25px;
				line-height: 37px;
				font-size: 14px;
				cursor: pointer;
			}
			.active {
				background: #eef1f6;
				border-top: 3px solid #3ec3c8;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
		}
	}
	
	section {
		margin-top: 60px;
		padding: 0 30px;
		text-align: left;
		h2 {
			color: #2cb1b6;
			font-size: 24px;
			padding-top: 20px;
			line-height: 60px;
		}
		.baseinfo {
			background: #fff;
			padding: 20px 30px;
		}
		.button {
			margin-top: 40px;
			margin-bottom: 80px;
		}
		.tablemenu {
			padding: 20px 50px;
			background: #fff;
			margin-bottom: 10px;
			span {
				font-size: 14px;
				color: #666;
				margin: 0 10px 0 50px;
			}
		}
		.base {
			.daylist {
				border-left: 3px solid #fbcd9f;
				padding: 30px 60px 10px 104px;
				background: #fff url(../../../assets/images/circle.png) repeat-y 48px;
				position: relative;
				min-height: 100px;
				margin-bottom: 20px;
				.day {
					position: absolute;
					left: 20px;
					top: 15px;
					background: #ff780b;
					width: 55px;
					height: 55px;
					display: block;
					border-radius: 50%;
					color: #fff;
					font-size: 14px;
					line-height: 55px;
					text-align: center;
					span {
						font-size: 20px;
					}
				}
			}
		}
	}
</style>