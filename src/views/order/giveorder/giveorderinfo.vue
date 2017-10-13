<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>订单管理</el-breadcrumb-item>
						<el-breadcrumb-item>
							<a @click="handleHide">接送订单列表</a>
						</el-breadcrumb-item>
						<el-breadcrumb-item>接送订单详情</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
		</header>
    <section>
      <div class="bg_white padding-0-50">
        <div class="title">
          <el-row>
            <el-col :span="12">
              接送订单编号：{{backData.code || ''}}
            </el-col>
            <el-col :span="12">
              线路订单编号：{{backData.ocode || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              人数：{{backData.personnum || ''}}
            </el-col>
            <el-col :span="12">
              车型：{{backData.carTypeName || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              联系人：{{backData.contact || ''}}
            </el-col>
            <el-col :span="12">
              手机号：{{backData.contactmobile || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              接送类型：{{backData.typeName || ''}}
            </el-col>
            <el-col :span="12">
              线路名称：{{backData.lineName || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              下单时间：{{backData.createtime || ''}}
            </el-col>
            <el-col :span="12">
              出发日期：{{backData.usetime || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              订单金额：{{backData.orderpay || ''}}
            </el-col>
            <el-col :span="12">
              状态：{{backData.statusName || ''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              接送描述：{{backData.remark || ''}}
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
    <el-button style='text-align: center;width: 120px;margin: 30px 0;' type="primary" @click="handleHide">返回</el-button>

  </div>
</template>
<script>
  import axios from 'axios';
	import util from '../../../common/js/util'
	import { showorhide } from '../../../common/js/showorhid'
	import paramm from '../../../common/js/getParam'
	import { givedetail} from '../../../common/js/config';
	export default {
		props: ['listid'],
		data() {
			return {
        backData: {}
      }
		},
		created() {
			this.getdetail()
		},
		updated: function() {
			this.$nextTick(function() {
				showorhide()
			})
		},
		methods: {
			//返回列表
			handleHide: function() {
				this.$emit('setMode', 'orderlistmodel');
				this.$emit('getList');
			},
			//获取详情
			getdetail() {
			  let _this =this;
				let para = {
					id: this.listid,
					token: paramm.getToken()
				}
        givedetail(para).then((res) => {
          if(res.data.error || res.data.err) {
          } else {
            _this.backData = res.data.obj
          }
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	header {
		padding: 20px 40px 20px 40px;
		background: white;
		margin-bottom: 30px;
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

	section {
		margin: 0 30px;
		h2 {
			font-size: 24px;
			color: #2cb1b6;
			text-align: left;
			padding: 30px 0 15px 0;
			.el-button {
				float: right;
				margin-left: 20px;
			}
		}
		.bg_white {
			background: #fff;
			font-size: 14px;
			color: #666;
			text-align: left;
			.title {
				line-height: 55px;
				/*background: url(../../../assets/images/linebg.png) repeat-x bottom;*/
			}
			.info {
				line-height: 60px;
				background: url(../../../assets/images/linebg.png) repeat-x bottom;
				position: relative;
				.pl-20 {
					padding-left: 20px;
				}
			}
			.infobottom {
				line-height: 60px;
			}
			.adulttable {
				margin-top: 20px;
				border: 1px solid #dee5ec;
				thead {
					td {
						background: #f5f7f9;
						border-bottom: 1px solid #bfcbda;
						height: 40px;
						line-height: 40px;
					}
				}
				tbody {
					td {
						padding: 8px 0 8px 20px;
						border-bottom: 1px solid #dee5ec;
						min-height: 50px;
					}
				}
				td {
					padding-left: 20px;
				}
			}
		}
		.padding-0-50 {
			padding: 0 50px;
		}
		.padding-20-50 {
			padding: 20px 50px;
		}
	}
</style>
