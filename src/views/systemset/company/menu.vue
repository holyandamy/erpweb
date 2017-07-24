<template>
	<section>
		<header>
			<el-menu  class="el-menu-demo" :default-active="activeIndex" mode="horizontal"  style="background: #fff;" >
					  <el-menu-item index="1">
					  	<router-link :to="'/cmanagement/department'">部门管理</router-link>
					  </el-menu-item>
					<el-menu-item index="2" >
					  	<router-link :to="'/cmanagement/bankaccount'">银行账号设置</router-link>
					  </el-menu-item>
					  <el-menu-item index="3" >
					  	<router-link :to="'/cmanagement/companyset'">公司信息设置</router-link>
					  </el-menu-item>
		</el-menu>
		</header>
		<router-view>
			
		</router-view>
	</section>
</template>

<script>
	export default{
		data(){
			return {
				activeIndex:'1'
			}
		}
	}
</script>

<style scoped lang="scss">
	header{
		padding: 0 40px;
		background: white;
		margin-bottom: 30px;
		padding-top: 20px;
		.el-menu-item{
			height: 36px;
			line-height: 36px;
			border-top: 3px solid transparent;
			padding: 0;
			a{
				padding: 0 20px;
				display: block;
			}
			}
			.el-menu-item:hover{
				background: transparent;
				border-bottom: transparent;
				color: #3ec3c8;
				height: 36px;
				line-height: 36px;
			}
		.el-menu-item.is-active{
			background: #eef1f6;
			border-top: 3px solid #3ec3c8!important;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			color: #333;
		}
		
		
	}
	
</style>