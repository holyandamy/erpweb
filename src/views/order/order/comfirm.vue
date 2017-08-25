<template>
	<div>
		<header>
			<div class="container">
				<el-button size="small">发送邮件</el-button>
				<el-button size="small">打印本页</el-button>
				<el-button size="small">导出word</el-button>
				<el-button size="small" type="text" style="float: right;" onclick="window.history.go(-1)">关闭窗口</el-button>
			</div>
		</header>
		<section>
			<div class="container">
				<dl class="componyinfo">
					<dt>
					<img src="../../../assets/images/loginbg.jpg"/>	
					</dt>
					<dd>
						<h4>【泰风光】康辉旅游集团浙江国际旅行社有限公司（杭州办）
						</h4>
						<p>
							电话：0571-86691782 <br /> 传真：0571-88902833
						</p>
					</dd>
				</dl>
				<div class="checkdata">
					<p>请选择需要打印的数据</p>
					<el-row>
						<el-checkbox v-model="baseinfo">基本信息</el-checkbox>
						<el-checkbox v-model="tripinfo">行程信息</el-checkbox>
						<el-checkbox v-model="reminder">温馨提醒</el-checkbox>
					</el-row>
					<el-row>
						<el-col :span="3">
							<b>选择隐藏项</b>
						</el-col>
						<el-col :span="19">
							<el-checkbox v-model="costincludes">费用包含</el-checkbox>
							<el-checkbox v-model="notincluded">费用不含</el-checkbox>
							<el-checkbox v-model="ownexpense">自费项目</el-checkbox>
							<el-checkbox v-model="children">儿童安排</el-checkbox>
							<el-checkbox v-model="shoping">购物安排</el-checkbox>
							<!--<el-checkbox v-model="checked">公司账号</el-checkbox>-->
							<el-checkbox v-model="careful">注意事项</el-checkbox>
							<el-checkbox v-model="other">其它事项</el-checkbox>
							<!--<el-checkbox v-model="instructions">报名须知</el-checkbox>-->
							<el-checkbox v-model="intogroup">成团说明</el-checkbox>
							<el-checkbox v-model="contract">违约条款</el-checkbox>
							<el-checkbox v-model="highlights">产品亮点</el-checkbox>
						</el-col>
					</el-row>

				</div>
				<table v-if="baseinfo" border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr>
						<td colspan="6" align="center">
							<h2>亲子游-大手牵小手跟着爸妈游泰国5晚6日游</h2>
						</td>
					</tr>
					<tr>
						<td class="title">产品编号</td>
						<td>9230890849323</td>
						<td class="title">出发地</td>
						<td>杭州</td>
						<td class="title">旅游天数</td>
						<td>6</td>
					</tr>
					
					<tr>
						<td class="title">出团日期</td>
						<td>2017-02-12</td>
						<td class="title">出发交通</td>
						<td colspan="3">杭州/曼谷 FD567 12:45/15:40 直达</td>
					</tr>
					<tr>
						<td class="title">返程日期</td>
						<td>2017-02-12</td>
						<td class="title">返程交通</td>
						<td colspan="3">杭州/曼谷 FD567 12:45/15:40 直达</td>
					</tr>
					<tr>
						<td class="title">集合时间</td>
						<td>航班时间提前3小时</td>
						<td class="title">集合地点</td>
						<td>杭州萧山国际机场</td>
						<td class="title">单房差价</td>
						<td>1500</td>
					</tr>
					<tr>
						<td class="title">送团电话</td>
						<td colspan="3"></td>
						<td class="title">送团标志/人</td>
						<td>2017-02-12</td>
					</tr>
					
					<tr>
						<td class="title">产品亮点</td>
						<td colspan="5">
							杨岚 -EA7450907 （成人） <br /> 杨岚 -EA7450907 （成人）
						</td>
					</tr>
					<tr>
						<td class="title">报名须知</td>
						<td colspan="5">
							报名须知
						</td>
					</tr>
					
				</table>
				<table v-if="tripinfo" border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr>
						<th>日期</th>
						<th>描述</th>
						<th>餐</th>
						<th>宿</th>
					</tr>
					<tr>
						<td width="90">2017-08-15</td>
						<td>
							<h3>标题：杭州-曼谷</h3>
							<span>
								乘机前往泰国首都、“天使之城”—曼谷，抵达后，送至酒店休息；（如有空闲时间可自由选择 Discovery Thai尊享服务）；
							</span>
						</td>
						<td width="40">早中晚</td>
						<td width="127">曼谷当地五星酒店MAPLE HOTEL/枫叶酒店；<br />
							The Twin Tower Hotel/双子星酒店；<br />
							THE BAZAAR HOTEL/巴萨酒店，<br />
							Chaophya Park Hotel/昭帕亚公园酒店或同级</td>
					</tr>
					<tr>
						<td width="90">2017-08-15</td>
						<td>
							<h3>标题：杭州-曼谷</h3>
							<span>
								曼谷-芭提雅：大皇宫、玉佛寺（不少于90分钟）泰迪熊博物馆（不少于60分钟），3D错觉博物馆（不少于60分钟）；东芭乐园（不少于60分钟）骑大象（不少于15分钟）
