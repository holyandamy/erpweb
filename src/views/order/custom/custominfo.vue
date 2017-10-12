<template>
	<div>
		<header>
			<el-row>
				<el-col :span="12">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>订单管理</el-breadcrumb-item>
						<el-breadcrumb-item>
							<a @click="handleHide">定制需求</a>
						</el-breadcrumb-item>
						<el-breadcrumb-item>{{{'info':'需求详情','edit':'完善需求'}[typpe]}}</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
			</el-row>
		</header>
		<section>
      <div class="bg_white padding-0-50">
         <div class="title">
           <el-row>
             <el-col :span="12">
               姓名：{{detail.name}}
             </el-col>
             <el-col :span="12">
               电话号码：{{detail.mobile}}
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               人数：{{detail.personnum}}
             </el-col>
             <el-col :span="12">
               目的地：{{detail.dest}}
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               出发时间：{{detail.starttime}}
             </el-col>
             <el-col :span="12">
               电子邮箱：{{detail.email}}
             </el-col>
           </el-row>
         </div>
        <el-form ref="detail" :model="detail" label-width="100px" label-position='left' class='forn-ipt'>
          <el-row>
            <el-col :span="12">
              <el-form-item label="行程需求：">
                <el-input v-model="detail.route" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="交通需求：">
                <el-input v-model="detail.traffic" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="酒店需求：">
                <el-input v-model="detail.hotel" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接送需求：">
                <el-input v-model="detail.booking" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="景点需求：">
                <el-input v-model="detail.spot" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签证需求：">
                <el-input v-model="detail.visa" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="保险需求：">
                <el-input v-model="detail.insurance" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="导游需求：">
                <el-input v-model="detail.tour" :disabled="typpe=='info'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="其他备注：">
                <el-input
                  :disabled="typpe=='info'"
                  type="textarea"
                  :rows="5"

                  v-model="detail.others">
                </el-input> <!-- placeholder="请填写备注"   -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
			<div class="button">
        <el-button v-if="typpe=='edit'"  type="primary" size="large" @click="save">保存</el-button>
				<el-button v-if="typpe=='edit'"  type="primary"  size="large" @click="confirmnamelist = true">确认</el-button>
				<el-button size="large" @click="handleHide">返回</el-button>
			</div>
		</section>

		<el-dialog title="" :visible.sync="confirmnamelist" size="tiny">
      确认后无法再完善需求，是否确认？
			<span slot="footer" class="dialog-footer">
        <el-button @click="confirmnamelist = false">取 消</el-button>
        <el-button type="primary" @click="confirmvisitor">确 定</el-button>
       </span>
		</el-dialog>
	</div>
</template>
<script>
  import axios from 'axios';
	import util from '../../../common/js/util'
	import { showorhide } from '../../../common/js/showorhid'
	import paramm from '../../../common/js/getParam'
	import { customdetail,customconfirm,customupdate,    orderdetail } from '../../../common/js/config';
	export default {
		props: ['typpe','listid'],
		data() {
		  return {
        confirmnamelist: false,
        detail: {
          name: ''
        }
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
      //获取详情
      getdetail() {
        console.log(1111, this.typpe);
        let _this =this;
        let para = {
          id: this.listid,
          token: paramm.getToken()
        }
        customdetail(para).then((res) => {
          this.detail = res.data.obj

        })
      },
      confirmvisitor(){
        let _this= this;
        customconfirm({id:_this.detail.id,token:paramm.getToken()}).then((res) => {
          if(res.data.error || res.data.err) {
            paramm.getCode(res.data,_this)
          } else {
            paramm.getCode(res.data,_this)
            _this.getdetail()
						_this.confirmnamelist = false
						_this.$emit('setMode', 'orderlistmodel');
							_this.$emit('getList');
          }
        })
      },
			//返回列表
			handleHide: function() {
				this.$emit('setMode', 'orderlistmodel');
				this.$emit('getList');
			},
			confirmprice(formName) {
			  let _this =this;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let para = this.editpriceform
						para.id = this.detail.id
						orderpay(para).then((res) => {
							if(res.data.error || res.data.err) {
								paramm.getCode(res.data,_this)
							} else {
                paramm.getCode(res.data,_this)
                this.editprice = false
								this.editpriceform.money = ""
								this.editpriceform.remark = ""
								this.getdetail()
							}
						})
					} else {
						this.$message({
							message: '调价失败！',
							type: 'error'
						});
						return false;
					}
				});
			},
			//保存
			save() {
				let _this = this
				let para = {
					token: paramm.getToken(),
          route: this.detail.route,
          traffic: this.detail.traffic,
          hotel: this.detail.hotel,
          booking: this.detail.booking,
          spot: this.detail.spot,
          visa: this.detail.visa,
          insurance: this.detail.insurance,
          tour: this.detail.tour,
          others: this.detail.others,
          id: this.detail.id
				}
        customupdate(para).then((res) => {
					if(res.data.error == 1 || res.data.err) {
						paramm.getCode(res.data, _this)
					} else {
						_this.$message({
							message: '成功！',
							type: 'success'
						});
						this.handleHide()
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

	.info:before {
		position: absolute;
		content: '';
		width: 2px;
		height: 275px;
		background: url(../../../assets/images/linebg.png) repeat-y;
		left: 50%;
		top: 80px;
	}

	.collecttable {
		border: 1px solid #dee5ec;
		border-radius: 5px;
		th {
			height: 38px;
			background: #f5f7f9;
			border-bottom: 1px solid #bfcbda;
			padding: 0 20px;
			line-height: 38px;
		}
		td {
			padding: 10px 20px;
			border-bottom: 1px solid #dee5ec;
		}
	}

	.button {
		margin: 30px 0;
		text-align: left;
	}

	.el-input-number {
		width: 120px;
		.el-input-number__increase,
		.el-input-number__decrease {
			line-height: 29px;
			width: 30px;
		}
		.el-input {
			input {
				height: 30px;
			}
		}
	}
  .downModel{
    color: #3ec3c8;
  }
  .containerFather{
    padding: 0;
    width: 116px;
    height: 36px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    .uploadSon{
      border-radius: 4px;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1000;
      opacity: 0;
      cursor: pointer;
    }
    .uploadTxt{
      position: relative;
      line-height: 34px;
      width: 100%;
      height: 100%;
      text-align: center;
      cursor: pointer;
    }
  }
  .forn-ipt{
    margin-top: 50px;
  }
</style>
