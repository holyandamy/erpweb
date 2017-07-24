<template>
	<el-row>
		<el-col  class="header">
				<el-col :span="12">
					<!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="1" >
					  	<router-link :to="'/financeheader/collectlist'">收款管理</router-link>
					  </el-menu-item>
						  
					  <el-menu-item index="2" ><a target="_blank">
					  	<router-link :to="'/financeheader/paylist'">付款管理</router-link>
					  </a></el-menu-item>
					</el-menu>-->

				
				</el-col>
				<el-col :span="12" class="payicon"> 
					<el-button :plain="true" type="info" v-show="thishow">
						<router-link :to="'/financeheader/collectedit'">收款登记</router-link>
						</el-button>
				    <el-button :plain="true" type="info" v-show="!thishow">	
				    	<router-link :to="'/financeheader/payedit'">付款登记</router-link>
				    </el-button>
				    <el-button :plain="true" type="info">导出Excel</el-button>
				</el-col>
			</el-col>
		
		
			
			<el-col class="main">
			
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
			
			
		</el-col>
		
	
	</el-row>
			
</template>

<script>
	export default{
		data(){
			return {
				activeIndex: '1',
				thishow:true
			}
		},
    methods: {
      handleSelect(key, keyPath) {
        if(key == 1){
        	this.thishow = true
        }else{
        	this.thishow = false
        }
      }
    }
	}
</script>

<style scoped lang="scss">
	.header{
			height: 60px;
			background: white;
			padding: 0 40px;
			.el-menu{
				background: transparent;
				.el-menu-item{
					height: 40px;
					line-height: 40px;
					margin-top: 20px;
					border-top: 3px solid transparent;
					border-bottom: 0;
					border-top-left-radius: 5px;
					border-top-right-radius: 5px;
					a{
						display: block;
					}
					
				}
				:hover{
						background: transparent;
						color: #3ec3c8;
					}
			
			}
			
			.is-active{
				background: #eef1f6;
				border-top: 3px solid #3ec3c8!important;
			}
			.payicon{
				text-align: right;
				margin-top: 10px;
			}
			
		}
		.main {
			padding: 40px;
		}
</style>