// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import routes from './routes'
import '../static/css/base.css'
import '../static/umeditor/ueditor.config.js'
import '../static/umeditor/ueditor.all.js'
import '../static/umeditor/lang/zh-cn/zh-cn.js'
import '../static/umeditor/ueditor.parse.min.js'
import Cookies from 'js-cookie';

import "../static/js_date/js/date-picker/datepicker.min.css";
import "../static/js_date/js/date-picker/datepicker.calendar.css";
import "../static/js_date/js/date-picker/timepicker.css";

import '../static/js_date/js/jquery-1.8.3.min.js';
import '../static/js_date/js/tmpl/jquery.tmpl.min.js';
import '../static/js_date/js/date-picker/jquery.timeselect.js';
import '../static/js_date/js/date-picker/datepicker.js';
import '../static/js_date/js/date-picker/jquery.calendar.v2.js';
//import $ from 'jquery'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */
//定义路由
const router = new VueRouter({
	mode:"history",
	routes
})

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
	let type = Cookies.get('token')
	let typetoken = sessionStorage.getItem('token')
	if(type || typetoken){
		if(to.path === '/login'){
			next('/main')
		}else{
			next()
		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next('/login'); // 否则全部重定向到登录页
		}

	}
})
new Vue({
	//el: '#app',
	//template: '<App/>',
	router,
	//components: { App }
	render: h => h(App)
}).$mount('#app')