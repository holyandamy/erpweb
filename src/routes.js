//import Login from './views/Login.vue'
//import NotFound from './views/404.vue'
import Home from './views/home.vue'
import Main from './views/Main.vue'
import Collectlist from './views/finance/collectlist.vue'
import Collectedit from './views/finance/collectedit.vue'
import Paylist from './views/finance/pay.vue'
//产品中心
import Linelist from './views/product/linelist/linelist.vue'  //线路列表
import Grouplist from './views/product/grouplist/grouplist.vue'   //发团列表
import Linesort from './views/product/linesort/linesort.vue' //线路分类
import Linetemplate from './views/product/linetemplate/linetemplate.vue'  //线路模板



//公司管理
import Cmanagement from './views/systemset/company/menu.vue'  //公司管理菜单
import Department from './views/systemset/company/department.vue'   //部门管理
import Bankaccount from './views/systemset/company/bankaccount.vue' //银行账户管理
import Companyset from './views/systemset/company/companyset.vue'  //公司信息设置
//审批设置
import Approval from './views/systemset/approval/approval.vue' //审批设置
//角色管理
import Role from './views/systemset/role/role.vue' //角色管理

//员工管理
import Staff from './views/systemset/staff/staff.vue' //员工管理

//操作日志
import Log from './views/systemset/log/log.vue'  //操作日志
//图片库

//客户管理  
import Visitor from './views/customer/visitor/visitor.vue'   //游客管理
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
        name: '产品管理',
        children: [
        	{path: '/linelist', component: Linelist, name: '线路列表'},
           	{path: '/linesort', component: Linesort, name: '线路分类'},
          	{path: '/grouplist', component: Grouplist, name: '发团列表'},
           {path: '/linetemplate', component: Linetemplate, name: '行程模板'}
      
        ]
        
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
        children:[
        	{path: '/collectlist', component: Collectlist, name: '收款管理',},
        	{path: '/paylist', component: Paylist, name: '付款管理' },
        	
        ]
    },
    {
        path: '/',
        component: Home,
        name: '报表管理',
         children: [
        	{path: '/visitor', component: Visitor, name: '游客管理'},
         ]
        
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        children: [
        	
          	{path: '/menu', component: Cmanagement, name: '公司管理'},
          
            {path: '/approval', component: Approval, name: '审批配置'},
           
            {path: '/role', component: Role, name: '角色管理'},
          
            {path: '/staff', component: Staff, name: '员工管理'},
           
            {path: '/log', component: Log, name: '操作日志'}
      
        ]
        
    },
];

export default routes;