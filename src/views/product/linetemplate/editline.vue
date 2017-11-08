<template>
	<div>
		<header>
			<el-row>
				<el-col :span="4">
					<el-breadcrumb separator="/">
            <el-breadcrumb-item><span @click="handleHide()">线路模板</span></el-breadcrumb-item>
            <el-breadcrumb-item>编辑模板</el-breadcrumb-item>

          </el-breadcrumb>
				</el-col>
				<el-col :span="12">
					<ul>
						<li v-for="(menu,index) in menus" :class="{active:active==index}" @click="jump(index)">{{menu}}</li>
					</ul>
				</el-col>

			</el-row>

		</header>
		<section>

			<el-form :model="baseForm" :rules="baseFormrules" ref="baseForm" label-width="100px" class="demo-baseForm">
				<h2 class="d_jump">基本信息</h2>
				<div class="baseinfo">
					<el-row>
						<el-col :span="20">

							<el-form-item label="选择线路分类：" label-width="120px" required>
								<el-select filterable  v-model="baseForm.categorytype" placeholder="请选择" @change="checkline">
									<el-option v-for="item in categoryids" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
								<el-select filterable  v-model="baseForm.categoryid" placeholder="请选择">
									<el-option v-for="item in categorytypes" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="线路名称：" prop="name">
								<el-input v-model="baseForm.name"></el-input>
							</el-form-item>
							<el-form-item label="团号代码：" prop="teamno">
								<el-input v-model="baseForm.teamno"></el-input>
							</el-form-item>
							<el-form-item label="出行方式：" prop="type">
								<el-radio-group v-model="baseForm.type">
                  <el-radio label="1">跟团游</el-radio>
                  <el-radio label="2">自由行</el-radio>
                  <el-radio label="3">购物之旅</el-radio>
                  <el-radio label="4">浪漫海岛</el-radio>
                  <el-radio label="5">奢华酒店</el-radio>
                  <el-radio label="6">文化艺术</el-radio>
                  <el-radio label="7">运动赛事</el-radio>
                  <el-radio label="8">自然风光</el-radio>
                  <el-radio label="9">亲子家庭</el-radio>
                  <el-radio label="10">蜜月之旅</el-radio>
                  <el-radio label="11">商务考察</el-radio>
                </el-radio-group>
							</el-form-item>
							<el-form-item label="收客类型：" prop="checkpeople" label-width="120px" required>
								<el-checkbox-group v-model="baseForm.checkpeople" @change="changepeople">
								<el-checkbox label="成人" v-model="baseForm.isadult"></el-checkbox>
								<el-checkbox label="儿童" v-model="baseForm.ischild"></el-checkbox>
								<el-checkbox label="婴儿" v-model="baseForm.isbaby"></el-checkbox>
								 </el-checkbox-group>
							</el-form-item>


              <el-form-item label="出港地：" prop="fromprovinceid" required>
                <el-col :span="5">
                  <el-select filterable  v-model="baseForm.fromprovinceid" placeholder="请选择" @change="changeprovincefrom">
                    <el-option v-for="item in countryy1" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="5">
                  <el-select filterable  v-model="baseForm.fromcityid" placeholder="请选择" @change="changecityfrom">
                    <el-option v-for="item in provincee" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="5">
                  <el-select filterable  v-model="baseForm.fromdistrictid" placeholder="请选择">
                    <el-option v-for="item in cityy" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>


              <el-form-item label="目的地："  required>
                <el-col :span="5">

                  <el-select filterable  v-model="baseForm.toprovinceid" placeholder="请选择" @change="changeprovinceback">
                    <el-option v-for="item in countryy" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>

                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="5">

                  <el-select filterable  v-model="baseForm.tocityid" placeholder="请选择" @change="changecityback">
                    <el-option v-for="item in provinceeTo" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>

                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="5">

                  <el-select filterable  v-model="baseForm.todistrictid" placeholder="请选择">
                    <el-option v-for="item in cityyTo" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>

                </el-col>
              </el-form-item>
							<el-form-item label="交通工具：">
								<el-col :span="2">
									去程
								</el-col>
								<el-col :span="4">
									<el-form-item prop="trafficgo">
										<el-select v-model="baseForm.trafficgo" placeholder="请选择">
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
										<el-select v-model="baseForm.trafficreturn" placeholder="请选择">
											<el-option v-for="item in traffics" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>

							</el-form-item>
							<el-form-item label="线路说明：" prop="remark">
								<el-input type="textarea" v-model="baseForm.remark"></el-input>
							</el-form-item>
							<el-form-item label="集合地点：" prop="station">
								<el-input v-model="baseForm.station"></el-input>
							</el-form-item>
              <el-form-item label="图片：" prop="" required>
                <ul v-if='baseImages' >
                  <li style='float:left;'  v-for="imgSrc0 in baseImages.split(',')">
                    <img style='width: 148px;height: 148px;margin: 0 10px;' :src='imgSrc0' alt="">
                  </li>
                </ul>
                <ImgLoad @geturl="geturl"  :checktop="checktop"></ImgLoad>   <!--  :scope="scope"  -->
              </el-form-item>
              <el-form-item label="" style='color:red;'>
                建议图片格式：jpg、png，图片大小在1M以内，宽高为：300*180，比例为5:3
              </el-form-item>
						</el-col>
					</el-row>
				</div>

				<h2 class="d_jump">编辑行程</h2>

				<div class="tablemenu">
					<el-button style="float: left;" @click="editor = false; menucheck1=true; menucheck2=false; basetype()">普通方式录入<i :class="[{'el-icon-check': menucheck1},'el-icon--right']"></i></el-button>
					<!--<el-button style="float: left;" @click="editor = true; menucheck1=false; menucheck2=true; selftype()">自定义录入<i :class="[{'el-icon-check': menucheck2},'el-icon&#45;&#45;right']"></i></el-button>-->

					<el-form-item label="行程天数" style="float: left; margin-bottom: 0;">
								<el-input v-model="baseForm.days" v-if="editor"></el-input>
								<div class="el-input-number" v-else>
						<!--is-disabled-->
								<span class="el-input-number__decrease" @click="minuday"><i class="el-icon-minus"></i></span>
								<span class="el-input-number__increase" @click="addday"><i class="el-icon-plus"></i></span>
								<div class="el-input"><input disabled v-model="baseForm.days" autocomplete="off" type="text" rows="2" max="10" min="1" validateevent="true" class="el-input__inner">

								</div>
							</div>
							</el-form-item>
					<div style="clear: both;"></div>
				</div>
				<div class="baseinfo" v-if="editor">
					<div class="editor-container">
						<UE v-model="customtext" :defaultMsg=editorhtml :config=config ref="ue"></UE>
					</div>
				</div>
				<div class="base" v-else ref="baseday" id="baseday">
					<ul>
						<li class="daylist" v-for="(route,index) in baseForm.routes">
							<div class="day">
								第<span v-model="route.number">{{index+1}}</span>天
							</div>
							<el-row>
								<el-col :span="7">
									<el-form-item label="标题：" required>
										<el-input v-model="route.title" class="insertinput"></el-input>

									</el-form-item>
								</el-col>
								<el-col :span="7">
									<div class="linetype">
										<ul>
											<li @click="inserttype('[飞机]',index)"></li>
											<li @click="inserttype('[火车]',index)"></li>
											<li @click="inserttype('[汽车]',index)"></li>
											<li @click="inserttype('[轮船]',index)"></li>
											<li @click="inserttype('[动车]',index)"></li>
											<li @click="inserttype('[高铁]',index)"></li>
											<li @click="inserttype('[待定]',index)"></li>

										</ul>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="7">
									<el-form-item label="三餐：">
										<el-checkbox v-model="route.isbreakfast">早</el-checkbox>
										<el-checkbox v-model="route.islunch">中</el-checkbox>
										<el-checkbox v-model="route.isdinner">晚</el-checkbox>

									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="住宿：" prop="hotel">
										<el-input v-model="route.hotel"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="14">
									<el-form-item label="行程："  required>
										<el-input type="textarea" v-model="route.content"></el-input>
									</el-form-item>
								</el-col>

							</el-row>

							<el-row>
								<el-col :span="14">
									<el-form-item label="备注：" prop="remark">
										<el-input type="textarea" v-model="route.remark"></el-input>
									</el-form-item>
								</el-col>

							</el-row>
							<el-row>
								<el-col :span="14">
                  <el-form-item label="图片：" prop="">
                    <ul v-if='routeTit.length>0' style='float:left;'>
                      <li style='float: left;'  v-for="imgSrc in routeTit[index].split(',')">
                        <img style='width: 148px;height: 148px;margin: 0 10px;' :src='imgSrc' alt="">
                      </li>
                    </ul>
                    <ImgLoad @getRouteImages ='getRouteImages' :idx="index"></ImgLoad>
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
							<el-form-item label="产品亮点：" prop="feature">
								<el-input type="textarea" v-model="baseForm.feature"></el-input>
							</el-form-item>
							<el-form-item label="购物安排：" prop="shopping">
								<el-input type="textarea" v-model="baseForm.shopping"></el-input>
							</el-form-item>
							<el-row>
								<el-col :span="12">
									<el-form-item label="包含项目：" prop="includePkg">
										<el-input type="textarea" v-model="baseForm.includePkg"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="不含项目：" prop="excludePkg">
										<el-input type="textarea" v-model="baseForm.excludePkg"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="温馨提示：" prop="reminder">
										<el-input type="textarea" v-model="baseForm.reminder"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="儿童/老人：" prop="childolder">
										<el-input type="textarea" v-model="baseForm.childolder"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="对外备注：" prop="outremark">
								<el-input type="textarea" v-model="baseForm.outremark"></el-input>
							</el-form-item>
							<el-form-item label="内部备注：" prop="innerremark">
								<el-input type="textarea" v-model="baseForm.innerremark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>

				<div class="button">
					<el-form-item>
						<el-button size="large" type="primary" @click="submitForm('baseForm')">保存</el-button>
						<el-button size="large" @click="handleHide">取消</el-button>
					</el-form-item>
				</div>

			</el-form>

		</section>
	</div>
