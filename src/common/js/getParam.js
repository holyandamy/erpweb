import Cookies from 'js-cookie';
const paramm = {};
let _this = this
console.log(222, _this);

/*
*  1 获取token公用方法
*
* */
paramm.getToken = () =>{
  return Cookies.get('token') || sessionStorage.getItem('token')
}

/*
*   2 请求返回状态码判断公用方法
* */
paramm.getCode = (data,thiss) => {
  if(data.error == 0) {
     thiss.$message({
        message: data.message || '成功',
        type: 'success'
      });
    }
    if(data.error == 1) {
      thiss.$message({
        message: data.message || '失败',
        type: 'error'
      });
    }
    if(data.err == 401) {
      thiss.$message({
        message: '请重新登陆',
        type: 'warning'
      });
    }
    if(data.err == 404) {
      thiss.$message({
        message: '失败404',
        type: 'warning'
      });
    }
    if(data.err == 500) {
      thiss.$message({
        message: '服务器异常500',
        type: 'warning'
      });
    }
   if(data.err == 502) {
     thiss.$message({
       message: '网络异常',
       type: 'warning'
     });
   }
}
export default paramm;
