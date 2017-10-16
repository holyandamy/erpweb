<template>
  <div>
    <div >
      <div class="t-tittle">发团计划</div>
      <div class='t-plan'>
         <div class="p-road">
           <el-row >
             <el-col :span="2"><div class="grid-content bg-purple">选择线路：</div></el-col>
             <el-col :span="8" class='p-road-txa'><div class="grid-content bg-purple-light">
               <el-button type="primary" class='el-button'  @click="dialogFormVisible = true">选择</el-button>
             </div></el-col>
             <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
           </el-row>

           <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
             <el-form :model="form">
               <el-form-item label="活动名称" :label-width="formLabelWidth">
                 <el-input v-model="form.name" auto-complete="off"></el-input>
               </el-form-item>
               <el-form-item label="活动区域" :label-width="formLabelWidth">
                 <el-select v-model="form.region" placeholder="请选择活动区域">
                   <el-option label="区域一" value="shanghai"></el-option>
                   <el-option label="区域二" value="beijing"></el-option>
                 </el-select>
               </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
             </div>
           </el-dialog>

         </div>
        <div class="p-road">
          <el-row >
            <el-col :span="2"><div class="grid-content bg-purple">集合通知：</div></el-col>
            <el-col :span="8" class='p-road-txa'><div class="grid-content bg-purple-light">
              <el-input
                :rows="6"
                type="textarea"
                placeholder="请填写集合时间和地点">
              </el-input>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
          </el-row>
        </div>
      </div>
      <!--发团时间-->
      <div class="t-tittle">发团时间</div>
      <div class="t-time">
          <div>
            <el-row >
              <el-col :span="2"><div class="grid-content bg-purple">发团时间：</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </div>
              </div></el-col>
            </el-row>
          </div>
          <!--todo-->
          <div class='t-table'>
            <!--<table>-->
              <!--<tr>-->
                <!--<td>序号</td>  &lt;!&ndash;style='border-right: 1px solid transparent;'&ndash;&gt;-->
                <!--<td>删除</td>-->
                <!--<td>发团日期</td>-->
                <!--<td>计划人数</td>-->
                <!--<td>是否收客</td>-->
                <!--<td>确认方式</td>-->
                <!--<td>报名截止</td>-->
                <!--<td>市场价</td>-->
                <!--<td>结算价</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td>&#45;&#45;&#45;&#45;</td>-->
                <!--<td>&#45;&#45;&#45;&#45;</td>-->
                <!--<td>&#45;&#45;&#45;&#45;</td>-->
                <!--<td>&#45;&#45;&#45;&#45;</td>-->
                <!--<td><el-checkbox v-model="checked"></el-checkbox></td>-->
                <!--<td class='sureType'>-->
                   <!--<span class='span-first'>11</span>-->
                   <!--<span>22</span>-->
                <!--</td>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
              <!--</tr>-->
              <!--<tr>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>January</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
                <!--<td>$100</td>-->
              <!--</tr>-->
            <!--</table>-->

            <table id="tab" >
              <tr>
                <th rowspan="1">序号</th>
                <th colspan="1">删除</th>
                <th colspan="2">李四</th>
                <th colspan="2">孙传</th>
                <th colspan="2">胡平</th>
                <th rowspan="2">合计</th>
              </tr>
              <tr>
                <th>语文</th>
                <th>数学</th>
                <th>语文</th>
                <th>数学</th>
                <th>语文</th>
                <th>数学</th>
                <th>语文</th>
                <th>数学</th>
              </tr>
              <tr>
                <th>1</th>
                <th>78</th>
                <th>96</th>
                <th>67</th>
                <th>98</th>
                <th>88</th>
                <th>75</th>
                <th>94</th>
                <th>69</th>
                <th> </th>
              </tr>
              <tr>
                <th>2</th>
                <th>89</th>
                <th>68</th>
                <th>77</th>
                <th>87</th>
                <th>84</th>
                <th>76</th>
                <th>71</th>
                <th>87</th>
                <th> </th>
              </tr>
              <tr>
                <th>3</th>
                <th>75</th>
                <th>78</th>
                <th>89</th>
                <th>74</th>
                <th>65</th>
                <th>68</th>
                <th>98</th>
                <th>90</th>
                <th></th>
              </tr>
              <tr>
                <th>4</th>
                <th>79</th>
                <th>89</th>
                <th>65</th>
                <th>62</th>
                <th>64</th>
                <th>87</th>
                <th>97</th>
                <th>91</th>
                <th></th>
              </tr>
              <tr>
                <th>5</th>
                <th>89</th>
                <th>96</th>
                <th>67</th>
                <th>76</th>
                <th>74</th>
                <th>84</th>
                <th>67</th>
                <th>81</th>
                <th></th>
              </tr>
              <tr>
                <th>6</th>
                <th>94</th>
                <th>90</th>
                <th>97</th>
                <th>74</th>
                <th>62</th>
                <th>81</th>
                <th>78</th>
                <th>78</th>
                <th></th>
              </tr>
            </table>

          </div>

      </div>
      <!--对接平台-->
      <div class="t-tittle">对接平台</div>
      <div class='t-pingtai'>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="馨·驰誉" style="margin-right: 40px;"></el-checkbox>
          <el-checkbox label="馨·欢途"></el-checkbox>
        </el-checkbox-group>
      </div>

      <!--保存按钮 -->
      <div style='text-align: center;margin-top: 50px;'>
        <el-button type="primary"  size="large" style='margin-right: 100px;' @click='save'>保存</el-button>
        <el-button type="primary"  size="large">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import util from '../../../common/js/util'
