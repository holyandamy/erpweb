<template>
	<div>
		<header>
			<ul>
				<li v-for="(menu,index) in menus" :class="{active:active==index}" @click="jump(index)">{{menu}}</li>
			</ul>
			<el-button @click="handleHide()" style="float: left; margin-top: -10px;">返回线路列表</el-button>
		</header>
		<section>
			<h2 class="d_jump">基本信息</h2>
			<div class="bgfff">
				<h3>{{detail.name}}  afasdfasfd</h3>
				<div class="linecenter">
					<el-row>
						<el-col :span="12">
							<ul>
								<li><span>线路分类</span> {{detail.type}}</li>
								<li><span>出行方式</span></li>
								<!--出行方式:1跟团游，2自由行-->
								<li><span>收客类型</span></li>
							</ul>
						</el-col>
						<el-col :span="12">
							<ul style="padding-left: 30px;">
								<li><span>出港地</span>{{detail.fromprovinceid}} + {{detail.fromcityid}} + {{detail.fromdistrictid}}</li>
								<li><span>目的地</span>{{detail.toprovinceid}} + {{detail.tocityid}} + {{detail.todistrictid}}</li>
								<li><span>交通工具</span>去：{{detail.trafficgo}} | 返：{{detail.trafficreturn}}</li>
								<!--去程交通：1飞机，2动车，3火车，4高铁，5大巴，6轮船-->
							</ul>
						</el-col>
						<p>
							<span>线路说明</span>{{detail.remark}}
						</p>
						<p>
							<span>集合地点</span>{{detail.station}}
						</p>
					</el-row>
				</div>

			</div>
			<h2 class="d_jump">行程 <span>天数：{{detail.days}}天</span></h2>
			<div class="daylist" v-for="route in detail.routes">
				<div class="day">
					第<span>{{route.number}}</span>天
				</div>
				<div class="title">
					{{route.title}}
				</div>
				<ul>
					<li>
						<span>三餐</span>
						<div class="xc">
							早 中 晚
							<!--routes.titleimages	string	标题图片路径
							routes.isbreakfast	bool	是否含早
							routes.islunch	bool	是否含午餐
							routes.isdinner	bool	是否含晚餐-->
							<label>
								住宿：{{route.hotel}}
							</label>
						</div>
					</li>
					<li>
						<span>行程</span>
						<div class="xc">
						{{route.content}}</div>
					</li>
					<li>
						<span>备注</span>
						<div class="xc">
							{{route.remark}}
						</div>

					</li>
				</ul>
			</div>
			<h2 class="d_jump">预定须知</h2>
			<div class="bgfff">
				<ul class="notes">
					<li><span style="line-height: 26px;">不含项目</span>

						<div class="xc">
							{{detail.excludePkg}}
						</div>
					</li>
					<li><span>包含项目</span>{{detail.includePkg}}</li>
					<li><span>购物安排</span>{{detail.shopping}}</li>
					<li><span>温馨提示</span>{{detail.reminder}}</li>
					<li><span>儿童/老人</span>{{detail.childolder}}</li>
					<li><span>对外备注</span>{{detail.outremark}}</li>
					<li><span>内部备注</span>{{detail.innerremark}}</li>
				</ul>
			</div>
			<h2 class="d_jump">发布平台 <span>馨·驰誉     馨·欢途</span></h2>

		</section>
	</div>
</template>

<script>
	import {linedetail} from '../../../common/js/config';
	export default {
		props:['lineid','scope'],
		data() {
			return {
				menus: ['基本信息', '行程', '预定须知', '发布平台'],
				active:0,
				detail:{}
			}
		},
		mounted: function() {
			this.getdetail()
			
		},
		methods: {
			//获取当前详情
			getdetail(){
				let para = {token:'',id:this.lineid}
				linedetail(para).then((res) => {
					console.log("线路详情",res)
					this.detail = res.data
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
//			onScroll() {
//				let scrolled = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop　　　 // 586、1063分别为第二个和第三个锚点对应的距离
//				let jump = document.querySelectorAll('.d_jump')
//				let two = jump[1].offsetTop
//				let three = jump[2].offsetTop
//				let four = jump[3].offsetTop
//				if(scrolled >= four) {
//					this.active = 3
//				}else if(scrolled < four && scrolled >= three){
//					this.active = 2
//				} else if(scrolled < three && scrolled >= two) {
//					this.active = 1
//				} else {
//					this.active = 0
//				}
//			}
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
			padding: 0 40px;
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
</style>