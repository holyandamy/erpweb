import axios from 'axios';
import Cookies from 'js-cookie';
let base = 'http://api.erp.we2tu.com/api';

export let token = ""
if(sessionStorage.getItem('token')){
	token = sessionStorage.getItem('token')
}
if(Cookies.get('token')){
	token = Cookies.get('token')
}


export let bases = "http://172.17.9.13:3001/"
export const setToken=value=>{ token= value };

//////////0
/* 首页 */
export const dashboard = params => { return axios.post(`${base}/sys/dashboard/info`, params).then(res => res); };//首页信息
export const tokenlogin = params => { return axios.post(`${base}/sys/user/token/login`, params).then(res => res); };
//登陆接口
export const login = params => { return axios.post(`${base}/sys/user/login`, params).then(res => res); };
/* 收款 */
export const getcollectlist = params => { return axios.post(`${base}/finance/collect`, params).then(res => res); };//获取收款列表
export const collectsave = params => { return axios.post(`${base}/finance/collect/save`, params).then(res => res); };//收款登记
export const banlist = params => { return axios.post(`${base}/sys/bank/accounts`, params).then(res => res); };//查询银行账号列表
export const collectstatus = params => { return axios.post(`${base}/finance/collect/status`, params).then(res => res); };//状态变更

/* 付款 */
export const getpaylist = params => { return axios.post(`${base}/finance/pay`, params).then(res => res); };//获取付款列表
export const getpayedit = params => { return axios.post(`${base}/finance/pay/status`, params).then(res => res); };//付款状态编辑
export const paysave = params => { return axios.post(`${base}/finance/pay/save`, params).then(res => res); };//收款登记

/* 发团列表 */
export const teamlist = params => { return axios.post(`${base}/line/team/list`, params).then(res => res); };//发团列表
export const grouplist = params => { return axios.post(`${base}/line/team/list`, params).then(res => res); };//模板列表
export const reserveNum = params => { return axios.post(`${base}/sys/user/match`, params).then(res => res); };//预定输入手机号或公司名
export const groupsave = params => { return axios.post(`${base}/line/team/save`, params).then(res => res); };//新增发团计划
export const orderSave = params => { return axios.post(`${base}/order/save`, params).then(res => res); };//发团 预定
export const orderdet = params => { return axios.post(`${base}/line/team/order/detail`, params).then(res => res); }//发团 下单详情  TODO
export const groupdetail = params => { return axios.post(`${base}/line/team/detail`, params).then(res => res); };//发团列表 详情
export const groupupdate = params => { return axios.post(`${base}/line/team/update`, params).then(res => res); };//发团列表 编辑

/*产品分类*/
export const linecategorylist = params => { return axios.post(`${base}/line/category/list`, params); };//获取线路管理
export const linecategoryadd = params => { return axios.post(`${base}/line/category/save`, params); };//添加
export const linecategoryupdate = params => { return axios.post(`${base}/line/category/update`, params); };//编辑
export const linecategorydelete = params => { return axios.post(`${base}/line/category/del`, params); };//删除
export const linecategorytype = params => { return axios.post(`${base}/line/category/type`, params); };//通过分类类型获取分类列表接口
/*订单中心*/
export const orderlist = params => { return axios.post(`${base}/order/list`, params); };//通过分类类型获取分类列表接口
export const orderdetail = params => { return axios.post(`${base}/order/detail`, params); };//通过分类类型获取分类列表接口
export const orderupdate = params => { return axios.post(`${base}/order/update`, params); };//更新订单
export const ordercancel = params => { return axios.post(`${base}/order/cancel`, params); };//取消订单
export const ordernamelistconfirm = params => { return axios.post(`${base}/order/namelist/confirm`, params); };//确认游客名单接口
export const ordernamelistexport = params => { return axios.post(`${base}/order/namelist/export`, params); };//导出游客名单
export const orderexportdetail = params => { return axios.post(`${base}/order/export/detail`, params); };//获取确认单详情



//产品中心
/*产品中心--线路列表*/
export const linelist = params => { return axios.post(`${base}/line/list`, params).then(res => res); };//获取线路列表
export const destlist = params => { return axios.post(`${base}/line/dest/list`, params).then(res => res); };//获取目的地列表
export const categoryall = params => { return axios.post(`${base}/line/category/all`, params).then(res => res); };//分类列表接口（没有分页）
export const linedetail = params => { return axios.post(`${base}/line/detail`, params).then(res => res); };//线路详情接口
export const lineapprove = params => { return axios.post(`${base}/line/approve`, params).then(res => res); };//线路审批接口
export const linetop = params => { return axios.post(`${base}/line/top`, params).then(res => res); };//线路置顶
export const linesave = params => { return axios.post(`${base}/line/save`, params).then(res => res); };//保存线路
export const lineupdate = params => { return axios.post(`${base}/line/update`, params).then(res => res); };//更新线路


