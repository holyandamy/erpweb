<template>
	<div>
		<header>
			<el-row>
				<el-col :span="4">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><span @click="handleHide()">线路模板</span></el-breadcrumb-item>
            <el-breadcrumb-item>查看模板详情</el-breadcrumb-item>

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
			<h2 class="d_jump">基本信息</h2>
			<div class="bgfff">
				<h3>{{detail.name}}</h3>
				<div class="linecenter">
					<el-row>
						<el-col :span="12">
							<ul>
								<li><span>线路分类：</span> {{detail.categorytype}} -- {{detail.categoryName}}</li>
								<li><span>出行方式：</span>{{detail.type == 1?'跟团游':'自由行'}}</li>
								<!--出行方式:1跟团游，2自由行-->
								<li><span>收客类型：</span>
								<el-checkbox label="成人" prop="isadult" disabled v-model="detail.isadult"></el-checkbox>
								<el-checkbox label="儿童" prop="ischild" disabled v-model="detail.ischild"></el-checkbox>
								<el-checkbox label="婴儿" prop="isbaby" disabled v-model="detail.isbaby"></el-checkbox>
							</li>

							</ul>
						</el-col>
						<el-col :span="12">
							<ul style="padding-left: 30px;">
								<li><span>出港地：</span>{{detail.depart}}</li>
								<li><span>目的地：</span>{{detail.dest}}</li>
								<li><span>交通工具：</span>去：{{detail.trafficgo}} | 返：{{detail.trafficreturn}}</li>

								<!--去程交通：1飞机，2动车，3火车，4高铁，5大巴，6轮船-->
							</ul>
						</el-col>
						<p>
							<span style="float: left;">线路说明：</span><pre><div class="xc" style="float: left; line-height: 26px;">{{detail.remark}}</div></pre>
						</p>
						<div style="clear: both;"></div>
						<p>
							<span>集合地点：</span>{{detail.station}}
						</p>
							<div class="topimglist">
							<span style="float: left;">图片：</span><div class="xc" style="float: left; line-height: 26px;">
								<ul>
									<li  style='float:left;' v-for="img in toplist">
										<img style='width: 168px;height: 168px;margin: 0 10px;' :src="img"/>
									</li>
								</ul>
							</div>
						</div>
					</el-row>
				</div>

			</div>
			<h2 class="d_jump">行程 <span>天数：{{detail.days}}天</span></h2>
			<div class="daylist" v-for="route in detail.routes" v-if="edittype">
				<div class="day">
					第<span>{{route.number}}</span>天
				</div>
				<div class="title">
					{{route.title}}
				</div>
				<ul>
					<li>
						<span>三餐：</span>
						<div class="xc">

							<el-checkbox label="早"  disabled v-model="route.isbreakfast"></el-checkbox>
								<el-checkbox label="中"  disabled v-model="route.islunch"></el-checkbox>
								<el-checkbox label="晚"  disabled v-model="route.isdinner"></el-checkbox>
							</div>
					</li>
					<li>
						<span>住宿：</span>
						<div class="xc">
							{{route.hotel}}
						</div>
					</li>
					<li>
						<span>行程：</span>
						<div class="xc">
						<pre>{{route.content}}</pre></div>
					</li>
					<li>
						<span>备注：</span>
						<div class="xc">
							{{route.remark}}
						</div>

					</li>
					<li>
						<span>图片：</span>
						<div class="xc">
							<div  >
							<img v-for="img in route.titleimages" style='width: 168px;height: 168px;margin: 0 10px;' :src="img"/>
							</div>
						</div>

					</li>
				</ul>
			</div>
			<div class="content" v-else>

				<span v-html="detail.routes[0].content">
				  {{detail.routes[0].content}}
				</span>
			</div>
			<h2 class="d_jump">预定须知</h2>
			<div class="bgfff">
				<ul class="notes">
					<li><span style="line-height: 26px;">不含项目：</span>

						<div class="xc">
							{{detail.excludePkg}}
						</div>
					</li>
					<li><span>产品亮点：</span><div class="xc"><pre>{{detail.feature}}</pre></div></li>
					<li><span>包含项目：</span><div class="xc"><pre>{{detail.includePkg}}</pre></div></li>
					<li><span>购物安排：</span><div class="xc"><pre>{{detail.shopping}}</pre></div></li>
					<li><span>温馨提示：</span><div class="xc"><pre>{{detail.reminder}}</pre></div></li>
					<li><span>儿童/老人：</span><div class="xc"><pre>{{detail.childolder}}</pre></div></li>
					<li><span>对外备注：</span><div class="xc"><pre>{{detail.outremark}}</pre></div></li>
					<li><span>内部备注：</span><div class="xc"><pre>{{detail.innerremark}}</pre></div></li>
				</ul>
			</div>


		</section>
	</div>
</template>

