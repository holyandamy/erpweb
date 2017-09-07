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
  console.log(666, this);
  if(data.error == 0) {
      this.$message({
        message: data.message || '成功',
        type: 'success'
      });
    }
    if(data.error == 1) {
      this.$message({
        message: data.message || '失败',
        type: 'error'
      });
    }
    if(data.err == 401) {
      this.$message({
        message: '请登录',
        type: 'warning'
      });
    }
}
export default paramm;
