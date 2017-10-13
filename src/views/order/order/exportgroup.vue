<template>
  	<div>
      <header>
        <div class="container">
          <el-button size="small">发送邮件</el-button>
          <el-button size="small">打印本页</el-button>
          <el-button size="small" @click="exportgroupWord()">导出word</el-button>
          <el-button size="small" type="text" style="float: right;" onclick="window.history.go(-1)">关闭窗口</el-button>
        </div>
      </header>
      <h2 class="notice">出团通知单</h2>
      <section>
        <div class="container">
          <table border="1" cellspacing="" cellpadding="" class="tablebase">
            <tr>
              <td  colspan="6" align="center"><h2>线路名称：{{detail.linename}}</h2></td> 
            </tr>
            <tr>
              <td class="title">组团社名称</td>
              <td>{{detail.scVo.companyName}}</td>
              <td class="title">组团社联系人</td>
              <td colspan="3">{{detail.creater}}</td>
            </tr>
            <tr>
              <td class="title">组团社电话</td>
              <td>{{detail.scVo.tel}}</td>
              <td class="title">组团社手机</td>
              <td colspan="3">{{detail.scVo.mobile}}</td>
            </tr>
            <tr>
              <td class="title">出发日期</td>
              <td>{{detail.starttime}}</td>
              <td class="title">出发交通</td>
              <td colspan="3">{{detail.lVo.trafficgo}}</td>
            </tr>
            <tr>
              <td class="title">返程日期</td>
              <td>{{detail.endtime}}</td>
              <td class="title">返程交通</td>
              <td colspan="3">{{detail.lVo.trafficreturn}}</td>
            </tr>
            <tr>
              <td class="title" >送团联系人</td>
              <td>{{detail.contact}}</td>
              <td class="title">联系方式</td>
              <td colspan="3">{{detail.contactmobile}}</td>
            </tr>
            <tr>
              <td class="title">集合地点</td>
              <td>{{detail.lVo.station}}</td>
              <td class="title">集合时间</td>
              <td colspan="3"></td>
              
            </tr>
          
            <tr>
              <td class="title">游客名单</td>
              <td colspan="5">
                <ul>
                  <li v-for="nameinfo in detail.namelist">
                    {{nameinfo.name}}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="title">接团人</td>
              <td colspan="5">

              </td>
            </tr>
            <tr>
              <td class="title">接送信息</td>
              <td colspan="5">

              </td>
            </tr>
            <tr>
              <td class="title">订单备注</td>
              <td colspan="5"> {{detail.remark}}</td>
            </tr>
            <tr>
              <td class="title">紧急联系人</td>
              <td colspan="5"> </td>
            </tr>

          </table>
          <table  border="1" cellspacing="" cellpadding="" class="tablebase">
            <tr>
              <th>日期</th>
              <th>描述</th>
              <th>餐</th>
              <th>宿</th>
            </tr>
            <tr v-for="info in detail.lVo.routes">
              <!--v-for="info in detail.lVo.line.routes"-->
              <td width="90">{{info.number}}</td>
              <td>
                <h3>{{info.title}}</h3>
                <pre>
                  {{info.content}}
                </pre>
              </td>
              <td width="40">
                <span v-if="info.isbreakfast">早</span>
                <span v-if="info.islunch">中</span>
                <span v-if="info.isdinner">晚</span>
              </td>
              <td width="127">
                {{info.hotel}}
              </td>
            </tr>
          </table>
          <table border="1" cellspacing="" cellpadding="" class="tablebase">
            <tr v-if="!costincludes">
              <td class="title">费用包含</td>
              <td><pre>{{detail.lVo.includePkg}}</pre></td>
            </tr>
            <tr v-if="!notincluded">
              <td class="title">费用不含</td>
              <td>
                <pre>{{detail.lVo.excludePkg}}</pre>
              </td>
            </tr>
            <tr v-if="!ownexpense">
              <td class="title">自费项目</td>
              <td></td>
            </tr>
            <tr v-if="!children">
              <td class="title">儿童安排</td>
              <td><pre>{{detail.lVo.childolder}}</pre></td>
            </tr>
            <tr v-if="!shoping">
              <td class="title">购物安排</td>
              <td><pre>{{detail.lVo.shopping}}</pre></td>
            </tr>
            <tr v-if="!careful">
              <td class="title">注意事项</td>
              <td></td>
            </tr>
            <tr v-if="!other">
              <td class="title">其它事项</td>
              <td></td>
            </tr>
            <tr v-if="!highlights">
              <td class="title">产品亮点</td>
              <td></td>
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
              <td><pre>
                {{detail.lVo.reminder}}
              </pre></td>
            </tr>
          </table>
        </div>
      </section>
    
    </div>
</template>
<script>
	import { orderexportdetail,groupnamelistexport} from '../../../common/js/config';
	import paramm from '../../../common/js/getParam';
export default {
  data(){
    return{
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
				contract:false,
				id:this.$route.query.id,
				detail:{}
    }
  },
  created(){
      this.getdetail();
    },
	methods:{
			getdetail(){
				let para = {
					token:paramm.getToken(),
					id:this.id
				}
				orderexportdetail(para).then((res) =>{
					this.detail = res.data.obj;
				})
      },
      exportgroupWord(){
        let para = {
					token:paramm.getToken(),
					content:document.body.innerHTML
        }
        console.log(para.content)
        groupnamelistexport(para).then(function(res){
          console.log(res.object);
        })
      }
    }
}
</script>
<style scoped lang="scss" >
     
  header {
    padding: 7px 0;
    background: #dee5ec;
    .container {
      text-align: left;
        width: 800px;
        margin: 0 auto;
    }
  }
  .notice{
    color:#2cb1b6;
    font-size: 25px;
    margin-top: 15px;
  }

section {
  .container {
  	width: 800px;
		margin: 0 auto;
    background: #fff;
    margin-top: 20px;
    padding: 0 20px 20px 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 5px;
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
      pre{
        white-space:pre-wrap;
      }
    }
    .title {
      background: #f5f7f9;
      font-weight: bold;
      width: 70px;
    }
  }
}
</style>

