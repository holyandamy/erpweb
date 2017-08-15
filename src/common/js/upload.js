import { bases } from './config.js'
import upyun from 'upyun';
import axios from 'axios';
let bucket = new upyun.Bucket('xtimg')

export function getHeaderSign(bucket, method, path) {
	axios.post('http://172.17.9.13:3001/file/upyun/getSign', {
			bucket,
			method,
			path
		})
		.then(function(response) {
			if(response.status !== 200) {
				console.error('gen header sign faild!')
				return;
			}
			return response.data
		})
}
export function bodySignCallback(bucket, params) {
	return axios.post('http://172.17.9.13:3001/file/upyun/bodySign', {
			bucket,
			params
		})
		.then(function(response) {
			if(response.status !== 200) {
				console.error('gen header sign faild!')
				return;
			}
			return response.data
		})
}
let client = new upyun.Client(bucket,getHeaderSign)
client.setBodySignCallback(bodySignCallback)
export function imgupload(files) {
	client.formPutFile('/{year}/{mon}/{day}/{random32}{.suffix}', files.file).then(function(res) {
		files.file['url'] = 'http://xtimg.b0.upaiyun.com' + res.url
		console.log(2)
	}).catch(function(err) {})

}