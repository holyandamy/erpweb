let check = {}
//团号验证
check.teanno = (rule, value, callback) =>{
					var reg = /^[a-z]+$/;
					if(value == ""){
						 return callback(new Error('请输入团号'));
					}else{
						if(!reg.test(value)){
							callback(new Error('必须是小写字母'));
						}else if(value.length>12){
							callback(new Error('最多输入12个字符'));
						}else{
							 callback();
						}
					}
			}

export default check