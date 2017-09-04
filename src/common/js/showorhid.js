export function showorhide(eachlist){
			let list = document.getElementsByClassName('hasid')
			let hasid = JSON.parse(sessionStorage.getItem('info')).auths
			for(let i =0;i<list.length;i++){
				for(let k =0;k<hasid.length;k++){
					if(list[i].id == hasid[k]){
						list[i].style.display="inline-block"
						list[i].style.opacity="1"
						list[i].setAttribute('style', 'display: inline-block !important');
					
					}
				}
			}
}
