// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import routes from './routes'
import '../theme/index.css'
import '../static/umeditor/ueditor.config.js'
import '../static/umeditor/ueditor.all.js'
import '../static/umeditor/lang/zh-cn/zh-cn.js'
import '../static/umeditor/ueditor.parse.min.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
/* eslint-disable no-new */
//定义路由
const router = new VueRouter({
  routes
})

//router.beforeEach((to, from, next) => {
////NProgress.start();
//if (to.path == '/login') {
//  sessionStorage.removeItem('user');
//}
//let user = JSON.parse(sessionStorage.getItem('user'));
//
//if (!user && to.path != '/login') {
//	next({ path: '/login' })
//} else {
//  next()
// 
//}
//})

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
 //components: { App }
  render: h => h(App)
}).$mount('#app')