【大皇宫】泰国最具标志性的景点，是泰王朝历代君主的居所，是初次来泰游客必去的景点。【玉佛寺】由整块翡翠所雕刻而成的国宝玉佛，每到换季时节，泰国国王都亲自为玉佛更衣，以保国泰民安。【泰迪熊博物馆】是东南亚第一个成立的泰迪熊博物馆，由韩国设计者进行设计，整体风格与济州岛的泰迪熊博物馆十分相似。整个博物馆贯穿“泰迪熊奇妙探索大游玩”的理念，分为11个大区，从史前区到中国区、泰国区，圣诞王国区等，让泰迪熊的粉丝可以在小小世界里畅享欢乐时光。【3D错觉博物馆】发挥创意拍照的地方。博物馆里的3D背景是一些创意立体画，游客们可以在这些背景前摆出各种姿势，拍有趣的错位照片，尝试新鲜事物，这里非常值得一去。【东芭乐园】集泰国各式园林艺术创作精华于一体。内由泰国民俗表演、大象表演和植物园三部分组成。【骑大象】
							</span>
						</td>
						<td width="40">早中晚</td>
						<td width="127">曼谷当地五星酒店MAPLE HOTEL/枫叶酒店；<br />
							The Twin Tower Hotel/双子星酒店；<br />
							THE BAZAAR HOTEL/巴萨酒店，<br />
							Chaophya Park Hotel/昭帕亚公园酒店或同级</td>
					</tr>
				</table>
				<table border="1" cellspacing="" cellpadding="" class="tablebase">
					<tr v-if="!costincludes">
						<td class="title">费用包含</td>
						<td>1、大交通：往返机票。  <br />
2、住宿：行程所列酒店住宿费用当地五星酒店。 <br />
3、用餐：行程内所列餐食(行程中注明的自理餐除外，飞机餐是否收费请参照航空公司规定)。<br /> 
4、导服：领队和当地导游服务。 <br />
5、儿童标准：年龄 0 - 2 周岁，不占床，不含早餐2500价格按照外网儿童价收取。</td>
					</tr>
					<tr v-if="!notincluded">
						<td class="title">费用不含</td>
						<td>1、大交通：往返机票。  <br />
2、住宿：行程所列酒店住宿费用当地五星酒店。 <br /></td>
					</tr>
					<tr v-if="!ownexpense">
						<td class="title">自费项目</td>
						<td></td>
					</tr>
					<tr v-if="!children">
						<td class="title">儿童安排</td>
						<td>12周岁以上（含12周岁）同成人价 12周岁以上必须占床 <br />
							
12周岁以下不占床同成人价格，如需占床在成人价的基础上补单房差：1500元/人</td>
					</tr>
					<tr v-if="!shoping">
						<td class="title">购物安排</td>
						<td>乳胶和土产中心 宝石画廊 珠宝中心</td>
					</tr>
					<tr v-if="!careful">
						<td class="title">注意事项</td>
						<td>1、海关入境注意事项：旅游者可以带入的免税物品包括香烟200支，酒1公斤；各种肉类、植物、蔬菜等禁止入境。根据海关条例，如携带超过5万泰铢或2000美元以上现金入境必须报关。
