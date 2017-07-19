//import Login from './views/Login.vue'
//import NotFound from './views/404.vue'
import Home from './views/home.vue'
import Main from './views/Main.vue'
import Collectlist from './views/finance/collectlist.vue'
import Collectedit from './views/finance/collectedit.vue'
import Paylist from './views/finance/pay.vue'

//import Page4 from './views/nav2/Page4.vue'
//import Page5 from './views/nav2/Page5.vue'
//import Page6 from './views/nav3/Page6.vue'
//import echarts from './views/charts/echarts.vue'

let routes = [
//  {
//      path: '/login',
//      component: Login,
//      name: '',
//      hidden: true
//  },
//  {
//      path: '/404',
//      component: NotFound,
//      name: '',
//      hidden: true
//  },
	{ path: '/main', component: Main, name: '主页', hidden: true },
    {
        path: '/',
        component: Home,
        name: '产品管理'
        
    },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            {path: '/collectlist', component: Collectlist, name: '应收账款'},
            {path: '/collectedit', component: Collectedit, name: '收款登记',hidden:true},
            { path: '/paylist', component: Paylist, name: '应付账款' },
            {path: '/payedit', component: Collectedit, name: '付款登记',hidden:true},
           
        ]
        
    },
    {
        path: '/',
        component: Home,
        name: '报表管理',
        
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        
    },
];

export default routes;