<script>
	import {templatdetail,token} from '../../../common/js/config';
	import paramm from '../../../common/js/getParam'
	export default {
		props:['lineid'],
		data() {
			return {
				menus: ['基本信息', '行程', '预定须知'],
				active:0,
				detail:{},
				edittype:true,
				toplist:[]
			}
		},
		mounted: function() {
			this.getlineinfo()
		},
		methods: {
			getlineinfo(){
				let para = {
					token:paramm.getToken(),
					id:this.lineid
				}
				templatdetail(para).then((res) => {
					this.detail = res.data.obj
					this.toplist = this.detail.images.split(',')
					console.log(this.detail)
					for(let i = 0 ; i <this.detail.routes.length;i++){
						let arr = []
						arr = res.data.obj.routes[i].titleimages.split(',')
						this.detail.routes[i].titleimages = arr

					}
					if(this.detail.edittype == 0 ){
						this.edittype = true
					}else{
						this.edittype = false
					let str = this.detail.routes[0].content
					this.detail.routes[0].content = str

					}
					let categorytype =  res.data.obj.categorytype
					switch (categorytype){
						case 0:
						this.detail.categorytype = "全部";
						break;
						case 1:
						this.detail.categorytype = "国内游";
						break;
						case 2:
						this.detail.categorytype = "出境游";
						break;
						case 3:
						this.detail.categorytype = "周边游";
						break;
					}
				let day=res.data.obj.trafficgo
						switch (day)
						{
						case 1:
						  this.detail.trafficgo = "飞机";
						  break;
						case 2:
						 this.detail.trafficgo = "动车";
						  break;
						case 3:
						  this.detail.trafficgo = "火车";
						  break;
						case 4:
						  this.detail.trafficgo = "高铁";
						  break;
						case 5:
						  this.detail.trafficgo = "大巴";
						  break;
						case 6:
						  this.detail.trafficgo = "轮船";
						  break;
						}
						let trafficback=res.data.obj.trafficreturn
						switch (trafficback)
						{
						case 1:
						  this.detail.trafficreturn = "飞机";
						  break;
						case 2:
						 this.detail.trafficreturn = "动车";
						  break;
						case 3:
						  this.detail.trafficreturn = "火车";
						  break;
						case 4:
						  this.detail.trafficreturn = "高铁";
						  break;
						case 5:
						  this.detail.trafficreturn = "大巴";
						  break;
						case 6:
						  this.detail.trafficreturn = "轮船";
						  break;
						}

				})

			},
			jump(index) {
				this.active=index

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

		}
	}
</script>

<style scoped lang="scss">
	header {
		height: 40px;
		padding: 20px 30px 0 30px;
		background: #fff;
		position: fixed;
		width: 100%;
		z-index: 15;
		top: 0;
		li {
			float: left;
			height: 37px;
			border-top: 3px solid transparent;
			padding: 0 25px;
			line-height: 37px;
			font-size: 14px;
			cursor: pointer;
		}
		.active{
			background: #eef1f6;
			border-top: 3px solid #3ec3c8;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
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
			span {
				color: #666;
				margin-left: 20px;
			}
		}
		.bgfff {
			background: #fff;
			padding: 0 40px 20px 40px;

			h3 {
				font-size: 18px;
				line-height: 28px;
				padding: 20px 0;
				background: url(../../../assets/images/linebg.png) repeat-x bottom;
			}
			.linecenter {
				position: relative;
				margin-top: 20px;
				p {
					line-height: 55px;
					font-size: 14px;
					span {
						color: #666;
						width: 90px;
						display: inline-block;
					}
				}
			}
			.el-col {
				line-height: 55px;
				font-size: 14px;
				li {
					span {
						color: #666;
						width: 90px;
						display: inline-block;
					}
				}
			}
			.notes {
				font-size: 14px;

				li {
					padding: 20px 0;
					span {
						color: #666;
						width: 90px;
						display: inline-block;
						float: left;
						line-height: 26px;
					}
					.xc {
						margin-left: 90px;
						line-height: 26px;
					}
				}
			}
		}
		.daylist {
			border-left: 3px solid #fbcd9f;
			padding: 10px 60px 10px 104px;
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
			.title {
				padding: 10px 0 20px 0;
			}
			li {
				padding: 20px 0;
				font-size: 14px;
				span {
					color: #666;
					width: 55px;
					display: inline-block;
					float: left;
					line-height: 26px;
				}
				.xc {
					margin-left: 55px;
					line-height: 26px;
					label {
						padding-left: 25px;
					}
				}
			}
		}
	}

	.linecenter:after {
		content: '';
		position: absolute;
		width: 1px;
		height: 150px;
		display: block;
		background: url(../../../assets/images/linebg.png) repeat-y;
		left: 50%;
		top: 10px;
	}
	pre{
				font-size: 14px;
				font-family: 'Avenir', Helvetica, Arial, sans-serif;
				color: #333;
				    white-space: pre-wrap;
			}
	.content{padding: 20px 30px; background: #fff;}
	.topimglist{
		span{
			font-size: 14px;
			color: #666;
			width: 90px;
			display: inline-block;
		}
	}
</style>