2.建议游客携带银联卡 、信用卡出境，方便大家游玩和购物。
3、当地导游可以视当地实际情况更改行程及用餐地点，如无特殊情况以不减少行程表上景点为准！如遇不可抗拒因素，我公司和地接旅行社有权改变或缩短行程。
4、随身携带的液态物品每件容积不能超过100毫升。盛放液态物品的容器，应放在最大容积不超过1升的、可重复封口的透明塑料袋中。每名旅客每次仅允许携带一个透明塑料袋，超出部分应托运。盛装液态物品的透明塑料袋须单独接受安全检查。
5、由于泰国和中国的法律法规各不相同，请游客在出行前了解前往国或地区的法律法规及当地风俗，并在团队游览期间自觉遵守，以免造成不必要的麻烦与纠纷。
6、住宿酒店内一般不提供拖鞋、牙膏、牙刷等物品，客人须自行准备，宾馆内咖啡、茶、奶昔等食品或服务均需收费，其它食品或服务均需收费，退房离开酒店前，如若使用了酒水或食品，包括房间内电话，请自觉通知导游，并现付酒店前台。一般宾馆大堂内设有投币电话，客人可自换零钱使用。住宿饭店时请随时将房门扣上安全锁，以确保安全；勿在灯上晾衣物；勿在床上吸烟，听到警报器响，请由紧急出口迅速离开。
7、护照或通行证是出国重要证件，请务必保管好，确保回国顺利！
8、全程请不要陌生人看管或携带任何行李物品，以免麻烦上身！自己的贵重物品请托放至饭店保险箱，如需随身携带切勿离手，小心扒手。游览中，也不要将贵重物品放于游览车上，司机没有保管的义务！如有丢失，旅行社只有协助报警的义务，不承担任何损失赔付！
9、旅行车上不可吃冰激凌，带果皮食物，抽烟等。
10、搭乘时请勿任意更换座位，头、手请勿伸出窗外，上下车时请注意来车方向以免发生危险。
11、许多观光地方管理局为保护长远性的观光，有很多地方不准停车或只准上下车，所以会造成停车地方与观光区有一些路途或者上下车时必须动作快一点，烦请大家给予各方面的配合，上下车时均需问清楚集合时间及游览车停放地点。
12、游泳池未开放时请勿擅自入池游泳，并切记勿单独入池。
13、切勿在公共场合露财，购物时也勿当众清数钞票。
14、行程结束后夜间或自由活动时间若需自行外出，请结伴而行，应特别注意安全，并告知领队或团友。
15、遵守导游或工作人员所宣布的观光区、餐厅、饭店、游乐设施等各种场所的注意事项。
16、外出旅游请注意安全，西方国家闯红灯情况极少，请根据当地行驶方向，请谨慎过马路。
17、不要随地吐痰，不要在禁烟区吸烟、扔烟头，丢垃圾，保持举止文明。</td>
					</tr>
					<tr v-if="!other">
						<td class="title">其它事项</td>
						<td></td>
					</tr>
					<tr v-if="!highlights">
						<td class="title">产品亮点</td>
						<td>1、海关入境注意事项：旅游者可以带入的免税物品包括香烟200支，酒1公斤；各种肉类、植物、蔬菜等禁止入境。根据海关条例，如携带超过5万泰铢或2000美元以上现金入境必须报关。
