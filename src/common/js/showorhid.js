import Cookies from 'js-cookie';
import { tokenlogin } from './config'
export function showorhide(eachlist) {
	let list = document.getElementsByClassName('hasid')
	let token = Cookies.get('token')
	let tokensession = sessionStorage.getItem('token')
	let para = {}
	let hasid = []
	if(tokensession) {
		para = {
			token: tokensession
		}
	} else {
		para = {
			token: token
		}
	}

	tokenlogin(para).then((res) => {
		hasid = res.data.obj.auths
		for(let i = 0; i < list.length; i++) {
			for(let k = 0; k < hasid.length; k++) {
				if(list[i].id == hasid[k]) {
					list[i].setAttribute('style', 'display: inline-block !important');
					console.log(list[i])

				}
			}
		}
	})

}