//  import {} from '../../../common/js/config';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: '',
        checkList: [],
        checked: true
      }
    },
    created(){
    },
    methods: {
      save () {
        var M = this.value1.getMonth().toString().length==1 ? '0'+ this.value1.getMonth().toString() : this.value1.getMonth().toString();
        var D = this.value1.getDay().toString().length==1 ? '0'+ this.value1.getDay().toString() : this.value1.getDay().toString();
        var selectTime = this.value1.getFullYear().toString() +"-" + M+ "-" + D;
        console.log(selectTime);
        console.log(this.value1);
      }

    }
  }
</script>

<style scoped lang="scss">
  .not:hover{color: red;}
  .t-tittle{
    color: #2cb1b6;
    font-size: 24px;
    line-height: 60px;
    text-align: left;
    padding-left: 40px;
    margin-top: 20px;
  }
  .t-plan{
    padding: 20px 60px;
    background: white;
    text-align: left;
    >div{
      padding: 10px 0;
    }
  }
  .t-time{
    padding: 20px 60px;
    background: white;
    text-align: left;
    /*table{*/
      /*width: 90%;*/
      /*margin-left: 30px;*/
      /*margin-top: 20px;*/
      /*border-collapse: collapse;*/
      /*border: 1px solid #ccc;*/
      /*td{*/
        /*padding: 0;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
        /*text-align: center;*/
        /*border-right: 1px solid #ccc;*/
        /*border-bottom: 1px solid #ccc;*/
      /*}*/
      /*.sureType{*/
        /*height: 40px;*/
        /*span{*/
          /*width: 49%;*/
          /*height: 40px;*/
        /*}*/
        /*.span-first{*/
          /*border-right: 1px solid #ccc;*/
        /*}*/
      /*}*/
    /*}*/
    #tab{
      width:100%;
      height:100%;
      font-size:12px;
      font-family:Verdana, Geneva, sans-serif Georgia, "Times New Roman", Times, serif;
      font-weight:bolder;
      border: 1px solid #ccc;
      margin-top: 20px;
      th{
        height: 40px;
        line-height: 40px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        text-align: center;
      }
    }
  }
  .t-pingtai{
    padding: 20px 60px;
    padding-left: 170px;
    background: white;
    text-align: left;
  }

</style>