2.建议游客携带银联卡 、信用卡出境，方便大家游玩和购物。
3、当地导游可以视当地实际情况更改行程及用餐地点，如无特殊情况以不减少行程表上景点为准！如遇不可抗拒因素，我公司和地接旅行社有权改变或缩短行程。
4、随身携带的液态物品每件容积不能超过100毫升。盛放液态物品的容器，应放在最大容积不超过1升的、可重复封口的透明塑料袋中。每名旅客每次仅允许携带一个透明塑料袋，超出部分应托运。盛装液态物品的透明塑料袋须单独接受安全检查。
5、由于泰国和中国的法律法规各不相同，请游客在出行前了解前往国或地区的法律法规及当地风俗，并在团队游览期间自觉遵守，以免造成不必要的麻烦与纠纷。
6、住宿酒店内一般不提供拖鞋、牙膏、牙刷等物品，客人须自行准备，宾馆内咖啡、茶、奶昔等食品或服务均需收费，其它食品或服务均需收费，退房离开酒店前，如若使用了酒水或食品，包括房间内电话，请自觉通知导游，并现付酒店前台。一般宾馆大堂内设有投币电话，客人可自换零钱使用。住宿饭店时请随时将房门扣上安全锁，以确保安全；勿在灯上晾衣物；勿在床上吸烟，听到警报器响，请由紧急出口迅速离开。
</td>
					</tr>
					<tr v-if="!intogroup">
						<td class="title">成团说明</td>
						<td></td>
					</tr>
					<tr v-if="!contract">
						<td class="title">违约条款</td>
						<td></td>
					</tr>
					<tr v-if="!reminder">
						<td class="title">温馨提醒</td>
						<td></td>
					</tr>
				</table>
				<table border="1"  class="tablebase heighttd">
					<tr>
						<td>
							确认人/日期：
						</td>
						<td>
							确认人/日期：
						</td>
					</tr>
					<tr>
						<td>
							盖章：
						</td>
						<td>
						盖章：
						</td>
					</tr>
				</table>
			</div>
		</section>
	</div>
</template>

<script>
	
	export default{
		data(){
			return {
				baseinfo:true,
				tripinfo:true,
				reminder:false,
				costincludes:false,
				notincluded:false,
				ownexpense:false,
				children:false,
				shoping:false,
				careful:false,
				other:false,
				highlights:false,
				intogroup:false,
				contract:false
			}
		},
		created(){
			console.log(this.$route.query.id)
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 800px;
		margin: 0 auto;
	}
	
	header {
		padding: 7px 0;
		background: #dee5ec;
		.container {
			text-align: left;
		}
	}
	
	section {
		.container {
			background: #fff;
			margin-top: 20px;
			padding: 0 20px 20px 20px;
			box-shadow: 0 0 5px rgba(0, 0, 0, .1);
			border-radius: 5px;
		}
		.componyinfo {
			display: -webkit-box;
			padding-top: 20px;
			text-align: left;
			dt {
				width: 158px;
				height: 108px;
				border: 1px solid #dee5ec;
				margin-right: 20px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			dd {
				text-align: left;
				h4 {
					font-size: 18px;
					height: 67px;
					font-weight: bold;
				}
				p {
					font-size: 12px;
					line-height: 22px;
				}
			}
		}
		.checkdata {
			background: #f1fcfc;
			border: 1px solid #9ad4d6;
			margin-top: 20px;
			p {
				font-size: 14px;
				color: #2cb1b6;
				text-align: left;
				padding: 15px 20px;
				font-weight: bold;
			}
			.el-row {
				text-align: left;
				margin-bottom: 10px;
				b {
					font-size: 12px;
					margin-left: 30px;
					font-weight: bold;
				}
				.el-checkbox {
					margin-left: 20px;
					margin-bottom: 10px;
				}
			}
		}
		.tablebase {
			border: 1px solid #bfcbda;
			margin-top: 20px;
			width: 100%;
			text-align: left;
			th{
				background: #f5f7f9;
				font-weight: bold;
				width: 70px;
				font-size: 12px;
				border: 1px solid #bfcbda;
				padding: 5px 10px;
			}
			td {
				padding: 5px 10px;
				border: 1px solid #bfcbda;
				font-size: 12px;
				line-height: 22px;
				h2 {
					font-size: 18px;
					font-weight: bold;
					margin: 10px 0 5px 0;
				}
				;
				p {
					margin-bottom: 10px;
					font-size: 12px;
					margin-top: 10px;
				}
				h3{
					font-size: 16px;
					font-weight: bold;
					margin: 10px 0;
				}
			}
			.title {
				background: #f5f7f9;
				font-weight: bold;
				width: 70px;
			}
		}
		.heighttd{
			margin-bottom: 20px;
			td{
				height: 80px;
			}
			
		}
	}
</style>