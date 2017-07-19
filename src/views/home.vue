<template>
	<el-row class="container">
		<el-col :span="3" class="nav">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<el-row class="logo">
					<el-col :span="3"> asd</el-col>
					<el-col :span="18">
						<img src="../assets/images/logo.png"/>
					</el-col>
					<el-col :span="3"> adfs</el-col>
				</el-row>
				<el-row class="userinfo">
					<a class="headerimg"><img src="../assets/images/header.png"/></a>
					<div class="clearfix"></div>
					<el-dropdown trigger="hover">
					<p class="el-dropdown-link userinfo-inner">张立新 <i class="el-icon-arrow-down"></i></p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的审批</el-dropdown-item>
						<el-dropdown-item>审批列表</el-dropdown-item>
						<el-dropdown-item>个人资料</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
					<p class="out"><a href="javascript:;"  @click.native="logout">退出</a> | <a href="#">消息</a></p>
				</el-row>
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
					 unique-opened router v-show="!collapsed"  theme="dark">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px; " @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			</el-col>
		<el-col :span="21">
			<el-col  class="header">
				<el-col :span="12">
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="1" >
					  	<router-link :to="'/collectlist'">收款管理</router-link>
					  </el-menu-item>
						  
					  <el-menu-item index="2" ><a target="_blank">
					  	<router-link :to="'/paylist'">付款管理</router-link>
					  </a></el-menu-item>
					</el-menu>

				
				</el-col>
				<el-col :span="12" class="payicon"> 
					<el-button :plain="true" type="info" v-show="thishow">
						<router-link :to="'/collectedit'">收款登记</router-link>
						</el-button>
				    <el-button :plain="true" type="info" v-show="!thishow">	
				    	<router-link :to="'/payedit'">付款登记</router-link>
				    </el-button>
				    <el-button :plain="true" type="info">导出Excel</el-button>
				</el-col>
			</el-col>
			<el-col class="main">
			
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
			
			
		</el-col>
		</el-col>
		
		</el-col>
		
	</el-row>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        collapsed:false,
        thishow:true
        
      };
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
.clearfix{clear: both;}
.nav{height: 100%;}
 .container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		aside{
			background: #353f4d;
			height: 100%;
			.logo{
			padding: 15px 0 15px 0;
			}
			.userinfo{
				height: 150px;
				margin-top: 50px;
				border-bottom: 1px solid #4b5565;
				.headerimg{
					width: 80px;
					height: 80px;
					overflow: hidden;
					display: inline-block;
					border-radius: 90%;
					margin-bottom: 10px;
					
					}
				.el-dropdown-link{
					color: #fff;
					cursor: pointer;
					i{
						font-size: 12px;
						margin-left: 10px;}
				}
				p.out{
					color: #4f5966;
					font-size: 12px;
					margin-top: 10px;
					a{color: #b8c0cc;
					font-size: 12px;
					margin: 0 5px;
					}
				}
			}
			.el-menu{
				background: #353f4d!important;
				li{
					border-bottom: 1px solid #4b5565;
				}
				.el-submenu__title{
					color: #fff;
				}
			}
			.is-opened{
				background: #3ec3c8;
				div{
					color: #fff!important;
				}
				
			}
		}
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
		
		
	}
	.el-dropdown-menu{
		font-size: 12px;
		background: #4b5565;
		border: 0;
		
		li{
			line-height: 30px;
			margin-top: 0!important;
			color: #fff;
			text-align: center
			:hover{
				background: #232c39;
			}
			
		}
		
	}
</style>