/*产品中心--模板*/
export const templatelist = params => { return axios.post(`${base}/line/template/list`, params).then(res => res); };//模板列表
export const templatsave = params => { return axios.post(`${base}/line/template/save`, params).then(res => res); };//新增模板
export const templatdetail = params => { return axios.post(`${base}/line/template/detail`, params).then(res => res); };//模板详情
export const templatupdate = params => { return axios.post(`${base}/line/template/update`, params).then(res => res); };//模板详情

//报表管理
export const custlist = params => { return axios.post(`${base}/cust/list`, params) };//获取游客列表
export const custsave = params => { return axios.post(`${base}/cust/save`, params) };//获取游
export const custdel = params => { return axios.post(`${base}/cust/del`, params); };//删除
export const custupdate = params => { return axios.post(`${base}/cust/update`, params) };//获取游
export const custdetail = params => { return axios.post(`${base}/cust/detail`, params) };//获取游


//系统设置
/* 公司管理--部门管理 */
export const getdeplist = params => { return axios.post(`${base}/sys/dept/list`, params).then(res => res); };//获取部门列表
export const adddep = params => { return axios.post(`${base}/sys/dept/save`, params).then(res => res); };//新增部门+新增下级
export const deldep = params => { return axios.post(`${base}/sys/dept/del`, params).then(res => res); };//删除部门
export const editdep = params => { return axios.post(`${base}/sys/dept/update`, params).then(res => res); };//编辑部门
/* 公司管理--银行账号管理 */
export const getbanklist = params => { return axios.post(`${base}/sys/bank/list`, params).then(res => res); };//获取银行列表
export const addbank = params => { return axios.post(`${base}/sys/bank/save`, params).then(res => res); };//新增银行
export const updatebank = params => { return axios.post(`${base}/sys/bank/update`, params).then(res => res); };//编辑银行
export const updatestatus = params => { return axios.post(`${base}/sys/bank/status`, params).then(res => res); };//更新银行状态
/* 公司管理--公司信息设置 */

export const companydetail = params => { return axios.post(`${base}/syscfg/company/detail`, params).then(res => res); };//获取公司信息
export const companyupdate = params => { return axios.post(`${base}/sys/company/update`, params).then(res => res); };//更新公司设置
export const province = params => { return axios.post(`${base}/sys/province/list`, params).then(res => res); };//获取省
export const city = params => { return axios.post(`${base}/sys/city/list`, params).then(res => res); };//获取市
export const district = params => { return axios.post(`${base}/sys/district/list`, params).then(res => res); };//获取区
/* 审批配置 */
export const getapprovelist = params => { return axios.post(`${base}/sys/approve/list`, params).then(res => res); };//获取审批配置
export const approvestatus = params => { return axios.post(`${base}/sys/approve/status`, params).then(res => res); };//更新审批配置状态
/* 审批配置--编辑 */
export const approveupdate = params => { return axios.post(`${base}/sys/approve/update`, params).then(res => res); };//更新审批配置
export const userenablelist = params => { return axios.post(`${base}/sys/user/enablelist`, params).then(res => res); };//获取可用用户列表
/* 审批配置--新增 */
export const addapprove = params => { return axios.post(`${base}/sys/approve/save`, params).then(res => res); };//保存审批配置
/* 角色管理 */
export const rolelist = params => { return axios.post(`${base}/sys/role/list`, params) };//角色列表
export const roledel = params => { return axios.post(`${base}/sys/role/del`, params) };//删除列表
export const authlist = params => { return axios.post(`${base}/sys/auth/list`, params) };//权限列表
export const roledetail = params => { return axios.post(`${base}/sys/role/detail`, params) };//角色详情
export const rolesave = params => { return axios.post(`${base}/sys/role/save`, params) };//权限列表
export const roleupdate = params => { return axios.post(`${base}/sys/role/update`, params) };//角色详情
/* 员工管理 */
export const getuserlist = params => { return axios.post(`${base}/sys/user/list`, params).then(res => res); };//获取员工列表
export const userstatus = params => { return axios.post(`${base}/sys/user/status`, params).then(res => res); };//更新员工状态
export const userdel = params => { return axios.post(`${base}/sys/user/del`, params).then(res => res); };//删除员工
/* 员工管理--编辑 */
export const editusersave = params => { return axios.post(`${base}/sys/user/update`, params).then(res => res); };//获取员工列表
export const userdetail = params => { return axios.post(`${base}/sys/user/detail`, params).then(res => res); };//获取员工详情
export const userpwd = params => { return axios.post(`${base}/sys/user/pwd`, params).then(res => res); };//获取员工详情

/* 员工管理--新增 */
export const usersave = params => { return axios.post(`${base}/sys/user/save`, params).then(res => res); };//获取员工详情

/* 对接平台设置 */

export const openlist = params => { return axios.post(`${base}/sys/open/list`, params).then(res => res); };
export const opensave = params => { return axios.post(`${base}/sys/open/save`, params).then(res => res); };//获取员工详情

/* 操作日志*/
export const loglist = params => { return axios.post(`${base}/sys/log/list`, params).then(res => res); };//获取员工详情
