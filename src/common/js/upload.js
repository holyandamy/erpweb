import { upload1,upload2 } from './config.js'
import upyun from 'upyun';
import axios from 'axios';
let bucket = new upyun.Bucket('xtimg')

export function getHeaderSign(bucket, method, path) {
	axios.post(upload1, {
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
	return axios.post(upload2, {
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
export async function imgupload(files) {
	const res= await client.formPutFile('/{year}/{mon}/{day}/{random32}{.suffix}', files.file)
	files.file['url'] = 'http://xtimg.b0.upaiyun.com' + res.url
	return files
}

