import axios from 'axios';
let base = 'http://172.17.9.13:3001/api';
//财务管理
/* 收款 */
export const getcollectlist = params => { return axios.post(`${base}/finance/collect`, params).then(res => res); };//获取收款列表
export const getcollectedit = params => { return axios.post(`${base}/finance/collect/status`, params).then(res => res); };//收款状态编辑
export const collectsave = params => { return axios.post(`${base}/finance/collect/save`, params).then(res => res); };//收款登记
export const banlist = params => { return axios.post(`${base}/sys/bank/accounts`, params).then(res => res); };//查询银行账号列表
/* 付款 */
export const getpaylist = params => { return axios.post(`${base}/finance/pay`, params).then(res => res); };//获取付款列表
export const getpayedit = params => { return axios.post(`${base}/finance/pay/status`, params).then(res => res); };//付款状态编辑
export const paysave = params => { return axios.post(`${base}/finance/pay/save`, params).then(res => res); };//收款登记





//报表管理
export const custlist = params => { return axios.post(`${base}/cust/list`, params).then(res => res); };//获取游客列表
export const custsave = params => { return axios.post(`${base}/cust/save`, params).then(res => res); };//获取游


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
export const rolelist = params => { return axios.post(`${base}/sys/role/list`, params).then(res => res); };//角色列表
export const roledel = params => { return axios.post(`${base}/sys/role/del`, params).then(res => res); };//删除列表
export const authlist = params => { return axios.post(`${base}/sys/auth/list`, params).then(res => res); };//权限列表
export const roledetail = params => { return axios.post(`${base}/sys/role/detail`, params).then(res => res); };//角色详情
/* 员工管理 */
export const getuserlist = params => { return axios.post(`${base}/sys/user/list`, params).then(res => res); };//获取员工列表
export const userstatus = params => { return axios.post(`${base}/sys/user/status`, params).then(res => res); };//更新员工状态
export const userdel = params => { return axios.post(`${base}/sys/user/del`, params).then(res => res); };//删除员工
/* 员工管理--编辑 */
export const editusersave = params => { return axios.post(`${base}/sys/user/update`, params).then(res => res); };//获取员工列表
export const userdetail = params => { return axios.post(`${base}/sys/user/detail`, params).then(res => res); };//获取员工详情
/* 员工管理--新增 */
export const usersave = params => { return axios.post(`${base}/sys/user/save`, params).then(res => res); };//获取员工详情
/* 操作日志*/
export const loglist = params => { return axios.post(`${base}/sys/log/list`, params).then(res => res); };//获取员工详情