</template>

<script>
	import UE from '../../common/ue.vue';
	import { country,province, city, district, categoryall, linecategorytype, templatupdate, templatdetail,token } from '../../../common/js/config';
	import paramm from '../../../common/js/getParam'
	import ImgLoad from './upload'
	import check from '../../../common/js/check'
	export default {
		components: {
			UE,
			ImgLoad
		},
		props: ['lineid', 'scope'],  /* ,'topimglist'   */
		data() {
			//收客类型
			var typepeocheck =(rule,value,callback) =>{
				if(this.baseForm.isadult == false && this.baseForm.isbaby == false && this.baseForm.ischild == false){
									callback(new Error('请选择收客类型！'));
								}else{
									callback()
								}
			}
			//出港地
			/*var startaddresscheck = (rule, value, callback) =>{
				if(this.baseForm.fromprovinceid == '' || this.baseForm.fromcityid == '' ||this.baseForm.fromdistrictid == ''){
					callback(new Error('请选择出港地！'));
				}else{
					callback()
				}
			}
			//回港地
			var endcheck = (rule, value, callback) =>{
				if(this.baseForm.toprovinceid == '' || this.baseForm.tocityid == ''){
					callback(new Error('请选择目的地！'));
				}else{
					callback()
				}
			}*/
			//
			var category  = (rule, value, callback) =>{
				if(this.baseForm.categorytype == '' || this.baseForm.categoryid == ''){
					callback(new Error('线路分类不能为空！'));
				}else{
					callback()
				}
			}
			return {
        urlAdd: '',
        baseImages: '',
        routeTit: [],
				traffics: [{
					value: 1,
					label: '飞机'
				}, {
					value: 2,
					label: '动车'
				}, {
					value: 3,
					label: '火车'
				}, {
					value: 4,
					label: '高铁'
				}, {
					value: 5,
					label: '大巴'
				}, {
					value: 6,
					label: '轮船'
				}], //出行方式
				categoryids: [{
					value: 1,
					label: '国内'
				}, {
					value: 2,
					label: '出境游'
				}, {
					value: 3,
					label: '周边游'
				}], //线路分类
        countryy: [],
        provincee: [],
        cityy: [],
        countryy1: [{
          id: '100001',
          name: '中国'
        }],
        countryy2: [{
          id: '100002',
          name: '亚洲'
        }, {
          id: '100003',
          name: '欧洲'
        }, {
          id: '100004',
          name: '非洲'
        }, {
          id: '100005',
          name: '大洋洲'
        },{
          id: '100006',
          name: '北美洲'
        }, {
          id: '100007',
          name: '南美洲'
        }, {
          id: '100008',
          name: '北极洲'
        }, {
          id: '100009',
          name: '南极洲'
        }], //国家
        provinceeTo: [],
        cityyTo: [],
				categorytypes: [],
				daylists: [],
				dialogImageUrl: '',
				dialogVisible: false,
				menucheck1: true,
				menucheck2: false,
				num1: 1, //天数选择
				defaultMsg: this.editorhtml,
				editor: false,
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				menus: ['基本信息', '编辑行程', '备注说明'],
				active: 0,
				fileList: [],
				customtext: '', //自定义文本内容
				baseForm: {
					token: paramm.getToken(),
					id: this.lineid,
					categorytype: '',
          categoryid: '',
					name: '',
					teamno: '',
					type: " 1",
					isadult: false,
					ischild: false,
					isbaby: false,
					fromprovinceid: '',
					fromcityid: '',
					fromdistrictid: '',
					toprovinceid: '',
					feature:'',
					tocityid: '',
					todistrictid: '',
					trafficgo: '',
					trafficreturn: '',
					edittype: 0,
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
					checkpeople:[],
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
				baseFormrules: {
					categorytype: [{
						required: true,
						trigger: 'change',
						validator: category
					}],
					name: [{
						required: true,
						message: '请填写线路名称',
						trigger: 'blur,change'
					}],
					type: [{
						required: true,
						message: '请选择出行方式',
						trigger: 'change'
					}]
//					checkpeople: [{ type: 'array', required: true, message: '请至少选择一个收客类型', trigger: 'change' }]
//					fromprovinceid: [{
//						required: true,
//						validator: startaddresscheck
//					}],
//					backaddress: [{
//						required: true,
//						trigger: 'change',
//						validator: endcheck
//					}],
					//				title:[{ required: true,trigger: 'blur', validator:checktitle}]
				},
				province: [],
				city: [],
				district: [],
				editor:'',
				editorhtml:'',
				oldday:'',
				checktop:true,
				editimg:true,
				topimglist:'',
        flagLine: false,
        flag: false,
        flag1: false,
        flagTo: false,
        flagTo1: false,
        temText: ''

			}
		},
		mounted: function() {
			this.getlineinfo()
			this.getprovince()


		},
		methods: {
      geturl(url) {
        this.urlAdd= url
      },
      getRouteImages(url,idx) {
        let _this =this;
        if(this.routeTit.length>0){
          this.routeTit.forEach(function (item,index) {
            if(index == idx){
              if(item){
                _this.routeTit[index] = item+ ',' + url
              }else {
                _this.routeTit[index]  = url
              }
            }
          })
        }
      },
//		geturl(url) {
//				this.baseForm.images = url
//			},
			getlineinfo() {
        let _this = this;
        let para = {
					token: paramm.getToken(),
					id: this.lineid
				}
				templatdetail(para).then((res) => {
          this.baseForm = res.data.obj
          if(this.baseForm.categorytype == 1 || this.baseForm.categorytype == 3) {
            this.countryy =  this.countryy1
          }
          if(this.baseForm.categorytype == 2) {
            this.countryy =  this.countryy2
            _this.getdis({token: paramm.getToken(),id:_this.baseForm.fromcityid})

          }
          this.baseImages = res.data.obj.images
          if(res.data.obj.routes.length>0){
            res.data.obj.routes.forEach(function (item) {
              typeof (item.titleimages) =='string'?_this.routeTit.push(item.titleimages):_this.routeTit.push("")
            })
          }
          this.baseForm.type =res.data.obj.type.toString()
            res.data.obj.trafficgo == 0 ? this.baseForm.trafficgo = "" : this.baseForm.trafficgo = res.data.obj.trafficgo
					res.data.obj.trafficreturn == 0 ? this.baseForm.trafficreturn = "" : this.baseForm.trafficreturn = res.data.obj.trafficreturn
					this.baseForm.checkpeople = []
					this.baseForm.checkpeople.push(this.baseForm.isadult,this.baseForm.ischild,this.baseForm.isbaby)

					if(this.baseForm.checkpeople[0]){
						this.baseForm.checkpeople[0] = "成人"
					}
					if(this.baseForm.checkpeople[1]){
						this.baseForm.checkpeople[1] = "儿童"
					}
					if(this.baseForm.checkpeople[2]){
						this.baseForm.checkpeople[2] = "婴儿"
					}
//					this.topimglist = res.data.obj.images   9.27
					this.oldday = res.data.obj.days
					if(res.data.obj.edittype == 0){
						this.editor = false
						this.menucheck1 = true
						this.menucheck2 = false
          }else{
						this.editor = true
						this.editorhtml = res.data.obj.routes[0].content
            this.menucheck1 = false
            this.menucheck2 = true
            this.temText = res.data.obj.routes[0].content
					}
          console.log(11111, this.editorhtml);

				})

			},
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
			//选择分类
			checkline() {
        if(this.flagLine){
          this.baseForm.toprovinceid = ''
          this.baseForm.tocityid = ''
          this.baseForm.todistrictid = ''
          this.baseForm.categoryid = ''
        }else {
          this.flagLine=true
        }

        if(this.baseForm.categorytype == 1 || this.baseForm.categorytype == 3) {
          this.countryy =  this.countryy1
        }
        if(this.baseForm.categorytype == 2) {
          this.countryy =  this.countryy2
        }
				let para = {
					token: paramm.getToken(),
					type: this.baseForm.categorytype
				}
				linecategorytype(para).then((res) => {
					this.categorytypes = res.data.obj
				})
			},
			//返回线路列表
			handleHide: function() {
				this.$emit('setMode', 'linelist');
				this.$emit('getlinelist')
			},
			//保存表单
			submitForm(formName) {
        if(this.baseForm.categorytype == '' || this.baseForm.categoryid == ''){
          this.$message({
            message: '请选择线路分类',
            type: 'warning'
          });
          return
        }
        if(this.baseForm.name == ''){
          this.$message({
            message: '请填写线路名称',
            type: 'warning'
          });
          return
        }
        if(this.baseForm.type == ''){
          this.$message({
            message: '请选择出行方式',
            type: 'warning'
          });
          return
        }
        if(this.baseForm.fromprovinceid == '' || this.baseForm.fromcityid == '' ||this.baseForm.fromdistrictid == ''){
          this.$message({
            message: '请选择出港地',
            type: 'warning'
          });
          return
        }
        if(this.baseForm.toprovinceid == '' || this.baseForm.tocityid == '' ||this.baseForm.todistrictid == ''){
          this.$message({
            message: '请选择目的地',
            type: 'warning'
          });
          return
        }
        if(this.baseForm.images == ''){
          this.$message({
            message: '请上传图片',
            type: 'warning'
          });
          return
        }
        let _this = this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
            if(this.baseForm.images && this.urlAdd) {
              this.baseForm.images = this.baseImages+ ',' + this.urlAdd
            }else {
              this.baseForm.images = this.baseImages
            }
            if(this.baseForm.routes.length>0){
              this.baseForm.routes.forEach(function (item,idx) {
                item.titleimages = _this.routeTit[idx]
              })
            }

						let para = this.baseForm
						para.token = paramm.getToken()
						for(let i = 0;i<para.checkpeople.length;i++){
							if(para.checkpeople[i] == "成人"){
								para.isadult = true
							}else if(para.checkpeople[i] == "儿童"){
								para.ischild = true
							}else if(para.isbaby[i] == "婴儿"){
								para.isbaby = true
							}
						}

            if(para.isadult == false && para.isbaby == false && para.ischild == false){
              this.$message({
                message: '请选择收客类型',
                type: 'warning'
              });
              return false
            }

						if(this.editor == false) {
							//基本录入
							para.routes = this.baseForm.routes
							para.edittype = 0
              for(let i = 0 ; i<para.routes.length ;i++){
								if(para.routes[i].title == "" || typeof(para.routes[i].title)=="object"){
									this.$message({
									showClose: true,
									message: "行程标题不能为空！",
									type: 'warning'
									});
									return false
								}
                if(para.routes[i].content == ""|| typeof(para.routes[i].title)=="object"){
                  this.$message({
                    showClose: true,
                    message: "行程不能为空！",
                    type: 'warning'
                  });
                  return false
                }
							}

						} else {
							//自定义录入
              let html = this.$refs.ue.getUEContent()
              para.routes[0].content = html
							para.edittype = 1
						}

						templatupdate(para).then((res) => {

							if(res.data.error == 1) {
								this.$message({
									showClose: true,
									message: res.data.message,
									type: 'error'
								});
							} else {
								this.handleHide()
								this.$message({
									showClose: true,
									message: "编辑成功！",
									type: 'success'
								});
							}

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
			minuday() {
				let index = this.baseForm.routes.length
				if(this.baseForm.days <= 1) {
					this.baseForm.days == 1
					index = 1
				} else {
					this.baseForm.days -= 1
					this.baseForm.routes.splice(index-1, 1)
				}
        this.routeTit.pop()

			},
			//天数增加
			addday() {
				this.baseForm.days += 1
				this.baseForm.routes.push({
					'number': this.baseForm.days,
					'title': '',
					'titleimages': '',
					'isbreakfast': false,
					'islunch': false,
					'isdinner': false,
					'content': '',
					'hotel': '',
					'remark': ''
				})
        this.routeTit.push('')

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
			//普通方式录入
			basetype(){
//        console.log(111);
//        this.baseForm.routes[0].content = ""
//				for(let i = 0 ; i <this.baseForm.routes.length;i++){
//					this.baseForm.days = i+1
//				}
//        console.log(8888,this.baseForm.days);
//        this.baseForm.days -= 1
//        console.log(222,this.routeTit);
        this.baseForm.days=1
//        for (var i=0;i<parseFloat(this.oldday);i++){
//          console.log(i,this.oldday);
//          this.addday()
//        }
        this.baseForm.routes.forEach(function (item) {
          item.content = ''
          item.hotel = ''
          item.remark = ''
          item.number = 1
        })
      },
			//自定义录入
			selftype(){
        let _this =this;
        this.baseForm.days = this.oldday
        this.baseForm.routes.forEach(function (item,idx) {
          item.content = ''
          item.hotel = ''
          item.remark = ''
          item.title = ''
          if(idx>1) _this.baseForm.routes.splice(1)
        })

      },
			//获取省级列表
			getprovince() {
				let count = "fb0828b148bc48afbab8ef03c55d153b"
				let para = {
					id: count,
					token: paramm.getToken()
				}
				province(para).then((res) => {
					this.province = res.data.obj

				}).catch(function(err) {
					console.log("连接错误")
				})
			},
      //获取国家列表
      getcountry(pro) {
        country(pro).then((res) => {
          console.log(5555);
          this.provincee = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取地区列表
      getdis(pro) {
        province(pro).then((res) => {
          this.cityy = res.data.obj
        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取省级列表
      getprovince(pro) {
        province(pro).then((res) => {
          this.provincee = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取市列表
      getcity(pro) {
        city(pro).then((res) => {
          this.cityy = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //去程 省份
      changeprovincefrom() {
        let pro = {
          id: this.baseForm.fromprovinceid.toString(),
          token: paramm.getToken()
        }
        this.getprovince(pro)
        if(this.flag){
          this.baseForm.fromcityid = ''
          this.baseForm.fromdistrictid = ''
        }else {
          this.flag=true
        }

      },
      //去程 市
      changecityfrom() {
        let pro = {
          id: this.baseForm.fromcityid.toString(),
          token: paramm.getToken()
        }
        this.getcity(pro)
        if(this.flag1){
          this.baseForm.fromdistrictid = ''
        }else {
          this.flag1=true
        }

      },
      //返程 省份
      changeprovinceback() {
        let pro = {
          id: this.baseForm.toprovinceid.toString(),
          token: paramm.getToken()
        }
        if(this.baseForm.categorytype == 1 || this.baseForm.categorytype == 3) {
          this.getprovinceTo(pro)
        }
        if(this.baseForm.categorytype == 2) {
          this.getcountryTo(pro)
        }
        if(this.flagTo){
          this.baseForm.tocityid = ''
          this.baseForm.todistrictid = ''
        }else {
          this.flagTo=true
        }

      },
      //返程 市
      changecityback() {
        let pro = {
          id: this.baseForm.tocityid.toString(),
          token: paramm.getToken()
        }
        if(this.baseForm.categorytype == 1 || this.baseForm.categorytype == 3) {
          this.getcityTo(pro)
        }
        if(this.baseForm.categorytype == 2) {
          this.getdisTo(pro)
        }
        if(this.flagTo1){
          this.baseForm.todistrictid = ''
        }else {
          this.flagTo1=true
        }

      },
      //获取国家列表
      getcountryTo(pro) {
        country(pro).then((res) => {
          this.provinceeTo = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取地区列表
      getdisTo(pro) {
        province(pro).then((res) => {
          this.cityyTo = res.data.obj
        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取省级列表
      getprovinceTo(pro) {
        province(pro).then((res) => {
          this.provinceeTo = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },
      //获取市列表
      getcityTo(pro) {
        city(pro).then((res) => {
          this.cityyTo = res.data.obj

        }).catch(function(err) {
          console.log("连接错误")
        })
      },

			//插入交通工具
			inserttype(str,index) {
				let listss = document.getElementsByClassName("insertinput")[index].childNodes[2]
				let lists = listss.value.length
				listss.focus();
				if(typeof document.selection != "undefined") {
					document.selection.createRange().text = str;
				} else {
//					listss.value = listss.value.substr(0, listss.selectionStart) + str + listss.value.substring(listss.selectionStart, lists);
          this.baseForm.routes[index].title = listss.value.substr(0, listss.selectionStart) + str + listss.value.substring(listss.selectionStart, lists);
				}
			},
			changepeople(){

				if(JSON.stringify(this.baseForm.checkpeople).indexOf("婴儿") > 0){
					this.baseForm.isbaby = true
				}else{
					this.baseForm.isbaby = false
				}
				if(JSON.stringify(this.baseForm.checkpeople).indexOf("儿童") > 0){
					this.baseForm.ischild = true
				}else{
					this.baseForm.ischild = false
				}
				if(JSON.stringify(this.baseForm.checkpeople).indexOf("成人") > 0){
					this.baseForm.isadult = true
				}else{
					this.baseForm.isadult = false
				}

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
				.linetype {
					border: 1px solid #bfcbda;
					height: 34px;
					width: 251px;
					border-radius: 5px;
					margin-left: 10px;
					background: url(../../../assets/images/linetype.png) no-repeat;
					overflow: hidden;
					li {
						width: 35px;
						border-right: 1px solid #dee5ec;
						float: left;
						height: 34px;
						display: block;
						cursor: pointer;
						color: transparent;
						font-size: 12px;
					}
				}
			}
		}
	}

	.linetype li:last-child {
		border-right: 0!important;
	}
</style>
