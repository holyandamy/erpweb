import Login from './views/Login.vue'
//import NotFound from './views/404.vue'
import Home from './views/home.vue'
import Main from './views/Main.vue'
import Collectlist from './views/finance/collectlist.vue'
import Paylist from './views/finance/pay.vue'
//产品中心
import Linelist from './views/product/linelist/linelist.vue' //线路列表
import Grouplist from './views/product/grouplist/grouplist.vue' //发团列表
import Linesort from './views/product/linesort/linesort.vue' //线路分类
import Linetemplate from './views/product/linetemplate/linetemplate.vue' //线路模板
import Docking from './views/product/docking/docking.vue'
//行程单
import Singlegroup from './views/order/order/singlegroup.vue'
//确认单
import Conmfirm from './views/order/order/comfirm.vue'
//订单管理
import orderLineft from './views/order/line/line.vue' //公司管理菜单
import orderList from './views/order/order/orderlist.vue' //公司管理菜单
import Giveorderlist from './views/order/giveorder/giveorderlist.vue' //
import Customlist from './views/order/custom/customlist.vue' //
//报表管理
import Lineearn from './views/reportform/form/lineearn.vue' //线路营收报表
import Transferearn from './views/reportform/form/transferearn.vue' //计调营收报表
import Monthearn from './views/reportform/form/monthearn.vue' //月收款统计
import Monthspend from './views/reportform/form/monthspend.vue' //月付款统计
//公司管理
import Cmanagement from './views/systemset/company/menu.vue' //公司管理菜单

//审批设置
import Approval from './views/systemset/approval/approval.vue' //审批设置
//角色管理
import Role from './views/systemset/role/role.vue' //角色管理

//员工管理
import Staff from './views/systemset/staff/staff.vue' //员工管理

//操作日志
import Log from './views/systemset/log/log.vue' //操作日志
//图片库

//客户管理
import Visitor from './views/customer/visitor/visitor.vue' //游客管理
let routes = [{
		path: '/login',
		component: Login,
		name: '',
		hidden: true
	},

	{
		path: '/',
		component: Home,
		name: 'home',
		hidden: true,
		children: [{
				path: '/main',
				component: Main,
				name: 'main'
			},

		]
	},
	{
		path: '/',
		component: Home,
		name: '产品管理',
		children: [{
				path: '/linelist',
				component: Linelist,
				name: '线路列表'
			},
			{
				path: '/linesort',
				component: Linesort,
				name: '线路分类'
			},
			{
				path: '/grouplist',
				component: Grouplist,
				name: '发团列表'
			},
			{
				path: '/linetemplate',
				component: Linetemplate,
				name: '行程模板'
			},

		]

	},
	{
		path: '/',
		component: Home,
		name: '订单管理',
		children: [{
				path: '/orderlineft',
				component: orderLineft,
				name: '线路收客',
			},
			{
				path: '/orderlist',
				component: orderList,
				name: '订单列表'
			},
      {
        path: '/giveorderlist',
        component: Giveorderlist,
        name: '接送订单列表'
      },
      {
        path: '/customlist',
        component: Customlist,
        name: '定制需求'
      }
		]

	},
  {
    path: '/',
    component: Home,
    name: '报表管理',
    children: [{
        path: '/lineearn',
        component: Lineearn,
        name: '线路营收报表',
      },
      {
        path: '/transferearn',
        component: Transferearn,
        name: '计调营收报表'
      },
      {
        path: '/monthearn',
        component: Monthearn,
        name: '月收款统计'
      },
      {
        path: '/monthspend',
        component: Monthspend,
        name: '月付款统计'
      }
    ]

  },
	{
		path: '/',
		component: Home,
		name: '财务管理',
		children: [{
				path: '/collectlist',
				component: Collectlist,
				name: '收款管理',
			},
			{
				path: '/paylist',
				component: Paylist,
				name: '付款管理'
			},

		]
	},
	{
		path: '/',
		component: Home,
		name: '报表管理',
		children: [{
			path: '/visitor',
			component: Visitor,
			name: '游客管理'
		}, ]

	},
	{
		path: '/',
		component: Home,
		name: '系统设置',
		children: [

			{
				path: '/menu',
				component: Cmanagement,
				name: '公司管理'
			},

			{
				path: '/approval',
				component: Approval,
				name: '审批配置'
			},

			{
				path: '/role',
				component: Role,
				name: '角色管理'
			},

			{
				path: '/staff',
				component: Staff,
				name: '员工管理'
			},
			{
				path: '/docking',
				component: Docking,
				name: '对接平台设置'
			},

			{
				path: '/log',
				component: Log,
				name: '操作日志'
			}

		]

	},
	{
		path: '/confirm',
		component: Conmfirm,
		name: '确认单',
		hidden: true
	},
	{
		path: '/singlegroup',
		component: Singlegroup,
		name: '行程单',
		hidden: true
	}
];

export default routes;
