<template>
	<el-row class="container">
		<div class="nav">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<el-row class="logo">
					<el-col :span="3">&nbsp;</el-col>
					<el-col :span="18">
						<img src="../assets/images/logo.png"/>
					</el-col>
					<el-col :span="3">&nbsp;</el-col>
				</el-row>
				<el-row class="userinfo">
					<a class="headerimg" > <router-link to="/main"><img src="../assets/images/header.png"/></router-link></a>
					<div class="clearfix"></div>
					<el-dropdown trigger="hover">
					<p class="el-dropdown-link userinfo-inner">{{userinfo}}<!--<i class="el-icon-arrow-down"></i>--></p>
					<!--<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的审批</el-dropdown-item>
						<el-dropdown-item>审批列表</el-dropdown-item>
						<el-dropdown-item>个人资料</el-dropdown-item>
					</el-dropdown-menu>-->
				</el-dropdown>
					<p class="out"><a  @click="logout">退出</a><!-- | <a href="#">消息</a>--></p>
				</el-row>
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
					 unique-opened  v-show="!collapsed"  theme="dark">
					<template v-for="(item,index) in menu" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							
							<template slot="title"></i>{{item.authname}}</template>
							<el-menu-item v-for="child in item.childs" :index="child.path" @click="showhome=false,$router.push(child.path)" :key="child.path" v-if="!child.hidden">{{child.authname}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.childs.length>0" :index="item.childs[0].path">{{item.childs[0].authname}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					
					<li v-for="(item,index) in menu" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px; " @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="childnode in item.childs" v-if="!childnode.hidden" :key="childnode.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==childnode.path?'is-active':''" @click="$router.push(childnode.path)">{{childnode.authname}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.childnode[0].path?'is-active':''" @click="$router.push(item.childnode[0].path)"></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			</div>
		<div class="containtermain">
			<router-view></router-view>
		</div>
		
		</el-col>
		
	</el-row>
</template>

<script> 
import Cookies from 'js-cookie';
import {tokenlogin} from '../common/js/config'
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        collapsed:false,
        thishow:true,
        showhome:true,
        userinfo:'',
        userinfos:{},
        menu:[]
       };
    },
   created(){
		this.getuserinfo()
},
    methods: {
    	getuserinfo(){
//			let name = localStorage.getItem('info')
			let token = Cookies.get('token')
			let tokensession = sessionStorage.getItem('token')
			let para={}
			if(tokensession){
				 para = {token:tokensession}
			}else{
				 para = {token:token}
			}
			
			tokenlogin(para).then((res) =>{
				this.userinfo =res.data.obj.username
				this.menu = res.data.obj.menu
				Cookies.set('info',res.data.obj.auths)
			})
		
			
		},
      handleSelect(key, keyPath) {
        if(key == 1){
        	this.thishow = true
        }else{
        	this.thishow = false
        }
      },
      logout(){
      	let _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('token')
					Cookies.remove('token');
					Cookies.remove('info')
					_this.$router.push('/login');
				}).catch(() => {

				});	


			}
    }
  }
</script>

<style scoped lang="scss">
.clearfix{clear: both;}
.nav{height: 100%; 
width: 180px;
float: left;
}
.containtermain{
	margin-left: 180px;
}
 .container {
		position: absolute;
		top: 0px;
		width: 100%;
		aside{
			background: #353f4d;
			height: 100%;
			position: fixed;
			width: 180px;
			.logo{
			padding: 15px 0px 15px 0px;
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
					img{width: 80px;
						height: 80px;
					}
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
					margin: 0px 5px;
					cursor: pointer;
					}
				}
			}
			.el-submenu{
			border-bottom: 1px solid #4b5565;
			}
			
		}
		
		
		
	}
	.el-dropdown-menu{
		font-size: 12px;
		background: #4b5565;
		border: 0px;
		
		li{
			line-height: 30px;
			margin-top: 0px!important;
			color: #fff;
			text-align: center
			:hover{
				background: #232c39;
			}
			
		}
		
	}
	.el-submenu{position: relative;}
	.el-submenu:after{
		content: '';
		position: absolute;
		width: 5px;
		height: 5px;
		background: #fff;
		top: 25px;
		left: 40px;
		opacity: .7;
		transform: rotate(50deg);
	}
	.is-active:after{
		opacity: 1;
	}

</style>