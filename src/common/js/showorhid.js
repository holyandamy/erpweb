import Cookies from 'js-cookie';
export function showorhide(eachlist) {
	let list = document.getElementsByClassName('hasid')
	let token = Cookies.get('token')
	let tokensession = sessionStorage.getItem('token')
	let para = {}
	let hasid = Cookies.get('info').split(',')

	if(tokensession) {
		para = {
			token: tokensession
		}
	} else {
		para = {
			token: token
		}
	}
	
	for(let i = 0; i < list.length; i++) {
		
			for(let k = 0; k < hasid.length; k++) {
				if(hasid[k].indexOf(list[i].id) >= 0){
					list[i].setAttribute('style', 'display: inline-block !important');
				}
			}
		}
	

}